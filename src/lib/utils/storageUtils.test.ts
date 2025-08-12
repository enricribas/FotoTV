import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	loadCollectionImageRefs,
	getImageUrl,
	deleteImage,
	removeImageFromList,
	checkForImageUpdates
} from './storageUtils';
import type { StorageReference, ListResult } from 'firebase/storage';

// Mock Firebase storage
vi.mock('firebase/storage', () => ({
	ref: vi.fn(),
	listAll: vi.fn(),
	getDownloadURL: vi.fn(),
	deleteObject: vi.fn()
}));

vi.mock('$lib/firebase', () => ({
	storage: {}
}));

vi.mock('./slideshowUtils', () => ({
	sortImagesByName: vi.fn((refs) => refs)
}));

import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { sortImagesByName } from './slideshowUtils';

describe('storageUtils', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('loadCollectionImageRefs', () => {
		it('successfully loads and sorts image references', async () => {
			const mockRefs = [{ name: 'image2.jpg' }, { name: 'image1.jpg' }] as StorageReference[];

			const sortedRefs = [{ name: 'image1.jpg' }, { name: 'image2.jpg' }] as StorageReference[];

			vi.mocked(ref).mockReturnValue({} as StorageReference);
			vi.mocked(listAll).mockResolvedValue({ items: mockRefs } as ListResult);
			vi.mocked(sortImagesByName).mockReturnValue(sortedRefs);

			const result = await loadCollectionImageRefs('test-collection');

			expect(result).toEqual({
				imageRefs: sortedRefs
			});
			expect(ref).toHaveBeenCalledWith({}, 'images/test-collection');
			expect(sortImagesByName).toHaveBeenCalledWith(mockRefs);
		});

		it('handles errors gracefully', async () => {
			vi.mocked(ref).mockReturnValue({} as StorageReference);
			vi.mocked(listAll).mockRejectedValue(new Error('Storage error'));

			const result = await loadCollectionImageRefs('test-collection');

			expect(result).toEqual({
				imageRefs: [],
				error: 'Failed to load images. Please try again.'
			});
		});
	});

	describe('getImageUrl', () => {
		it('successfully gets download URL', async () => {
			const mockRef = { name: 'image.jpg' } as StorageReference;
			const mockUrl = 'https://example.com/image.jpg';

			vi.mocked(getDownloadURL).mockResolvedValue(mockUrl);

			const result = await getImageUrl(mockRef);

			expect(result).toEqual({ url: mockUrl });
			expect(getDownloadURL).toHaveBeenCalledWith(mockRef);
		});

		it('handles errors gracefully', async () => {
			const mockRef = { name: 'image.jpg' } as StorageReference;

			vi.mocked(getDownloadURL).mockRejectedValue(new Error('Download error'));

			const result = await getImageUrl(mockRef);

			expect(result).toEqual({
				url: '',
				error: 'Failed to load image URL'
			});
		});
	});

	describe('deleteImage', () => {
		it('successfully deletes image', async () => {
			const mockRef = { name: 'image.jpg' } as StorageReference;

			vi.mocked(deleteObject).mockResolvedValue();

			const result = await deleteImage(mockRef);

			expect(result).toEqual({ success: true });
			expect(deleteObject).toHaveBeenCalledWith(mockRef);
		});

		it('handles deletion errors', async () => {
			const mockRef = { name: 'image.jpg' } as StorageReference;

			vi.mocked(deleteObject).mockRejectedValue(new Error('Delete error'));

			const result = await deleteImage(mockRef);

			expect(result).toEqual({
				success: false,
				error: 'Failed to delete image. Please try again.'
			});
		});
	});

	describe('removeImageFromList', () => {
		it('removes image at specified index', () => {
			const mockRefs = [
				{ name: 'image1.jpg' },
				{ name: 'image2.jpg' },
				{ name: 'image3.jpg' }
			] as StorageReference[];

			const result = removeImageFromList(mockRefs, 1);

			expect(result).toEqual([{ name: 'image1.jpg' }, { name: 'image3.jpg' }]);
			expect(result.length).toBe(2);
		});

		it('handles removal of first item', () => {
			const mockRefs = [{ name: 'image1.jpg' }, { name: 'image2.jpg' }] as StorageReference[];

			const result = removeImageFromList(mockRefs, 0);

			expect(result).toEqual([{ name: 'image2.jpg' }]);
		});

		it('handles removal of last item', () => {
			const mockRefs = [{ name: 'image1.jpg' }, { name: 'image2.jpg' }] as StorageReference[];

			const result = removeImageFromList(mockRefs, 1);

			expect(result).toEqual([{ name: 'image1.jpg' }]);
		});

		it('returns original array when index is out of bounds', () => {
			const mockRefs = [{ name: 'image1.jpg' }] as StorageReference[];

			const result = removeImageFromList(mockRefs, 5);

			expect(result).toEqual(mockRefs);
		});

		it('handles empty array', () => {
			const result = removeImageFromList([], 0);
			expect(result).toEqual([]);
		});
	});

	describe('checkForImageUpdates', () => {
		it('detects when new images are added', async () => {
			const currentRefs = [{ name: 'image1.jpg' }] as StorageReference[];

			const newRefs = [{ name: 'image1.jpg' }, { name: 'image2.jpg' }] as StorageReference[];

			vi.mocked(ref).mockReturnValue({} as StorageReference);
			vi.mocked(listAll).mockResolvedValue({ items: newRefs } as ListResult);
			vi.mocked(sortImagesByName).mockReturnValue(newRefs);

			const result = await checkForImageUpdates(currentRefs, 'test-collection');

			expect(result).toEqual({
				hasUpdates: true,
				newRefs: newRefs
			});
		});

		it('detects when images are removed', async () => {
			const currentRefs = [{ name: 'image1.jpg' }, { name: 'image2.jpg' }] as StorageReference[];

			const newRefs = [{ name: 'image1.jpg' }] as StorageReference[];

			vi.mocked(ref).mockReturnValue({} as StorageReference);
			vi.mocked(listAll).mockResolvedValue({ items: newRefs } as ListResult);
			vi.mocked(sortImagesByName).mockReturnValue(newRefs);

			const result = await checkForImageUpdates(currentRefs, 'test-collection');

			expect(result).toEqual({
				hasUpdates: true,
				newRefs: newRefs
			});
		});

		it('returns false when no updates', async () => {
			const currentRefs = [{ name: 'image1.jpg' }, { name: 'image2.jpg' }] as StorageReference[];

			const newRefs = [{ name: 'image1.jpg' }, { name: 'image2.jpg' }] as StorageReference[];

			vi.mocked(ref).mockReturnValue({} as StorageReference);
			vi.mocked(listAll).mockResolvedValue({ items: newRefs } as ListResult);
			vi.mocked(sortImagesByName).mockReturnValue(newRefs);

			const result = await checkForImageUpdates(currentRefs, 'test-collection');

			expect(result).toEqual({
				hasUpdates: false
			});
		});

		it('handles errors gracefully', async () => {
			const currentRefs = [{ name: 'image1.jpg' }] as StorageReference[];

			vi.mocked(ref).mockReturnValue({} as StorageReference);
			vi.mocked(listAll).mockRejectedValue(new Error('Storage error'));

			const result = await checkForImageUpdates(currentRefs, 'test-collection');

			expect(result).toEqual({
				hasUpdates: false
			});
		});
	});
});
