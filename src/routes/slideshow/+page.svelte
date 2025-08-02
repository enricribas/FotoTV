<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth, storage } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { ref, listAll, getDownloadURL, type StorageReference } from 'firebase/storage';
	import type { User } from 'firebase/auth';

	let user: User | null = null;
	let imageRefs: StorageReference[] = [];
	let currentImageIndex = 0;
	let currentImageUrl = '';
	let loading = true;
	let error = '';
	let intervalId: NodeJS.Timeout | null = null;
	let loadingNext = false;

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, async (u) => {
			user = u;
			if (u) {
				await loadImageList();
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

	async function loadImageList() {
		if (!user) return;

		try {
			loading = true;
			const userRef = ref(storage, `images/${user.uid}`);
			const result = await listAll(userRef);

			// Sort items by name (which includes timestamp)
			imageRefs = result.items.sort((a, b) => a.name.localeCompare(b.name));

			if (imageRefs.length > 0) {
				await loadCurrentImage();
				startSlideshow();
			} else {
				error = 'No images found. Please upload some images first.';
			}
		} catch (err) {
			console.error('Error loading image list:', err);
			error = 'Failed to load images. Please try again.';
		} finally {
			loading = false;
		}
	}

	async function loadCurrentImage() {
		if (imageRefs.length === 0) return;

		try {
			loadingNext = true;
			const imageRef = imageRefs[currentImageIndex];
			currentImageUrl = await getDownloadURL(imageRef);
		} catch (err) {
			console.error('Error loading current image:', err);
		} finally {
			loadingNext = false;
		}
	}

	function startSlideshow() {
		if (imageRefs.length === 0) return;

		// Clear any existing interval
		if (intervalId) {
			clearInterval(intervalId);
		}

		// Start the slideshow
		intervalId = setInterval(async () => {
			await nextImage();
		}, 5000);
	}

	function goBack() {
		goto('/');
	}

	async function nextImage() {
		if (imageRefs.length > 0) {
			// Refresh the image list to check for new images
			await refreshImageList();
			currentImageIndex = (currentImageIndex + 1) % imageRefs.length;
			await loadCurrentImage();
		}
	}

	async function previousImage() {
		if (imageRefs.length > 0) {
			currentImageIndex = currentImageIndex === 0 ? imageRefs.length - 1 : currentImageIndex - 1;
			await loadCurrentImage();
		}
	}

	async function refreshImageList() {
		if (!user) return;

		try {
			const userRef = ref(storage, `images/${user.uid}`);
			const result = await listAll(userRef);
			const newImageRefs = result.items.sort((a, b) => a.name.localeCompare(b.name));

			// If we have new images, update the list
			if (newImageRefs.length !== imageRefs.length) {
				imageRefs = newImageRefs;
			}
		} catch (err) {
			console.error('Error refreshing image list:', err);
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
		await loadImageList();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed inset-0 flex flex-col bg-black">
	<!-- Refresh button -->
	{#if imageRefs.length > 0}
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
		{:else if imageRefs.length > 0}
			<div class="relative flex h-full w-full items-center justify-center">
				{#if loadingNext}
					<div class="loading loading-spinner loading-lg"></div>
				{:else if currentImageUrl}
					<img src={currentImageUrl} alt="" class="max-h-full max-w-full object-contain" />
				{/if}
			</div>
		{/if}
	</div>
</div>
