import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CollectionService } from './collectionService';
import { CollectionQuery } from './services/collectionQuery';
import { CollectionMutation } from './services/collectionMutation';
import type { User } from 'firebase/auth';

// Mock Firebase modules
vi.mock('firebase/firestore', () => ({
	collection: vi.fn(),
	getDocs: vi.fn(),
	getDoc: vi.fn(),
	doc: vi.fn(),
	setDoc: vi.fn(),
	updateDoc: vi.fn(),
	Timestamp: {
		now: vi.fn(() => ({ seconds: 1234567890, nanoseconds: 0 }))
	}
}));

vi.mock('$lib/firebase', () => ({
	db: {}
}));

// Import the mocked functions
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
vi.mock('./imageService', () => ({
	ImageService: {
		loadCollectionImages: vi.fn()
	}
}));

// Mock user object
const mockUser: User = {
	uid: 'test-user-123',
	email: 'test@example.com',
	displayName: 'Test User'
} as User;

describe('CollectionService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('createCollection', () => {
		it('should create a collection with default upload limit', async () => {
			const mockDocRef = {};
			vi.mocked(doc).mockReturnValue(mockDocRef);
			vi.mocked(setDoc).mockResolvedValue(undefined);

			// Mock getDoc to return a document that exists
			vi.mocked(getDoc).mockResolvedValue({
				exists: () => true
			});

			// Mock crypto.randomUUID
			const mockUuid = 'test-uuid-123';
			vi.stubGlobal('crypto', {
				randomUUID: vi.fn(() => mockUuid)
			});

			const result = await CollectionService.createCollection(mockUser, 'Test Collection');

			expect(doc).toHaveBeenCalledWith({}, `users/${mockUser.uid}/collections`, mockUuid);
			expect(setDoc).toHaveBeenCalledWith(mockDocRef, {
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 0,
				time: 30,
				createdAt: { seconds: 1234567890, nanoseconds: 0 },
				updatedAt: { seconds: 1234567890, nanoseconds: 0 }
			});
			expect(result).toBe(mockUuid);
		});
	});

	describe('getUserCollections', () => {
		it('should return collections with upload limit fields', async () => {
			const mockSnapshot = {
				forEach: vi.fn((callback) => {
					callback({
						id: 'collection-1',
						data: () => ({
							name: 'Test Collection',
							imageUploadLimit: 10,
							currentImageCount: 5,
							createdAt: { seconds: 1234567890 },
							updatedAt: { seconds: 1234567890 }
						})
					});
				})
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockResolvedValue(mockSnapshot as ReturnType<typeof getDocs>);

			const result = await CollectionService.getUserCollections(mockUser);

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				uuid: 'collection-1',
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 5,
				createdAt: { seconds: 1234567890 },
				updatedAt: { seconds: 1234567890 }
			});
		});

		it('should return collections with time field when present', async () => {
			const mockSnapshot = {
				forEach: vi.fn((callback) => {
					// Collection with time field
					callback({
						id: 'collection-1',
						data: () => ({
							name: 'Collection with Time',
							imageUploadLimit: 10,
							currentImageCount: 3,
							time: 45, // 45 seconds
							createdAt: { seconds: 1234567892 },
							updatedAt: { seconds: 1234567892 }
						})
					});
					// Collection without time field
					callback({
						id: 'collection-2',
						data: () => ({
							name: 'Collection without Time',
							imageUploadLimit: 15,
							currentImageCount: 2,
							createdAt: { seconds: 1234567891 },
							updatedAt: { seconds: 1234567891 }
						})
					});
				})
			};

			vi.mocked(collection).mockReturnValue({} as ReturnType<typeof collection>);
			vi.mocked(getDocs).mockResolvedValue(mockSnapshot as ReturnType<typeof getDocs>);

			const result = await CollectionService.getUserCollections(mockUser);

			expect(result).toHaveLength(2);

			// Collection with time field
			expect(result[0]).toEqual({
				uuid: 'collection-1',
				name: 'Collection with Time',
				imageUploadLimit: 10,
				currentImageCount: 3,
				time: 45,
				createdAt: { seconds: 1234567892 },
				updatedAt: { seconds: 1234567892 }
			});

			// Collection without time field (should not have time property)
			expect(result[1]).toEqual({
				uuid: 'collection-2',
				name: 'Collection without Time',
				imageUploadLimit: 15,
				currentImageCount: 2,
				createdAt: { seconds: 1234567891 },
				updatedAt: { seconds: 1234567891 }
			});
		});
	});

	describe('canUploadImage', () => {
		beforeEach(() => {
			const mockCollection = {
				uuid: 'collection-1',
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 5,
				createdAt: { seconds: 1234567890 },
				updatedAt: { seconds: 1234567890 }
			};
			vi.spyOn(CollectionQuery, 'getCollectionInfo').mockResolvedValue(
				mockCollection as Awaited<ReturnType<typeof CollectionQuery.getCollectionInfo>>
			);
		});

		it('should allow upload when under limit', async () => {
			const result = await CollectionService.canUploadImage(mockUser, 'collection-1');

			expect(result).toEqual({
				canUpload: true,
				remaining: 5,
				limit: 10
			});
		});

		it('should prevent upload when at limit', async () => {
			const mockCollection = {
				uuid: 'collection-1',
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 10,
				createdAt: { seconds: 1234567890 },
				updatedAt: { seconds: 1234567890 }
			};
			vi.spyOn(CollectionQuery, 'getCollectionInfo').mockResolvedValue(
				mockCollection as Awaited<ReturnType<typeof CollectionQuery.getCollectionInfo>>
			);

			const result = await CollectionService.canUploadImage(mockUser, 'collection-1');

			expect(result).toEqual({
				canUpload: false,
				remaining: 0,
				limit: 10
			});
		});

		it('should throw error when collection not found', async () => {
			vi.spyOn(CollectionQuery, 'getCollectionInfo').mockResolvedValue(null);

			await expect(
				CollectionService.canUploadImage(mockUser, 'non-existent-collection')
			).rejects.toThrow('Collection non-existent-collection not found');
		});
	});

	describe('incrementImageCount', () => {
		it('should increment collection image count by 1', async () => {
			const mockCollection = {
				uuid: 'collection-1',
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 5,
				createdAt: { seconds: 1234567890 },
				updatedAt: { seconds: 1234567890 }
			};
			vi.spyOn(CollectionQuery, 'getCollectionInfo').mockResolvedValue(
				mockCollection as Awaited<ReturnType<typeof CollectionQuery.getCollectionInfo>>
			);
			vi.spyOn(CollectionMutation, 'updateImageCount').mockResolvedValue();

			await CollectionService.incrementImageCount(mockUser, 'collection-1');

			expect(CollectionMutation.updateImageCount).toHaveBeenCalledWith(mockUser, 'collection-1', 6);
		});
	});

	describe('updateImageCount', () => {
		it('should update collection image count', async () => {
			vi.spyOn(CollectionMutation, 'updateImageCount').mockResolvedValue();

			await CollectionService.updateImageCount(mockUser, 'collection-1', 7);

			expect(CollectionMutation.updateImageCount).toHaveBeenCalledWith(mockUser, 'collection-1', 7);
		});
	});

	describe('syncImageCount', () => {
		it('should sync collection image count with actual storage', async () => {
			vi.spyOn(CollectionMutation, 'syncImageCount').mockResolvedValue();

			await CollectionService.syncImageCount(mockUser, 'collection-1');

			expect(CollectionMutation.syncImageCount).toHaveBeenCalledWith(mockUser, 'collection-1');
		});
	});

	describe('updateUploadLimit', () => {
		it('should update collection upload limit', async () => {
			vi.spyOn(CollectionMutation, 'updateUploadLimit').mockResolvedValue();

			await CollectionService.updateUploadLimit(mockUser, 'collection-1', 20);

			expect(CollectionMutation.updateUploadLimit).toHaveBeenCalledWith(
				mockUser,
				'collection-1',
				20
			);
		});
	});
});
