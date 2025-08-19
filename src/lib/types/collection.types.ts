import type { Timestamp } from 'firebase/firestore';

export interface ImageCollection {
	uuid: string;
	name: string;
	createdAt: Timestamp;
	imageUploadLimit: number;
	currentImageCount: number;
	updatedAt: Timestamp;
	time?: number; // Transition time in seconds
}

export interface CollectionUploadStatus {
	canUpload: boolean;
	remaining: number;
	limit: number;
}
