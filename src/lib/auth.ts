// src/lib/auth.ts
import { auth } from '$lib/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	updateProfile,
	type User
} from 'firebase/auth';

export class AuthService {
	/**
	 * Register a new user with email and password
	 */
	static async register(email: string, password: string, displayName?: string): Promise<User> {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Update display name if provided
			if (displayName) {
				await updateProfile(user, { displayName });
			}

			// Note: User profile will be created in the auth state change handler
			// to ensure the auth state is fully settled

			return user;
		} catch (error: unknown) {
			console.error('Registration error:', error);
			const authError = error as { code?: string; message?: string };
			throw new Error(this.getErrorMessage(authError.code));
		}
	}

	/**
	 * Sign in with email and password
	 */
	static async signIn(email: string, password: string): Promise<User> {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			return userCredential.user;
		} catch (error: unknown) {
			console.error('Sign in error:', error);
			const authError = error as { code?: string; message?: string };
			throw new Error(this.getErrorMessage(authError.code));
		}
	}

	/**
	 * Attempt sign in for unified login/signup flow
	 * Does not log expected errors to console
	 *
	 * Note: Browser will still show 400 Bad Request in console for failed authentication.
	 * This is expected behavior and cannot be suppressed as it's logged by the browser
	 * automatically for failed HTTP requests to Firebase Auth API.
	 */
	static async trySignIn(email: string, password: string): Promise<User> {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			return userCredential.user;
		} catch (error: unknown) {
			const authError = error as { code?: string; message?: string };

			// Only log unexpected errors to console
			if (
				authError.code !== 'auth/user-not-found' &&
				authError.code !== 'auth/invalid-credential' &&
				authError.code !== 'auth/wrong-password'
			) {
				console.error('Unexpected sign in error:', error);
			} else {
				// Log helpful message for expected authentication failures
				console.info(
					'%c[PhotoTV Auth]%c Expected authentication check - proceeding to account creation. The 400 HTTP error above is normal behavior during unified login/signup flow.',
					'color: #2563eb; font-weight: bold',
					'color: #6b7280'
				);
			}

			// For any authentication failure, throw error to proceed to stage 2
			throw new Error(this.getErrorMessage(authError.code));
		}
	}

	/**
	 * Send password reset email
	 */
	static async resetPassword(email: string): Promise<void> {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error: unknown) {
			console.error('Password reset error:', error);
			const authError = error as { code?: string; message?: string };
			throw new Error(this.getErrorMessage(authError.code));
		}
	}

	/**
	 * Sign out user
	 */
	static async signOut(): Promise<void> {
		try {
			await auth.signOut();
		} catch (error: unknown) {
			console.error('Sign out error:', error);
			throw error;
		}
	}

	/**
	 * Get current user
	 */
	static getCurrentUser(): User | null {
		return auth.currentUser;
	}

	/**
	 * Get current user with promise (waits for auth state to resolve)
	 */
	static async getCurrentUserAsync(): Promise<User | null> {
		return new Promise((resolve) => {
			const unsubscribe = auth.onAuthStateChanged((user) => {
				unsubscribe();
				resolve(user);
			});
		});
	}

	/**
	 * Check if user is signed in
	 */
	static isSignedIn(): boolean {
		return !!auth.currentUser;
	}

	/**
	 * Get current user's auth token
	 */
	static async getAuthToken(): Promise<string | null> {
		try {
			const user = auth.currentUser;
			if (user) {
				return await user.getIdToken();
			}
			return null;
		} catch (error) {
			console.error('Error getting auth token:', error);
			return null;
		}
	}

	/**
	 * Refresh current user's auth token
	 */
	static async refreshAuthToken(): Promise<string | null> {
		try {
			const user = auth.currentUser;
			if (user) {
				return await user.getIdToken(true); // Force refresh
			}
			return null;
		} catch (error) {
			console.error('Error refreshing auth token:', error);
			return null;
		}
	}

	/**
	 * Convert Firebase error codes to user-friendly messages
	 */
	private static getErrorMessage(errorCode?: string): string {
		switch (errorCode) {
			case 'auth/email-already-in-use':
				return 'This email address is already registered. Please use a different email or try signing in.';
			case 'auth/invalid-email':
				return 'Please enter a valid email address.';
			case 'auth/operation-not-allowed':
				return 'Email/password accounts are not enabled. Please contact support.';
			case 'auth/weak-password':
				return 'Password should be at least 6 characters long.';
			case 'auth/user-disabled':
				return 'This account has been disabled. Please contact support.';
			case 'auth/user-not-found':
				return 'No account found with this email address. Please check your email or create a new account.';
			case 'auth/wrong-password':
				return 'Incorrect password. Please try again or reset your password.';
			case 'auth/invalid-credential':
				return 'Invalid email or password. Please check your credentials and try again.';
			case 'auth/too-many-requests':
				return 'Too many failed attempts. Please try again later or reset your password.';
			case 'auth/network-request-failed':
				return 'Network error. Please check your internet connection and try again.';
			default:
				return 'An error occurred during authentication. Please try again.';
		}
	}

	/**
	 * Validate email format
	 */
	static isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	/**
	 * Validate password strength
	 */
	static isValidPassword(password: string): { valid: boolean; message?: string } {
		if (password.length < 6) {
			return { valid: false, message: 'Password must be at least 6 characters long' };
		}
		return { valid: true };
	}
}
