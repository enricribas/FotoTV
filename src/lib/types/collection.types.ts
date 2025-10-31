import type { Timestamp } from 'firebase/firestore';

export interface ImageCollection {
	uuid: string;
	name: string;
	createdAt: Timestamp;
	imageUploadLimit: number;
	currentImageCount: number;
	updatedAt: Timestamp;
	time?: number; // Transition time in seconds
	theme?: 'light' | 'dark'; // Slideshow background theme
	owner?: string; // UID of the collection owner (for shared collections)
	sharedWith?: Array<{
		uid: string;
		displayName: string;
		sharedAt: Date;
	}>; // Array of users who have accepted this shared collection
}

export interface CollectionUploadStatus {
	canUpload: boolean;
	remaining: number;
	limit: number;
}
