<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, type User } from 'firebase/auth';
	import { handleSlideshowKeydown } from '$lib/utils/slideshowUtils';
	import { isEchoShow } from '$lib/advancedDeviceDetection';
	import {
		createInitialSlideshowState,
		loadImageList,
		loadCurrentImage,
		createSlideshowManager,
		handleNextImage,
		handlePreviousImage,
		refreshImageList,
		handleDeleteCurrentImage,
		showDeleteDialog,
		hideDeleteDialog,
		handleScreenClick,
		handleScreenKeydown,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		type SlideshowActions
	} from '$lib/utils/slideshowStateUtils';
	import { createFrameManager, ReactiveFrameUpdater } from '$lib/utils/frameUtils';
	import { collectionStore } from '$lib/stores/collectionStore';
	import { CollectionService } from '$lib/collectionService';
	import { imagePreloader } from '$lib/utils/imagePreloader';
	import SlideshowControls from './SlideshowControls.svelte';
	import DeleteConfirmDialog from './DeleteConfirmDialog.svelte';
	import SlideshowDisplay from './SlideshowDisplay.svelte';
	import TouchDebug from './TouchDebug.svelte';

	// Configuration
	let slideshowIntervalMs = 30000; // Default 30 seconds
	let slideshowTheme: 'light' | 'dark' = 'light';

	let state = createInitialSlideshowState();
	let frameElement: HTMLElement | undefined;
	let slideshowManager = createSlideshowManager();
	let frameManager = createFrameManager();
	let frameUpdater = new ReactiveFrameUpdater();
	let isEchoShowDevice = false;
	let showTouchHint = false;
	let hasShownTouchHint = false;
	let showTouchDebug = false;

	const actions: SlideshowActions = {
		setUser: (user) => {
			state = { ...state, user };
		},
		setImageRefs: (refs) => {
			state = { ...state, imageRefs: refs };
		},
		setCurrentImageIndex: (index) => {
			state = { ...state, currentImageIndex: index };
		},
		setCurrentImageUrl: (url) => {
			state = { ...state, currentImageUrl: url };
		},
		setLoading: (loading) => {
			state = { ...state, loading };
		},
		setError: (error) => {
			state = { ...state, error };
		},
		setLoadingNext: (loading) => {
			state = { ...state, loadingNext: loading };
		},
		setShowControls: (show) => {
			state = { ...state, showControls: show };
		},
		setShowDeleteConfirm: (show) => {
			state = { ...state, showDeleteConfirm: show };
		},
		setDeleting: (deleting) => {
			state = { ...state, deleting };
		},
		setCurrentCollectionUuid: (uuid) => {
			state = { ...state, currentCollectionUuid: uuid };
		}
	};

	// Initialize auth listener and frame manager
	let unsubscribeAuth: (() => void) | undefined;

	onMount(async () => {
		frameManager.startListening();

		// Detect if this is an Echo Show device
		isEchoShowDevice = await isEchoShow();

		// Check if we should show touch hints
		if (isEchoShowDevice && typeof localStorage !== 'undefined') {
			hasShownTouchHint = localStorage.getItem('touchHintShown') === 'true';
		}

		unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
			actions.setUser(u);
			if (u) {
				await initializeCollectionAndLoadImages(u);
			} else {
				goto('/');
			}
		});
	});

	onDestroy(() => {
		slideshowManager.stop();
		frameManager.stopListening();
		frameUpdater.cancel();
		imagePreloader.clearCache();
		if (unsubscribeAuth) {
			unsubscribeAuth();
		}
	});

	// Update frame when image changes
	$: if (state.currentImageUrl && frameElement) {
		frameUpdater.updateFrame(state.currentImageUrl, frameElement);
	}

	async function initializeCollectionAndLoadImages(user: User) {
		try {
			// Load user collections
			const collections = await CollectionService.getUserCollections(user);
			collectionStore.setCollections(collections, user.uid);

			// Get the selected collection UUID from the store, or use primary if none selected
			let selectedUuid: string = $collectionStore.selectedCollectionUuid;

			// Try to restore from localStorage if not already set
			if (!selectedUuid) {
				const storedUuid = collectionStore.getStoredSelection(user.uid);
				if (storedUuid) {
					selectedUuid = storedUuid;
				}
			}

			// Verify the stored selection is valid
			if (selectedUuid && !collections.some((c) => c.uuid === selectedUuid)) {
				selectedUuid = '';
			}

			// If no valid stored selection, use primary collection
			if (!selectedUuid) {
				selectedUuid = await CollectionService.getPrimaryCollection(user);
			}

			collectionStore.setSelectedCollection(selectedUuid, user.uid);

			// Load theme first to avoid flash
			await updateSlideshowTheme(selectedUuid);

			// Load images for the selected collection
			await loadImages(selectedUuid);
		} catch (error) {
			console.error('Error initializing collection and loading images:', error);
			actions.setError('Failed to load slideshow data. Please try again.');
		}
	}

	async function loadImages(collectionUuid?: string) {
		const uuid = collectionUuid || state.currentCollectionUuid;
		const result = await loadImageList(state.user, actions, uuid);
		if (result.success && result.imageRefs) {
			await updateSlideshowInterval(uuid);

			// Check for starting index from sessionStorage (e.g., from Review Photos)
			let startIndex = 0;
			if (typeof window !== 'undefined') {
				const storedIndex = sessionStorage.getItem('slideshowStartIndex');
				if (storedIndex) {
					startIndex = parseInt(storedIndex, 10);
					// Ensure index is valid
					if (startIndex >= result.imageRefs.length || startIndex < 0) {
						startIndex = 0;
					}
					// Clear the stored index
					sessionStorage.removeItem('slideshowStartIndex');
				}
			}

			await loadCurrentImage(result.imageRefs, startIndex, actions);
			startSlideshow();
		}
	}

	async function refreshImages() {
		const currentUuid = $collectionStore.selectedCollectionUuid || state.currentCollectionUuid;
		await refreshImageList(state.imageRefs, currentUuid, actions);
		// Also check if collection time setting has changed
		await updateSlideshowInterval(currentUuid);
		await updateSlideshowTheme(currentUuid);
	}

	async function updateSlideshowInterval(collectionUuid: string) {
		if (!state.user) return;

		try {
			const collection = await CollectionService.getCollectionInfo(state.user, collectionUuid);
			if (collection?.time && collection.time > 0) {
				// Convert seconds to milliseconds
				slideshowIntervalMs = collection.time * 1000;
			} else {
				// Use default 30 seconds
				slideshowIntervalMs = 30000;
			}
		} catch (error) {
			console.error('Error getting collection time setting:', error);
			slideshowIntervalMs = 30000; // Fallback to default
		}
	}

	async function updateSlideshowTheme(collectionUuid: string) {
		if (!state.user) return;

		try {
			const collection = await CollectionService.getCollectionInfo(state.user, collectionUuid);
			if (collection?.theme) {
				slideshowTheme = collection.theme;
			} else {
				// Use default light theme
				slideshowTheme = 'light';
			}
		} catch (error) {
			console.error('Error getting collection theme setting:', error);
			slideshowTheme = 'light'; // Fallback to default
		}
	}

	function startSlideshow() {
		if (state.imageRefs.length === 0) return;

		slideshowManager.start(async () => {
			await handleNextImage(state, actions, refreshImages);
		}, slideshowIntervalMs);
	}

	function goBack() {
		goto('/');
	}

	async function nextImage() {
		await handleNextImage(state, actions, refreshImages);
		startSlideshow(); // Restart with correct interval
	}

	async function previousImage() {
		await handlePreviousImage(state, actions);
		startSlideshow(); // Restart with correct interval
	}

	function handleKeydown(event: KeyboardEvent) {
		handleSlideshowKeydown(event, {
			onNext: nextImage,
			onPrevious: previousImage,
			onBack: goBack,
			onToggleControls: toggleControls
		});
	}

	function onShowDeleteDialog() {
		showDeleteDialog(actions);
	}

	function onHideDeleteDialog() {
		hideDeleteDialog(actions);
	}

	async function deleteCurrentImage() {
		const result = await handleDeleteCurrentImage(state, actions);
		if (!result.success && result.error) {
			alert(result.error);
		}
	}

	function toggleControls() {
		actions.setShowControls(!state.showControls);
	}

	function onScreenClick(event: MouseEvent) {
		handleScreenClick(event, state.showControls, actions);
	}

	function onScreenKeydown(event: KeyboardEvent) {
		handleScreenKeydown(event, state.showControls, actions);
	}

	function onTouchStart(event: TouchEvent) {
		handleTouchStart(event);
	}

	function onTouchMove(event: TouchEvent) {
		handleTouchMove(event);
	}

	function onTouchEnd(event: TouchEvent) {
		handleTouchEnd(event, state.showControls, actions, nextImage, previousImage);

		// Show touch hint for Echo Show users on first touch
		if (isEchoShowDevice && !hasShownTouchHint && !state.showControls) {
			showTouchHint = true;
			hasShownTouchHint = true;
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('touchHintShown', 'true');
			}

			// Hide hint after 3 seconds
			setTimeout(() => {
				showTouchHint = false;
			}, 3000);
		}
	}

	function toggleTouchDebug() {
		showTouchDebug = !showTouchDebug;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 flex flex-col {slideshowTheme === 'dark' ? 'bg-black' : 'bg-[#f0f0f0]'}"
	onclick={onScreenClick}
	onkeydown={onScreenKeydown}
	ontouchstart={onTouchStart}
	ontouchmove={onTouchMove}
	ontouchend={onTouchEnd}
	role="button"
	tabindex="0"
	style="touch-action: manipulation; -webkit-touch-callout: none; -webkit-user-select: none;"
>
	{#if state.imageRefs.length > 0}
		<SlideshowControls
			showControls={state.showControls}
			onGoBack={goBack}
			onPrevious={previousImage}
			onNext={nextImage}
			onDelete={onShowDeleteDialog}
		/>
	{/if}

	<DeleteConfirmDialog
		showDialog={state.showDeleteConfirm}
		isDeleting={state.deleting}
		onConfirm={deleteCurrentImage}
		onCancel={onHideDeleteDialog}
	/>

	<SlideshowDisplay
		loading={state.loading}
		error={state.error}
		imageRefs={state.imageRefs}
		currentImageUrl={state.currentImageUrl}
		theme={slideshowTheme}
		onGoBack={goBack}
	/>

	<!-- Touch hints for Echo Show devices -->
	{#if isEchoShowDevice && showTouchHint}
		<div class="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
			<div
				class="rounded-lg bg-black/70 px-6 py-4 text-white backdrop-blur-sm transition-opacity duration-300"
				class:opacity-100={showTouchHint}
			>
				<p class="text-center text-lg font-medium">Touch Navigation Enabled</p>
				<p class="mt-1 text-center text-sm opacity-80">
					• Tap anywhere to show/hide controls<br />
					• Swipe left for next image<br />
					• Swipe right for previous image
				</p>
			</div>
		</div>
	{/if}

	<!-- Touch Debug Component (only show on Echo Show) -->
	{#if isEchoShowDevice}
		<TouchDebug visible={showTouchDebug} />

		<!-- Debug toggle button -->
		<button
			class="fixed bottom-4 left-4 z-40 rounded-full bg-blue-600 px-3 py-2 text-xs text-white shadow-lg hover:bg-blue-700"
			onclick={toggleTouchDebug}
		>
			{showTouchDebug ? 'Hide' : 'Show'} Debug
		</button>
	{/if}
</div>
