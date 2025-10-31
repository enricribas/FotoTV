<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { storage } from '$lib/firebase';
	import { ref, listAll, getDownloadURL } from 'firebase/storage';
	import type { StorageReference } from 'firebase/storage';
	import PictureFrame from './PictureFrame.svelte';

	export let collectionUuid: string;
	export let interval: number = 10;
	export let theme: 'light' | 'dark' = 'light';

	let imageRefs: StorageReference[] = [];
	let currentImageIndex = 0;
	let currentImageUrl: string | null = null;
	let loading = true;
	let error = '';
	let intervalId: number;

	async function loadImages() {
		try {
			loading = true;
			const collectionRef = ref(storage, `images/${collectionUuid}`);
			const result = await listAll(collectionRef);

			imageRefs = result.items.filter((item) => {
				const name = item.name.toLowerCase();
				return (
					name.endsWith('.jpg') ||
					name.endsWith('.jpeg') ||
					name.endsWith('.png') ||
					name.endsWith('.gif') ||
					name.endsWith('.webp')
				);
			});

			if (imageRefs.length > 0) {
				await loadCurrentImage();
				startSlideshow();
			} else {
				error = 'No images found in this collection';
			}
		} catch (err) {
			console.error('Error loading images:', err);
			error = 'Failed to load images';
		} finally {
			loading = false;
		}
	}

	async function loadCurrentImage() {
		if (imageRefs.length === 0) return;

		try {
			const imageRef = imageRefs[currentImageIndex];
			currentImageUrl = await getDownloadURL(imageRef);

			// Preload next image
			if (imageRefs.length > 1) {
				const nextIndex = (currentImageIndex + 1) % imageRefs.length;
				const nextImageRef = imageRefs[nextIndex];
				const nextUrl = await getDownloadURL(nextImageRef);
				const img = new Image();
				img.src = nextUrl;
			}
		} catch (err) {
			console.error('Error loading image:', err);
		}
	}

	function startSlideshow() {
		if (intervalId) clearInterval(intervalId);

		intervalId = setInterval(async () => {
			currentImageIndex = (currentImageIndex + 1) % imageRefs.length;
			await loadCurrentImage();
		}, interval * 1000) as unknown as number;
	}

	onMount(() => {
		loadImages();
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<div class="relative h-full w-full">
	{#if loading}
		<div class="absolute inset-0 flex items-center justify-center">
			<svg class="h-16 w-16 animate-spin text-orange-600" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		</div>
	{:else if error}
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="text-center">
				<svg
					class="mx-auto h-24 w-24 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<p class="mt-4 text-lg text-gray-600">{error}</p>
			</div>
		</div>
	{:else if currentImageUrl}
		<div class="absolute inset-0 flex items-center justify-center p-8">
			<PictureFrame imageUrl={currentImageUrl} isLoading={false} theme={theme} />
		</div>

		{#if imageRefs.length > 1}
			<div class="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
				<div class="flex items-center space-x-1">
					<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
					{#each imageRefs as _, index (index)}
						<div
							class="h-1.5 w-1.5 rounded-full transition-colors duration-300 {index ===
							currentImageIndex
								? 'bg-white'
								: 'bg-white/40'}"
						></div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</div>
