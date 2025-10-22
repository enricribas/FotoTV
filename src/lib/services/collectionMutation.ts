import type { User } from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { CollectionUploadStatus } from '$lib/types/collection.types';
import { generateCollectionDefaults, calculateUploadStatus } from '$lib/utils/collectionUtils';
import { CollectionQuery } from './collectionQuery';

export class CollectionMutation {
	static async createCollection(user: User, name?: string): Promise<string> {
		const uuid = crypto.randomUUID();
		const collectionName = name || user.email || 'My Photos';

		const newCollection = {
			...generateCollectionDefaults(collectionName),
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now()
		};

		try {
			const collectionDocRef = doc(db, `users/${user.uid}/collections`, uuid);
			await setDoc(collectionDocRef, newCollection);

			// Wait for Firestore consistency
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Verify the collection was created successfully
			let verifyAttempts = 0;
			const maxVerifyAttempts = 5;

			while (verifyAttempts < maxVerifyAttempts) {
				const createdDoc = await getDoc(collectionDocRef);
				if (createdDoc.exists()) {
					return uuid;
				}

				await new Promise((resolve) => setTimeout(resolve, 500));
				verifyAttempts++;
			}

			throw new Error('Collection was created but could not be verified');
		} catch (error) {
			console.error('Error creating collection:', error);
			throw error;
		}
	}

	static async updateImageCount(
		user: User,
		collectionUuid: string,
		newCount: number
	): Promise<void> {
		try {
			const collectionDocRef = doc(db, `users/${user.uid}/collections`, collectionUuid);
			await updateDoc(collectionDocRef, {
				currentImageCount: newCount,
				updatedAt: Timestamp.now()
			});
		} catch (error) {
			console.error('Error updating collection image count:', error);
			throw error;
		}
	}

	static async incrementImageCount(user: User, collectionUuid: string): Promise<void> {
		const collection = await CollectionQuery.getCollectionInfo(user, collectionUuid);

		if (!collection) {
			throw new Error(`Collection ${collectionUuid} not found`);
		}

		await this.updateImageCount(user, collectionUuid, collection.currentImageCount + 1);
	}

	static async updateUploadLimit(
		user: User,
		collectionUuid: string,
		newLimit: number
	): Promise<void> {
		try {
			const collectionDocRef = doc(db, `users/${user.uid}/collections`, collectionUuid);
			await updateDoc(collectionDocRef, {
				imageUploadLimit: newLimit,
				updatedAt: Timestamp.now()
			});
		} catch (error) {
			console.error('Error updating collection upload limit:', error);
			throw error;
		}
	}

	static async updateCollectionTime(
		user: User,
		collectionUuid: string,
		time: number
	): Promise<void> {
		try {
			const collectionDocRef = doc(db, `users/${user.uid}/collections`, collectionUuid);
			await updateDoc(collectionDocRef, {
				time: time,
				updatedAt: Timestamp.now()
			});
		} catch (error) {
			console.error('Error updating collection time:', error);
			throw error;
		}
	}

	static async syncImageCount(user: User, collectionUuid: string): Promise<void> {
		try {
			const { ImageService } = await import('../imageService');
			const images = await ImageService.loadCollectionImages(collectionUuid);
			await this.updateImageCount(user, collectionUuid, images.length);
		} catch (error) {
			console.error('Error syncing collection image count:', error);
			throw error;
		}
	}

	static async canUploadImage(user: User, collectionUuid: string): Promise<CollectionUploadStatus> {
		const collection = await CollectionQuery.getCollectionInfo(user, collectionUuid);

		if (!collection) {
			throw new Error(`Collection ${collectionUuid} not found`);
		}

		return calculateUploadStatus(collection);
	}
}
