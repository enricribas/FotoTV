// src/lib/androidAuth.ts
import { auth } from '$lib/firebase';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import type { User } from 'firebase/auth';

/**
 * Android-only authentication service
 * This handles authentication specifically for Android APK deployment
 * No web fallbacks, no localStorage dependencies, no external browser redirects
 */
export class AndroidAuth {
	private static initialized = false;
	private static authInProgress = false;

	/**
	 * Initialize authentication for Android
	 */
	static async initialize(): Promise<void> {
		if (this.initialized || !Capacitor.isNativePlatform()) {
			return;
		}

		console.log('🤖 Initializing AndroidAuth for production APK');

		try {
			// Configure the Firebase Authentication plugin
			await FirebaseAuthentication.configure({
				providers: ['google.com'],
				skipNativeAuth: false,
				android: {
					// Use the web client ID from google-services.json
					serverClientId: '341116492373-943d7474frnl1n9uv4rf16lfg1oprn4o.apps.googleusercontent.com'
				}
			});

			console.log('✅ Firebase Authentication plugin configured');

			// Set up auth state listener
			auth.onAuthStateChanged((user) => {
				if (user) {
					console.log('🔓 User authenticated:', {
						uid: user.uid,
						email: user.email,
						providers: user.providerData.map(p => p.providerId)
					});
				} else {
					console.log('🔒 User signed out');
				}
			});

			// Listen for app URL opens (for deep links)
			App.addListener('appUrlOpen', (data) => {
				console.log('📱 App opened with URL:', data.url);
				// Handle any auth-related deep links here if needed
			});

			this.initialized = true;
			console.log('🚀 AndroidAuth initialization complete');

		} catch (error) {
			console.error('❌ Failed to initialize AndroidAuth:', error);
			throw new Error(`Android authentication setup failed: ${error.message}`);
		}
	}

	/**
	 * Sign in with Google using native Android integration
	 */
	static async signInWithGoogle(): Promise<User | null> {
		if (!Capacitor.isNativePlatform()) {
			throw new Error('AndroidAuth is only for native Android platform');
		}

		if (this.authInProgress) {
			console.log('🔄 Authentication already in progress, skipping...');
			return null;
		}

		this.authInProgress = true;

		try {
			console.log('🚀 Starting Google Sign-In for Android');

			// Ensure plugin is initialized
			if (!this.initialized) {
				await this.initialize();
			}

			// Check if user is already signed in
			const currentUser = await this.getCurrentUser();
			if (currentUser) {
				console.log('✅ User already signed in:', currentUser.uid);
				return currentUser;
			}

			console.log('📱 Calling native Google Sign-In...');

			// Use the native plugin - this should handle everything internally
			const result = await FirebaseAuthentication.signInWithGoogle();

			console.log('📋 Native sign-in result:', {
				hasUser: !!result.user,
				hasCredential: !!result.credential,
				userId: result.user?.uid,
				email: result.user?.email,
				providerId: result.user?.providerId
			});

			if (!result.user) {
				console.log('❌ No user returned - likely cancelled by user');
				return null;
			}

			console.log('✅ Google Sign-In successful:', result.user.uid);

			// Wait for Firebase Auth to sync with the plugin result
			let syncAttempts = 0;
			const maxSyncAttempts = 20; // 10 seconds max

			while (syncAttempts < maxSyncAttempts) {
				if (auth.currentUser && auth.currentUser.uid === result.user.uid) {
					console.log(`✅ Firebase Auth synced after ${syncAttempts * 500}ms`);
					break;
				}

				await new Promise(resolve => setTimeout(resolve, 500));
				syncAttempts++;

				if (syncAttempts % 4 === 0) {
					console.log(`⏳ Still waiting for Firebase Auth sync... (${syncAttempts * 500}ms)`);
				}
			}

			if (!auth.currentUser) {
				console.warn('⚠️ Firebase Auth did not sync, but plugin returned user');
				// Return the plugin user even if Firebase Auth didn't sync
				return result.user;
			}

			return auth.currentUser;

		} catch (error) {
			console.error('❌ Google Sign-In failed:', error);

			// Provide specific error messages for common issues
			if (error.message?.includes('DEVELOPER_ERROR')) {
				throw new Error('Google Sign-In configuration error. Check that Google Play certificates are added to Firebase Console.');
			}

			if (error.message?.includes('SIGN_IN_CANCELLED')) {
				console.log('ℹ️ Sign-in cancelled by user');
				return null;
			}

			if (error.message?.includes('NETWORK_ERROR')) {
				throw new Error('Network error. Please check your internet connection and try again.');
			}

			throw new Error(`Google Sign-In failed: ${error.message}`);

		} finally {
			this.authInProgress = false;
		}
	}

	/**
	 * Get current authenticated user
	 */
	static async getCurrentUser(): Promise<User | null> {
		try {
			// Check Firebase Auth first
			if (auth.currentUser) {
				return auth.currentUser;
			}

			// If no Firebase user, check the plugin
			if (this.initialized) {
				const pluginResult = await FirebaseAuthentication.getCurrentUser();
				if (pluginResult.user) {
					console.log('Found user in plugin but not in Firebase Auth');
					// Wait a bit for Firebase to sync
					await new Promise(resolve => setTimeout(resolve, 1000));
					return auth.currentUser || pluginResult.user;
				}
			}

			return null;
		} catch (error) {
			console.error('Error getting current user:', error);
			return auth.currentUser; // Fall back to Firebase Auth
		}
	}

	/**
	 * Sign out user
	 */
	static async signOut(): Promise<void> {
		try {
			console.log('🚪 Signing out user...');

			// Sign out from plugin first
			if (this.initialized) {
				try {
					await FirebaseAuthentication.signOut();
					console.log('✅ Signed out from Firebase Authentication plugin');
				} catch (error) {
					console.warn('⚠️ Plugin sign out failed:', error);
				}
			}

			// Sign out from Firebase Auth
			await auth.signOut();
			console.log('✅ Signed out from Firebase Auth');

		} catch (error) {
			console.error('❌ Sign out error:', error);
			throw error;
		}
	}

	/**
	 * Check if user is signed in
	 */
	static isSignedIn(): boolean {
		return !!auth.currentUser;
	}

	/**
	 * Get auth token for API calls
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
	 * Test the authentication configuration
	 */
	static async testConfiguration(): Promise<{
		success: boolean;
		details: any;
		recommendations: string[];
	}> {
		const details: any = {
			platform: Capacitor.getPlatform(),
			isNative: Capacitor.isNativePlatform(),
			pluginAvailable: !!FirebaseAuthentication,
			initialized: this.initialized,
			currentUser: null,
			firebaseConfig: {
				projectId: auth.app.options.projectId,
				authDomain: auth.app.options.authDomain
			}
		};

		const recommendations: string[] = [];

		try {
			// Test 1: Check if we're on Android
			if (!Capacitor.isNativePlatform()) {
				recommendations.push('This service is designed for Android native apps only');
				return { success: false, details, recommendations };
			}

			// Test 2: Check plugin availability
			if (!FirebaseAuthentication) {
				recommendations.push('FirebaseAuthentication plugin not available');
				return { success: false, details, recommendations };
			}

			// Test 3: Try to initialize
			if (!this.initialized) {
				await this.initialize();
			}

			// Test 4: Check current user
			try {
				const pluginUser = await FirebaseAuthentication.getCurrentUser();
				details.pluginUser = pluginUser.user ? {
					uid: pluginUser.user.uid,
					email: pluginUser.user.email
				} : null;
			} catch (error) {
				details.pluginUserError = error.message;
				recommendations.push('Cannot get current user from plugin');
			}

			details.currentUser = auth.currentUser ? {
				uid: auth.currentUser.uid,
				email: auth.currentUser.email,
				isAnonymous: auth.currentUser.isAnonymous
			} : null;

			// Success criteria
			const success = this.initialized && !!FirebaseAuthentication;

			if (!success) {
				recommendations.push('Plugin initialization failed');
				recommendations.push('Check that @capacitor-firebase/authentication is properly installed');
				recommendations.push('Ensure google-services.json is in android/app/ directory');
				recommendations.push('Verify Google Play certificates are added to Firebase Console');
			} else {
				recommendations.push('Configuration looks good!');
				if (!details.currentUser) {
					recommendations.push('Try signing in with Google to test authentication');
				}
			}

			return { success, details, recommendations };

		} catch (error) {
			details.error = error.message;
			recommendations.push(`Initialization failed: ${error.message}`);
			recommendations.push('Check Firebase project configuration and plugin installation');

			return { success: false, details, recommendations };
		}
	}

	/**
	 * Get comprehensive debug information
	 */
	static getDebugInfo(): any {
		return {
			service: 'AndroidAuth',
			timestamp: new Date().toISOString(),
			platform: {
				capacitor: Capacitor.getPlatform(),
				native: Capacitor.isNativePlatform(),
				userAgent: navigator.userAgent.substring(0, 100) + '...'
			},
			authentication: {
				initialized: this.initialized,
				authInProgress: this.authInProgress,
				pluginAvailable: !!FirebaseAuthentication,
				currentUser: auth.currentUser ? {
					uid: auth.currentUser.uid,
					email: auth.currentUser.email,
					isAnonymous: auth.currentUser.isAnonymous,
					providers: auth.currentUser.providerData.map(p => p.providerId)
				} : null
			},
			firebase: {
				projectId: auth.app.options.projectId,
				authDomain: auth.app.options.authDomain,
				appId: auth.app.options.appId
			},
			storage: {
				method: 'in-memory-only',
				emailStored: !!emailForSignIn
			},
			recommendations: [
				'This is an Android-only authentication service',
				'Magic links use custom URL scheme: com.phototv.app://auth/callback',
				'Google Sign-In uses native Android integration',
				'No web dependencies or localStorage usage'
			]
		};
	}
}

// Auto-initialize when module loads (only on Android)
if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
	AndroidAuth.initialize().catch((error) => {
		console.error('Failed to auto-initialize AndroidAuth:', error);
	});
}

// Export for debugging
if (typeof window !== 'undefined') {
	(window as any).AndroidAuth = AndroidAuth;
}
