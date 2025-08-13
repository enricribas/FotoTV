import { getAdvancedDeviceInfo } from './advancedDeviceDetection';

/**
 * TV-specific utility functions for conditional UI and behavior
 */
export class TVUtils {
	private static cachedDeviceInfo: import('./advancedDeviceDetection').AdvancedDeviceInfo | null =
		null;
	private static cacheTime = 0;
	private static readonly CACHE_DURATION = 5000; // 5 seconds

	/**
	 * Get cached device info or fetch fresh if expired
	 */
	private static async getCachedDeviceInfo(): Promise<
		import('./advancedDeviceDetection').AdvancedDeviceInfo | null
	> {
		const now = Date.now();
		if (!this.cachedDeviceInfo || now - this.cacheTime > this.CACHE_DURATION) {
			this.cachedDeviceInfo = await getAdvancedDeviceInfo();
			this.cacheTime = now;
		}
		return this.cachedDeviceInfo;
	}

	/**
	 * Checks if the current device should use TV UI
	 */
	static async shouldUseTVUI(): Promise<boolean> {
		const deviceInfo = await this.getCachedDeviceInfo();
		return deviceInfo?.shouldUseTVUI ?? false;
	}

	/**
	 * Returns TV-appropriate classes for UI elements
	 */
	static async getTVClasses(mobileClasses: string, tvClasses: string): Promise<string> {
		const useTV = await this.shouldUseTVUI();
		return useTV ? tvClasses : mobileClasses;
	}

	/**
	 * Returns appropriate padding/spacing for TV vs mobile
	 */
	static async getSpacingClasses(): Promise<string> {
		const useTV = await this.shouldUseTVUI();
		return useTV ? 'p-8 gap-8' : 'p-4 gap-4';
	}

	/**
	 * Returns appropriate text sizes for TV vs mobile
	 */
	static async getTextSizeClasses(): Promise<string> {
		const useTV = await this.shouldUseTVUI();
		return useTV ? 'text-2xl' : 'text-base';
	}

	/**
	 * Returns appropriate button sizes for TV vs mobile
	 */
	static async getButtonClasses(): Promise<string> {
		const useTV = await this.shouldUseTVUI();
		return useTV ? 'btn-lg px-8 py-4 text-xl min-h-16' : 'btn-md px-4 py-2 text-base min-h-12';
	}

	/**
	 * Returns grid layout classes optimized for TV vs mobile
	 */
	static async getGridClasses(): Promise<string> {
		const useTV = await this.shouldUseTVUI();
		return useTV
			? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
			: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
	}

	/**
	 * Checks if device has physical keyboard
	 */
	static async hasPhysicalKeyboard(): Promise<boolean> {
		const deviceInfo = await this.getCachedDeviceInfo();
		return deviceInfo?.hasPhysicalKeyboard ?? false;
	}

	/**
	 * Checks if device is touch-enabled
	 */
	static async isTouchDevice(): Promise<boolean> {
		const deviceInfo = await this.getCachedDeviceInfo();
		return deviceInfo?.isTouchDevice ?? true;
	}

	/**
	 * Returns focus ring classes appropriate for the device
	 */
	static async getFocusClasses(): Promise<string> {
		const useTV = await this.shouldUseTVUI();
		const hasKeyboard = await this.hasPhysicalKeyboard();

		if (useTV || hasKeyboard) {
			// Prominent focus indicators for TV/keyboard navigation
			return 'focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black';
		}
		// Subtle focus for touch devices
		return 'focus:ring-2 focus:ring-blue-300';
	}

	/**
	 * Sets up keyboard navigation for TV/desktop usage
	 */
	static setupKeyboardNavigation(container: HTMLElement) {
		const focusableElements = container.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

		let currentIndex = 0;

		const handleKeydown = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					currentIndex = Math.min(currentIndex + 1, focusableElements.length - 1);
					(focusableElements[currentIndex] as HTMLElement).focus();
					break;

				case 'ArrowUp':
					event.preventDefault();
					currentIndex = Math.max(currentIndex - 1, 0);
					(focusableElements[currentIndex] as HTMLElement).focus();
					break;

				case 'ArrowRight':
					// For grid layouts, move right
					event.preventDefault();
					currentIndex = Math.min(currentIndex + 1, focusableElements.length - 1);
					(focusableElements[currentIndex] as HTMLElement).focus();
					break;

				case 'ArrowLeft':
					// For grid layouts, move left
					event.preventDefault();
					currentIndex = Math.max(currentIndex - 1, 0);
					(focusableElements[currentIndex] as HTMLElement).focus();
					break;

				case 'Enter':
				case ' ':
					event.preventDefault();
					(focusableElements[currentIndex] as HTMLElement).click();
					break;
			}
		};

		container.addEventListener('keydown', handleKeydown);

		// Return cleanup function
		return () => {
			container.removeEventListener('keydown', handleKeydown);
		};
	}

	/**
	 * Creates a reactive store for TV UI state
	 */
	static createTVUIStore() {
		let isTVUI = false;
		let isLoading = true;
		const subscribers = new Set<(state: { isTVUI: boolean; isLoading: boolean }) => void>();

		const updateState = async () => {
			try {
				isTVUI = await this.shouldUseTVUI();
			} catch (error) {
				console.warn('Failed to update TV UI state:', error);
			} finally {
				isLoading = false;
				const state = { isTVUI, isLoading };
				subscribers.forEach((callback) => callback(state));
			}
		};

		// Initial load
		updateState();

		// Update on resize/orientation change
		const handleResize = () => {
			// Clear cache to force refresh
			this.cachedDeviceInfo = null;
			updateState();
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		return {
			subscribe: (callback: (state: { isTVUI: boolean; isLoading: boolean }) => void) => {
				subscribers.add(callback);
				callback({ isTVUI, isLoading }); // Initial call

				return () => {
					subscribers.delete(callback);
					if (subscribers.size === 0) {
						window.removeEventListener('resize', handleResize);
						window.removeEventListener('orientationchange', handleResize);
					}
				};
			},
			get: () => ({ isTVUI, isLoading })
		};
	}

	/**
	 * Returns image loading strategy appropriate for the device
	 */
	static async getImageLoadingStrategy(): Promise<'eager' | 'lazy'> {
		const useTV = await this.shouldUseTVUI();
		// TV devices typically have better performance, can load eagerly
		return useTV ? 'eager' : 'lazy';
	}

	/**
	 * Returns appropriate image sizes for different screen types
	 */
	static async getImageSizes(): Promise<string> {
		const deviceInfo = await this.getCachedDeviceInfo();
		if (!deviceInfo) return 'mobile';

		switch (deviceInfo.screenType) {
			case 'tv':
				return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
			case 'desktop':
				return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw';
			case 'tablet':
				return '(max-width: 768px) 100vw, 50vw';
			case 'mobile':
			default:
				return '100vw';
		}
	}

	/**
	 * Shows/hides virtual keyboard helper for TV devices
	 */
	static async shouldShowVirtualKeyboard(): Promise<boolean> {
		const deviceInfo = await this.getCachedDeviceInfo();
		return !!(deviceInfo?.isTV && !deviceInfo?.hasPhysicalKeyboard);
	}

	/**
	 * Returns appropriate modal/dialog positioning for the device
	 */
	static async getModalClasses(): Promise<string> {
		const useTV = await this.shouldUseTVUI();
		return useTV
			? 'modal-middle max-w-4xl w-11/12 max-h-[80vh]' // Larger, centered for TV
			: 'modal-bottom sm:modal-middle max-w-lg w-11/12'; // Bottom sheet on mobile, centered on larger screens
	}

	/**
	 * Detects if the app is running on a specific TV platform
	 */
	static async getTVPlatform(): Promise<string | null> {
		const deviceInfo = await this.getCachedDeviceInfo();
		if (!deviceInfo) return null;

		if (!deviceInfo.isTV) return null;

		const userAgent = navigator.userAgent.toLowerCase();
		const model = deviceInfo.deviceInfo?.model?.toLowerCase() || '';
		const manufacturer = deviceInfo.deviceInfo?.manufacturer?.toLowerCase() || '';

		if (userAgent.includes('googletv') || model.includes('chromecast')) {
			return 'google-tv';
		}
		if (manufacturer.includes('nvidia') || model.includes('shield')) {
			return 'nvidia-shield';
		}
		if (manufacturer.includes('sony') || model.includes('bravia')) {
			return 'sony-tv';
		}
		if (userAgent.includes('android tv')) {
			return 'android-tv';
		}

		return 'unknown-tv';
	}

	/**
	 * Performance optimization: preload critical resources for TV
	 */
	static async optimizeForTV() {
		const useTV = await this.shouldUseTVUI();

		if (useTV) {
			// Add TV-specific optimizations
			document.documentElement.style.setProperty('--tv-safe-area-top', '48px');
			document.documentElement.style.setProperty('--tv-safe-area-bottom', '48px');
			document.documentElement.style.setProperty('--tv-safe-area-left', '48px');
			document.documentElement.style.setProperty('--tv-safe-area-right', '48px');

			// Add TV-specific body class for CSS targeting
			document.body.classList.add('tv-device');
		} else {
			document.body.classList.remove('tv-device');
		}
	}
}

// Convenience exports for common use cases
export const shouldUseTVUI = () => TVUtils.shouldUseTVUI();
export const hasPhysicalKeyboard = () => TVUtils.hasPhysicalKeyboard();
export const isTouchDevice = () => TVUtils.isTouchDevice();
export const getTVClasses = (mobile: string, tv: string) => TVUtils.getTVClasses(mobile, tv);
export const setupKeyboardNavigation = (container: HTMLElement) =>
	TVUtils.setupKeyboardNavigation(container);
export const tvUIStore = TVUtils.createTVUIStore();

// Auto-optimize on load
if (typeof window !== 'undefined') {
	TVUtils.optimizeForTV();
}
