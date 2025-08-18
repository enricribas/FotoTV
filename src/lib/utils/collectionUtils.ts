import type { ImageCollection, CollectionUploadStatus } from '$lib/types/collection.types';

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
		currentImageCount: 0
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
