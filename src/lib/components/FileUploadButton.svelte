<script lang="ts">
	import { writable } from 'svelte/store';
	import { storage } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import type { User } from 'firebase/auth';
	import { CollectionService } from '$lib/collectionService';

	export let user: User;
	export let uploadLimit: { canUpload: boolean; remaining: number; limit: number };
	export let currentCollectionUuid: string;
	export let onUploadSuccess: (downloadURL: string) => void;
	export let onLimitsUpdate: () => Promise<void>;

	const uploading = writable<boolean>(false);
	let fileInput: HTMLInputElement;

	function triggerFileUpload() {
		if (!uploadLimit.canUpload) {
			alert(
				`Upload limit reached for this collection! You can upload up to ${uploadLimit.limit} images per collection. You have ${uploadLimit.remaining} uploads remaining in this collection.`
			);
			return;
		}
		fileInput?.click();
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0 || !user) return;

		// Check upload limits before proceeding
		await onLimitsUpdate();
		if (!uploadLimit.canUpload) {
			alert(
				`Upload limit reached for this collection! You can upload up to ${uploadLimit.limit} images per collection. You have ${uploadLimit.remaining} uploads remaining in this collection.`
			);
			target.value = '';
			return;
		}

		uploading.set(true);

		try {
			const file = files[0];

			// Validate file type
			if (!file.type.startsWith('image/')) {
				alert('Please select an image file');
				return;
			}

			// Get the user's primary collection UUID
			const collectionUuid =
				currentCollectionUuid || (await CollectionService.getPrimaryCollection(user));

			// Create a unique filename
			const timestamp = Date.now();
			const fileName = `${timestamp}_${file.name}`;
			const storageRef = ref(storage, `images/${collectionUuid}/${fileName}`);

			// Upload the file
			const snapshot = await uploadBytes(storageRef, file);

			// Get the download URL
			const downloadURL = await getDownloadURL(snapshot.ref);

			// Increment collection's image count in Firestore
			await CollectionService.incrementImageCount(user, collectionUuid);

			// Notify parent component of successful upload
			onUploadSuccess(downloadURL);

			// Update upload limits after successful upload
			await onLimitsUpdate();
		} catch (error) {
			console.error('Upload failed:', error);
			alert('Upload failed. Please try again.');
		} finally {
			uploading.set(false);
			// Reset file input
			target.value = '';
		}
	}
</script>

<!-- Hidden file input -->
<input
	bind:this={fileInput}
	type="file"
	accept="image/*"
	on:change={handleFileUpload}
	class="hidden"
/>

<!-- Upload Button -->
<button
	class="btn w-full border-orange-500 bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
	on:click={triggerFileUpload}
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
