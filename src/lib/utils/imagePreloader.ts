import type { StorageReference } from 'firebase/storage';
import { getImageUrl } from './storageUtils';

interface PreloadedImage {
	url: string;
	image: HTMLImageElement;
	timestamp: number;
}

interface PreloadResult {
	success: boolean;
	url?: string;
	error?: string;
}

export class ImagePreloader {
	private cache = new Map<string, PreloadedImage>();
	private maxCacheSize = 10; // Maximum number of images to keep cached
	private preloadPromises = new Map<string, Promise<PreloadResult>>();

	/**
	 * Preload an image from a storage reference
	 */
	async preloadImage(imageRef: StorageReference): Promise<PreloadResult> {
		const refPath = imageRef.fullPath;

		// Check if already cached
		if (this.cache.has(refPath)) {
			const cached = this.cache.get(refPath)!;
			return { success: true, url: cached.url };
		}

		// Check if already being preloaded
		if (this.preloadPromises.has(refPath)) {
			return await this.preloadPromises.get(refPath)!;
		}

		// Start preloading
		const preloadPromise = this.performPreload(imageRef);
		this.preloadPromises.set(refPath, preloadPromise);

		try {
			const result = await preloadPromise;
			return result;
		} finally {
			this.preloadPromises.delete(refPath);
		}
	}

	/**
	 * Get a preloaded image if available
	 */
	getPreloadedImage(imageRef: StorageReference): string | null {
		const cached = this.cache.get(imageRef.fullPath);
		return cached ? cached.url : null;
	}

	/**
	 * Preload multiple images in the background
	 */
	async preloadImages(imageRefs: StorageReference[]): Promise<void> {
		const preloadPromises = imageRefs.map((ref) =>
			this.preloadImage(ref).catch((error) => {
				console.warn('Failed to preload image:', error);
				return { success: false, error: error.message };
			})
		);

		await Promise.allSettled(preloadPromises);
	}

	/**
	 * Preload next and previous images based on current index
	 */
	async preloadAdjacent(
		imageRefs: StorageReference[],
		currentIndex: number,
		preloadCount: number = 2
	): Promise<void> {
		if (imageRefs.length === 0) return;

		const toPreload: StorageReference[] = [];

		// Preload next images
		for (let i = 1; i <= preloadCount; i++) {
			const nextIndex = (currentIndex + i) % imageRefs.length;
			toPreload.push(imageRefs[nextIndex]);
		}

		// Preload previous images
		for (let i = 1; i <= preloadCount; i++) {
			const prevIndex = (currentIndex - i + imageRefs.length) % imageRefs.length;
			toPreload.push(imageRefs[prevIndex]);
		}

		await this.preloadImages(toPreload);
	}

	/**
	 * Clear all cached images
	 */
	clearCache(): void {
		this.cache.clear();
		this.preloadPromises.clear();
	}

	/**
	 * Remove old cached images to manage memory
	 */
	private cleanupCache(): void {
		if (this.cache.size <= this.maxCacheSize) return;

		// Sort by timestamp and remove oldest
		const entries = Array.from(this.cache.entries()).sort(
			(a, b) => a[1].timestamp - b[1].timestamp
		);

		const toRemove = entries.slice(0, entries.length - this.maxCacheSize);
		toRemove.forEach(([key]) => this.cache.delete(key));
	}

	/**
	 * Actually perform the image preloading
	 */
	private async performPreload(imageRef: StorageReference): Promise<PreloadResult> {
		try {
			// Get the download URL
			const urlResult = await getImageUrl(imageRef);
			if (urlResult.error) {
				return { success: false, error: urlResult.error };
			}

			// Create and load the image
			const image = new Image();
			const loadPromise = new Promise<void>((resolve, reject) => {
				image.onload = () => resolve();
				image.onerror = () => reject(new Error('Failed to load image'));
			});

			image.src = urlResult.url;
			await loadPromise;

			// Cache the loaded image
			const preloadedImage: PreloadedImage = {
				url: urlResult.url,
				image,
				timestamp: Date.now()
			};

			this.cache.set(imageRef.fullPath, preloadedImage);
			this.cleanupCache();

			return { success: true, url: urlResult.url };
		} catch (error) {
			console.error('Error preloading image:', error);
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}

	/**
	 * Check if an image is cached
	 */
	isCached(imageRef: StorageReference): boolean {
		return this.cache.has(imageRef.fullPath);
	}

	/**
	 * Get cache statistics
	 */
	getCacheStats(): { size: number; maxSize: number } {
		return {
			size: this.cache.size,
			maxSize: this.maxCacheSize
		};
	}
}

// Export a singleton instance
export const imagePreloader = new ImagePreloader();
