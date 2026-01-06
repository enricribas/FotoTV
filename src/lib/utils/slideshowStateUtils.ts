import type { User } from 'firebase/auth';
import type { StorageReference } from 'firebase/storage';
import { CollectionService } from '$lib/collectionService';
import {
	loadCollectionImageRefs,
	getImageUrl,
	deleteImage,
	removeImageFromList,
	checkForImageUpdates
} from './storageUtils';
import {
	getNextImageIndex,
	getPreviousImageIndex,
	adjustIndexAfterDeletion,
	createSlideshowInterval
} from './slideshowUtils';
import { imagePreloader } from './imagePreloader';

export interface SlideshowState {
	user: User | null;
	imageRefs: StorageReference[];
	currentImageIndex: number;
	currentImageUrl: string;
	loading: boolean;
	error: string;
	loadingNext: boolean;
	showControls: boolean;
	showDeleteConfirm: boolean;
	deleting: boolean;
	currentCollectionUuid: string;
}

export interface SlideshowActions {
	setUser: (user: User | null) => void;
	setImageRefs: (refs: StorageReference[]) => void;
	setCurrentImageIndex: (index: number) => void;
	setCurrentImageUrl: (url: string) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string) => void;
	setLoadingNext: (loading: boolean) => void;
	setShowControls: (show: boolean) => void;
	setShowDeleteConfirm: (show: boolean) => void;
	setDeleting: (deleting: boolean) => void;
	setCurrentCollectionUuid: (uuid: string) => void;
}

/**
 * Creates initial slideshow state
 */
export function createInitialSlideshowState(): SlideshowState {
	return {
		user: null,
		imageRefs: [],
		currentImageIndex: 0,
		currentImageUrl: '',
		loading: true,
		error: '',
		loadingNext: false,
		showControls: false,
		showDeleteConfirm: false,
		deleting: false,
		currentCollectionUuid: ''
	};
}

/**
 * Loads the image list for the current user
 */
export async function loadImageList(
	user: User | null,
	actions: SlideshowActions,
	collectionUuid?: string
): Promise<{ success: boolean; imageRefs?: StorageReference[] }> {
	if (!user) return { success: false };

	try {
		actions.setLoading(true);
		actions.setError('');

		const currentCollectionUuid =
			collectionUuid || (await CollectionService.getPrimaryCollection(user));
		actions.setCurrentCollectionUuid(currentCollectionUuid);

		const result = await loadCollectionImageRefs(currentCollectionUuid);

		if (result.error) {
			actions.setError(result.error);
			return { success: false };
		}

		actions.setImageRefs(result.imageRefs);

		if (result.imageRefs.length === 0) {
			actions.setError('No images found. Please upload some images first.');
			return { success: false };
		}

		// Start preloading first few images in background
		if (result.imageRefs.length > 0) {
			const initialPreloadCount = Math.min(3, result.imageRefs.length);
			const imagesToPreload = result.imageRefs.slice(0, initialPreloadCount);
			imagePreloader
				.preloadImages(imagesToPreload)
				.catch((err) => console.warn('Failed to preload initial images:', err));
		}

		return { success: true, imageRefs: result.imageRefs };
	} catch (err) {
		console.error('Error loading image list:', err);
		actions.setError('Failed to load images. Please try again.');
		return { success: false };
	} finally {
		actions.setLoading(false);
	}
}

/**
 * Loads the current image based on the current index
 */
export async function loadCurrentImage(
	imageRefs: StorageReference[],
	currentImageIndex: number,
	actions: SlideshowActions
): Promise<{ success: boolean; url?: string }> {
	if (imageRefs.length === 0) return { success: false };

	try {
		actions.setLoadingNext(true);
		const imageRef = imageRefs[currentImageIndex];

		// Check if image is already preloaded
		const preloadedUrl = imagePreloader.getPreloadedImage(imageRef);
		if (preloadedUrl) {
			actions.setCurrentImageUrl(preloadedUrl);
			// Start preloading adjacent images in background
			imagePreloader
				.preloadAdjacent(imageRefs, currentImageIndex)
				.catch((err) => console.warn('Failed to preload adjacent images:', err));
			return { success: true, url: preloadedUrl };
		}

		// Load image normally if not preloaded
		const result = await getImageUrl(imageRef);

		if (result.error) {
			console.error('Error loading current image:', result.error);
			return { success: false };
		}

		actions.setCurrentImageUrl(result.url);

		// Start preloading adjacent images in background
		imagePreloader
			.preloadAdjacent(imageRefs, currentImageIndex)
			.catch((err) => console.warn('Failed to preload adjacent images:', err));

		return { success: true, url: result.url };
	} catch (err) {
		console.error('Error loading current image:', err);
		return { success: false };
	} finally {
		actions.setLoadingNext(false);
	}
}

/**
 * Manages slideshow interval creation and cleanup
 */
export function createSlideshowManager() {
	let cleanup: (() => void) | null = null;

	return {
		start: (nextImageCallback: () => Promise<void>, intervalMs: number = 10000) => {
			if (cleanup) {
				cleanup();
			}

			const { cleanup: intervalCleanup } = createSlideshowInterval(nextImageCallback, intervalMs);
			cleanup = intervalCleanup;
		},
		stop: () => {
			if (cleanup) {
				cleanup();
				cleanup = null;
			}
		},
		isRunning: () => cleanup !== null
	};
}

/**
 * Handles moving to the next image in the slideshow
 */
export async function handleNextImage(
	state: SlideshowState,
	actions: SlideshowActions,
	refreshCallback?: () => Promise<void>
): Promise<void> {
	if (state.imageRefs.length === 0) return;

	if (refreshCallback) {
		await refreshCallback();
	}

	const nextIndex = getNextImageIndex(state.currentImageIndex, state.imageRefs.length);
	actions.setCurrentImageIndex(nextIndex);

	// Preload the next image if not already cached
	const nextImageRef = state.imageRefs[nextIndex];
	if (!imagePreloader.isCached(nextImageRef)) {
		imagePreloader
			.preloadImage(nextImageRef)
			.catch((err) => console.warn('Failed to preload next image:', err));
	}

	await loadCurrentImage(state.imageRefs, nextIndex, actions);
}

/**
 * Handles moving to the previous image in the slideshow
 */
export async function handlePreviousImage(
	state: SlideshowState,
	actions: SlideshowActions
): Promise<void> {
	if (state.imageRefs.length === 0) return;

	const prevIndex = getPreviousImageIndex(state.currentImageIndex, state.imageRefs.length);
	actions.setCurrentImageIndex(prevIndex);

	// Preload the previous image if not already cached
	const prevImageRef = state.imageRefs[prevIndex];
	if (!imagePreloader.isCached(prevImageRef)) {
		imagePreloader
			.preloadImage(prevImageRef)
			.catch((err) => console.warn('Failed to preload previous image:', err));
	}

	await loadCurrentImage(state.imageRefs, prevIndex, actions);
}

/**
 * Refreshes the image list to check for updates
 */
export async function refreshImageList(
	currentImageRefs: StorageReference[],
	collectionUuid: string,
	actions: SlideshowActions
): Promise<{ hasUpdates: boolean; newRefs?: StorageReference[] }> {
	if (!collectionUuid) return { hasUpdates: false };

	try {
		const result = await checkForImageUpdates(currentImageRefs, collectionUuid);
		if (result.hasUpdates && result.newRefs) {
			actions.setImageRefs(result.newRefs);
			return { hasUpdates: true, newRefs: result.newRefs };
		}
		return { hasUpdates: false };
	} catch (err) {
		console.error('Error refreshing image list:', err);
		return { hasUpdates: false };
	}
}

/**
 * Handles deleting the current image
 */
export async function handleDeleteCurrentImage(
	state: SlideshowState,
	actions: SlideshowActions
): Promise<{ success: boolean; error?: string }> {
	if (!state.user || state.imageRefs.length === 0) {
		return { success: false, error: 'No user or images available' };
	}

	try {
		actions.setDeleting(true);
		const currentRef = state.imageRefs[state.currentImageIndex];

		const result = await deleteImage(currentRef);

		if (!result.success) {
			return { success: false, error: result.error || 'Failed to delete image' };
		}

		const newImageRefs = removeImageFromList(state.imageRefs, state.currentImageIndex);
		const newIndex = adjustIndexAfterDeletion(state.currentImageIndex, newImageRefs.length);

		actions.setImageRefs(newImageRefs);
		actions.setCurrentImageIndex(newIndex);

		if (newImageRefs.length > 0) {
			await loadCurrentImage(newImageRefs, newIndex, actions);
		} else {
			actions.setCurrentImageUrl('');
			actions.setError('No images found. Please upload some images first.');
		}

		actions.setShowDeleteConfirm(false);
		return { success: true };
	} catch (err) {
		console.error('Error deleting image:', err);
		return { success: false, error: 'Failed to delete image. Please try again.' };
	} finally {
		actions.setDeleting(false);
	}
}

/**
 * Toggles the visibility of slideshow controls
 */
export function toggleControls(currentShowControls: boolean, actions: SlideshowActions): void {
	actions.setShowControls(!currentShowControls);
}

/**
 * Shows the delete confirmation dialog
 */
export function showDeleteDialog(actions: SlideshowActions): void {
	actions.setShowDeleteConfirm(true);
}

/**
 * Hides the delete confirmation dialog
 */
export function hideDeleteDialog(actions: SlideshowActions): void {
	actions.setShowDeleteConfirm(false);
}

/**
 * Handles screen click interactions (excluding buttons)
 */
export function handleScreenClick(
	event: MouseEvent,
	currentShowControls: boolean,
	actions: SlideshowActions
): void {
	if ((event.target as HTMLElement).closest('button')) {
		return;
	}
	toggleControls(currentShowControls, actions);
}

/**
 * Touch event tracking state
 */
interface TouchState {
	startX: number;
	startY: number;
	startTime: number;
	moved: boolean;
}

let touchState: TouchState | null = null;

/**
 * Handles touch start events
 */
export function handleTouchStart(event: TouchEvent): void {
	if (event.touches.length !== 1) return;

	const touch = event.touches[0];
	touchState = {
		startX: touch.clientX,
		startY: touch.clientY,
		startTime: Date.now(),
		moved: false
	};
}

/**
 * Handles touch move events
 */
export function handleTouchMove(event: TouchEvent): void {
	if (!touchState || event.touches.length !== 1) return;

	const touch = event.touches[0];
	const deltaX = Math.abs(touch.clientX - touchState.startX);
	const deltaY = Math.abs(touch.clientY - touchState.startY);

	// If moved more than 10px, consider it a move gesture
	if (deltaX > 10 || deltaY > 10) {
		touchState.moved = true;
	}
}

/**
 * Handles touch end events with swipe detection
 */
export function handleTouchEnd(
	event: TouchEvent,
	currentShowControls: boolean,
	actions: SlideshowActions,
	onNext?: () => void,
	onPrevious?: () => void
): void {
	if (!touchState || event.changedTouches.length !== 1) {
		touchState = null;
		return;
	}

	const touch = event.changedTouches[0];
	const deltaX = touch.clientX - touchState.startX;
	const deltaY = touch.clientY - touchState.startY;
	const deltaTime = Date.now() - touchState.startTime;
	const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	// Don't handle if touch target is a button
	if ((event.target as HTMLElement).closest('button')) {
		touchState = null;
		return;
	}

	// Swipe detection: minimum 50px distance, maximum 500ms time, primarily horizontal
	const isSwipe = distance > 50 && deltaTime < 500 && Math.abs(deltaX) > Math.abs(deltaY) * 2;

	if (isSwipe) {
		if (deltaX > 0 && onPrevious) {
			// Swipe right = previous image
			onPrevious();
		} else if (deltaX < 0 && onNext) {
			// Swipe left = next image
			onNext();
		}
	} else if (!touchState.moved && deltaTime < 300) {
		// Quick tap without movement = toggle controls
		toggleControls(currentShowControls, actions);
	}

	touchState = null;
}

/**
 * Handles screen keyboard interactions
 */
export function handleScreenKeydown(
	event: KeyboardEvent,
	currentShowControls: boolean,
	actions: SlideshowActions
): void {
	if (event.key === 'Enter') {
		toggleControls(currentShowControls, actions);
	}
}
