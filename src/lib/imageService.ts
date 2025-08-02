import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '$lib/firebase';
import type { User } from 'firebase/auth';

export class ImageService {
	/**
	 * Load all images for a specific user from Firebase Storage
	 * @param user - The authenticated user
	 * @returns Array of image URLs sorted by upload time
	 */
	static async loadUserImages(user: User | null): Promise<string[]> {
		if (!user) {
			return [];
		}

		try {
			const userRef = ref(storage, `images/${user.uid}`);
			const result = await listAll(userRef);

			// Sort items by name (which includes timestamp for consistent ordering)
			const sortedItems = result.items.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});

			// Get download URLs for all images
			const imageUrls = await Promise.all(
				sortedItems.map(async (itemRef) => {
					return await getDownloadURL(itemRef);
				})
			);

			return imageUrls;
		} catch (error) {
			console.error('Error loading images:', error);
			return [];
		}
	}

	/**
	 * Retry loading images with exponential backoff
	 * Useful after uploading to ensure Firebase Storage has synced
	 * @param user - The authenticated user
	 * @param previousCount - Previous image count to verify new images were added
	 * @param maxRetries - Maximum number of retry attempts (default: 3)
	 * @returns Array of image URLs
	 */
	static async loadUserImagesWithRetry(
		user: User | null,
		previousCount: number = 0,
		maxRetries: number = 3
	): Promise<string[]> {
		if (!user) {
			return [];
		}

		let retries = 0;
		let imageUrls: string[] = [];

		while (retries < maxRetries) {
			// Wait with exponential backoff
			if (retries > 0) {
				await new Promise((resolve) => setTimeout(resolve, 500 * retries));
			}

			imageUrls = await this.loadUserImages(user);

			// If we found more images than before, we're done
			if (imageUrls.length > previousCount) {
				break;
			}

			retries++;
		}

		return imageUrls;
	}
}
