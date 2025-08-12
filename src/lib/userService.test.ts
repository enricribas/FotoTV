import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from './userService';
import type { User } from 'firebase/auth';

// Mock Firebase modules
vi.mock('firebase/firestore', () => ({
	doc: vi.fn(),
	getDoc: vi.fn(),
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
		loadUserImages: vi.fn()
	}
}));

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Mock user object
const mockUser: User = {
	uid: 'test-user-123',
	email: 'test@example.com',
	displayName: 'Test User'
} as User;

describe('UserService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('createUserProfile', () => {
		it('should create a user profile with default upload limit', async () => {
			const mockDocRef = {};
			vi.mocked(doc).mockReturnValue(mockDocRef as ReturnType<typeof doc>);
			vi.mocked(setDoc).mockResolvedValue(undefined);

			const result = await UserService.createUserProfile(mockUser);

			expect(doc).toHaveBeenCalledWith({}, 'users', 'test-user-123');
			expect(setDoc).toHaveBeenCalledWith(
				mockDocRef,
				expect.objectContaining({
					uid: 'test-user-123',
					email: 'test@example.com',
					displayName: 'Test User'
				})
			);
			expect(result.uid).toBe('test-user-123');
			expect(result.email).toBe('test@example.com');
		});
	});

	describe('getUserProfile', () => {
		it('should return user profile when it exists', async () => {
			const mockDocRef = {};
			const mockDocData = {
				uid: 'test-user-123',
				email: 'test@example.com',
				displayName: 'Test User',
				createdAt: { seconds: 1234567890 },
				updatedAt: { seconds: 1234567890 }
			};

			vi.mocked(doc).mockReturnValue(mockDocRef as ReturnType<typeof doc>);
			vi.mocked(getDoc).mockResolvedValue({
				exists: () => true,
				data: () => mockDocData
			});

			const result = await UserService.getUserProfile(mockUser);

			expect(result).toEqual(mockDocData);
		});

		it('should return null when profile does not exist', async () => {
			const mockDocRef = {};
			vi.mocked(doc).mockReturnValue(mockDocRef as ReturnType<typeof doc>);
			vi.mocked(getDoc).mockResolvedValue({
				exists: () => false
			});

			const result = await UserService.getUserProfile(mockUser);

			expect(result).toBeNull();
		});
	});

	describe('updateProfile', () => {
		it('should update user profile fields', async () => {
			const mockDocRef = {};
			vi.mocked(doc).mockReturnValue(mockDocRef as ReturnType<typeof doc>);
			vi.mocked(updateDoc).mockResolvedValue(undefined);

			await UserService.updateProfile(mockUser, { displayName: 'Updated Name' });

			expect(doc).toHaveBeenCalledWith({}, 'users', 'test-user-123');
			expect(updateDoc).toHaveBeenCalledWith(
				mockDocRef,
				expect.objectContaining({
					displayName: 'Updated Name'
				})
			);
		});
	});
});
