import type { User } from 'firebase/auth';
import type { ImageCollection, CollectionUploadStatus } from '$lib/types/collection.types';
import { CollectionQuery } from '$lib/services/collectionQuery';
import { CollectionMutation } from '$lib/services/collectionMutation';

export class CollectionService {
	static async getUserCollections(user: User): Promise<ImageCollection[]> {
		return CollectionQuery.getUserCollections(user);
	}

	static async getPrimaryCollection(user: User): Promise<string> {
		return CollectionQuery.getPrimaryCollection(user);
	}

	static async hasAccessToCollection(user: User, uuid: string): Promise<boolean> {
		return CollectionQuery.hasAccessToCollection(user, uuid);
	}

	static async getCollectionInfo(user: User, uuid: string): Promise<ImageCollection | null> {
		return CollectionQuery.getCollectionInfo(user, uuid);
	}

	static async createCollection(user: User, name?: string): Promise<string> {
		return CollectionMutation.createCollection(user, name);
	}

	static async verifyCollectionExists(user: User, uuid: string): Promise<boolean> {
		return CollectionQuery.verifyCollectionExists(user, uuid);
	}

	static async updateImageCount(
		user: User,
		collectionUuid: string,
		newCount: number
	): Promise<void> {
		return CollectionMutation.updateImageCount(user, collectionUuid, newCount);
	}

	static async incrementImageCount(user: User, collectionUuid: string): Promise<void> {
		return CollectionMutation.incrementImageCount(user, collectionUuid);
	}

	static async canUploadImage(user: User, collectionUuid: string): Promise<CollectionUploadStatus> {
		return CollectionMutation.canUploadImage(user, collectionUuid);
	}

	static async syncImageCount(user: User, collectionUuid: string): Promise<void> {
		return CollectionMutation.syncImageCount(user, collectionUuid);
	}

	static async updateUploadLimit(
		user: User,
		collectionUuid: string,
		newLimit: number
	): Promise<void> {
		return CollectionMutation.updateUploadLimit(user, collectionUuid, newLimit);
	}

	static async updateCollectionTime(
		user: User,
		collectionUuid: string,
		time: number
	): Promise<void> {
		return CollectionMutation.updateCollectionTime(user, collectionUuid, time);
	}
}
