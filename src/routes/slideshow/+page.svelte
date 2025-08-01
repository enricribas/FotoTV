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
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed inset-0 flex flex-col bg-black">
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
