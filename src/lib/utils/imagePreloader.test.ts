import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImagePreloader, imagePreloader } from './imagePreloader';
import type { StorageReference } from 'firebase/storage';

// Mock the storageUtils module
vi.mock('./storageUtils', () => ({
	getImageUrl: vi.fn()
}));

import { getImageUrl } from './storageUtils';

// Mock Image constructor - create new instance for each call
const mockImages: Array<{
	onload: (() => void) | null;
	onerror: (() => void) | null;
	src: string;
	complete: boolean;
}> = [];

Object.defineProperty(global, 'Image', {
	writable: true,
	value: vi.fn(() => {
		const mockImage = {
			onload: null as (() => void) | null,
			onerror: null as (() => void) | null,
			src: '',
			complete: false
		};
		mockImages.push(mockImage);
		return mockImage;
	})
});

describe('ImagePreloader', () => {
	let preloader: ImagePreloader;
	let mockImageRef: StorageReference;
	let mockImageRef2: StorageReference;

	beforeEach(() => {
		preloader = new ImagePreloader();

		mockImageRef = {
			fullPath: 'images/collection1/image1.jpg',
			name: 'image1.jpg'
		} as StorageReference;

		mockImageRef2 = {
			fullPath: 'images/collection1/image2.jpg',
			name: 'image2.jpg'
		} as StorageReference;

		vi.clearAllMocks();
	});

	afterEach(() => {
		preloader.clearCache();
		mockImages.length = 0;
	});

	describe('preloadImage', () => {
		it('successfully preloads an image', async () => {
			const testUrl = 'https://example.com/image1.jpg';
			vi.mocked(getImageUrl).mockResolvedValue({ url: testUrl });

			const preloadPromise = preloader.preloadImage(mockImageRef);

			// Simulate successful image load
			setTimeout(() => {
				const lastMockImage = mockImages[mockImages.length - 1];
				if (lastMockImage?.onload) lastMockImage.onload();
			}, 0);

			const result = await preloadPromise;

			expect(result.success).toBe(true);
			expect(result.url).toBe(testUrl);
			expect(preloader.isCached(mockImageRef)).toBe(true);
		});

		it('handles image load failure', async () => {
			const testUrl = 'https://example.com/image1.jpg';
			vi.mocked(getImageUrl).mockResolvedValue({ url: testUrl });

			const preloadPromise = preloader.preloadImage(mockImageRef);

			// Simulate image load error
			setTimeout(() => {
				const lastMockImage = mockImages[mockImages.length - 1];
				if (lastMockImage?.onerror) lastMockImage.onerror();
			}, 0);

			const result = await preloadPromise;

			expect(result.success).toBe(false);
			expect(result.error).toBeDefined();
			expect(preloader.isCached(mockImageRef)).toBe(false);
		});

		it('handles getImageUrl error', async () => {
			vi.mocked(getImageUrl).mockResolvedValue({
				url: '',
				error: 'Failed to get URL'
			});

			const result = await preloader.preloadImage(mockImageRef);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Failed to get URL');
		});

		it('returns cached image if already preloaded', async () => {
			const testUrl = 'https://example.com/image1.jpg';
			vi.mocked(getImageUrl).mockResolvedValue({ url: testUrl });

			// First preload
			const firstPromise = preloader.preloadImage(mockImageRef);
			setTimeout(() => {
				const lastMockImage = mockImages[mockImages.length - 1];
				if (lastMockImage?.onload) lastMockImage.onload();
			}, 0);
			await firstPromise;

			// Second preload should return cached result
			const result = await preloader.preloadImage(mockImageRef);

			expect(result.success).toBe(true);
			expect(result.url).toBe(testUrl);
			expect(getImageUrl).toHaveBeenCalledTimes(1); // Should not call again
		});

		it('handles concurrent preload requests for same image', async () => {
			const testUrl = 'https://example.com/image1.jpg';
			vi.mocked(getImageUrl).mockResolvedValue({ url: testUrl });

			// Start multiple concurrent preloads
			const promise1 = preloader.preloadImage(mockImageRef);
			const promise2 = preloader.preloadImage(mockImageRef);
			const promise3 = preloader.preloadImage(mockImageRef);

			// Simulate successful image load
			setTimeout(() => {
				// Trigger onload for all pending images
				mockImages.forEach((img) => {
					if (img.onload) img.onload();
				});
			}, 0);

			const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);

			expect(result1.success).toBe(true);
			expect(result2.success).toBe(true);
			expect(result3.success).toBe(true);
			expect(getImageUrl).toHaveBeenCalledTimes(1); // Should only call once
		});
	});

	describe('getPreloadedImage', () => {
		it('returns null for non-cached image', () => {
			const result = preloader.getPreloadedImage(mockImageRef);
			expect(result).toBeNull();
		});

		it('returns URL for cached image', async () => {
			const testUrl = 'https://example.com/image1.jpg';
			vi.mocked(getImageUrl).mockResolvedValue({ url: testUrl });

			const preloadPromise = preloader.preloadImage(mockImageRef);
			setTimeout(() => {
				const lastMockImage = mockImages[mockImages.length - 1];
				if (lastMockImage?.onload) lastMockImage.onload();
			}, 0);
			await preloadPromise;

			const result = preloader.getPreloadedImage(mockImageRef);
			expect(result).toBe(testUrl);
		});
	});

	describe('preloadImages', () => {
		it('preloads multiple images', async () => {
			const testUrl1 = 'https://example.com/image1.jpg';
			const testUrl2 = 'https://example.com/image2.jpg';

			vi.mocked(getImageUrl)
				.mockResolvedValueOnce({ url: testUrl1 })
				.mockResolvedValueOnce({ url: testUrl2 });

			const preloadPromise = preloader.preloadImages([mockImageRef, mockImageRef2]);

			// Simulate successful loads for all images
			setTimeout(() => {
				mockImages.forEach((img) => {
					if (img.onload) img.onload();
				});
			}, 0);

			await preloadPromise;

			expect(preloader.isCached(mockImageRef)).toBe(true);
			expect(preloader.isCached(mockImageRef2)).toBe(true);
		});

		it('continues preloading even if some images fail', async () => {
			vi.mocked(getImageUrl)
				.mockResolvedValueOnce({ url: '', error: 'Failed' })
				.mockResolvedValueOnce({ url: 'https://example.com/image2.jpg' });

			const preloadPromise = preloader.preloadImages([mockImageRef, mockImageRef2]);

			// Simulate successful load for the second image (which will be the first Image object created since first fails early)
			setTimeout(() => {
				if (mockImages.length > 0 && mockImages[0].onload) {
					mockImages[0].onload();
				}
			}, 0);

			await preloadPromise;

			expect(preloader.isCached(mockImageRef)).toBe(false);
			expect(preloader.isCached(mockImageRef2)).toBe(true);
		});
	});

	describe('preloadAdjacent', () => {
		it('preloads next and previous images', async () => {
			const imageRefs = [mockImageRef, mockImageRef2];

			vi.mocked(getImageUrl).mockResolvedValue({ url: 'https://example.com/test.jpg' });

			const preloadPromise = preloader.preloadAdjacent(imageRefs, 0, 1);

			// Simulate successful loads
			setTimeout(() => {
				mockImages.forEach((img) => {
					if (img.onload) img.onload();
				});
			}, 0);

			await preloadPromise;

			// Should preload image at index 1 (next) and index 1 (previous, wraps around)
			expect(getImageUrl).toHaveBeenCalledWith(mockImageRef2);
		});

		it('handles empty image array', async () => {
			await preloader.preloadAdjacent([], 0, 1);
			expect(getImageUrl).not.toHaveBeenCalled();
		});

		it('wraps around correctly for indices', async () => {
			const imageRef3 = {
				fullPath: 'images/collection1/image3.jpg',
				name: 'image3.jpg'
			} as StorageReference;

			const imageRefs = [mockImageRef, mockImageRef2, imageRef3];

			vi.mocked(getImageUrl).mockResolvedValue({ url: 'https://example.com/test.jpg' });

			const preloadPromise = preloader.preloadAdjacent(imageRefs, 2, 1);

			setTimeout(() => {
				mockImages.forEach((img) => {
					if (img.onload) img.onload();
				});
			}, 0);

			await preloadPromise;

			// From index 2, next should be 0, previous should be 1
			expect(getImageUrl).toHaveBeenCalledWith(mockImageRef); // index 0
			expect(getImageUrl).toHaveBeenCalledWith(mockImageRef2); // index 1
		});
	});

	describe('cache management', () => {
		it('clears all cached images', async () => {
			const testUrl = 'https://example.com/image1.jpg';
			vi.mocked(getImageUrl).mockResolvedValue({ url: testUrl });

			const preloadPromise = preloader.preloadImage(mockImageRef);
			setTimeout(() => {
				const lastMockImage = mockImages[mockImages.length - 1];
				if (lastMockImage?.onload) lastMockImage.onload();
			}, 0);
			await preloadPromise;

			expect(preloader.isCached(mockImageRef)).toBe(true);

			preloader.clearCache();

			expect(preloader.isCached(mockImageRef)).toBe(false);
		});

		it('provides cache statistics', () => {
			const stats = preloader.getCacheStats();
			expect(stats).toHaveProperty('size');
			expect(stats).toHaveProperty('maxSize');
			expect(typeof stats.size).toBe('number');
			expect(typeof stats.maxSize).toBe('number');
		});
	});

	describe('singleton instance', () => {
		it('exports a singleton instance', () => {
			expect(imagePreloader).toBeInstanceOf(ImagePreloader);
		});
	});
});
