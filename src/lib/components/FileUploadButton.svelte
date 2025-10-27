<script lang="ts">
	import { writable } from 'svelte/store';
	import { storage } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL, type UploadResult } from 'firebase/storage';
	import type { User } from 'firebase/auth';
	import { CollectionService } from '$lib/collectionService';
	import type { ImageCollection } from '$lib/types/collection.types';
	import MultiCollectionUploadSelector from './MultiCollectionUploadSelector.svelte';
	import { formatCollectionDisplayName, getCollectionOwnerName } from '$lib/utils/collectionUtils';

	export let user: User;
	export let uploadLimit: { canUpload: boolean; remaining: number; limit: number };
	export let currentCollectionUuid: string;
	export let collections: ImageCollection[] = [];
	export let onUploadSuccess: (downloadURL: string, collectionUuid?: string) => void;
	export let onLimitsUpdate: () => Promise<void>;

	const uploading = writable<boolean>(false);
	let fileInput: HTMLInputElement;
	let showMultiCollectionSelector = false;
	let selectedFile: File | null = null;
	let selectedFiles: File[] = [];

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

		// Convert FileList to array
		const fileArray = Array.from(files);

		// Validate all files are images
		const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));
		if (invalidFiles.length > 0) {
			alert(
				`Please select only image files. ${invalidFiles.length} non-image file(s) were detected.`
			);
			target.value = '';
			return;
		}

		// Check if user has multiple collections
		if (collections.length > 1) {
			// Show multi-collection selector for multiple files
			selectedFiles = fileArray;
			selectedFile = fileArray[0]; // For backwards compatibility
			showMultiCollectionSelector = true;
		} else {
			// Single collection flow - upload all files
			await uploadMultipleToSingleCollection(fileArray, target);
		}
	}

	async function uploadMultipleToSingleCollection(files: File[], target: HTMLInputElement) {
		// Check upload limits before proceeding
		await onLimitsUpdate();

		// Check if we can upload all files
		if (files.length > uploadLimit.remaining) {
			alert(
				`You can only upload ${uploadLimit.remaining} more image(s) to this collection. ` +
					`You have selected ${files.length} file(s). ` +
					`Please select fewer files or remove some existing images.`
			);
			target.value = '';
			return;
		}

		if (!uploadLimit.canUpload) {
			alert(
				`Upload limit reached for this collection! You can upload up to ${uploadLimit.limit} images per collection.`
			);
			target.value = '';
			return;
		}

		uploading.set(true);

		try {
			// Get the collection UUID to upload to
			const collectionUuid =
				currentCollectionUuid || (await CollectionService.getPrimaryCollection(user));

			let successCount = 0;
			let failedCount = 0;
			const errors: string[] = [];

			// Upload files sequentially to avoid overwhelming the system
			for (const file of files) {
				try {
					await uploadFileToCollection(file, collectionUuid);
					successCount++;

					// Update limits after each successful upload
					await onLimitsUpdate();

					// Check if we've hit the limit
					if (!uploadLimit.canUpload && successCount < files.length) {
						alert(
							`Upload limit reached! Successfully uploaded ${successCount} of ${files.length} files. ` +
								`The remaining ${files.length - successCount} file(s) were not uploaded.`
						);
						break;
					}
				} catch (error) {
					failedCount++;
					console.error(`Upload failed for file ${file.name}:`, error);
					errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
				}
			}

			// Notify parent component of successful uploads
			if (successCount > 0) {
				onUploadSuccess('uploaded', collectionUuid);
			}

			// Show summary
			if (failedCount === 0 && successCount === files.length) {
				// All successful
				if (files.length === 1) {
					// Single file uploaded successfully - no alert needed
				} else {
					alert(`Successfully uploaded all ${files.length} images!`);
				}
			} else if (failedCount > 0) {
				// Some failed
				let message = `Upload completed with errors:\n`;
				message += `✓ ${successCount} file(s) uploaded successfully\n`;
				message += `✗ ${failedCount} file(s) failed\n`;
				if (errors.length > 0) {
					message += `\nErrors:\n${errors.slice(0, 3).join('\n')}`;
					if (errors.length > 3) {
						message += `\n... and ${errors.length - 3} more error(s)`;
					}
				}
				alert(message);
			}
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

		// Use selectedFiles if available (multiple files), otherwise fall back to selectedFile
		const filesToUpload =
			selectedFiles.length > 0 ? selectedFiles : selectedFile ? [selectedFile] : [];

		if (filesToUpload.length === 0) return;

		uploading.set(true);

		// Load owner names for collections with different owners
		const collectionDisplayNames: Record<string, string> = {};
		for (const collection of selectedCollections) {
			const ownerName =
				collection.owner && collection.owner !== user.uid
					? await getCollectionOwnerName(collection, user.uid)
					: undefined;
			collectionDisplayNames[collection.uuid] = formatCollectionDisplayName(collection, ownerName);
		}

		try {
			let totalSuccess = 0;
			let totalFailed = 0;
			const errors: string[] = [];

			// Upload each file to each selected collection
			for (const file of filesToUpload) {
				for (const collection of selectedCollections) {
					try {
						await uploadFileToCollection(file, collection.uuid);
						totalSuccess++;
					} catch (error) {
						totalFailed++;
						errors.push(
							`${file.name} → ${collectionDisplayNames[collection.uuid]}: ${error instanceof Error ? error.message : 'Unknown error'}`
						);
					}
				}
			}

			// Notify parent component of successful upload
			if (totalSuccess > 0) {
				// For multi-collection uploads, notify with each collection that was updated
				for (const collection of selectedCollections) {
					onUploadSuccess('uploaded', collection.uuid);
				}
			}

			// Update upload limits after successful upload
			await onLimitsUpdate();

			// Show results
			if (totalFailed === 0) {
				if (filesToUpload.length === 1 && selectedCollections.length === 1) {
					// Single file to single collection - no alert needed
				} else {
					const collectionNames = selectedCollections
						.map((c) => collectionDisplayNames[c.uuid])
						.join(', ');
					const message =
						`Successfully uploaded ${filesToUpload.length} file${filesToUpload.length === 1 ? '' : 's'} ` +
						`to ${selectedCollections.length} collection${selectedCollections.length === 1 ? '' : 's'}!\n\n` +
						`Collections: ${collectionNames}\n` +
						`Total uploads: ${totalSuccess}`;

					if (confirm(message + '\n\nWould you like to view one of these collections now?')) {
						// If current collection is not in the uploaded collections, switch to the first one
						const currentIsInUploaded = selectedCollections.some(
							(c) => c.uuid === currentCollectionUuid
						);
						if (!currentIsInUploaded && selectedCollections.length > 0) {
							// Dispatch event to change collection
							window.dispatchEvent(
								new CustomEvent('switch-collection', {
									detail: {
										collectionUuid: selectedCollections[0].uuid,
										collection: selectedCollections[0]
									}
								})
							);
						}
					}
				}
			} else {
				// Some failed
				let message = `Upload completed with errors:\n`;
				message += `✓ ${totalSuccess} upload(s) successful\n`;
				message += `✗ ${totalFailed} upload(s) failed\n`;
				if (errors.length > 0) {
					message += `\nErrors:\n${errors.slice(0, 5).join('\n')}`;
					if (errors.length > 5) {
						message += `\n... and ${errors.length - 5} more error(s)`;
					}
				}
				alert(message);
			}
		} catch (error) {
			console.error('Multi-collection upload failed:', error);
			handleUploadError(error);
		} finally {
			uploading.set(false);
			selectedFile = null;
			selectedFiles = [];
			// Reset file input
			const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
			if (fileInput) fileInput.value = '';
		}
	}

	function handleMultiCollectionCancel() {
		showMultiCollectionSelector = false;
		selectedFile = null;
		selectedFiles = [];
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
	multiple
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
		Upload Photos
	{/if}
</button>

<!-- Multi-Collection Upload Selector -->
<MultiCollectionUploadSelector
	{collections}
	{user}
	isOpen={showMultiCollectionSelector}
	{selectedFile}
	{selectedFiles}
	on:confirm={handleMultiCollectionUpload}
	on:cancel={handleMultiCollectionCancel}
/>
