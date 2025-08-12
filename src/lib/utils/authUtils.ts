import type { User } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '$lib/firebase';
import { UserService } from '$lib/userService';

export interface AuthState {
	user: User | null;
	isLoading: boolean;
	error?: string;
}

/**
 * Sets up authentication state listener with user profile creation
 */
export function setupAuthStateListener(
	onUserChange: (user: User | null) => void,
	onError?: (error: string) => void
): () => void {
	return onAuthStateChanged(auth, async (user) => {
		onUserChange(user);

		if (user) {
			try {
				// Small delay to ensure auth state is fully settled
				await new Promise((resolve) => setTimeout(resolve, 100));
				await UserService.getOrCreateUserProfile(user);
			} catch (error) {
				const errorMessage = 'Error setting up user data';
				console.error(errorMessage, error);
				onError?.(errorMessage);
			}
		}
	});
}

/**
 * Handles user logout with error handling
 */
export async function handleLogout(): Promise<{ success: boolean; error?: string }> {
	try {
		await signOut(auth);
		return { success: true };
	} catch (error) {
		const errorMessage = 'Logout failed';
		console.error(errorMessage, error);
		return { success: false, error: errorMessage };
	}
}

/**
 * Generates user initials from display name or email
 */
export function getUserInitials(user: User): string {
	if (user.displayName) {
		return user.displayName.charAt(0).toUpperCase();
	}
	if (user.email) {
		return user.email.charAt(0).toUpperCase();
	}
	return 'U';
}

/**
 * Gets user display text (name or email)
 */
export function getUserDisplayText(user: User): string {
	return user.displayName || user.email || 'Unknown User';
}

/**
 * Handles TV login success with navigation
 */
export async function handleTVLoginSuccess(
	user: User,
	onUserSet: (user: User) => void,
	navigate: (path: string) => void
): Promise<void> {
	onUserSet(user);

	try {
		// Import TV detection dynamically to avoid circular imports
		const { shouldUseTVUI } = await import('$lib/tvUtils');
		const isTV = await shouldUseTVUI();
		if (isTV) {
			navigate('/slideshow');
		}
	} catch (error) {
		console.warn('Failed to detect TV UI mode:', error);
		// Continue without navigation on error
	}
}

/**
 * Sets up device detection for TV mode
 */
export async function setupDeviceDetection(): Promise<{
	isTVDevice: boolean;
	isTVModeForced: boolean;
}> {
	const { isAndroidTV, isTVModeEnabled } = await import('$lib/advancedDeviceDetection');

	const isTVModeForced = isTVModeEnabled();

	try {
		const isTVDevice = await isAndroidTV();
		return { isTVDevice, isTVModeForced };
	} catch (error) {
		console.warn('Failed to detect TV device:', error);
		return { isTVDevice: false, isTVModeForced };
	}
}
