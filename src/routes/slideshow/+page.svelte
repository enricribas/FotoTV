<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth, storage } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { ref, listAll, getDownloadURL } from 'firebase/storage';
	import type { User } from 'firebase/auth';

	let user: User | null = null;
	let images: string[] = [];
	let currentImageIndex = 0;
	let loading = true;
	let error = '';
	let intervalId: NodeJS.Timeout | null = null;

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, async (u) => {
			user = u;
			if (u) {
				await loadImages();
			} else {
				goto('/');
			}
		});

		return unsubscribe;
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});

	async function loadImages() {
		if (!user) return;

		try {
			loading = true;
			const userImagesRef = ref(storage, `images/${user.uid}`);
			const result = await listAll(userImagesRef);

			const imageUrls = await Promise.all(
				result.items.map(async (itemRef) => {
					return await getDownloadURL(itemRef);
				})
			);

			images = imageUrls;

			if (images.length > 0) {
				startSlideshow();
			} else {
				error = 'No images found. Please upload some images first.';
			}
		} catch (err) {
			console.error('Error loading images:', err);
			error = 'Failed to load images. Please try again.';
		} finally {
			loading = false;
		}
	}

	function startSlideshow() {
		if (images.length === 0) return;

		// Clear any existing interval
		if (intervalId) {
			clearInterval(intervalId);
		}

		// Start the slideshow
		intervalId = setInterval(() => {
			currentImageIndex = (currentImageIndex + 1) % images.length;
		}, 5000);
	}

	function goBack() {
		goto('/');
	}

	function nextImage() {
		if (images.length > 0) {
			currentImageIndex = (currentImageIndex + 1) % images.length;
		}
	}

	function previousImage() {
		if (images.length > 0) {
			currentImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
		}
	}

	// Keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowRight':
			case ' ':
				nextImage();
				break;
			case 'ArrowLeft':
				previousImage();
				break;
			case 'Escape':
				goBack();
				break;
			case 'r':
			case 'R':
				refreshImages();
				break;
		}
	}

	async function refreshImages() {
		await loadImages();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed inset-0 flex flex-col bg-black">
	<!-- Refresh button -->
	{#if images.length > 0}
		<button
			class="btn btn-circle btn-ghost hover:bg-opacity-20 fixed top-4 right-4 z-20 text-white hover:bg-white"
			on:click={refreshImages}
			aria-label="Refresh images"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
				/>
			</svg>
		</button>
	{/if}

	<!-- Main content area -->
	<div class="flex flex-1 items-center justify-center">
		{#if loading}
			<div class="loading loading-spinner loading-lg"></div>
		{:else if error}
			<button class="btn btn-primary" on:click={goBack}>Go Back</button>
		{:else if images.length > 0}
			<div class="relative flex h-full w-full items-center justify-center">
				<img src={images[currentImageIndex]} alt="" class="max-h-full max-w-full object-contain" />
			</div>
		{/if}
	</div>
</div>
