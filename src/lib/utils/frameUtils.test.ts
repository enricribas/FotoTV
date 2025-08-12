import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import {
	updateFramePadding,
	createFrameManager,
	ReactiveFrameUpdater,
	createFrameStyleManager,
	type FrameElement
} from './frameUtils';

// Mock slideshowUtils
vi.mock('./slideshowUtils', () => ({
	getImageDimensions: vi.fn(),
	calculateOptimalPadding: vi.fn()
}));

import { getImageDimensions, calculateOptimalPadding } from './slideshowUtils';

describe('frameUtils', () => {
	let mockFrameElement: FrameElement;

	beforeEach(() => {
		vi.clearAllMocks();

		// Mock global window object
		global.window = {
			innerWidth: 1920,
			innerHeight: 1080,
			setTimeout: vi.fn().mockImplementation((fn, delay) => setTimeout(fn, delay)),
			clearTimeout: vi.fn().mockImplementation(clearTimeout),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn()
		} as unknown as Window & typeof globalThis;

		// Mock document
		global.document = {
			documentElement: {
				style: {
					setProperty: vi.fn(),
					removeProperty: vi.fn()
				}
			},
			createElement: vi.fn().mockReturnValue({
				closest: vi.fn()
			})
		} as unknown as Document;

		mockFrameElement = {
			style: {
				paddingTop: '0px',
				paddingRight: '0px',
				paddingBottom: '0px',
				paddingLeft: '0px'
			}
		};
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('updateFramePadding', () => {
		it('successfully updates frame padding', async () => {
			vi.mocked(getImageDimensions).mockResolvedValue({ width: 800, height: 600 });
			vi.mocked(calculateOptimalPadding).mockReturnValue({
				top: 10,
				right: 20,
				bottom: 10,
				left: 20
			});

			const result = await updateFramePadding({
				imageUrl: 'https://example.com/image.jpg',
				frameElement: mockFrameElement
			});

			expect(result.success).toBe(true);
			expect(mockFrameElement.style.paddingTop).toBe('10px');
			expect(mockFrameElement.style.paddingRight).toBe('20px');
			expect(mockFrameElement.style.paddingBottom).toBe('10px');
			expect(mockFrameElement.style.paddingLeft).toBe('20px');
		});

		it('uses custom container dimensions', async () => {
			vi.mocked(getImageDimensions).mockResolvedValue({ width: 800, height: 600 });
			vi.mocked(calculateOptimalPadding).mockReturnValue({
				top: 15,
				right: 25,
				bottom: 15,
				left: 25
			});

			const result = await updateFramePadding({
				imageUrl: 'https://example.com/image.jpg',
				frameElement: mockFrameElement,
				containerWidth: 1200,
				containerHeight: 800,
				frameBorderWidth: 30
			});

			expect(result.success).toBe(true);
			expect(calculateOptimalPadding).toHaveBeenCalledWith(800, 600, 1200, 800, 30);
		});

		it('handles missing frame element', async () => {
			const result = await updateFramePadding({
				imageUrl: 'https://example.com/invalid.jpg',
				frameElement: null as unknown as FrameElement
			});

			expect(result.success).toBe(false);
			expect(result.error).toBe('Missing frame element or image URL');
		});

		it('handles missing image URL', async () => {
			const result = await updateFramePadding({
				imageUrl: '',
				frameElement: mockFrameElement
			});

			expect(result.success).toBe(false);
			expect(result.error).toBe('Missing frame element or image URL');
		});

		it('handles getImageDimensions error', async () => {
			vi.mocked(getImageDimensions).mockRejectedValue(new Error('Failed to load image'));

			const result = await updateFramePadding({
				imageUrl: 'https://example.com/invalid.jpg',
				frameElement: mockFrameElement
			});

			expect(result.success).toBe(false);
			expect(result.error).toBe('Failed to calculate frame padding');
		});

		it('handles calculateOptimalPadding error', async () => {
			vi.mocked(getImageDimensions).mockResolvedValue({ width: 800, height: 600 });
			vi.mocked(calculateOptimalPadding).mockImplementation(() => {
				throw new Error('Calculation error');
			});

			const result = await updateFramePadding({
				imageUrl: 'https://example.com/image.jpg',
				frameElement: mockFrameElement
			});

			expect(result.success).toBe(false);
			expect(result.error).toBe('Failed to calculate frame padding');
		});
	});

	describe('createFrameManager', () => {
		let manager: ReturnType<typeof createFrameManager>;

		beforeEach(() => {
			manager = createFrameManager();
		});

		afterEach(() => {
			manager.stopListening();
		});

		it('sets frame and updates immediately', async () => {
			vi.mocked(getImageDimensions).mockResolvedValue({ width: 800, height: 600 });
			vi.mocked(calculateOptimalPadding).mockReturnValue({
				top: 10,
				right: 20,
				bottom: 10,
				left: 20
			});

			manager.setFrame('https://example.com/image.jpg', mockFrameElement);

			// Wait for async update
			await new Promise((resolve) => setTimeout(resolve, 50));

			expect(mockFrameElement.style.paddingTop).toBe('10px');
		});

		it('starts and stops listening for resize events', () => {
			const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
			const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

			expect(manager.isListening()).toBe(false);

			manager.startListening();
			expect(manager.isListening()).toBe(true);
			expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

			manager.stopListening();
			expect(manager.isListening()).toBe(false);
			expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
		});

		it('handles resize events', async () => {
			vi.mocked(getImageDimensions).mockResolvedValue({ width: 800, height: 600 });
			vi.mocked(calculateOptimalPadding).mockReturnValue({
				top: 10,
				right: 20,
				bottom: 10,
				left: 20
			});

			manager.setFrame('https://example.com/image.jpg', mockFrameElement);
			manager.startListening();

			// Simulate resize
			window.dispatchEvent(new Event('resize'));

			// Wait for debounced update
			await new Promise((resolve) => setTimeout(resolve, 150));

			expect(getImageDimensions).toHaveBeenCalled();
		});

		it('manually triggers update', async () => {
			vi.mocked(getImageDimensions).mockResolvedValue({ width: 800, height: 600 });
			vi.mocked(calculateOptimalPadding).mockReturnValue({
				top: 10,
				right: 20,
				bottom: 10,
				left: 20
			});

			manager.setFrame('https://example.com/image.jpg', mockFrameElement);
			manager.update();

			// Wait for async update
			await new Promise((resolve) => setTimeout(resolve, 50));

			expect(mockFrameElement.style.paddingTop).toBe('10px');
		});

		it('clears frame reference', () => {
			manager.setFrame('https://example.com/image.jpg', mockFrameElement);
			manager.clear();

			// After clearing, update should not work
			manager.update();

			expect(getImageDimensions).not.toHaveBeenCalled();
		});

		it('does not start listening twice', () => {
			const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

			manager.startListening();
			manager.startListening();

			expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('ReactiveFrameUpdater', () => {
		let updater: ReactiveFrameUpdater;

		beforeEach(() => {
			updater = new ReactiveFrameUpdater();
		});

		it('updates frame successfully', async () => {
			vi.mocked(getImageDimensions).mockResolvedValue({ width: 800, height: 600 });
			vi.mocked(calculateOptimalPadding).mockReturnValue({
				top: 10,
				right: 20,
				bottom: 10,
				left: 20
			});

			await updater.updateFrame('https://example.com/image.jpg', mockFrameElement);

			expect(mockFrameElement.style.paddingTop).toBe('10px');
		});

		it('handles null frame element', async () => {
			await updater.updateFrame('https://example.com/image.jpg', null);

			expect(getImageDimensions).not.toHaveBeenCalled();
		});

		it('handles empty image URL', async () => {
			await updater.updateFrame('', mockFrameElement);

			expect(getImageDimensions).not.toHaveBeenCalled();
		});

		it('cancels previous update when new one starts', async () => {
			vi.mocked(getImageDimensions).mockImplementation(
				() => new Promise((resolve) => setTimeout(() => resolve({ width: 800, height: 600 }), 200))
			);

			// Start first update
			const promise1 = updater.updateFrame('https://example.com/image1.jpg', mockFrameElement);

			// Start second update immediately (should cancel first)
			const promise2 = updater.updateFrame('https://example.com/image2.jpg', mockFrameElement);

			await Promise.all([promise1, promise2]);

			// Should have been called twice (once for each update attempt)
			expect(getImageDimensions).toHaveBeenCalledTimes(2);
		});

		it('can be manually cancelled', async () => {
			vi.mocked(getImageDimensions).mockImplementation(
				() => new Promise((resolve) => setTimeout(() => resolve({ width: 800, height: 600 }), 200))
			);

			const promise = updater.updateFrame('https://example.com/image.jpg', mockFrameElement);
			updater.cancel();

			await promise;

			expect(getImageDimensions).toHaveBeenCalled();
		});

		it('handles errors gracefully', async () => {
			vi.mocked(getImageDimensions).mockRejectedValue(new Error('Failed to load'));

			// Should not throw
			await expect(
				updater.updateFrame('https://example.com/image.jpg', mockFrameElement)
			).resolves.toBeUndefined();
		});
	});

	describe('createFrameStyleManager', () => {
		let styleManager: ReturnType<typeof createFrameStyleManager>;

		beforeEach(() => {
			styleManager = createFrameStyleManager();
		});

		it('sets frame border width', () => {
			styleManager.setFrameBorderWidth(60);

			expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
				'--frame-border-width',
				'60px'
			);
		});

		it('sets frame colors', () => {
			styleManager.setFrameColors({
				background: '#ffffff',
				border: '#cccccc',
				shadow: '#000000'
			});

			expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
				'--frame-background',
				'#ffffff'
			);
			expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
				'--frame-border-color',
				'#cccccc'
			);
			expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
				'--frame-shadow-color',
				'#000000'
			);
		});

		it('sets partial frame colors', () => {
			styleManager.setFrameColors({
				background: '#ffffff'
			});

			expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
				'--frame-background',
				'#ffffff'
			);
			expect(document.documentElement.style.setProperty).not.toHaveBeenCalledWith(
				'--frame-border-color',
				expect.any(String)
			);
			expect(document.documentElement.style.setProperty).not.toHaveBeenCalledWith(
				'--frame-shadow-color',
				expect.any(String)
			);
		});

		it('resets to defaults', () => {
			styleManager.resetToDefaults();

			expect(document.documentElement.style.removeProperty).toHaveBeenCalledWith(
				'--frame-border-width'
			);
			expect(document.documentElement.style.removeProperty).toHaveBeenCalledWith(
				'--frame-background'
			);
			expect(document.documentElement.style.removeProperty).toHaveBeenCalledWith(
				'--frame-border-color'
			);
			expect(document.documentElement.style.removeProperty).toHaveBeenCalledWith(
				'--frame-shadow-color'
			);
		});
	});
});
