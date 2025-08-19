import type { User } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { ImageCollection } from '$lib/types/collection.types';
import { sortCollectionsByDate } from '$lib/utils/collectionUtils';
import { CollectionMutation } from './collectionMutation';

export class CollectionQuery {
	static async getUserCollections(user: User): Promise<ImageCollection[]> {
		try {
			const collectionsRef = collection(db, `users/${user.uid}/collections`);
			const snapshot = await getDocs(collectionsRef);

			const collections: ImageCollection[] = [];
			snapshot.forEach((docSnapshot) => {
				const data = docSnapshot.data() as Omit<ImageCollection, 'uuid'>;
				collections.push({
					...data,
					uuid: docSnapshot.id
				});
			});

			return sortCollectionsByDate(collections);
		} catch (error) {
			console.error('Error loading user collections:', error);
			return [];
		}
	}

	static async hasAccessToCollection(user: User, uuid: string): Promise<boolean> {
		try {
			const collectionDocRef = doc(db, `users/${user.uid}/collections`, uuid);
			const collectionDoc = await getDoc(collectionDocRef);
			return collectionDoc.exists();
		} catch (error) {
			console.error('Error checking collection access:', error);
			return false;
		}
	}

	static async getCollectionInfo(user: User, uuid: string): Promise<ImageCollection | null> {
		const collections = await this.getUserCollections(user);
		return collections.find((collection) => collection.uuid === uuid) || null;
	}

	static async getPrimaryCollection(user: User): Promise<string> {
		const collections = await this.getUserCollections(user);

		if (collections.length === 0) {
			return await CollectionMutation.createCollection(user, user.email || 'My Photos');
		}

		return collections[0].uuid;
	}

	static async verifyCollectionExists(user: User, uuid: string): Promise<boolean> {
		try {
			const collectionDocRef = doc(db, `users/${user.uid}/collections`, uuid);
			const collectionDoc = await getDoc(collectionDocRef);
			return collectionDoc.exists();
		} catch (error) {
			console.error('Error verifying collection exists:', error);
			return false;
		}
	}
}
