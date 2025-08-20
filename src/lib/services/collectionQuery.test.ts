import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CollectionQuery } from './collectionQuery';
import { CollectionMutation } from './collectionMutation';
import type { User } from 'firebase/auth';
import type { ImageCollection } from '$lib/types/collection.types';

// Mock Firebase modules
vi.mock('firebase/firestore', () => ({
	collection: vi.fn(),
	getDocs: vi.fn(),
	getDoc: vi.fn(),
	doc: vi.fn()
}));

vi.mock('$lib/firebase', () => ({
	db: {}
}));

// Mock CollectionMutation
vi.mock('./collectionMutation', () => ({
	CollectionMutation: {
		createCollection: vi.fn()
	}
}));

// Import the mocked functions
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

// Mock user object
const mockUser: User = {
	uid: 'test-user-123',
	email: 'test@example.com',
	displayName: 'Test User'
} as User;

describe('CollectionQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getUserCollections', () => {
		it('should return empty array when user has no collections', async () => {
			const mockSnapshot = {
				forEach: vi.fn()
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockResolvedValue(mockSnapshot as ReturnType<typeof getDocs>);

			const result = await CollectionQuery.getUserCollections(mockUser);

			expect(result).toEqual([]);
			expect(collection).toHaveBeenCalledWith({}, `users/${mockUser.uid}/collections`);
		});

		it('should return sorted collections when user has collections', async () => {
			const mockSnapshot = {
				forEach: vi.fn((callback) => {
					// Add collections in reverse chronological order to test sorting
					callback({
						id: 'collection-2',
						data: () => ({
							name: 'Newer Collection',
							imageUploadLimit: 10,
							currentImageCount: 2,
							createdAt: { seconds: 1234567892, nanoseconds: 0 },
							updatedAt: { seconds: 1234567892, nanoseconds: 0 }
						})
					});
					callback({
						id: 'collection-1',
						data: () => ({
							name: 'Older Collection',
							imageUploadLimit: 15,
							currentImageCount: 5,
							createdAt: { seconds: 1234567890, nanoseconds: 0 },
							updatedAt: { seconds: 1234567890, nanoseconds: 0 }
						})
					});
				})
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockResolvedValue(mockSnapshot as ReturnType<typeof getDocs>);

			const result = await CollectionQuery.getUserCollections(mockUser);

			expect(result).toHaveLength(2);
			// Should be sorted by creation date (newest first)
			expect(result[0].name).toBe('Newer Collection');
			expect(result[1].name).toBe('Older Collection');
		});

		it('should handle errors gracefully', async () => {
			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'));

			const result = await CollectionQuery.getUserCollections(mockUser);

			expect(result).toEqual([]);
		});
	});

	describe('getPrimaryCollection', () => {
		it('should create two default collections for new users and return Art collection UUID', async () => {
			// Mock empty collections initially
			const mockEmptySnapshot = {
				forEach: vi.fn()
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockResolvedValue(mockEmptySnapshot as ReturnType<typeof getDocs>);

			// Mock the collection creation
			const artCollectionUuid = 'art-collection-uuid';
			const familyCollectionUuid = 'family-collection-uuid';

			vi.mocked(CollectionMutation.createCollection)
				.mockResolvedValueOnce(artCollectionUuid)
				.mockResolvedValueOnce(familyCollectionUuid);

			const result = await CollectionQuery.getPrimaryCollection(mockUser);

			expect(result).toBe(artCollectionUuid);
			expect(CollectionMutation.createCollection).toHaveBeenCalledTimes(2);
			expect(CollectionMutation.createCollection).toHaveBeenNthCalledWith(1, mockUser, 'Art');
			expect(CollectionMutation.createCollection).toHaveBeenNthCalledWith(2, mockUser, 'Family');
		});

		it('should create both Art and Family collections with correct names (integration test)', async () => {
			// Mock empty collections initially
			const mockEmptySnapshot = {
				forEach: vi.fn()
			};

			// Mock collections after creation - simulate both collections existing
			const mockCollectionsSnapshot = {
				forEach: vi.fn((callback) => {
					callback({
						id: 'art-collection-uuid',
						data: () => ({
							name: 'Art',
							imageUploadLimit: 10,
							currentImageCount: 0,
							createdAt: { seconds: 1234567890, nanoseconds: 0 },
							updatedAt: { seconds: 1234567890, nanoseconds: 0 }
						})
					});
					callback({
						id: 'family-collection-uuid',
						data: () => ({
							name: 'Family',
							imageUploadLimit: 10,
							currentImageCount: 0,
							createdAt: { seconds: 1234567891, nanoseconds: 0 },
							updatedAt: { seconds: 1234567891, nanoseconds: 0 }
						})
					});
				})
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			// First call returns empty, second call returns both collections
			vi.mocked(getDocs)
				.mockResolvedValueOnce(mockEmptySnapshot as ReturnType<typeof getDocs>)
				.mockResolvedValueOnce(mockCollectionsSnapshot as ReturnType<typeof getDocs>);

			// Mock the collection creation
			const artCollectionUuid = 'art-collection-uuid';
			const familyCollectionUuid = 'family-collection-uuid';

			vi.mocked(CollectionMutation.createCollection)
				.mockResolvedValueOnce(artCollectionUuid)
				.mockResolvedValueOnce(familyCollectionUuid);

			// Call getPrimaryCollection
			const result = await CollectionQuery.getPrimaryCollection(mockUser);

			// Verify Art collection UUID is returned as primary
			expect(result).toBe(artCollectionUuid);

			// Verify both collections were created with correct names
			expect(CollectionMutation.createCollection).toHaveBeenCalledTimes(2);
			expect(CollectionMutation.createCollection).toHaveBeenNthCalledWith(1, mockUser, 'Art');
			expect(CollectionMutation.createCollection).toHaveBeenNthCalledWith(2, mockUser, 'Family');

			// Verify we can now get both collections
			const collections = await CollectionQuery.getUserCollections(mockUser);
			expect(collections).toHaveLength(2);

			const artCollection = collections.find((c) => c.name === 'Art');
			const familyCollection = collections.find((c) => c.name === 'Family');

			expect(artCollection).toBeDefined();
			expect(familyCollection).toBeDefined();
			expect(artCollection?.uuid).toBe('art-collection-uuid');
			expect(familyCollection?.uuid).toBe('family-collection-uuid');
		});

		it('should return first collection UUID when user already has collections', async () => {
			const existingCollections: ImageCollection[] = [
				{
					uuid: 'existing-collection-1',
					name: 'Existing Collection',
					imageUploadLimit: 10,
					currentImageCount: 3,
					createdAt: { seconds: 1234567890, nanoseconds: 0 },
					updatedAt: { seconds: 1234567890, nanoseconds: 0 }
				},
				{
					uuid: 'existing-collection-2',
					name: 'Another Collection',
					imageUploadLimit: 15,
					currentImageCount: 1,
					createdAt: { seconds: 1234567891, nanoseconds: 0 },
					updatedAt: { seconds: 1234567891, nanoseconds: 0 }
				}
			];

			const mockSnapshot = {
				forEach: vi.fn((callback) => {
					existingCollections.forEach((collection) => {
						callback({
							id: collection.uuid,
							data: () => ({
								name: collection.name,
								imageUploadLimit: collection.imageUploadLimit,
								currentImageCount: collection.currentImageCount,
								createdAt: collection.createdAt,
								updatedAt: collection.updatedAt
							})
						});
					});
				})
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockResolvedValue(mockSnapshot as ReturnType<typeof getDocs>);

			const result = await CollectionQuery.getPrimaryCollection(mockUser);

			expect(result).toBe('existing-collection-2'); // Should be the first after sorting (newest first)
			expect(CollectionMutation.createCollection).not.toHaveBeenCalled();
		});
	});

	describe('hasAccessToCollection', () => {
		it('should return true when collection exists', async () => {
			const mockDoc = {
				exists: () => true
			};

			vi.mocked(doc).mockReturnValue({} as ReturnType<typeof doc>);
			vi.mocked(getDoc).mockResolvedValue(mockDoc as ReturnType<typeof getDoc>);

			const result = await CollectionQuery.hasAccessToCollection(mockUser, 'test-collection-uuid');

			expect(result).toBe(true);
			expect(doc).toHaveBeenCalledWith(
				{},
				`users/${mockUser.uid}/collections`,
				'test-collection-uuid'
			);
		});

		it('should return false when collection does not exist', async () => {
			const mockDoc = {
				exists: () => false
			};

			vi.mocked(doc).mockReturnValue({} as ReturnType<typeof doc>);
			vi.mocked(getDoc).mockResolvedValue(mockDoc as ReturnType<typeof getDoc>);

			const result = await CollectionQuery.hasAccessToCollection(mockUser, 'non-existent-uuid');

			expect(result).toBe(false);
		});

		it('should return false on error', async () => {
			vi.mocked(doc).mockReturnValue({} as ReturnType<typeof doc>);
			vi.mocked(getDoc).mockRejectedValue(new Error('Firestore error'));

			const result = await CollectionQuery.hasAccessToCollection(mockUser, 'test-collection-uuid');

			expect(result).toBe(false);
		});
	});

	describe('getCollectionInfo', () => {
		it('should return collection info when collection exists', async () => {
			const targetCollection: ImageCollection = {
				uuid: 'target-collection',
				name: 'Target Collection',
				imageUploadLimit: 10,
				currentImageCount: 5,
				createdAt: { seconds: 1234567890, nanoseconds: 0 },
				updatedAt: { seconds: 1234567890, nanoseconds: 0 }
			};

			const mockSnapshot = {
				forEach: vi.fn((callback) => {
					callback({
						id: targetCollection.uuid,
						data: () => ({
							name: targetCollection.name,
							imageUploadLimit: targetCollection.imageUploadLimit,
							currentImageCount: targetCollection.currentImageCount,
							createdAt: targetCollection.createdAt,
							updatedAt: targetCollection.updatedAt
						})
					});
				})
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockResolvedValue(mockSnapshot as ReturnType<typeof getDocs>);

			const result = await CollectionQuery.getCollectionInfo(mockUser, 'target-collection');

			expect(result).toEqual(targetCollection);
		});

		it('should return null when collection does not exist', async () => {
			const mockSnapshot = {
				forEach: vi.fn()
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockResolvedValue(mockSnapshot as ReturnType<typeof getDocs>);

			const result = await CollectionQuery.getCollectionInfo(mockUser, 'non-existent-uuid');

			expect(result).toBeNull();
		});
	});

	describe('verifyCollectionExists', () => {
		it('should return true when collection exists', async () => {
			const mockDoc = {
				exists: () => true
			};

			vi.mocked(doc).mockReturnValue({} as ReturnType<typeof doc>);
			vi.mocked(getDoc).mockResolvedValue(mockDoc as ReturnType<typeof getDoc>);

			const result = await CollectionQuery.verifyCollectionExists(mockUser, 'test-collection-uuid');

			expect(result).toBe(true);
		});

		it('should return false when collection does not exist', async () => {
			const mockDoc = {
				exists: () => false
			};

			vi.mocked(doc).mockReturnValue({} as ReturnType<typeof doc>);
			vi.mocked(getDoc).mockResolvedValue(mockDoc as ReturnType<typeof getDoc>);

			const result = await CollectionQuery.verifyCollectionExists(mockUser, 'non-existent-uuid');

			expect(result).toBe(false);
		});

		it('should return false on error', async () => {
			vi.mocked(doc).mockReturnValue({} as ReturnType<typeof doc>);
			vi.mocked(getDoc).mockRejectedValue(new Error('Firestore error'));

			const result = await CollectionQuery.verifyCollectionExists(mockUser, 'test-collection-uuid');

			expect(result).toBe(false);
		});
	});
});
