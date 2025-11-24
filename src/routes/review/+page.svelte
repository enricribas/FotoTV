<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, type User } from 'firebase/auth';
	import { collectionStore } from '$lib/stores/collectionStore';
	import { ImageService } from '$lib/imageService';
	import { CollectionService } from '$lib/collectionService';
	import type { ImageCollection } from '$lib/types/collection.types';

	let user: User | null = null;
	let imageRefs: string[] = [];
	let loading = true;
	let error = '';
	let currentCollectionUuid = '';
	let currentCollection: ImageCollection | null = null;
	let unsubscribeAuth: (() => void) | undefined;
	let collectionStoreState: { selectedCollectionUuid?: string };
	let unsubscribeStore: (() => void) | undefined;
	let fullscreenImage: string | null = null;
	let selectedImages: string[] = [];
	let showActionMenu = false;

	onMount(() => {
		// Subscribe to collection store
		unsubscribeStore = collectionStore.subscribe((state) => {
			collectionStoreState = state;
		});

		// Listen for auth state changes
		unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
			user = u;
			if (u) {
				await loadImages();
			} else {
				goto('/');
			}
		});
	});

	onDestroy(() => {
		if (unsubscribeAuth) {
			unsubscribeAuth();
		}
		if (unsubscribeStore) {
			unsubscribeStore();
		}
	});

	async function loadImages() {
		if (!user) return;

		try {
			loading = true;
			error = '';

			// Get the current collection UUID from the store
			currentCollectionUuid = collectionStoreState?.selectedCollectionUuid || '';

			if (!currentCollectionUuid) {
				// If no collection is selected, try to get the primary collection
				currentCollectionUuid = await CollectionService.getPrimaryCollection(user);
				if (!currentCollectionUuid) {
					throw new Error('No collection selected');
				}
			}

			// Get collection details
			const collections = await CollectionService.getUserCollections(user);
			currentCollection = collections.find((c) => c.uuid === currentCollectionUuid) || null;

			// Load images for this collection
			const images = await ImageService.loadCollectionImages(currentCollectionUuid);
			imageRefs = images;

			if (images.length === 0) {
				error = 'No photos in this collection';
			}
		} catch (err) {
			console.error('Error loading images:', err);
			error = err instanceof Error ? err.message : 'Failed to load images';
		} finally {
			loading = false;
		}
	}

	function handleClose() {
		goto('/');
	}

	function handleImageClick(imageUrl: string) {
		// Open fullscreen on image click
		fullscreenImage = imageUrl;
	}

	function handleCheckboxClick(event: Event, imageUrl: string) {
		event.stopPropagation(); // Prevent opening fullscreen

		// Toggle selection
		const index = selectedImages.indexOf(imageUrl);
		if (index > -1) {
			selectedImages.splice(index, 1);
		} else {
			selectedImages.push(imageUrl);
		}
		selectedImages = selectedImages; // Trigger reactivity

		// Show/hide action menu based on selection
		showActionMenu = selectedImages.length > 0;
	}

	function closeFullscreen() {
		fullscreenImage = null;
	}

	async function deleteSelectedImages() {
		if (!user || selectedImages.length === 0) return;

		const confirmDelete = confirm(
			`Delete ${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''}?`
		);
		if (!confirmDelete) return;

		try {
			loading = true;
			for (const imageUrl of selectedImages) {
				await ImageService.deleteImage(imageUrl);
			}
			selectedImages = [];
			showActionMenu = false;
			await loadImages(); // Reload the images
		} catch (err) {
			console.error('Error deleting images:', err);
			alert('Failed to delete some images');
		} finally {
			loading = false;
		}
	}

	function unselectAll() {
		selectedImages = [];
		showActionMenu = false;
	}
</script>

<div class="min-h-screen bg-black">
	<!-- Header with close button -->
	<div class="fixed top-0 right-0 left-0 z-50 bg-black/80 pt-8 backdrop-blur-sm">
		<div
			class="flex items-center justify-between px-4 py-3 sm:px-6"
			style="padding-top: calc(0.75rem + env(safe-area-inset-top, 0))"
		>
			<h1 class="text-lg font-semibold text-white sm:text-xl">
				{currentCollection?.name || 'Review Photos'}
				{#if imageRefs.length > 0}
					<span class="ml-2 text-sm font-normal text-gray-400">
						({imageRefs.length} photo{imageRefs.length !== 1 ? 's' : ''})
					</span>
				{/if}
			</h1>
			<button
				on:click={handleClose}
				class="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
				aria-label="Close review and return to main menu"
			>
				Close
			</button>
		</div>
	</div>

	<!-- Main content area -->
	<div class="pt-32 pb-4" class:pb-36={showActionMenu}>
		{#if loading}
			<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center">
				<div class="text-center">
					<div
						class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"
					></div>
					<p class="mt-4 text-white">Loading photos...</p>
				</div>
			</div>
		{:else if error}
			<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
				<div class="text-center">
					<p class="text-xl text-white">{error}</p>
					<button
						on:click={handleClose}
						class="mt-4 rounded-lg bg-orange-500 px-6 py-2 text-white transition-colors hover:bg-orange-600"
					>
						Back to Menu
					</button>
				</div>
			</div>
		{:else if imageRefs.length > 0}
			<!-- Photo grid -->
			<div class="container mx-auto px-4 sm:px-6 {showActionMenu ? 'pb-32' : ''}">
				<div
					class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
				>
					{#each imageRefs as imageUrl, index (imageUrl)}
						<button
							on:click={() => handleImageClick(imageUrl)}
							class="group relative aspect-square overflow-hidden rounded-lg bg-gray-900 transition-all hover:ring-2 hover:ring-white/50 focus:ring-2 focus:ring-white focus:outline-none {selectedImages.includes(
								imageUrl
							)
								? 'ring-4 ring-blue-500'
								: ''}"
							aria-label="Photo {index + 1} of {imageRefs.length}. Click to view"
						>
							<img
								src={imageUrl}
								alt="Photo {index + 1}"
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
							/>
							<div
								class="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20"
							></div>
							<!-- Optional: Show index number on hover -->
							<div
								class="absolute right-1 bottom-1 rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
							>
								{index + 1}
							</div>
							<!-- Checkbox for selection -->
							<div
								class="absolute right-2 bottom-2 z-10"
								on:click={(e) => handleCheckboxClick(e, imageUrl)}
								on:keydown={(e) => e.key === 'Enter' && handleCheckboxClick(e, imageUrl)}
								role="button"
								tabindex="0"
								aria-label={selectedImages.includes(imageUrl) ? 'Deselect image' : 'Select image'}
							>
								<div
									class="flex h-6 w-6 items-center justify-center rounded border-2 {selectedImages.includes(
										imageUrl
									)
										? 'border-blue-500 bg-blue-500'
										: 'border-white bg-black/50'} transition-colors hover:bg-black/70"
								>
									{#if selectedImages.includes(imageUrl)}
										<svg
											class="h-4 w-4 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									{/if}
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Action menu for selected images -->
		{#if showActionMenu}
			<div
				class="fixed right-0 bottom-0 left-0 z-40 border-t border-white/20 bg-black/90 backdrop-blur-sm"
				style="padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px)); margin-bottom: env(safe-area-inset-bottom, 0px)"
			>
				<div class="container mx-auto px-4 py-4">
					<div class="flex items-center justify-between">
						<div class="text-white">
							{selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
						</div>
						<div class="flex gap-2">
							<button
								on:click={unselectAll}
								class="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
							>
								Unselect All
							</button>
							<button
								on:click={deleteSelectedImages}
								class="rounded-lg bg-red-500/80 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Fullscreen image viewer -->
	{#if fullscreenImage}
		<div
			class="fixed inset-0 z-50 bg-black"
			on:click={closeFullscreen}
			on:keydown={(e) => e.key === 'Escape' && closeFullscreen()}
			tabindex="-1"
			role="button"
			aria-label="Close fullscreen view"
		>
			<!-- Close button -->
			<button
				on:click|stopPropagation={closeFullscreen}
				class="absolute top-4 right-4 z-10 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
				aria-label="Close fullscreen view"
			>
				Close
			</button>

			<!-- Fullscreen image -->
			<div
				class="flex h-full w-full items-center justify-center p-4"
				on:click|stopPropagation={() => {}}
				on:keydown|stopPropagation={() => {}}
				role="presentation"
			>
				<img
					src={fullscreenImage}
					alt="Fullscreen view"
					class="max-h-full max-w-full object-contain"
				/>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Ensure smooth scrolling on mobile */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
