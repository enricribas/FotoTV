<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, storage } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { ImageService } from '$lib/imageService';

	export let user: User;
	export let uploadedImages: string[];

	const uploading = writable<boolean>(false);
	
	// Create a writable store for uploadedImages to allow updates
	const uploadedImagesStore = writable(uploadedImages);
	
	// Subscribe to changes and update the parent
	uploadedImagesStore.subscribe((images) => {
		uploadedImages = images;
	});
	
	// Update the store when the prop changes
	$: uploadedImagesStore.set(uploadedImages);

	let fileInput: HTMLInputElement;

	function triggerFileUpload() {
		fileInput?.click();
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0 || !user) return;

		uploading.set(true);

		try {
			const file = files[0];

			// Validate file type
			if (!file.type.startsWith('image/')) {
				alert('Please select an image file');
				return;
			}

			// Create a unique filename
			const timestamp = Date.now();
			const fileName = `${user.uid}/${timestamp}_${file.name}`;
			const storageRef = ref(storage, `images/${fileName}`);

			// Upload the file
			const snapshot = await uploadBytes(storageRef, file);

			// Get the download URL
			const downloadURL = await getDownloadURL(snapshot.ref);

			// Immediately add the new image to the list
			uploadedImagesStore.set([...uploadedImages, downloadURL]);

			// Retry loading with backoff to ensure Firebase has updated
			const refreshedImages = await ImageService.loadUserImagesWithRetry(
				user,
				uploadedImages.length - 1
			);
			uploadedImagesStore.set(refreshedImages);
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

<div class="flex flex-col items-center space-y-4">
		<!-- Upload Button -->
		<button
			class="btn w-full border-orange-500 bg-orange-500 text-white hover:bg-orange-600"
			on:click={triggerFileUpload}
			disabled={$uploading}
		>
			{#if $uploading}
				<span class="loading loading-spinner loading-sm"></span>
				Uploading...
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

		<!-- Slideshow Button -->
		<button
			class="btn w-full border-red-500 bg-red-500 text-white hover:bg-red-600"
			on:click={() => goto('/slideshow')}
		>
			<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
				/>
			</svg>
			Slideshow
		</button>

	</div> 