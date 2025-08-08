<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth, storage } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import {
		ref,
		listAll,
		getDownloadURL,
		deleteObject,
		type StorageReference
	} from 'firebase/storage';
	import type { User } from 'firebase/auth';

	let user: User | null = null;
	let imageRefs: StorageReference[] = [];
	let currentImageIndex = 0;
	let currentImageUrl = '';
	let loading = true;
	let error = '';
	let intervalId: NodeJS.Timeout | null = null;
	let loadingNext = false;
	let showControls = false;
	let showDeleteConfirm = false;
	let deleting = false;

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
		}, 10000);
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

			case 'Enter':
			case 'c':
			case 'C':
				toggleControls();
				break;
		}
	}

	function showDeleteDialog() {
		showDeleteConfirm = true;
	}

	function hideDeleteDialog() {
		showDeleteConfirm = false;
	}

	async function deleteCurrentImage() {
		if (!user || imageRefs.length === 0) return;

		try {
			deleting = true;
			const currentRef = imageRefs[currentImageIndex];

			// Delete from Firebase Storage
			await deleteObject(currentRef);

			// Remove from local array
			imageRefs = imageRefs.filter((_, index) => index !== currentImageIndex);

			// Adjust current index if needed
			if (currentImageIndex >= imageRefs.length) {
				currentImageIndex = Math.max(0, imageRefs.length - 1);
			}

			// Load the new current image or handle empty state
			if (imageRefs.length > 0) {
				await loadCurrentImage();
			} else {
				currentImageUrl = '';
				error = 'No images found. Please upload some images first.';
			}

			hideDeleteDialog();
		} catch (err) {
			console.error('Error deleting image:', err);
			alert('Failed to delete image. Please try again.');
		} finally {
			deleting = false;
		}
	}

	function toggleControls() {
		showControls = !showControls;
	}

	function handleScreenClick(event: MouseEvent) {
		// Don't toggle if clicking on a button
		if ((event.target as HTMLElement).closest('button')) {
			return;
		}
		toggleControls();
	}

	function handleScreenKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			toggleControls();
		}
	}
	let frameElement;
	let imageElement;

	function calculateOptimalPadding() {
		if (!frameElement || !imageElement || !currentImageUrl) return;

		const frameWidth = window.innerWidth;
		const frameHeight = window.innerHeight;

		// Create a temporary image to get natural dimensions
		const tempImg = new Image();
		tempImg.onload = function () {
			const imageAspectRatio = this.naturalWidth / this.naturalHeight;
			const screenAspectRatio = frameWidth / frameHeight;

			let paddingTop, paddingRight, paddingBottom, paddingLeft;

			if (imageAspectRatio > screenAspectRatio) {
				// Image is wider - use minimum horizontal padding, expand vertical padding
				paddingLeft = paddingRight = 100;
				const imageWidth = frameWidth - 200;
				const imageHeight = imageWidth / imageAspectRatio;
				const totalVerticalPadding = frameHeight - imageHeight;
				paddingTop = paddingBottom = Math.max(100, totalVerticalPadding / 2);
			} else {
				// Image is taller - use minimum vertical padding, expand horizontal padding
				paddingTop = paddingBottom = 100;
				const imageHeight = frameHeight - 200;
				const imageWidth = imageHeight * imageAspectRatio;
				const totalHorizontalPadding = frameWidth - imageWidth;
				paddingLeft = paddingRight = Math.max(100, totalHorizontalPadding / 2);
			}

			// Apply the calculated padding
			if (frameElement) {
				frameElement.style.paddingTop = `${paddingTop}px`;
				frameElement.style.paddingRight = `${paddingRight}px`;
				frameElement.style.paddingBottom = `${paddingBottom}px`;
				frameElement.style.paddingLeft = `${paddingLeft}px`;
			}
		};
		tempImg.src = currentImageUrl;
	}

	// Watch for image changes and recalculate padding
	$: if (currentImageUrl && frameElement) {
		setTimeout(calculateOptimalPadding, 100);
	}

	// Recalculate on window resize
	function handleResize() {
		if (currentImageUrl && frameElement) {
			setTimeout(calculateOptimalPadding, 100);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} on:resize={handleResize} />

<div
	class="fixed inset-0 flex flex-col bg-black"
	on:click={handleScreenClick}
	on:keydown={handleScreenKeydown}
	role="button"
	tabindex="0"
>
	<!-- Back button (top-left) -->
	{#if imageRefs.length > 0 && showControls}
		<button
			class="btn btn-circle btn-ghost hover:bg-opacity-20 fixed top-4 left-4 z-20 bg-gray-200 text-gray-700 hover:bg-gray-300"
			on:click={goBack}
			aria-label="Go back to main menu"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"
				/>
			</svg>
		</button>
	{/if}

	<!-- Navigation buttons (top-right) -->
	{#if imageRefs.length > 0 && showControls}
		<div class="fixed top-4 right-4 z-20 flex space-x-2">
			<!-- Previous button -->
			<button
				class="btn btn-circle btn-ghost hover:bg-opacity-20 bg-gray-200 text-gray-700 hover:bg-gray-300"
				on:click={previousImage}
				aria-label="Previous image"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<!-- Next button -->
			<button
				class="btn btn-circle btn-ghost hover:bg-opacity-20 bg-gray-200 text-gray-700 hover:bg-gray-300"
				on:click={nextImage}
				aria-label="Next image"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	{/if}

	<!-- Delete button (top center) -->
	{#if imageRefs.length > 0 && showControls}
		<button
			class="btn btn-circle btn-ghost hover:bg-opacity-20 fixed top-4 left-1/2 z-20 -translate-x-1/2 transform bg-gray-200 text-gray-700 hover:bg-gray-300"
			on:click={showDeleteDialog}
			aria-label="Delete current image"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
		</button>
	{/if}

	<!-- Delete confirmation dialog -->
	{#if showDeleteConfirm}
		<div class="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
			<div class="mx-4 max-w-md rounded-lg bg-white p-6 shadow-xl">
				<h3 class="mb-4 text-lg font-bold text-gray-900">Delete Image</h3>
				<p class="mb-6 text-gray-700">
					Are you sure you want to delete this image? This action cannot be undone.
				</p>
				<div class="flex justify-end space-x-3">
					<button
						class="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
						on:click={hideDeleteDialog}
						disabled={deleting}
					>
						Cancel
					</button>
					<button
						class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
						on:click={deleteCurrentImage}
						disabled={deleting}
					>
						{#if deleting}
							<span class="loading loading-spinner loading-sm"></span>
							Deleting...
						{:else}
							Delete
						{/if}
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Main content area -->
	<div class="absolute inset-0 flex items-center justify-center">
		{#if loading}
			<div class="loading loading-spinner loading-lg"></div>
		{:else if error}
			<button class="btn btn-primary" on:click={goBack}>Upload Images through phone app</button>
		{:else if imageRefs.length > 0}
			<div class="absolute inset-0 flex items-center justify-center p-8">
				{#if loadingNext}
					<div class="loading loading-spinner loading-lg"></div>
				{:else if currentImageUrl}
					<!-- Picture frame container -->
					<div class="picture-frame" bind:this={frameElement}>
						<img src={currentImageUrl} alt="" class="framed-image" bind:this={imageElement} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.picture-frame {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 100px;
		background-color: #fafafa;
		border: 1px solid #e5e5e5;
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.1),
			0 4px 8px rgba(0, 0, 0, 0.15),
			0 8px 16px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.8),
			inset 0 -1px 0 rgba(0, 0, 0, 0.05);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}

	.picture-frame::before {
		content: '';
		position: absolute;
		top: 50px;
		left: 50px;
		right: 50px;
		bottom: 50px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		pointer-events: none;
	}

	.framed-image {
		display: block;
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
</style>
