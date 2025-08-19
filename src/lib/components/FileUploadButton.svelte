<script lang="ts">
	import { writable } from 'svelte/store';
	import { storage } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL, type UploadResult } from 'firebase/storage';
	import type { User } from 'firebase/auth';
	import { CollectionService } from '$lib/collectionService';
	import type { ImageCollection } from '$lib/types/collection.types';
	import MultiCollectionUploadSelector from './MultiCollectionUploadSelector.svelte';

	export let user: User;
	export let uploadLimit: { canUpload: boolean; remaining: number; limit: number };
	export let currentCollectionUuid: string;
	export let collections: ImageCollection[] = [];
	export let onUploadSuccess: (downloadURL: string) => void;
	export let onLimitsUpdate: () => Promise<void>;

	const uploading = writable<boolean>(false);
	let fileInput: HTMLInputElement;
	let showMultiCollectionSelector = false;
	let selectedFile: File | null = null;

	function triggerFileUpload() {
		if (!uploadLimit.canUpload) {
			alert(
				`Upload limit reached for this collection! You can upload up to ${uploadLimit.limit} images per collection. You have ${uploadLimit.remaining} uploads remaining.`
			);
			return;
		}
		fileInput?.click();
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0 || !user) return;

		const file = files[0];

		// Validate file type
		if (!file.type.startsWith('image/')) {
			alert('Please select an image file');
			target.value = '';
			return;
		}

		// Check if user has multiple collections
		if (collections.length > 1) {
			// Show multi-collection selector
			selectedFile = file;
			showMultiCollectionSelector = true;
		} else {
			// Single collection flow - use existing logic
			await uploadToSingleCollection(file, target);
		}
	}

	async function uploadToSingleCollection(file: File, target: HTMLInputElement) {
		// Check upload limits before proceeding
		await onLimitsUpdate();
		if (!uploadLimit.canUpload) {
			alert(
				`Upload limit reached for this collection! You can upload up to ${uploadLimit.limit} images per collection. You have ${uploadLimit.remaining} uploads remaining.`
			);
			target.value = '';
			return;
		}

		uploading.set(true);

		try {
			// Get the collection UUID to upload to
			const collectionUuid =
				currentCollectionUuid || (await CollectionService.getPrimaryCollection(user));

			await uploadFileToCollection(file, collectionUuid);

			// Notify parent component of successful upload
			onUploadSuccess('uploaded');

			// Update upload limits after successful upload
			await onLimitsUpdate();
		} catch (error) {
			console.error('Upload failed with error:', error);
			handleUploadError(error);
		} finally {
			uploading.set(false);
			// Reset file input
			target.value = '';
		}
	}

	async function handleMultiCollectionUpload(
		event: CustomEvent<{ selectedCollections: ImageCollection[] }>
	) {
		const { selectedCollections } = event.detail;
		showMultiCollectionSelector = false;

		if (!selectedFile) return;

		uploading.set(true);

		try {
			const uploadPromises = selectedCollections.map((collection) =>
				uploadFileToCollection(selectedFile!, collection.uuid)
			);

			await Promise.all(uploadPromises);

			// Notify parent component of successful upload
			onUploadSuccess('uploaded');

			// Update upload limits after successful upload
			await onLimitsUpdate();

			alert(
				`Successfully uploaded to ${selectedCollections.length} collection${selectedCollections.length === 1 ? '' : 's'}!`
			);
		} catch (error) {
			console.error('Multi-collection upload failed:', error);
			handleUploadError(error);
		} finally {
			uploading.set(false);
			selectedFile = null;
			// Reset file input
			const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
			if (fileInput) fileInput.value = '';
		}
	}

	function handleMultiCollectionCancel() {
		showMultiCollectionSelector = false;
		selectedFile = null;
		// Reset file input
		const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
		if (fileInput) fileInput.value = '';
	}

	async function uploadFileToCollection(file: File, collectionUuid: string): Promise<void> {
		// Verify and refresh auth token
		try {
			await user.getIdToken(true); // Force refresh
		} catch (authError) {
			console.error('Failed to refresh auth token:', authError);
			throw new Error('Authentication failed. Please try logging out and back in.');
		}

		// First verify the collection exists in Firestore
		let collectionExists = false;
		let verifyRetryCount = 0;
		const maxVerifyRetries = 3;

		while (!collectionExists && verifyRetryCount < maxVerifyRetries) {
			collectionExists = await CollectionService.verifyCollectionExists(user, collectionUuid);
			if (!collectionExists) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				verifyRetryCount++;
			}
		}

		if (!collectionExists) {
			throw new Error(
				'Collection not found. This might be a new collection that is still being set up. Please wait a moment and try again.'
			);
		}

		// Verify user has access to this collection with retry for new collections
		let hasAccess = false;
		let retryCount = 0;
		const maxRetries = 3;

		while (!hasAccess && retryCount < maxRetries) {
			hasAccess = await CollectionService.hasAccessToCollection(user, collectionUuid);
			if (!hasAccess) {
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
				retryCount++;
			}
		}

		if (!hasAccess) {
			throw new Error(
				'Access denied to this collection. The collection may still be setting up. Please wait a moment and try again.'
			);
		}

		// Add delay to ensure Firestore propagation for Storage rules
		await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds

		// Create a unique filename
		const timestamp = Date.now();
		const fileName = `${timestamp}_${file.name}`;
		const storagePath = `images/${collectionUuid}/${fileName}`;
		const storageRef = ref(storage, storagePath);

		// Upload the file with retry on permission errors
		let uploadSuccess = false;
		let uploadRetries = 0;
		const maxUploadRetries = 2;
		let snapshot: UploadResult | null = null;

		while (!uploadSuccess && uploadRetries < maxUploadRetries) {
			try {
				snapshot = await uploadBytes(storageRef, file);
				uploadSuccess = true;
			} catch (uploadError) {
				// Check for 403 forbidden errors specifically
				const errorCode =
					uploadError && typeof uploadError === 'object' && 'code' in uploadError
						? (uploadError as { code?: string }).code
						: undefined;
				const errorMessage =
					uploadError && typeof uploadError === 'object' && 'message' in uploadError
						? (uploadError as { message?: string }).message
						: undefined;
				const is403Error =
					errorCode === 'storage/unauthorized' ||
					errorMessage?.includes('403') ||
					errorMessage?.includes('Forbidden');

				if (is403Error) {
					// For 403 errors, try one more time with a longer delay
					if (uploadRetries < maxUploadRetries - 1) {
						await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
						uploadRetries++;
					} else {
						throw new Error(
							`Storage access denied (403). The collection "${collectionUuid}" may not exist in Firestore or there may be a permissions issue.`
						);
					}
				} else if (
					uploadError instanceof Error &&
					uploadError.message.includes('storage/unauthorized') &&
					uploadRetries < maxUploadRetries - 1
				) {
					await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
					uploadRetries++;
				} else {
					throw uploadError; // Re-throw if it's not a permission error or we're out of retries
				}
			}
		}

		if (!snapshot) {
			throw new Error('Upload failed after all retries');
		}

		// Get the download URL (we don't need to return it for multi-upload)
		await getDownloadURL(snapshot.ref);

		// Increment collection's image count in Firestore
		await CollectionService.incrementImageCount(user, collectionUuid);
	}

	function handleUploadError(error: unknown) {
		// Provide more specific error messages
		if (error instanceof Error) {
			if (
				error.message.includes('storage/unauthorized') ||
				error.message.includes('403') ||
				error.message.includes('Storage access denied')
			) {
				alert(
					'Upload failed: Permission denied. This may happen if:\n' +
						'• The collection was just created and permissions are still propagating\n' +
						'• There is a temporary authentication issue\n' +
						'• The collection no longer exists\n\n' +
						'Please try again in a few moments, or try refreshing the page.'
				);
			} else if (error.message.includes('Authentication failed')) {
				alert('Upload failed: Authentication issue. Please try logging out and back in.');
			} else if (error.message.includes('storage/')) {
				alert(`Upload failed: Storage error - ${error.message}`);
			} else if (error.message.includes('firestore/')) {
				alert(`Upload failed: Database error - ${error.message}`);
			} else {
				alert(`Upload failed: ${error.message}`);
			}
		} else {
			alert('Upload failed. Please try again.');
		}
	}
</script>

<!-- Hidden file input -->
<input
	bind:this={fileInput}
	type="file"
	accept="image/*"
	onchange={handleFileUpload}
	class="hidden"
/>

<!-- Upload Button -->
<button
	class="btn w-full border-orange-500 bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
	onclick={triggerFileUpload}
	disabled={$uploading || !uploadLimit.canUpload}
>
	{#if $uploading}
		<span class="loading loading-spinner loading-sm"></span>
		Uploading...
	{:else if !uploadLimit.canUpload}
		<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
			/>
		</svg>
		Upload Limit Reached
	{:else}
		<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
			/>
		</svg>
		Upload Photo
	{/if}
</button>

<!-- Multi-Collection Upload Selector -->
<MultiCollectionUploadSelector
	{collections}
	{user}
	isOpen={showMultiCollectionSelector}
	{selectedFile}
	on:confirm={handleMultiCollectionUpload}
	on:cancel={handleMultiCollectionCancel}
/>
