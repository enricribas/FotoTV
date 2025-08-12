import { collection, getDocs, doc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { User } from 'firebase/auth';
// Using built-in crypto.randomUUID() instead of uuid package

export interface ImageCollection {
	uuid: string;
	name: string;
	createdAt: Timestamp;
	imageUploadLimit: number;
	currentImageCount: number;
	updatedAt: Timestamp;
}

export class CollectionService {
	/**
	 * Get all collections for a user
	 * @param user - The authenticated user
	 * @returns Array of collections
	 */
	static async getUserCollections(user: User): Promise<ImageCollection[]> {
		try {
			const collectionsRef = collection(db, `users/${user.uid}/collections`);
			const snapshot = await getDocs(collectionsRef);

			const collections: ImageCollection[] = [];
			snapshot.forEach((docSnapshot) => {
				const data = docSnapshot.data() as Omit<ImageCollection, 'uuid'>;
				collections.push({
					...data,
					uuid: docSnapshot.id // UUID is the document ID
				});
			});
			// Sort by creation date (newest first)
			return collections.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
		} catch (error) {
			console.error('Error loading user collections:', error);
			return [];
		}
	}

	/**
	 * Get the primary collection for a user (creates one if none exists)
	 * @param user - The authenticated user
	 * @returns The primary collection UUID
	 */
	static async getPrimaryCollection(user: User): Promise<string> {
		const collections = await this.getUserCollections(user);

		if (collections.length === 0) {
			// Create first collection for user
			return await this.createCollection(user, user.email || 'My Photos');
		}

		// Return the first (most recent) collection
		return collections[0].uuid;
	}

	/**
	 * Create a new collection for a user
	 * @param user - The authenticated user
	 * @param name - Optional name for the collection (defaults to user email)
	 * @returns The new collection UUID
	 */
	static async createCollection(user: User, name?: string): Promise<string> {
		const uuid = crypto.randomUUID();
		const collectionName = name || user.email || 'My Photos';

		const newCollection = {
			name: collectionName,
			createdAt: Timestamp.now(),
			imageUploadLimit: 10, // Default limit of 10 images per collection
			currentImageCount: 0,
			updatedAt: Timestamp.now()
		};

		try {
			// Use UUID as document ID
			const collectionDocRef = doc(db, `users/${user.uid}/collections`, uuid);
			await setDoc(collectionDocRef, newCollection);
			return uuid;
		} catch (error) {
			console.error('Error creating collection:', error);
			throw error;
		}
	}

	/**
	 * Check if a user has access to a specific collection UUID
	 * @param user - The authenticated user
	 * @param uuid - The collection UUID to check
	 * @returns True if user has access
	 */
	static async hasAccessToCollection(user: User, uuid: string): Promise<boolean> {
		const collections = await this.getUserCollections(user);
		return collections.some((collection) => collection.uuid === uuid);
	}

	/**
	 * Get collection info by UUID (only if user has access)
	 * @param user - The authenticated user
	 * @param uuid - The collection UUID
	 * @returns Collection info or null if no access
	 */
	static async getCollectionInfo(user: User, uuid: string): Promise<ImageCollection | null> {
		const collections = await this.getUserCollections(user);
		return collections.find((collection) => collection.uuid === uuid) || null;
	}

	/**
	 * Update collection's current image count
	 * @param user - The authenticated user
	 * @param collectionUuid - The collection UUID
	 * @param newCount - The new image count
	 */
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

	/**
	 * Increment collection's image count by 1
	 * @param user - The authenticated user
	 * @param collectionUuid - The collection UUID
	 */
	static async incrementImageCount(user: User, collectionUuid: string): Promise<void> {
		const collections = await this.getUserCollections(user);
		const collection = collections.find((c) => c.uuid === collectionUuid);

		if (!collection) {
			throw new Error(`Collection ${collectionUuid} not found`);
		}

		await this.updateImageCount(user, collectionUuid, collection.currentImageCount + 1);
	}

	/**
	 * Check if user can upload more images to a specific collection
	 * @param user - The authenticated user
	 * @param collectionUuid - The collection UUID
	 * @returns Object with canUpload boolean and remaining count
	 */
	static async canUploadImage(
		user: User,
		collectionUuid: string
	): Promise<{ canUpload: boolean; remaining: number; limit: number }> {
		const collections = await this.getUserCollections(user);
		const collection = collections.find((c) => c.uuid === collectionUuid);

		if (!collection) {
			throw new Error(`Collection ${collectionUuid} not found`);
		}

		const remaining = Math.max(0, collection.imageUploadLimit - collection.currentImageCount);
		const canUpload = remaining > 0;

		return {
			canUpload,
			remaining,
			limit: collection.imageUploadLimit
		};
	}

	/**
	 * Sync collection's actual image count with Firestore
	 * This should be called periodically to ensure accuracy
	 * @param user - The authenticated user
	 * @param collectionUuid - The collection UUID
	 */
	static async syncImageCount(user: User, collectionUuid: string): Promise<void> {
		try {
			// Dynamic import to avoid circular dependency
			const { ImageService } = await import('./imageService');
			const images = await ImageService.loadCollectionImages(collectionUuid);
			await this.updateImageCount(user, collectionUuid, images.length);
		} catch (error) {
			console.error('Error syncing collection image count:', error);
			throw error;
		}
	}

	/**
	 * Update collection's upload limit (for admin purposes)
	 * @param user - The authenticated user
	 * @param collectionUuid - The collection UUID
	 * @param newLimit - The new upload limit
	 */
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
}
