import { getImageDimensions, calculateOptimalPadding } from './slideshowUtils';

export interface FrameElement {
	style: {
		paddingTop: string;
		paddingRight: string;
		paddingBottom: string;
		paddingLeft: string;
	};
}

export interface FrameUpdateOptions {
	imageUrl: string;
	frameElement: FrameElement;
	containerWidth?: number;
	containerHeight?: number;
	frameBorderWidth?: number;
}

/**
 * Updates frame padding based on image dimensions and container size
 */
export async function updateFramePadding(options: FrameUpdateOptions): Promise<{
	success: boolean;
	error?: string;
}> {
	const {
		imageUrl,
		frameElement,
		containerWidth = window.innerWidth,
		containerHeight = window.innerHeight,
		frameBorderWidth = 50
	} = options;

	if (!frameElement || !imageUrl) {
		return { success: false, error: 'Missing frame element or image URL' };
	}

	try {
		const dimensions = await getImageDimensions(imageUrl);
		const padding = calculateOptimalPadding(
			dimensions.width,
			dimensions.height,
			containerWidth,
			containerHeight,
			frameBorderWidth
		);

		frameElement.style.paddingTop = `${padding.top}px`;
		frameElement.style.paddingRight = `${padding.right}px`;
		frameElement.style.paddingBottom = `${padding.bottom}px`;
		frameElement.style.paddingLeft = `${padding.left}px`;

		return { success: true };
	} catch (error) {
		console.error('Error calculating frame padding:', error);
		return { success: false, error: 'Failed to calculate frame padding' };
	}
}

/**
 * Creates a frame manager for handling resize events and padding updates
 */
export function createFrameManager() {
	let currentImageUrl = '';
	let currentFrameElement: FrameElement | null = null;
	let resizeTimeout: number | null = null;
	let isListening = false;

	const updateWithDelay = (delay: number = 100) => {
		if (resizeTimeout) {
			clearTimeout(resizeTimeout);
		}

		resizeTimeout = window.setTimeout(async () => {
			if (currentImageUrl && currentFrameElement) {
				await updateFramePadding({
					imageUrl: currentImageUrl,
					frameElement: currentFrameElement
				});
			}
			resizeTimeout = null;
		}, delay);
	};

	const handleResize = () => {
		updateWithDelay(100);
	};

	return {
		/**
		 * Sets the current image and frame element for automatic updates
		 */
		setFrame: (imageUrl: string, frameElement: FrameElement) => {
			currentImageUrl = imageUrl;
			currentFrameElement = frameElement;

			// Update immediately
			updateWithDelay(0);
		},

		/**
		 * Starts listening for resize events
		 */
		startListening: () => {
			if (!isListening) {
				window.addEventListener('resize', handleResize);
				isListening = true;
			}
		},

		/**
		 * Stops listening for resize events
		 */
		stopListening: () => {
			if (isListening) {
				window.removeEventListener('resize', handleResize);
				isListening = false;
			}

			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
				resizeTimeout = null;
			}
		},

		/**
		 * Manually triggers a frame update
		 */
		update: () => {
			updateWithDelay(0);
		},

		/**
		 * Clears the current frame reference
		 */
		clear: () => {
			currentImageUrl = '';
			currentFrameElement = null;
		},

		/**
		 * Returns whether the manager is currently listening for resize events
		 */
		isListening: () => isListening
	};
}

/**
 * Reactive frame updater that can be used with Svelte reactive statements
 */
export class ReactiveFrameUpdater {
	private updatePromise: Promise<void> | null = null;

	async updateFrame(imageUrl: string, frameElement: FrameElement | null): Promise<void> {
		// Cancel any pending update
		this.updatePromise = null;

		if (!imageUrl || !frameElement) {
			return;
		}

		// Create new update promise
		this.updatePromise = this.performUpdate(imageUrl, frameElement);

		try {
			await this.updatePromise;
		} catch (error) {
			// Only log if this update wasn't cancelled
			if (this.updatePromise !== null) {
				console.error('Error updating frame:', error);
			}
		}
	}

	private async performUpdate(imageUrl: string, frameElement: FrameElement): Promise<void> {
		// Small delay to ensure DOM is ready
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Check if this update is still valid
		if (this.updatePromise === null) {
			return; // Update was cancelled
		}

		await updateFramePadding({
			imageUrl,
			frameElement
		});
	}

	cancel(): void {
		this.updatePromise = null;
	}
}

/**
 * CSS custom properties manager for frame styling
 */
export function createFrameStyleManager() {
	const root = document.documentElement;

	return {
		/**
		 * Sets the frame border width CSS custom property
		 */
		setFrameBorderWidth: (width: number) => {
			root.style.setProperty('--frame-border-width', `${width}px`);
		},

		/**
		 * Sets frame colors
		 */
		setFrameColors: (colors: { background?: string; border?: string; shadow?: string }) => {
			if (colors.background) {
				root.style.setProperty('--frame-background', colors.background);
			}
			if (colors.border) {
				root.style.setProperty('--frame-border-color', colors.border);
			}
			if (colors.shadow) {
				root.style.setProperty('--frame-shadow-color', colors.shadow);
			}
		},

		/**
		 * Resets frame styles to defaults
		 */
		resetToDefaults: () => {
			root.style.removeProperty('--frame-border-width');
			root.style.removeProperty('--frame-background');
			root.style.removeProperty('--frame-border-color');
			root.style.removeProperty('--frame-shadow-color');
		}
	};
}
