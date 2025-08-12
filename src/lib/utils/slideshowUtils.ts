import type { StorageReference } from 'firebase/storage';

export interface SlideshowState {
	currentImageIndex: number;
	totalImages: number;
}

export interface ImageDimensions {
	width: number;
	height: number;
}

export interface PaddingConfig {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

/**
 * Calculate the next image index in a slideshow
 */
export function getNextImageIndex(currentIndex: number, totalImages: number): number {
	if (totalImages === 0) return 0;
	return (currentIndex + 1) % totalImages;
}

/**
 * Calculate the previous image index in a slideshow
 */
export function getPreviousImageIndex(currentIndex: number, totalImages: number): number {
	if (totalImages === 0) return 0;
	return currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
}

/**
 * Sort storage references by name (which includes timestamp)
 */
export function sortImagesByName(imageRefs: StorageReference[]): StorageReference[] {
	return [...imageRefs].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Calculate optimal padding for image display based on aspect ratios
 */
export function calculateOptimalPadding(
	imageWidth: number,
	imageHeight: number,
	frameWidth: number,
	frameHeight: number,
	minPadding: number = 50
): PaddingConfig {
	const imageAspectRatio = imageWidth / imageHeight;
	const screenAspectRatio = frameWidth / frameHeight;

	if (imageAspectRatio > screenAspectRatio) {
		// Image is wider - use minimum horizontal padding, expand vertical padding
		const paddingHorizontal = minPadding;
		const availableWidth = frameWidth - minPadding * 2;
		const scaledHeight = availableWidth / imageAspectRatio;
		const totalVerticalPadding = frameHeight - scaledHeight;
		const paddingVertical = Math.max(minPadding, totalVerticalPadding / 2);

		return {
			top: paddingVertical,
			right: paddingHorizontal,
			bottom: paddingVertical,
			left: paddingHorizontal
		};
	} else {
		// Image is taller - use minimum vertical padding, expand horizontal padding
		const paddingVertical = minPadding;
		const availableHeight = frameHeight - minPadding * 2;
		const scaledWidth = availableHeight * imageAspectRatio;
		const totalHorizontalPadding = frameWidth - scaledWidth;
		const paddingHorizontal = Math.max(minPadding, totalHorizontalPadding / 2);

		return {
			top: paddingVertical,
			right: paddingHorizontal,
			bottom: paddingVertical,
			left: paddingHorizontal
		};
	}
}

/**
 * Handle keyboard navigation for slideshow
 */
export function handleSlideshowKeydown(
	event: KeyboardEvent,
	callbacks: {
		onNext: () => void;
		onPrevious: () => void;
		onBack: () => void;
		onToggleControls: () => void;
	}
): void {
	switch (event.key) {
		case 'ArrowRight':
		case ' ':
			event.preventDefault();
			callbacks.onNext();
			break;
		case 'ArrowLeft':
			event.preventDefault();
			callbacks.onPrevious();
			break;
		case 'Escape':
			event.preventDefault();
			callbacks.onBack();
			break;
		case 'Enter':
		case 'c':
		case 'C':
			event.preventDefault();
			callbacks.onToggleControls();
			break;
	}
}

/**
 * Check if two arrays of storage references have different lengths
 */
export function hasImageListChanged(
	oldRefs: StorageReference[],
	newRefs: StorageReference[]
): boolean {
	return oldRefs.length !== newRefs.length;
}

/**
 * Safely adjust current index when images are removed
 */
export function adjustIndexAfterDeletion(
	currentIndex: number,
	totalImagesAfterDeletion: number
): number {
	if (totalImagesAfterDeletion === 0) return 0;
	return Math.min(currentIndex, totalImagesAfterDeletion - 1);
}

/**
 * Create slideshow interval with cleanup function
 */
export function createSlideshowInterval(
	callback: () => void,
	intervalMs: number = 10000
): { intervalId: NodeJS.Timeout; cleanup: () => void } {
	const intervalId = setInterval(callback, intervalMs);

	return {
		intervalId,
		cleanup: () => clearInterval(intervalId)
	};
}

/**
 * Get natural image dimensions from URL
 */
export function getImageDimensions(imageUrl: string): Promise<ImageDimensions> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight
			});
		};
		img.onerror = () => {
			reject(new Error('Failed to load image'));
		};
		img.src = imageUrl;
	});
}
