import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from 'firebase/auth';
import type { StorageReference } from 'firebase/storage';
import {
	createInitialSlideshowState,
	loadImageList,
	loadCurrentImage,
	createSlideshowManager,
	handleNextImage,
	handlePreviousImage,
	refreshImageList,
	handleDeleteCurrentImage,
	toggleControls,
	showDeleteDialog,
	hideDeleteDialog,
	handleScreenClick,
	handleScreenKeydown,
	type SlideshowActions
} from './slideshowStateUtils';

// Mock dependencies
vi.mock('$lib/collectionService', () => ({
	CollectionService: {
		getPrimaryCollection: vi.fn()
	}
}));

vi.mock('./storageUtils', () => ({
	loadCollectionImageRefs: vi.fn(),
	getImageUrl: vi.fn(),
	deleteImage: vi.fn(),
	removeImageFromList: vi.fn(),
	checkForImageUpdates: vi.fn()
}));

vi.mock('./slideshowUtils', () => ({
	getNextImageIndex: vi.fn(),
	getPreviousImageIndex: vi.fn(),
	adjustIndexAfterDeletion: vi.fn(),
	createSlideshowInterval: vi.fn()
}));

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

describe('slideshowStateUtils', () => {
	let mockActions: SlideshowActions;
	let mockUser: User;
	let mockImageRefs: StorageReference[];

	beforeEach(() => {
		vi.clearAllMocks();

		// Mock document
		global.document = {
			createElement: vi.fn().mockReturnValue({
				closest: vi.fn()
			})
		} as unknown as Document;

		mockActions = {
			setUser: vi.fn(),
			setImageRefs: vi.fn(),
			setCurrentImageIndex: vi.fn(),
			setCurrentImageUrl: vi.fn(),
			setLoading: vi.fn(),
			setError: vi.fn(),
			setLoadingNext: vi.fn(),
			setShowControls: vi.fn(),
			setShowDeleteConfirm: vi.fn(),
			setDeleting: vi.fn(),
			setCurrentCollectionUuid: vi.fn()
		};

		mockUser = { uid: 'test-user' } as User;
		mockImageRefs = [
			{ name: 'image1.jpg' } as StorageReference,
			{ name: 'image2.jpg' } as StorageReference
		];
	});

	describe('createInitialSlideshowState', () => {
		it('returns initial state with correct default values', () => {
			const state = createInitialSlideshowState();

			expect(state).toEqual({
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
			});
		});
	});

	describe('loadImageList', () => {
		it('successfully loads image list', async () => {
			vi.mocked(CollectionService.getPrimaryCollection).mockResolvedValue('collection-uuid');
			vi.mocked(loadCollectionImageRefs).mockResolvedValue({
				imageRefs: mockImageRefs,
				error: undefined
			});

			const result = await loadImageList(mockUser, mockActions);

			expect(result.success).toBe(true);
			expect(result.imageRefs).toEqual(mockImageRefs);
			expect(mockActions.setLoading).toHaveBeenCalledWith(true);
			expect(mockActions.setLoading).toHaveBeenCalledWith(false);
			expect(mockActions.setCurrentCollectionUuid).toHaveBeenCalledWith('collection-uuid');
			expect(mockActions.setImageRefs).toHaveBeenCalledWith(mockImageRefs);
		});

		it('handles null user', async () => {
			const result = await loadImageList(null, mockActions);

			expect(result.success).toBe(false);
			expect(CollectionService.getPrimaryCollection).not.toHaveBeenCalled();
		});

		it('handles storage error', async () => {
			vi.mocked(CollectionService.getPrimaryCollection).mockResolvedValue('collection-uuid');
			vi.mocked(loadCollectionImageRefs).mockResolvedValue({
				imageRefs: [],
				error: 'Storage error'
			});

			const result = await loadImageList(mockUser, mockActions);

			expect(result.success).toBe(false);
			expect(mockActions.setError).toHaveBeenCalledWith('Storage error');
		});

		it('handles empty image list', async () => {
			vi.mocked(CollectionService.getPrimaryCollection).mockResolvedValue('collection-uuid');
			vi.mocked(loadCollectionImageRefs).mockResolvedValue({
				imageRefs: [],
				error: undefined
			});

			const result = await loadImageList(mockUser, mockActions);

			expect(result.success).toBe(false);
			expect(mockActions.setError).toHaveBeenCalledWith(
				'No images found. Please upload some images first.'
			);
		});

		it('handles exceptions', async () => {
			vi.mocked(CollectionService.getPrimaryCollection).mockRejectedValue(
				new Error('Service error')
			);

			const result = await loadImageList(mockUser, mockActions);

			expect(result.success).toBe(false);
			expect(mockActions.setError).toHaveBeenCalledWith('Failed to load images. Please try again.');
			expect(mockActions.setLoading).toHaveBeenCalledWith(false);
		});
	});

	describe('loadCurrentImage', () => {
		it('successfully loads current image', async () => {
			vi.mocked(getImageUrl).mockResolvedValue({
				url: 'https://example.com/image.jpg',
				error: undefined
			});

			const result = await loadCurrentImage(mockImageRefs, 0, mockActions);

			expect(result.success).toBe(true);
			expect(result.url).toBe('https://example.com/image.jpg');
			expect(mockActions.setLoadingNext).toHaveBeenCalledWith(true);
			expect(mockActions.setLoadingNext).toHaveBeenCalledWith(false);
			expect(mockActions.setCurrentImageUrl).toHaveBeenCalledWith('https://example.com/image.jpg');
		});

		it('handles empty image refs', async () => {
			const result = await loadCurrentImage([], 0, mockActions);

			expect(result.success).toBe(false);
			expect(getImageUrl).not.toHaveBeenCalled();
		});

		it('handles getImageUrl error', async () => {
			vi.mocked(getImageUrl).mockResolvedValue({
				url: '',
				error: 'Failed to load image'
			});

			const result = await loadCurrentImage(mockImageRefs, 0, mockActions);

			expect(result.success).toBe(false);
			expect(mockActions.setLoadingNext).toHaveBeenCalledWith(false);
		});

		it('handles exceptions', async () => {
			vi.mocked(getImageUrl).mockRejectedValue(new Error('Network error'));

			const result = await loadCurrentImage(mockImageRefs, 0, mockActions);

			expect(result.success).toBe(false);
			expect(mockActions.setLoadingNext).toHaveBeenCalledWith(false);
		});
	});

	describe('createSlideshowManager', () => {
		it('starts and stops slideshow', () => {
			const cleanup = vi.fn();
			vi.mocked(createSlideshowInterval).mockReturnValue({ cleanup });

			const manager = createSlideshowManager();
			const callback = vi.fn();

			manager.start(callback, 5000);

			expect(createSlideshowInterval).toHaveBeenCalledWith(callback, 5000);
			expect(manager.isRunning()).toBe(true);

			manager.stop();

			expect(cleanup).toHaveBeenCalled();
			expect(manager.isRunning()).toBe(false);
		});

		it('stops previous slideshow when starting new one', () => {
			const cleanup1 = vi.fn();
			const cleanup2 = vi.fn();
			vi.mocked(createSlideshowInterval)
				.mockReturnValueOnce({ cleanup: cleanup1 })
				.mockReturnValueOnce({ cleanup: cleanup2 });

			const manager = createSlideshowManager();
			const callback = vi.fn();

			manager.start(callback);
			manager.start(callback);

			expect(cleanup1).toHaveBeenCalled();
			expect(createSlideshowInterval).toHaveBeenCalledTimes(2);
		});
	});

	describe('handleNextImage', () => {
		it('moves to next image', async () => {
			vi.mocked(getNextImageIndex).mockReturnValue(1);
			vi.mocked(getImageUrl).mockResolvedValue({
				url: 'https://example.com/image2.jpg',
				error: undefined
			});

			const state = {
				...createInitialSlideshowState(),
				imageRefs: mockImageRefs,
				currentImageIndex: 0
			};

			await handleNextImage(state, mockActions);

			expect(getNextImageIndex).toHaveBeenCalledWith(0, 2);
			expect(mockActions.setCurrentImageIndex).toHaveBeenCalledWith(1);
			expect(mockActions.setCurrentImageUrl).toHaveBeenCalledWith('https://example.com/image2.jpg');
		});

		it('calls refresh callback if provided', async () => {
			vi.mocked(getNextImageIndex).mockReturnValue(1);
			vi.mocked(getImageUrl).mockResolvedValue({
				url: 'https://example.com/image2.jpg',
				error: undefined
			});

			const refreshCallback = vi.fn();
			const state = {
				...createInitialSlideshowState(),
				imageRefs: mockImageRefs,
				currentImageIndex: 0
			};

			await handleNextImage(state, mockActions, refreshCallback);

			expect(refreshCallback).toHaveBeenCalled();
		});

		it('handles empty image refs', async () => {
			const state = { ...createInitialSlideshowState(), imageRefs: [], currentImageIndex: 0 };

			await handleNextImage(state, mockActions);

			expect(getNextImageIndex).not.toHaveBeenCalled();
			expect(mockActions.setCurrentImageIndex).not.toHaveBeenCalled();
		});
	});

	describe('handlePreviousImage', () => {
		it('moves to previous image', async () => {
			vi.mocked(getPreviousImageIndex).mockReturnValue(0);
			vi.mocked(getImageUrl).mockResolvedValue({
				url: 'https://example.com/image1.jpg',
				error: undefined
			});

			const state = {
				...createInitialSlideshowState(),
				imageRefs: mockImageRefs,
				currentImageIndex: 1
			};

			await handlePreviousImage(state, mockActions);

			expect(getPreviousImageIndex).toHaveBeenCalledWith(1, 2);
			expect(mockActions.setCurrentImageIndex).toHaveBeenCalledWith(0);
			expect(mockActions.setCurrentImageUrl).toHaveBeenCalledWith('https://example.com/image1.jpg');
		});
	});

	describe('refreshImageList', () => {
		it('refreshes image list with updates', async () => {
			const newRefs = [...mockImageRefs, { name: 'image3.jpg' } as StorageReference];
			vi.mocked(checkForImageUpdates).mockResolvedValue({
				hasUpdates: true,
				newRefs
			});

			const result = await refreshImageList(mockImageRefs, 'collection-uuid', mockActions);

			expect(result.hasUpdates).toBe(true);
			expect(result.newRefs).toEqual(newRefs);
			expect(mockActions.setImageRefs).toHaveBeenCalledWith(newRefs);
		});

		it('handles no updates', async () => {
			vi.mocked(checkForImageUpdates).mockResolvedValue({
				hasUpdates: false
			});

			const result = await refreshImageList(mockImageRefs, 'collection-uuid', mockActions);

			expect(result.hasUpdates).toBe(false);
			expect(mockActions.setImageRefs).not.toHaveBeenCalled();
		});

		it('handles empty collection uuid', async () => {
			const result = await refreshImageList(mockImageRefs, '', mockActions);

			expect(result.hasUpdates).toBe(false);
			expect(checkForImageUpdates).not.toHaveBeenCalled();
		});
	});

	describe('handleDeleteCurrentImage', () => {
		it('successfully deletes current image', async () => {
			vi.mocked(deleteImage).mockResolvedValue({ success: true });
			vi.mocked(removeImageFromList).mockReturnValue([mockImageRefs[1]]);
			vi.mocked(adjustIndexAfterDeletion).mockReturnValue(0);
			vi.mocked(getImageUrl).mockResolvedValue({
				url: 'https://example.com/image2.jpg',
				error: undefined
			});

			const state = {
				...createInitialSlideshowState(),
				user: mockUser,
				imageRefs: mockImageRefs,
				currentImageIndex: 0
			};

			const result = await handleDeleteCurrentImage(state, mockActions);

			expect(result.success).toBe(true);
			expect(mockActions.setDeleting).toHaveBeenCalledWith(true);
			expect(mockActions.setDeleting).toHaveBeenCalledWith(false);
			expect(mockActions.setShowDeleteConfirm).toHaveBeenCalledWith(false);
		});

		it('handles delete failure', async () => {
			vi.mocked(deleteImage).mockResolvedValue({
				success: false,
				error: 'Delete failed'
			});

			const state = {
				...createInitialSlideshowState(),
				user: mockUser,
				imageRefs: mockImageRefs,
				currentImageIndex: 0
			};

			const result = await handleDeleteCurrentImage(state, mockActions);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Delete failed');
		});

		it('handles no user', async () => {
			const state = {
				...createInitialSlideshowState(),
				user: null,
				imageRefs: mockImageRefs,
				currentImageIndex: 0
			};

			const result = await handleDeleteCurrentImage(state, mockActions);

			expect(result.success).toBe(false);
			expect(result.error).toBe('No user or images available');
		});

		it('handles last image deletion', async () => {
			vi.mocked(deleteImage).mockResolvedValue({ success: true });
			vi.mocked(removeImageFromList).mockReturnValue([]);
			vi.mocked(adjustIndexAfterDeletion).mockReturnValue(0);

			const state = {
				...createInitialSlideshowState(),
				user: mockUser,
				imageRefs: [mockImageRefs[0]],
				currentImageIndex: 0
			};

			const result = await handleDeleteCurrentImage(state, mockActions);

			expect(result.success).toBe(true);
			expect(mockActions.setCurrentImageUrl).toHaveBeenCalledWith('');
			expect(mockActions.setError).toHaveBeenCalledWith(
				'No images found. Please upload some images first.'
			);
		});
	});

	describe('toggleControls', () => {
		it('toggles controls visibility', () => {
			toggleControls(false, mockActions);
			expect(mockActions.setShowControls).toHaveBeenCalledWith(true);

			toggleControls(true, mockActions);
			expect(mockActions.setShowControls).toHaveBeenCalledWith(false);
		});
	});

	describe('showDeleteDialog', () => {
		it('shows delete dialog', () => {
			showDeleteDialog(mockActions);
			expect(mockActions.setShowDeleteConfirm).toHaveBeenCalledWith(true);
		});
	});

	describe('hideDeleteDialog', () => {
		it('hides delete dialog', () => {
			hideDeleteDialog(mockActions);
			expect(mockActions.setShowDeleteConfirm).toHaveBeenCalledWith(false);
		});
	});

	describe('handleScreenClick', () => {
		it('toggles controls when not clicking a button', () => {
			const div = document.createElement('div');
			// Mock closest method to return null (not a button)
			vi.spyOn(div, 'closest').mockReturnValue(null);

			const mockEvent = {
				target: div
			} as unknown as MouseEvent;

			handleScreenClick(mockEvent, false, mockActions);

			expect(mockActions.setShowControls).toHaveBeenCalledWith(true);
		});

		it('does not toggle controls when clicking a button', () => {
			const button = document.createElement('button');
			const mockEvent = {
				target: button
			} as unknown as MouseEvent;

			// Mock closest method
			vi.spyOn(button, 'closest').mockReturnValue(button);

			handleScreenClick(mockEvent, false, mockActions);

			expect(mockActions.setShowControls).not.toHaveBeenCalled();
		});
	});

	describe('handleScreenKeydown', () => {
		it('toggles controls on Enter key', () => {
			const mockEvent = { key: 'Enter' } as KeyboardEvent;

			handleScreenKeydown(mockEvent, false, mockActions);

			expect(mockActions.setShowControls).toHaveBeenCalledWith(true);
		});

		it('does not toggle controls on other keys', () => {
			const mockEvent = { key: 'Space' } as KeyboardEvent;

			handleScreenKeydown(mockEvent, false, mockActions);

			expect(mockActions.setShowControls).not.toHaveBeenCalled();
		});
	});
});
