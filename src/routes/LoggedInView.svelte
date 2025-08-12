<script lang="ts">
	import { goto } from '$app/navigation';
	import { storage } from '$lib/firebase';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { ImageService } from '$lib/imageService';
	import { CollectionService } from '$lib/collectionService';
	import { UserService } from '$lib/userService';
	import ManualCodeEntry from '$lib/components/ManualCodeEntry.svelte';
	import UploadLimitDisplay from '$lib/components/UploadLimitDisplay.svelte';
	import { browser } from '$app/environment';
	import { shouldUseTVUI } from '$lib/tvUtils';

	export let user: User;

	let showTVApproval = false;
	let showHelperText = true;
	let isTVMode = false;
	let uploadLimit = { canUpload: true, remaining: 10, limit: 10 };
	let currentCollectionUuid = '';

	const uploading = writable<boolean>(false);

	// Create a writable store for uploadedImages
	const uploadedImagesStore = writable<string[]>([]);

	let fileInput: HTMLInputElement;

	// Initialize user profile and collection upload limits
	async function initializeUserProfile() {
		try {
			await UserService.getOrCreateUserProfile(user);
			currentCollectionUuid = await CollectionService.getPrimaryCollection(user);

			// Load images for this collection
			const images = await ImageService.loadCollectionImages(currentCollectionUuid);
			uploadedImagesStore.set(images);

			// Sync collection image count with actual uploaded images
			await CollectionService.syncImageCount(user, currentCollectionUuid);

			await updateUploadLimits();
		} catch (error) {
			console.error('Error initializing user profile:', error);
		}
	}

	// Update upload limits based on current collection
	async function updateUploadLimits() {
		try {
			if (currentCollectionUuid) {
				uploadLimit = await CollectionService.canUploadImage(user, currentCollectionUuid);
			}
		} catch (error) {
			console.error('Error checking upload limits:', error);
		}
	}

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
		await updateUploadLimits();
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
			currentCollectionUuid = collectionUuid;

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

			// Immediately add the new image to the list
			uploadedImagesStore.set([...$uploadedImagesStore, downloadURL]);

			// Retry loading with backoff to ensure Firebase has updated
			const refreshedImages = await ImageService.loadUserImagesWithRetry(
				user,
				$uploadedImagesStore.length - 1
			);
			uploadedImagesStore.set(refreshedImages);

			// Update upload limits after successful upload
			await updateUploadLimits();
		} catch (error) {
			console.error('Upload failed:', error);
			alert('Upload failed. Please try again.');
		} finally {
			uploading.set(false);
			// Reset file input
			target.value = '';
		}
	}

	function toggleTVApproval() {
		showTVApproval = !showTVApproval;
	}

	function handleTVApprovalSuccess() {
		showTVApproval = false;
	}

	function closeHelperText() {
		showHelperText = false;
		if (browser) {
			localStorage.setItem('photoTV_hideHelper', 'true');
		}
	}

	// Check localStorage and TV mode on component mount
	if (browser) {
		const hideHelper = localStorage.getItem('photoTV_hideHelper');
		if (hideHelper === 'true') {
			showHelperText = false;
		}

		// Check if in TV mode and hide helper text accordingly
		shouldUseTVUI().then((isTV) => {
			isTVMode = isTV;
			if (isTV) {
				showHelperText = false;
			}
		});

		// Initialize user profile and upload limits
		initializeUserProfile();
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
	{#if showHelperText && !isTVMode}
		<div class="relative mt-6 mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:mb-0">
			<button
				class="absolute top-2 right-2 text-lg leading-none text-gray-400 hover:text-gray-600"
				on:click={closeHelperText}
				aria-label="Close helper text"
			>
				×
			</button>
			<div class="space-y-2 pr-6 text-sm text-gray-600">
				<div class="flex items-center">
					<span class="mr-2">📱</span>
					<span><strong>Phone:</strong> Upload photos and approve TV logins</span>
				</div>
				<div class="flex items-center">
					<span class="mr-2">📺</span>
					<span><strong>TV:</strong> View slideshow on the big screen</span>
				</div>
			</div>
			<div class="mt-3 rounded bg-blue-50 p-2 text-center">
				<p class="text-xs text-blue-700">
					<strong>Recommended:</strong> Sign in on your phone first, then use "Approve TV Login" to connect
					your TV
				</p>
			</div>
		</div>
	{/if}
	<!-- Upload Limit Display -->
	<UploadLimitDisplay
		remaining={uploadLimit.remaining}
		limit={uploadLimit.limit}
		canUpload={uploadLimit.canUpload}
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

	<!-- TV Approval Button -->
	<button class="btn w-full bg-red-900 text-white hover:bg-red-600" on:click={toggleTVApproval}>
		<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
			/>
		</svg>
		Approve TV Login
	</button>
</div>

<!-- TV Login Modal -->
{#if showTVApproval}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
		<div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<button
				class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2"
				on:click={toggleTVApproval}
			>
				✕
			</button>
			<ManualCodeEntry onSuccess={handleTVApprovalSuccess} />
		</div>
	</div>
{/if}
