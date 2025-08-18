<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, type User } from 'firebase/auth';
	import { handleSlideshowKeydown } from '$lib/utils/slideshowUtils';
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
		type SlideshowActions
	} from '$lib/utils/slideshowStateUtils';
	import { createFrameManager, ReactiveFrameUpdater } from '$lib/utils/frameUtils';
	import { collectionStore } from '$lib/stores/collectionStore';
	import { CollectionService } from '$lib/collectionService';
	import SlideshowControls from './SlideshowControls.svelte';
	import DeleteConfirmDialog from './DeleteConfirmDialog.svelte';
	import SlideshowDisplay from './SlideshowDisplay.svelte';

	let state = createInitialSlideshowState();
	let frameElement: HTMLElement | undefined;
	let slideshowManager = createSlideshowManager();
	let frameManager = createFrameManager();
	let frameUpdater = new ReactiveFrameUpdater();

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

	onMount(() => {
		frameManager.startListening();

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
			await loadCurrentImage(result.imageRefs, 0, actions);
			startSlideshow();
		}
	}

	async function refreshImages() {
		const currentUuid = $collectionStore.selectedCollectionUuid || state.currentCollectionUuid;
		await refreshImageList(state.imageRefs, currentUuid, actions);
	}

	function startSlideshow() {
		if (state.imageRefs.length === 0) return;

		slideshowManager.start(async () => {
			await handleNextImage(state, actions, refreshImages);
		}, 10000);
	}

	function goBack() {
		goto('/');
	}

	async function nextImage() {
		await handleNextImage(state, actions, refreshImages);
	}

	async function previousImage() {
		await handlePreviousImage(state, actions);
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
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 flex flex-col bg-black"
	onclick={onScreenClick}
	onkeydown={onScreenKeydown}
	role="button"
	tabindex="0"
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
		loadingNext={state.loadingNext}
		currentImageUrl={state.currentImageUrl}
		onGoBack={goBack}
	/>
</div>
