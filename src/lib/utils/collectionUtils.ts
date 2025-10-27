import type { ImageCollection, CollectionUploadStatus } from '$lib/types/collection.types';
import { db } from '$lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export function calculateUploadStatus(collection: ImageCollection): CollectionUploadStatus {
	const remaining = Math.max(0, collection.imageUploadLimit - collection.currentImageCount);
	const canUpload = remaining > 0;

	return {
		canUpload,
		remaining,
		limit: collection.imageUploadLimit
	};
}

export function isUploadLimitLow(remaining: number): boolean {
	return remaining <= 2 && remaining > 0;
}

export function isUploadLimitExhausted(remaining: number): boolean {
	return remaining === 0;
}

export function generateCollectionDefaults(name: string) {
	return {
		name,
		imageUploadLimit: 10,
		currentImageCount: 0,
		time: 30 // Default slide duration in seconds
	};
}

export function sortCollectionsByDate(collections: ImageCollection[]): ImageCollection[] {
	return collections.sort((a, b) => {
		// Handle missing or invalid createdAt fields
		const aSeconds = a.createdAt?.seconds || 0;
		const bSeconds = b.createdAt?.seconds || 0;
		return bSeconds - aSeconds;
	});
}

export function formatCollectionDisplayName(
	collection: ImageCollection,
	ownerName?: string
): string {
	if (ownerName) {
		return `${ownerName} - ${collection.name}`;
	}
	return collection.name;
}

export async function getCollectionOwnerName(
	collection: ImageCollection,
	currentUserId: string
): Promise<string | undefined> {
	// Only fetch owner name if collection has an owner different from current user
	if (collection.owner && collection.owner !== currentUserId) {
		try {
			const userDoc = await getDoc(doc(db, 'users', collection.owner));
			if (userDoc.exists()) {
				const userData = userDoc.data();
				return userData.displayName || undefined;
			}
		} catch (err) {
			console.error('Error loading owner name for collection:', collection.uuid, err);
		}
	}
	return undefined;
}
