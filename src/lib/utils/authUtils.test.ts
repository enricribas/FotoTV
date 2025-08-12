import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	setupAuthStateListener,
	handleLogout,
	getUserInitials,
	getUserDisplayText,
	handleTVLoginSuccess
} from './authUtils';
import type { User } from 'firebase/auth';

// Mock Firebase auth
vi.mock('firebase/auth', () => ({
	onAuthStateChanged: vi.fn(),
	signOut: vi.fn()
}));

// Mock Firebase config
vi.mock('$lib/firebase', () => ({
	auth: {}
}));

// Mock UserService
vi.mock('$lib/userService', () => ({
	UserService: {
		getOrCreateUserProfile: vi.fn()
	}
}));

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { UserService } from '$lib/userService';

describe('authUtils', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('setupAuthStateListener', () => {
		it('calls onUserChange when user state changes', async () => {
			const mockUser = { uid: 'test-uid' } as User;
			const onUserChange = vi.fn();
			const onError = vi.fn();

			// Mock onAuthStateChanged to call the callback asynchronously
			vi.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
				// Use setTimeout to simulate async behavior
				setTimeout(() => callback(mockUser), 0);
				return vi.fn(); // Return unsubscribe function
			});

			vi.mocked(UserService.getOrCreateUserProfile).mockResolvedValue(undefined);

			const unsubscribe = setupAuthStateListener(onUserChange, onError);

			// Wait for async operations
			await new Promise((resolve) => setTimeout(resolve, 150));

			expect(onUserChange).toHaveBeenCalledWith(mockUser);
			expect(UserService.getOrCreateUserProfile).toHaveBeenCalledWith(mockUser);
			expect(onError).not.toHaveBeenCalled();
			expect(typeof unsubscribe).toBe('function');
		});

		it('handles null user without calling UserService', async () => {
			const onUserChange = vi.fn();
			const onError = vi.fn();

			vi.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
				setTimeout(() => callback(null), 0);
				return vi.fn();
			});

			setupAuthStateListener(onUserChange, onError);

			// Wait for async operations
			await new Promise((resolve) => setTimeout(resolve, 50));

			expect(onUserChange).toHaveBeenCalledWith(null);
			expect(UserService.getOrCreateUserProfile).not.toHaveBeenCalled();
			expect(onError).not.toHaveBeenCalled();
		});

		it('handles UserService errors gracefully', async () => {
			const mockUser = { uid: 'test-uid' } as User;
			const onUserChange = vi.fn();
			const onError = vi.fn();

			vi.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
				setTimeout(() => callback(mockUser), 0);
				return vi.fn();
			});

			vi.mocked(UserService.getOrCreateUserProfile).mockRejectedValue(new Error('Service error'));

			setupAuthStateListener(onUserChange, onError);

			// Wait for async operations
			await new Promise((resolve) => setTimeout(resolve, 200));

			expect(onUserChange).toHaveBeenCalledWith(mockUser);
			expect(onError).toHaveBeenCalledWith('Error setting up user data');
		});
	});

	describe('handleLogout', () => {
		it('successfully logs out user', async () => {
			vi.mocked(signOut).mockResolvedValue();

			const result = await handleLogout();

			expect(signOut).toHaveBeenCalled();
			expect(result).toEqual({ success: true });
		});

		it('handles logout errors', async () => {
			vi.mocked(signOut).mockRejectedValue(new Error('Network error'));

			const result = await handleLogout();

			expect(signOut).toHaveBeenCalled();
			expect(result).toEqual({ success: false, error: 'Logout failed' });
		});
	});

	describe('getUserInitials', () => {
		it('returns first letter of display name when available', () => {
			const user = {
				displayName: 'John Doe',
				email: 'john@example.com'
			} as User;

			const result = getUserInitials(user);

			expect(result).toBe('J');
		});

		it('returns first letter of email when display name is not available', () => {
			const user = {
				displayName: null,
				email: 'jane@example.com'
			} as User;

			const result = getUserInitials(user);

			expect(result).toBe('J');
		});

		it('returns first letter of email when display name is empty', () => {
			const user = {
				displayName: '',
				email: 'bob@example.com'
			} as User;

			const result = getUserInitials(user);

			expect(result).toBe('B');
		});

		it('returns "U" when neither display name nor email is available', () => {
			const user = {
				displayName: null,
				email: null
			} as User;

			const result = getUserInitials(user);

			expect(result).toBe('U');
		});

		it('returns uppercase letter', () => {
			const user = {
				displayName: 'alice',
				email: 'alice@example.com'
			} as User;

			const result = getUserInitials(user);

			expect(result).toBe('A');
		});
	});

	describe('getUserDisplayText', () => {
		it('returns display name when available', () => {
			const user = {
				displayName: 'John Doe',
				email: 'john@example.com'
			} as User;

			const result = getUserDisplayText(user);

			expect(result).toBe('John Doe');
		});

		it('returns email when display name is not available', () => {
			const user = {
				displayName: null,
				email: 'jane@example.com'
			} as User;

			const result = getUserDisplayText(user);

			expect(result).toBe('jane@example.com');
		});

		it('returns email when display name is empty', () => {
			const user = {
				displayName: '',
				email: 'bob@example.com'
			} as User;

			const result = getUserDisplayText(user);

			expect(result).toBe('bob@example.com');
		});

		it('returns "Unknown User" when neither display name nor email is available', () => {
			const user = {
				displayName: null,
				email: null
			} as User;

			const result = getUserDisplayText(user);

			expect(result).toBe('Unknown User');
		});

		it('returns "Unknown User" when both display name and email are empty', () => {
			const user = {
				displayName: '',
				email: ''
			} as User;

			const result = getUserDisplayText(user);

			expect(result).toBe('Unknown User');
		});
	});

	describe('handleTVLoginSuccess', () => {
		it('calls onUserSet and navigates to slideshow when TV UI should be used', async () => {
			const mockUser = { uid: 'test-uid' } as User;
			const onUserSet = vi.fn();
			const navigate = vi.fn();

			// Mock the dynamic import
			vi.doMock('$lib/tvUtils', () => ({
				shouldUseTVUI: vi.fn().mockResolvedValue(true)
			}));

			await handleTVLoginSuccess(mockUser, onUserSet, navigate);

			expect(onUserSet).toHaveBeenCalledWith(mockUser);
			expect(navigate).toHaveBeenCalledWith('/slideshow');
		});

		it('calls onUserSet but does not navigate when TV UI should not be used', async () => {
			const mockUser = { uid: 'test-uid' } as User;
			const onUserSet = vi.fn();
			const navigate = vi.fn();

			// Mock the dynamic import
			vi.doMock('$lib/tvUtils', () => ({
				shouldUseTVUI: vi.fn().mockResolvedValue(false)
			}));

			await handleTVLoginSuccess(mockUser, onUserSet, navigate);

			expect(onUserSet).toHaveBeenCalledWith(mockUser);
			expect(navigate).not.toHaveBeenCalled();
		});

		it('handles errors gracefully', async () => {
			const mockUser = { uid: 'test-uid' } as User;
			const onUserSet = vi.fn();
			const navigate = vi.fn();

			// Mock the dynamic import to throw an error
			vi.doMock('$lib/tvUtils', () => ({
				shouldUseTVUI: vi.fn().mockRejectedValue(new Error('TV detection failed'))
			}));

			// Should not throw
			await expect(handleTVLoginSuccess(mockUser, onUserSet, navigate)).resolves.toBeUndefined();

			expect(onUserSet).toHaveBeenCalledWith(mockUser);
			expect(navigate).not.toHaveBeenCalled();
		});
	});

	describe('setupDeviceDetection', () => {
		it('detects TV device and forced mode', async () => {
			// Mock the dynamic import
			vi.doMock('$lib/advancedDeviceDetection', () => ({
				isAndroidTV: vi.fn().mockResolvedValue(true),
				isTVModeEnabled: vi.fn().mockReturnValue(false)
			}));

			const { setupDeviceDetection } = await import('./authUtils');
			const result = await setupDeviceDetection();

			expect(result).toEqual({
				isTVDevice: true,
				isTVModeForced: false
			});
		});

		it('handles detection errors gracefully', async () => {
			// Mock the dynamic import with error
			vi.doMock('$lib/advancedDeviceDetection', () => ({
				isAndroidTV: vi.fn().mockRejectedValue(new Error('Detection failed')),
				isTVModeEnabled: vi.fn().mockReturnValue(true)
			}));

			const { setupDeviceDetection } = await import('./authUtils');
			const result = await setupDeviceDetection();

			expect(result).toEqual({
				isTVDevice: false,
				isTVModeForced: true
			});
		});
	});
});
