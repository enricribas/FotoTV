import { collection, getDocs, addDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { User } from 'firebase/auth';
// Using built-in crypto.randomUUID() instead of uuid package

export interface ImageCollection {
	uuid: string;
	name: string;
	createdAt: Timestamp;
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
			createdAt: Timestamp.now()
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
}
