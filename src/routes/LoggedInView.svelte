<script lang="ts">
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { ImageService } from '$lib/imageService';
	import { CollectionService } from '$lib/collectionService';

	import HelperText from '$lib/components/HelperText.svelte';
	import FileUploadButton from '$lib/components/FileUploadButton.svelte';
	import TVApprovalModal from '$lib/components/TVApprovalModal.svelte';
	import { browser } from '$app/environment';
	import { shouldUseTVUI } from '$lib/tvUtils';
	import { goto } from '$app/navigation';
	import { collectionStore } from '$lib/stores/collectionStore';

	export let user: User;
	export let uploadLimit: { canUpload: boolean; remaining: number; limit: number };
	export let currentCollectionUuid: string;
	export let onLimitsUpdate: () => Promise<void>;

	let showTVApproval = false;
	let showHelperText = true;
	let isTVMode = false;

	// Create a writable store for uploadedImages
	const uploadedImagesStore = writable<string[]>([]);

	// Initialize user profile and load images
	async function initializeUserProfile() {
		try {
			// Only proceed if we have a collection UUID
			if (!currentCollectionUuid) {
				return;
			}

			// Load images for this collection
			const images = await ImageService.loadCollectionImages(currentCollectionUuid);
			uploadedImagesStore.set(images);

			// Sync collection image count with actual uploaded images
			await CollectionService.syncImageCount(user, currentCollectionUuid);

			await onLimitsUpdate();
		} catch (error) {
			console.error('Error initializing user profile:', error);
		}
	}

	async function handleUploadSuccess(downloadURL: string) {
		// Immediately add the new image to the list
		uploadedImagesStore.set([...$uploadedImagesStore, downloadURL]);

		// Retry loading with backoff to ensure Firebase has updated
		const refreshedImages = await ImageService.loadCollectionImagesWithRetry(
			currentCollectionUuid,
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

		// Initialize user profile
		initializeUserProfile();
	}

	// Re-initialize when currentCollectionUuid changes
	$: if (currentCollectionUuid && browser) {
		initializeUserProfile();
	}
</script>

<div class="flex flex-col items-center space-y-4">
	<HelperText {showHelperText} {isTVMode} onClose={closeHelperText} />

	<FileUploadButton
		{user}
		{uploadLimit}
		{currentCollectionUuid}
		onUploadSuccess={handleUploadSuccess}
		{onLimitsUpdate}
	/>

	<!-- Slideshow Button -->
	<button
		class="btn w-full border-orange-500 bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
		on:click={() => {
			// Ensure the current collection is set in the store before navigating
			collectionStore.setSelectedCollection(currentCollectionUuid, user.uid);
			goto('/slideshow');
		}}
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
	<button
		class="btn w-full border-orange-500 bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
		on:click={toggleTVApproval}
	>
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
