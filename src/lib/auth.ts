// src/lib/auth.ts
import { auth, googleProvider } from '$lib/firebase';
import {
	signInWithPopup,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
	type User
} from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

// Check if running on native platform
const isNative = Capacitor.isNativePlatform();

// Fallback storage for email (using a simple in-memory store for native)
let emailForSignIn: string | null = null;

export class AuthService {
	/**
	 * Initialize Firebase Authentication for the current platform
	 */
	static async initialize(): Promise<void> {
		console.log('Initializing AuthService', {
			platform: Capacitor.getPlatform(),
			isNative
		});

		if (isNative) {
			try {
				console.log('Firebase Authentication plugin available for native platform');
				// Plugin is configured via capacitor.config.ts, no need for manual configuration
			} catch (error) {
				console.error('Failed to initialize Firebase Authentication plugin:', error);
				throw error;
			}
		}

		// Set up auth state change listener
		this.handleAuthStateChanges();

		// Handle magic links on app load
		if (typeof window !== 'undefined') {
			await this.completeMagicLinkSignIn();
		}
	}

	/**
	 * Set up auth state change listener
	 */
	private static handleAuthStateChanges(): void {
		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log('User signed in:', {
					uid: user.uid,
					email: user.email,
					providers: user.providerData.map((p) => p.providerId)
				});
			} else {
				console.log('User signed out');
			}
		});
	}

	/**
	 * Sign in with Google - handles both web and native
	 */
	static async signInWithGoogle(): Promise<User | null> {
		try {
			console.log('Starting Google Sign-In', {
				isNative,
				platform: Capacitor.getPlatform(),
				userAgent:
					typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 100) : 'unknown'
			});

			if (isNative) {
				console.log('Attempting native Google Sign-In with Capacitor Firebase plugin');

				try {
					// Use the Capacitor Firebase Authentication plugin
					console.log('Calling FirebaseAuthentication.signInWithGoogle()...');
					const result = await FirebaseAuthentication.signInWithGoogle();

					console.log('Plugin raw result:', result);
					console.log('Plugin result details:', {
						hasUser: !!result?.user,
						hasCredential: !!result?.credential,
						userId: result?.user?.uid,
						email: result?.user?.email
					});

					if (result?.user) {
						console.log('Google Sign-In successful via plugin:', result.user.uid);

						// Wait for Firebase Auth to sync
						let attempts = 0;
						while (attempts < 10 && !auth.currentUser) {
							await new Promise((resolve) => setTimeout(resolve, 500));
							attempts++;
							console.log(`Waiting for Firebase Auth sync, attempt ${attempts}`);
						}

						console.log('Final Firebase Auth state:', {
							hasCurrentUser: !!auth.currentUser,
							currentUserUid: auth.currentUser?.uid,
							syncAttempts: attempts
						});

						return auth.currentUser;
					} else {
						console.log('Plugin returned no user - likely cancelled by user');
						return null;
					}
				} catch (pluginError: unknown) {
					console.error('Capacitor Firebase plugin failed:', pluginError);

					const error = pluginError as { code?: string; message?: string; name?: string };
					console.error('Plugin error details:', {
						code: error.code,
						message: error.message,
						name: error.name
					});

					// Check for specific error cases
					if (error.code === 'auth/api-not-available') {
						throw new Error(
							'Google Play Services not available. Please ensure Google Play Services is installed and updated.'
						);
					}

					if (error.code === 'auth/network-request-failed') {
						throw new Error('Network error. Please check your internet connection and try again.');
					}

					// Handle certificate/configuration errors
					if (
						error.message?.includes('DEVELOPER_ERROR') ||
						error.message?.includes('Invalid configuration')
					) {
						throw new Error(
							'Authentication configuration error. Please check that:\n' +
								'1. The package name in google-services.json matches com.phototv.app\n' +
								'2. SHA certificates are added to Firebase Console\n' +
								'3. Google Play signing certificates are included for production builds'
						);
					}

					throw new Error(
						`Native authentication failed: ${error.message || 'Unknown error'}. Check Firebase configuration.`
					);
				}
			} else {
				// For web, use Firebase popup
				console.log('Starting Google Sign-In (web)');
				const result = await signInWithPopup(auth, googleProvider);
				console.log('Google Sign-In successful:', result.user.uid);
				return result.user;
			}
		} catch (error: unknown) {
			const authError = error as { code?: string; message?: string };
			console.error('Google Sign-In Error:', authError);

			// Handle specific error cases
			if (authError.code === 'auth/popup-closed-by-user') {
				console.log('Sign-in popup was closed by user');
				return null;
			}

			if (authError.code === 'auth/popup-blocked') {
				console.log('Sign-in popup was blocked by browser');
				throw new Error('Popup was blocked. Please allow popups and try again.');
			}

			if (authError.code === 'auth/network-request-failed') {
				throw new Error('Network error. Please check your internet connection and try again.');
			}

			throw error;
		}
	}

	/**
	 * Send magic link email - no localStorage dependency
	 */
	static async sendMagicLink(email: string): Promise<void> {
		const actionCodeSettings = {
			// Use Firebase hosting URL for magic links
			url: 'https://fototv-90cf0.firebaseapp.com/__/auth/action',
			handleCodeInApp: true,
			android: {
				packageName: 'com.phototv.app',
				installApp: false,
				minimumVersion: '1'
			}
		};

		try {
			await sendSignInLinkToEmail(auth, email, actionCodeSettings);

			// Store email in memory for Android app
			emailForSignIn = email;

			console.log('Magic link sent to:', email);
		} catch (error) {
			console.error('Magic Link Error:', error);
			throw error;
		}
	}

	/**
	 * Complete magic link sign in - handles both storage methods
	 */
	static async completeMagicLinkSignIn(url?: string): Promise<User | null> {
		const linkUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

		if (!this.isEmailLink(linkUrl)) {
			return null;
		}

		try {
			// Get stored email from memory (Android-only)
			let email: string | null = emailForSignIn;

			if (!email && typeof window !== 'undefined') {
				email = window.prompt('Please provide your email for confirmation');
			}

			if (!email) {
				throw new Error('Email is required to complete sign in');
			}

			const result = await signInWithEmailLink(auth, email, linkUrl);

			// Clean up stored email
			emailForSignIn = null;

			console.log('Magic link sign-in successful:', result.user.uid);
			return result.user;
		} catch (error) {
			console.error('Magic Link Completion Error:', error);
			throw error;
		}
	}

	/**
	 * Check if a URL is an email sign-in link
	 */
	static isEmailLink(url: string): boolean {
		return isSignInWithEmailLink(auth, url);
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
	 * Sign out user
	 */
	static async signOut(): Promise<void> {
		try {
			if (isNative) {
				// Sign out from Firebase Authentication plugin
				try {
					await FirebaseAuthentication.signOut();
				} catch (error) {
					console.warn('Plugin sign out failed, continuing with Firebase auth sign out:', error);
				}
			}

			// Sign out from Firebase Auth
			await auth.signOut();

			// Clear any stored email
			emailForSignIn = null;

			console.log('Successfully signed out');
		} catch (error) {
			console.error('Sign Out Error:', error);
			throw error;
		}
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
	 * Debug method to test plugin availability
	 */
	static async testPluginAvailability(): Promise<Record<string, unknown>> {
		if (!isNative) {
			return { available: false, reason: 'Not on native platform' };
		}

		try {
			// Test if the plugin is available
			const currentUser = await FirebaseAuthentication.getCurrentUser();
			return {
				available: true,
				currentUser: currentUser.user
					? {
							uid: currentUser.user.uid,
							email: currentUser.user.email
						}
					: null
			};
		} catch (error: unknown) {
			const authError = error as { message?: string; code?: string };
			return {
				available: false,
				error: authError.message,
				code: authError.code
			};
		}
	}

	/**
	 * Debug method to get comprehensive auth info
	 */
	static getDebugInfo(): Record<string, unknown> {
		return {
			platform: {
				capacitor: Capacitor.getPlatform(),
				native: isNative,
				userAgent:
					typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 100) : 'unknown'
			},
			firebase: {
				projectId: auth.app.options.projectId,
				authDomain: auth.app.options.authDomain,
				hasCurrentUser: !!auth.currentUser,
				currentUser: auth.currentUser
					? {
							uid: auth.currentUser.uid,
							email: auth.currentUser.email,
							isAnonymous: auth.currentUser.isAnonymous,
							providers: auth.currentUser.providerData.map((p) => p.providerId)
						}
					: null
			},
			plugin: {
				available: !!FirebaseAuthentication,
				methods: FirebaseAuthentication ? Object.getOwnPropertyNames(FirebaseAuthentication) : []
			},
			storage: {
				hasWindow: typeof window !== 'undefined',
				hasLocalStorage: typeof window !== 'undefined' && !!window.localStorage,
				emailStored: isNative
					? !!emailForSignIn
					: typeof window !== 'undefined' && !!localStorage.getItem('emailForSignIn')
			},
			environment: {
				dev: import.meta.env.DEV,
				mode: import.meta.env.MODE,
				hasFirebaseKeys: !!(
					import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
				)
			}
		};
	}
}

// Auto-initialize when the module loads
if (typeof window !== 'undefined') {
	AuthService.initialize().catch(console.error);
}
