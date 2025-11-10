import {
	ref,
	listAll,
	getDownloadURL,
	deleteObject,
	type StorageReference
} from 'firebase/storage';
import { storage } from '$lib/firebase';
import { shuffleImages } from './slideshowUtils';

export interface ImageListResult {
	imageRefs: StorageReference[];
	error?: string;
}

export interface ImageUrlResult {
	url: string;
	error?: string;
}

/**
 * Load all image references for a collection
 */
export async function loadCollectionImageRefs(collectionUuid: string): Promise<ImageListResult> {
	try {
		const collectionRef = ref(storage, `images/${collectionUuid}`);
		const result = await listAll(collectionRef);
		const shuffledRefs = shuffleImages(result.items);

		return {
			imageRefs: shuffledRefs
		};
	} catch (error) {
		console.error('Error loading image references:', error);
		return {
			imageRefs: [],
			error: 'Failed to load images. Please try again.'
		};
	}
}

/**
 * Get download URL for a storage reference
 */
export async function getImageUrl(imageRef: StorageReference): Promise<ImageUrlResult> {
	try {
		const url = await getDownloadURL(imageRef);
		return { url };
	} catch (error) {
		console.error('Error getting image URL:', error);
		return {
			url: '',
			error: 'Failed to load image URL'
		};
	}
}

/**
 * Delete an image from Firebase Storage
 */
export async function deleteImage(
	imageRef: StorageReference
): Promise<{ success: boolean; error?: string }> {
	try {
		await deleteObject(imageRef);
		return { success: true };
	} catch (error) {
		console.error('Error deleting image:', error);
		return {
			success: false,
			error: 'Failed to delete image. Please try again.'
		};
	}
}

/**
 * Remove image reference from array by index
 */
export function removeImageFromList(
	imageRefs: StorageReference[],
	index: number
): StorageReference[] {
	return imageRefs.filter((_, i) => i !== index);
}

/**
 * Check if image list has been updated (useful for refresh operations)
 */
export async function checkForImageUpdates(
	currentRefs: StorageReference[],
	collectionUuid: string
): Promise<{ hasUpdates: boolean; newRefs?: StorageReference[] }> {
	try {
		const result = await loadCollectionImageRefs(collectionUuid);
		if (result.error) {
			return { hasUpdates: false };
		}

		const hasUpdates = currentRefs.length !== result.imageRefs.length;
		return {
			hasUpdates,
			newRefs: hasUpdates ? result.imageRefs : undefined
		};
	} catch (error) {
		console.error('Error checking for image updates:', error);
		return { hasUpdates: false };
	}
}
