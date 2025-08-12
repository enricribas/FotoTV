import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	getNextImageIndex,
	getPreviousImageIndex,
	calculateOptimalPadding,
	handleSlideshowKeydown,
	hasImageListChanged,
	adjustIndexAfterDeletion,
	createSlideshowInterval,
	getImageDimensions
} from './slideshowUtils';
import type { StorageReference } from 'firebase/storage';

describe('slideshowUtils', () => {
	describe('getNextImageIndex', () => {
		it('returns 0 when no images', () => {
			expect(getNextImageIndex(0, 0)).toBe(0);
		});

		it('increments index normally', () => {
			expect(getNextImageIndex(2, 5)).toBe(3);
		});

		it('wraps to 0 when at last image', () => {
			expect(getNextImageIndex(4, 5)).toBe(0);
		});
	});

	describe('getPreviousImageIndex', () => {
		it('returns 0 when no images', () => {
			expect(getPreviousImageIndex(0, 0)).toBe(0);
		});

		it('decrements index normally', () => {
			expect(getPreviousImageIndex(3, 5)).toBe(2);
		});

		it('wraps to last index when at first image', () => {
			expect(getPreviousImageIndex(0, 5)).toBe(4);
		});
	});

	describe('calculateOptimalPadding', () => {
		it('handles wide images (landscape)', () => {
			const result = calculateOptimalPadding(1920, 1080, 1000, 800, 50);

			expect(result.left).toBe(50);
			expect(result.right).toBe(50);
			expect(result.top).toBeGreaterThan(50);
			expect(result.bottom).toBeGreaterThan(50);
			expect(result.top).toBe(result.bottom);
		});

		it('handles tall images (portrait)', () => {
			const result = calculateOptimalPadding(1080, 1920, 1000, 800, 50);

			expect(result.top).toBe(50);
			expect(result.bottom).toBe(50);
			expect(result.left).toBeGreaterThan(50);
			expect(result.right).toBeGreaterThan(50);
			expect(result.left).toBe(result.right);
		});

		it('respects minimum padding', () => {
			const minPadding = 100;
			const result = calculateOptimalPadding(800, 600, 1000, 800, minPadding);

			expect(result.top).toBeGreaterThanOrEqual(minPadding);
			expect(result.right).toBeGreaterThanOrEqual(minPadding);
			expect(result.bottom).toBeGreaterThanOrEqual(minPadding);
			expect(result.left).toBeGreaterThanOrEqual(minPadding);
		});

		it('handles square images', () => {
			const result = calculateOptimalPadding(800, 800, 1000, 1000, 50);

			expect(result.top).toBe(result.bottom);
			expect(result.left).toBe(result.right);
		});
	});

	describe('handleSlideshowKeydown', () => {
		it('calls onNext for ArrowRight', () => {
			const callbacks = {
				onNext: vi.fn(),
				onPrevious: vi.fn(),
				onBack: vi.fn(),
				onToggleControls: vi.fn()
			};

			const event = { key: 'ArrowRight', preventDefault: vi.fn() } as KeyboardEvent;
			handleSlideshowKeydown(event, callbacks);

			expect(callbacks.onNext).toHaveBeenCalled();
		});

		it('calls onNext for Space', () => {
			const callbacks = {
				onNext: vi.fn(),
				onPrevious: vi.fn(),
				onBack: vi.fn(),
				onToggleControls: vi.fn()
			};

			const event = { key: ' ', preventDefault: vi.fn() } as KeyboardEvent;
			handleSlideshowKeydown(event, callbacks);

			expect(callbacks.onNext).toHaveBeenCalled();
		});

		it('calls onPrevious for ArrowLeft', () => {
			const callbacks = {
				onNext: vi.fn(),
				onPrevious: vi.fn(),
				onBack: vi.fn(),
				onToggleControls: vi.fn()
			};

			const event = { key: 'ArrowLeft', preventDefault: vi.fn() } as KeyboardEvent;
			handleSlideshowKeydown(event, callbacks);

			expect(callbacks.onPrevious).toHaveBeenCalled();
		});

		it('calls onBack for Escape', () => {
			const callbacks = {
				onNext: vi.fn(),
				onPrevious: vi.fn(),
				onBack: vi.fn(),
				onToggleControls: vi.fn()
			};

			const event = { key: 'Escape', preventDefault: vi.fn() } as KeyboardEvent;
			handleSlideshowKeydown(event, callbacks);

			expect(callbacks.onBack).toHaveBeenCalled();
		});

		it('calls onToggleControls for Enter', () => {
			const callbacks = {
				onNext: vi.fn(),
				onPrevious: vi.fn(),
				onBack: vi.fn(),
				onToggleControls: vi.fn()
			};

			const event = { key: 'Enter', preventDefault: vi.fn() } as KeyboardEvent;
			handleSlideshowKeydown(event, callbacks);

			expect(callbacks.onToggleControls).toHaveBeenCalled();
		});

		it('calls onToggleControls for c', () => {
			const callbacks = {
				onNext: vi.fn(),
				onPrevious: vi.fn(),
				onBack: vi.fn(),
				onToggleControls: vi.fn()
			};

			const event = { key: 'c', preventDefault: vi.fn() } as KeyboardEvent;
			handleSlideshowKeydown(event, callbacks);

			expect(callbacks.onToggleControls).toHaveBeenCalled();
		});

		it('ignores unknown keys', () => {
			const callbacks = {
				onNext: vi.fn(),
				onPrevious: vi.fn(),
				onBack: vi.fn(),
				onToggleControls: vi.fn()
			};

			const event = { key: 'x', preventDefault: vi.fn() } as KeyboardEvent;
			handleSlideshowKeydown(event, callbacks);

			expect(callbacks.onNext).not.toHaveBeenCalled();
			expect(callbacks.onPrevious).not.toHaveBeenCalled();
			expect(callbacks.onBack).not.toHaveBeenCalled();
			expect(callbacks.onToggleControls).not.toHaveBeenCalled();
		});
	});

	describe('hasImageListChanged', () => {
		const mockRefs = [{ name: 'image1.jpg' }, { name: 'image2.jpg' }] as StorageReference[];

		it('returns false when lengths are the same', () => {
			const newRefs = [{ name: 'image3.jpg' }, { name: 'image4.jpg' }] as StorageReference[];

			expect(hasImageListChanged(mockRefs, newRefs)).toBe(false);
		});

		it('returns true when lengths are different', () => {
			const newRefs = [{ name: 'image1.jpg' }] as StorageReference[];

			expect(hasImageListChanged(mockRefs, newRefs)).toBe(true);
		});

		it('handles empty arrays', () => {
			expect(hasImageListChanged([], [])).toBe(false);
			expect(hasImageListChanged(mockRefs, [])).toBe(true);
			expect(hasImageListChanged([], mockRefs)).toBe(true);
		});
	});

	describe('adjustIndexAfterDeletion', () => {
		it('returns 0 when no images remain', () => {
			expect(adjustIndexAfterDeletion(3, 0)).toBe(0);
		});

		it('keeps index when within bounds', () => {
			expect(adjustIndexAfterDeletion(2, 5)).toBe(2);
		});

		it('adjusts index to last item when out of bounds', () => {
			expect(adjustIndexAfterDeletion(4, 3)).toBe(2);
		});

		it('handles edge case of single image', () => {
			expect(adjustIndexAfterDeletion(0, 1)).toBe(0);
		});
	});

	describe('createSlideshowInterval', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('creates interval with default timing', () => {
			const callback = vi.fn();
			const { cleanup } = createSlideshowInterval(callback);

			vi.advanceTimersByTime(10000);
			expect(callback).toHaveBeenCalledTimes(1);

			vi.advanceTimersByTime(10000);
			expect(callback).toHaveBeenCalledTimes(2);

			cleanup();
		});

		it('creates interval with custom timing', () => {
			const callback = vi.fn();
			const { cleanup } = createSlideshowInterval(callback, 5000);

			vi.advanceTimersByTime(5000);
			expect(callback).toHaveBeenCalledTimes(1);

			vi.advanceTimersByTime(5000);
			expect(callback).toHaveBeenCalledTimes(2);

			cleanup();
		});

		it('cleanup function stops the interval', () => {
			const callback = vi.fn();
			const { cleanup } = createSlideshowInterval(callback, 1000);

			vi.advanceTimersByTime(1000);
			expect(callback).toHaveBeenCalledTimes(1);

			cleanup();

			vi.advanceTimersByTime(1000);
			expect(callback).toHaveBeenCalledTimes(1);
		});
	});

	describe('getImageDimensions', () => {
		it('resolves with image dimensions', async () => {
			// Mock Image constructor
			const mockImage = {
				naturalWidth: 1920,
				naturalHeight: 1080,
				onload: null as (() => void) | null,
				onerror: null as (() => void) | null,
				src: ''
			};

			global.Image = vi.fn(() => mockImage) as unknown as typeof Image;

			const promise = getImageDimensions('test-image.jpg');

			// Simulate image load
			mockImage.onload();

			const result = await promise;
			expect(result).toEqual({ width: 1920, height: 1080 });
		});

		it('rejects when image fails to load', async () => {
			const mockImage = {
				naturalWidth: 0,
				naturalHeight: 0,
				onload: null as (() => void) | null,
				onerror: null as (() => void) | null,
				src: ''
			};

			global.Image = vi.fn(() => mockImage) as unknown as typeof Image;

			const promise = getImageDimensions('invalid-image.jpg');

			// Simulate image error
			mockImage.onerror();

			await expect(promise).rejects.toThrow('Failed to load image');
		});
	});
});
