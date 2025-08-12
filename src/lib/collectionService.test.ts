import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CollectionService } from './collectionService';
import type { User } from 'firebase/auth';

// Mock Firebase modules
vi.mock('firebase/firestore', () => ({
	collection: vi.fn(),
	getDocs: vi.fn(),
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

vi.mock('./imageService', () => ({
	ImageService: {
		loadCollectionImages: vi.fn()
	}
}));

import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

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
			(doc as any).mockReturnValue(mockDocRef);
			(setDoc as any).mockResolvedValue(undefined);

			// Mock crypto.randomUUID
			const mockUuid = 'test-uuid-123';
			vi.stubGlobal('crypto', {
				randomUUID: vi.fn(() => mockUuid)
			});

			const result = await CollectionService.createCollection(mockUser, 'Test Collection');

			expect(doc).toHaveBeenCalledWith({}, `users/${mockUser.uid}/collections`, mockUuid);
			expect(setDoc).toHaveBeenCalledWith(mockDocRef, expect.objectContaining({
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 0
			}));
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

			(collection as any).mockReturnValue({});
			(getDocs as any).mockResolvedValue(mockSnapshot);

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
	});

	describe('canUploadImage', () => {
		beforeEach(() => {
			const mockCollections = [{
				uuid: 'collection-1',
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 5,
				createdAt: { seconds: 1234567890 },
				updatedAt: { seconds: 1234567890 }
			}];
			vi.spyOn(CollectionService, 'getUserCollections').mockResolvedValue(mockCollections as any);
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
			const mockCollections = [{
				uuid: 'collection-1',
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 10,
				createdAt: { seconds: 1234567890 },
				updatedAt: { seconds: 1234567890 }
			}];
			vi.spyOn(CollectionService, 'getUserCollections').mockResolvedValue(mockCollections as any);

			const result = await CollectionService.canUploadImage(mockUser, 'collection-1');

			expect(result).toEqual({
				canUpload: false,
				remaining: 0,
				limit: 10
			});
		});

		it('should throw error when collection not found', async () => {
			await expect(
				CollectionService.canUploadImage(mockUser, 'non-existent-collection')
			).rejects.toThrow('Collection non-existent-collection not found');
		});
	});

	describe('incrementImageCount', () => {
		it('should increment collection image count by 1', async () => {
			const mockCollections = [{
				uuid: 'collection-1',
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 5,
				createdAt: { seconds: 1234567890 },
				updatedAt: { seconds: 1234567890 }
			}];
			vi.spyOn(CollectionService, 'getUserCollections').mockResolvedValue(mockCollections as any);
			vi.spyOn(CollectionService, 'updateImageCount').mockResolvedValue(undefined);

			await CollectionService.incrementImageCount(mockUser, 'collection-1');

			expect(CollectionService.updateImageCount).toHaveBeenCalledWith(mockUser, 'collection-1', 6);
		});
	});

	describe('updateImageCount', () => {
		it('should update collection image count', async () => {
			const mockDocRef = {};
			(doc as any).mockReturnValue(mockDocRef);
			(updateDoc as any).mockResolvedValue(undefined);

			await CollectionService.updateImageCount(mockUser, 'collection-1', 7);

			expect(doc).toHaveBeenCalledWith({}, `users/${mockUser.uid}/collections`, 'collection-1');
			expect(updateDoc).toHaveBeenCalledWith(mockDocRef, expect.objectContaining({
				currentImageCount: 7
			}));
		});
	});

	describe('syncImageCount', () => {
		it('should sync collection image count with actual storage', async () => {
			const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
			vi.spyOn(CollectionService, 'updateImageCount').mockResolvedValue(undefined);

			// Mock the dynamic import
			vi.doMock('./imageService', () => ({
				ImageService: {
					loadCollectionImages: vi.fn().mockResolvedValue(mockImages)
				}
			}));

			await CollectionService.syncImageCount(mockUser, 'collection-1');

			expect(CollectionService.updateImageCount).toHaveBeenCalledWith(mockUser, 'collection-1', 3);
		});
	});

	describe('updateUploadLimit', () => {
		it('should update collection upload limit', async () => {
			const mockDocRef = {};
			(doc as any).mockReturnValue(mockDocRef);
			(updateDoc as any).mockResolvedValue(undefined);

			await CollectionService.updateUploadLimit(mockUser, 'collection-1', 20);

			expect(doc).toHaveBeenCalledWith({}, `users/${mockUser.uid}/collections`, 'collection-1');
			expect(updateDoc).toHaveBeenCalledWith(mockDocRef, expect.objectContaining({
				imageUploadLimit: 20
			}));
		});
	});
});
