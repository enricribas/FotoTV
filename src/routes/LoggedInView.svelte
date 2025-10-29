<script lang="ts">
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { ImageService } from '$lib/imageService';
	import { CollectionService } from '$lib/collectionService';
	import type { ImageCollection } from '$lib/types/collection.types';

	import HelperText from '$lib/components/HelperText.svelte';
	import FileUploadButton from '$lib/components/FileUploadButton.svelte';
	import TVApprovalModal from '$lib/components/TVApprovalModal.svelte';
	import UploadLimitDisplay from '$lib/components/UploadLimitDisplay.svelte';
	import CollectionSelector from '$lib/components/CollectionSelector.svelte';
	import CollectionSettingsModal from '$lib/components/CollectionSettingsModal.svelte';
	import ShareCollectionModal from '$lib/components/ShareCollectionModal.svelte';
	import { browser } from '$app/environment';
	import { shouldUseTVUI } from '$lib/tvUtils';
	import { goto } from '$app/navigation';
	import { collectionStore } from '$lib/stores/collectionStore';

	export let user: User;
	export let uploadLimit: { canUpload: boolean; remaining: number; limit: number };
	export let currentCollectionUuid: string;
	export let collections: ImageCollection[] = [];
	export let onLimitsUpdate: () => Promise<void>;
	export let showUploadLimit: boolean = false;
	export let isCompactLayout: boolean = false;

	let showTVApproval = false;
	let showHelperText = true;
	let isTVMode = false;
	let showSettingsModal = false;
	let showShareModal = false;

	// Create a writable store for uploadedImages
	const uploadedImagesStore = writable<string[]>([]);

	// Create event dispatcher
	const dispatch = createEventDispatcher();

	// Reactive variables for current collection state
	$: currentCollection = collections.find((c) => c.uuid === currentCollectionUuid);
	$: isSharedWithMe = !!(currentCollection?.owner && currentCollection.owner !== user.uid);

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

	async function handleUploadSuccess(downloadURL: string, collectionUuid?: string) {
		// Use the collection UUID where the image was actually uploaded, or fall back to current
		const targetCollectionUuid = collectionUuid || currentCollectionUuid;

		// Only refresh if it's the currently viewed collection
		if (targetCollectionUuid === currentCollectionUuid) {
			// Immediately add the new image to the list
			uploadedImagesStore.set([...$uploadedImagesStore, downloadURL]);

			// Retry loading with backoff to ensure Firebase has updated
			const refreshedImages = await ImageService.loadCollectionImagesWithRetry(
				targetCollectionUuid,
				$uploadedImagesStore.length - 1
			);
			uploadedImagesStore.set(refreshedImages);
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

		// Initialize user profile
		initializeUserProfile();
	}

	// Re-initialize when currentCollectionUuid changes
	$: if (currentCollectionUuid && browser) {
		initializeUserProfile();
	}
</script>

<div class="space-y-6">
	<!-- Collection Selector (Mobile - Above image on small screens) -->
	{#if collections.length > 1}
		<div class="w-full lg:hidden">
			<CollectionSelector
				selectedCollectionUuid={currentCollectionUuid}
				{collections}
				{user}
				on:collectionChange={(e) => dispatch('collectionChange', e.detail)}
				on:collectionsUpdated={() => dispatch('collectionsUpdated')}
			/>
		</div>
	{/if}

	<!-- Two column layout for content and actions -->
	<div
		class="flex flex-col items-center space-y-4 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-8"
	>
		<!-- Left column - Collection selector (wide screens) and text content -->
		<div class="w-full space-y-4 lg:w-1/2">
			<!-- Collection Selector (Desktop - Beside image) -->
			{#if collections.length > 1}
				<div class="hidden lg:block">
					<CollectionSelector
						selectedCollectionUuid={currentCollectionUuid}
						{collections}
						{user}
						on:collectionChange={(e) => dispatch('collectionChange', e.detail)}
						on:collectionsUpdated={() => dispatch('collectionsUpdated')}
					/>
				</div>
			{/if}

			<HelperText {showHelperText} {isTVMode} onClose={closeHelperText} />

			{#if showUploadLimit}
				<UploadLimitDisplay
					remaining={uploadLimit.remaining}
					limit={uploadLimit.limit}
					canUpload={uploadLimit.canUpload}
				/>
			{/if}
		</div>

		<!-- Right column - Buttons -->
		<div class="flex w-full flex-col space-y-4 lg:w-1/2">
			<FileUploadButton
				{user}
				{uploadLimit}
				{currentCollectionUuid}
				{collections}
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

			<!-- Review Photos Button -->
			<button
				class="btn w-full border-orange-500 bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
				on:click={() => {
					// Ensure the current collection is set in the store before navigating
					collectionStore.setSelectedCollection(currentCollectionUuid, user.uid);
					goto('/review');
				}}
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
					/>
				</svg>
				Review Photos
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

			<!-- Share Collection Button -->
			<button
				class="btn w-full border-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 {isSharedWithMe
					? 'border-gray-400 bg-gray-400 hover:bg-gray-400'
					: 'bg-orange-500'}"
				on:click={() => (showShareModal = true)}
				disabled={!currentCollectionUuid || isSharedWithMe}
				title={isSharedWithMe
					? 'Cannot share collections owned by others'
					: 'Share this collection'}
			>
				<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
					<path
						d="M16 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.928 9.24a4.02 4.02 0 0 1-.026 1.644l5.04 2.537a4 4 0 1 1-.867 1.803l-5.09-2.562a4 4 0 1 1 .083-5.228l5.036-2.522a4 4 0 1 1 .929 1.772L7.928 9.24zM4 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
					/>
				</svg>
				Share Collection
			</button>

			<!-- Collection Settings Button -->
			<button
				class="btn w-full border-orange-500 bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
				on:click={() => (showSettingsModal = true)}
				disabled={!currentCollectionUuid}
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				Collection Settings
			</button>
		</div>
	</div>
</div>

<TVApprovalModal
	showModal={showTVApproval}
	onClose={toggleTVApproval}
	onSuccess={handleTVApprovalSuccess}
/>

<CollectionSettingsModal
	isOpen={showSettingsModal}
	collection={collections.find((c) => c.uuid === currentCollectionUuid) || null}
	on:close={() => (showSettingsModal = false)}
	on:save={async (e) => {
		if (currentCollectionUuid) {
			// Update collection time
			await CollectionService.updateCollectionTime(user, currentCollectionUuid, e.detail.duration);

			// Update collection name if provided
			if (e.detail.name) {
				await CollectionService.updateCollectionName(user, currentCollectionUuid, e.detail.name);
			}

			await initializeUserProfile();
			dispatch('collectionsUpdated');
		}
		showSettingsModal = false;
	}}
/>

<ShareCollectionModal
	isOpen={showShareModal}
	imageCollection={collections.find((c) => c.uuid === currentCollectionUuid) || null}
	{user}
	on:close={() => (showShareModal = false)}
/>
