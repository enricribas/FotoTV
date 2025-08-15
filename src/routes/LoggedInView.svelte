<script lang="ts">
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { ImageService } from '$lib/imageService';
	import { CollectionService } from '$lib/collectionService';
	import { UserService } from '$lib/userService';
	import UploadLimitDisplay from '$lib/components/UploadLimitDisplay.svelte';
	import HelperText from '$lib/components/HelperText.svelte';
	import FileUploadButton from '$lib/components/FileUploadButton.svelte';
	import TVApprovalModal from '$lib/components/TVApprovalModal.svelte';
	import { browser } from '$app/environment';
	import { shouldUseTVUI } from '$lib/tvUtils';
	import { goto } from '$app/navigation';

	export let user: User;

	let showTVApproval = false;
	let showHelperText = true;
	let isTVMode = false;
	let uploadLimit = { canUpload: true, remaining: 10, limit: 10 };
	let currentCollectionUuid = '';

	// Create a writable store for uploadedImages
	const uploadedImagesStore = writable<string[]>([]);

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

	async function handleUploadSuccess(downloadURL: string) {
		// Immediately add the new image to the list
		uploadedImagesStore.set([...$uploadedImagesStore, downloadURL]);

		// Retry loading with backoff to ensure Firebase has updated
		const refreshedImages = await ImageService.loadUserImagesWithRetry(
			user,
			$uploadedImagesStore.length - 1
		);
		uploadedImagesStore.set(refreshedImages);
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

<div class="flex flex-col items-center space-y-4">
	<HelperText {showHelperText} {isTVMode} onClose={closeHelperText} />

	<!-- Upload Limit Display -->
	<UploadLimitDisplay
		remaining={uploadLimit.remaining}
		limit={uploadLimit.limit}
		canUpload={uploadLimit.canUpload}
	/>

	<FileUploadButton
		{user}
		{uploadLimit}
		{currentCollectionUuid}
		onUploadSuccess={handleUploadSuccess}
		onLimitsUpdate={updateUploadLimits}
	/>

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
		Connect TV
	</button>
</div>

<TVApprovalModal
	showModal={showTVApproval}
	onClose={toggleTVApproval}
	onSuccess={handleTVApprovalSuccess}
/>
