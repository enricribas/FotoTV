import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '$lib/firebase';
import type { User } from 'firebase/auth';
import { CollectionService } from './collectionService';

export class ImageService {
	/**
	 * Load all images for a specific user from Firebase Storage using their primary collection
	 * @param user - The authenticated user
	 * @returns Array of image URLs sorted by upload time
	 */
	static async loadUserImages(user: User | null): Promise<string[]> {
		if (!user) {
			return [];
		}

		try {
			// Get the user's primary collection UUID
			const collectionUuid = await CollectionService.getPrimaryCollection(user);
			return await this.loadCollectionImages(collectionUuid);
		} catch (error) {
			console.error('Error loading user images:', error);
			return [];
		}
	}

	/**
	 * Load all images for a specific collection UUID from Firebase Storage
	 * @param collectionUuid - The collection UUID
	 * @returns Array of image URLs sorted by upload time
	 */
	static async loadCollectionImages(collectionUuid: string): Promise<string[]> {
		try {
			const collectionRef = ref(storage, `images/${collectionUuid}`);
			const result = await listAll(collectionRef);

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
			console.error('Error loading collection images:', error);
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

	/**
	 * Retry loading collection images with exponential backoff
	 * @param collectionUuid - The collection UUID
	 * @param previousCount - Previous image count to verify new images were added
	 * @param maxRetries - Maximum number of retry attempts (default: 3)
	 * @returns Array of image URLs
	 */
	static async loadCollectionImagesWithRetry(
		collectionUuid: string,
		previousCount: number = 0,
		maxRetries: number = 3
	): Promise<string[]> {
		let retries = 0;
		let imageUrls: string[] = [];

		while (retries < maxRetries) {
			// Wait with exponential backoff
			if (retries > 0) {
				await new Promise((resolve) => setTimeout(resolve, 500 * retries));
			}

			imageUrls = await this.loadCollectionImages(collectionUuid);

			// If we found more images than before, we're done
			if (imageUrls.length > previousCount) {
				break;
			}

			retries++;
		}

		return imageUrls;
	}

	/**
	 * Delete an image from Firebase Storage by its URL
	 * @param imageUrl - The download URL of the image to delete
	 * @returns Success status
	 */
	static async deleteImage(imageUrl: string): Promise<void> {
		try {
			// Extract the path from the download URL
			// Firebase Storage URLs contain the path in the 'o' parameter
			const url = new URL(imageUrl);
			const encodedPath = url.pathname.split('/o/')[1].split('?')[0];
			const decodedPath = decodeURIComponent(encodedPath);

			// Create a reference to the file to delete
			const imageRef = ref(storage, decodedPath);

			// Delete the file
			await deleteObject(imageRef);
		} catch (error) {
			console.error('Error deleting image:', error);
			throw new Error('Failed to delete image');
		}
	}
}
