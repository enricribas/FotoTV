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
	let collectionStoreState: any;
	let unsubscribeStore: (() => void) | undefined;

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

	function handleImageClick(imageUrl: string, index: number) {
		// Store the image index in session storage for the slideshow to pick up
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('slideshowStartIndex', index.toString());
		}
		goto('/slideshow');
	}
</script>

<div class="min-h-screen bg-black">
	<!-- Header with close button -->
	<div class="fixed top-0 right-0 left-0 z-50 bg-black/80 backdrop-blur-sm">
		<div class="flex items-center justify-between px-4 py-3 sm:px-6">
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
	<div class="pt-16 pb-4">
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
			<div class="container mx-auto px-4 sm:px-6">
				<div
					class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
				>
					{#each imageRefs as imageUrl, index}
						<button
							on:click={() => handleImageClick(imageUrl, index)}
							class="group relative aspect-square overflow-hidden rounded-lg bg-gray-900 transition-all hover:ring-2 hover:ring-white/50 focus:ring-2 focus:ring-white focus:outline-none"
							aria-label="View photo {index + 1} of {imageRefs.length} in slideshow"
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
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Ensure smooth scrolling on mobile */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
