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
	actions: SlideshowActions
): Promise<{ success: boolean; imageRefs?: StorageReference[] }> {
	if (!user) return { success: false };

	try {
		actions.setLoading(true);
		actions.setError('');

		const currentCollectionUuid = await CollectionService.getPrimaryCollection(user);
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
		const result = await getImageUrl(imageRef);

		if (result.error) {
			console.error('Error loading current image:', result.error);
			return { success: false };
		}

		actions.setCurrentImageUrl(result.url);
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
