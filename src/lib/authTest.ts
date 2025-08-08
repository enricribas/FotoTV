// src/lib/authTest.ts
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { auth, googleProvider } from '$lib/firebase';
import { signInWithPopup } from 'firebase/auth';

export class AuthTest {
	/**
	 * Test Google Sign-In with detailed logging
	 */
	static async testGoogleSignIn(): Promise<any> {
		const isNative = Capacitor.isNativePlatform();
		const platform = Capacitor.getPlatform();

		console.log('=== AUTH TEST START ===');
		console.log('Platform:', platform);
		console.log('Native:', isNative);
		console.log('User Agent:', navigator.userAgent.substring(0, 100));
		console.log('Firebase Config:', {
			projectId: auth.app.options.projectId,
			authDomain: auth.app.options.authDomain,
			apiKey: auth.app.options.apiKey?.substring(0, 10) + '...'
		});

		if (isNative) {
			return await this.testNativeGoogleSignIn();
		} else {
			return await this.testWebGoogleSignIn();
		}
	}

	private static async testNativeGoogleSignIn(): Promise<any> {
		try {
			console.log('--- Testing Native Google Sign-In ---');

			// Check if plugin is available
			console.log('Checking FirebaseAuthentication plugin availability...');
			if (!FirebaseAuthentication) {
				throw new Error('FirebaseAuthentication plugin not available');
			}

			// Try to configure
			console.log('Configuring plugin...');
			try {
				await FirebaseAuthentication.configure({
					providers: ['google.com'],
					skipNativeAuth: false
				});
				console.log('Plugin configured successfully');
			} catch (configError) {
				console.error('Configuration failed:', configError);
				throw configError;
			}

			// Check current user first
			console.log('Checking current user...');
			try {
				const currentUserResult = await FirebaseAuthentication.getCurrentUser();
				console.log('Current user from plugin:', currentUserResult);
			} catch (getCurrentUserError) {
				console.warn('Could not get current user:', getCurrentUserError);
			}

			// Try sign in
			console.log('Attempting Google Sign-In...');
			const result = await FirebaseAuthentication.signInWithGoogle();

			console.log('Plugin result:', {
				hasUser: !!result.user,
				userId: result.user?.uid,
				email: result.user?.email,
				credential: !!result.credential,
				additionalUserInfo: !!result.additionalUserInfo
			});

			if (result.user) {
				console.log('Native sign-in successful!');

				// Wait for Firebase Auth to sync
				let attempts = 0;
				while (attempts < 10 && !auth.currentUser) {
					await new Promise((resolve) => setTimeout(resolve, 500));
					attempts++;
					console.log(`Waiting for Firebase Auth sync, attempt ${attempts}`);
				}

				console.log('Firebase Auth current user after sync:', {
					hasUser: !!auth.currentUser,
					uid: auth.currentUser?.uid,
					email: auth.currentUser?.email
				});

				return {
					success: true,
					method: 'native',
					user: result.user,
					firebaseUser: auth.currentUser,
					syncAttempts: attempts
				};
			} else {
				console.log('Native sign-in returned no user');
				return {
					success: false,
					method: 'native',
					error: 'No user returned from plugin'
				};
			}
		} catch (error) {
			console.error('Native Google Sign-In failed:', error);

			// Try web fallback for debugging
			console.log('Attempting web fallback for debugging...');
			try {
				const webResult = await this.testWebGoogleSignIn();
				return {
					...webResult,
					nativeError: error.message,
					method: 'web-fallback-after-native-error'
				};
			} catch (webError) {
				return {
					success: false,
					method: 'native',
					error: error.message,
					webFallbackError: webError.message
				};
			}
		}
	}

	private static async testWebGoogleSignIn(): Promise<any> {
		try {
			console.log('--- Testing Web Google Sign-In ---');

			console.log('Google Provider config:', {
				providerId: googleProvider.providerId,
				scopes: googleProvider._config?.scopes || 'unknown'
			});

			console.log('Attempting popup sign-in...');
			const result = await signInWithPopup(auth, googleProvider);

			console.log('Web sign-in successful:', {
				uid: result.user.uid,
				email: result.user.email,
				displayName: result.user.displayName,
				providerId: result.providerId
			});

			return {
				success: true,
				method: 'web',
				user: result.user
			};
		} catch (error) {
			console.error('Web Google Sign-In failed:', error);
			return {
				success: false,
				method: 'web',
				error: error.message,
				code: error.code
			};
		}
	}

	/**
	 * Check current auth state
	 */
	static checkAuthState(): any {
		return {
			hasCurrentUser: !!auth.currentUser,
			user: auth.currentUser
				? {
						uid: auth.currentUser.uid,
						email: auth.currentUser.email,
						displayName: auth.currentUser.displayName,
						isAnonymous: auth.currentUser.isAnonymous,
						providers: auth.currentUser.providerData.map((p) => p.providerId)
					}
				: null,
			authConfig: {
				apiKey: auth.app.options.apiKey?.substring(0, 10) + '...',
				authDomain: auth.app.options.authDomain,
				projectId: auth.app.options.projectId
			},
			platform: {
				capacitor: Capacitor.getPlatform(),
				native: Capacitor.isNativePlatform(),
				userAgent: navigator.userAgent.substring(0, 100) + '...'
			}
		};
	}

	/**
	 * Test if the plugin is properly installed and working
	 */
	static async testPluginAvailability(): Promise<any> {
		try {
			console.log('Testing plugin availability...');

			// Check if the plugin object exists
			if (!FirebaseAuthentication) {
				return {
					available: false,
					error: 'FirebaseAuthentication plugin not found in global scope'
				};
			}

			// Try to call a simple method
			try {
				const result = await FirebaseAuthentication.getCurrentUser();
				return {
					available: true,
					currentUser: result.user
						? {
								uid: result.user.uid,
								email: result.user.email
							}
						: null,
					methods: Object.getOwnPropertyNames(FirebaseAuthentication).filter(
						(name) => typeof FirebaseAuthentication[name] === 'function'
					)
				};
			} catch (error) {
				return {
					available: true,
					error: 'Plugin exists but getCurrentUser failed: ' + error.message,
					methods: Object.getOwnPropertyNames(FirebaseAuthentication)
				};
			}
		} catch (error) {
			return {
				available: false,
				error: error.message
			};
		}
	}

	/**
	 * Test magic link functionality (no localStorage)
	 */
	static async testMagicLink(email: string): Promise<any> {
		try {
			console.log('Testing magic link for:', email);

			// This would normally be imported from AuthService
			// but we'll test the Firebase method directly
			const { sendSignInLinkToEmail } = await import('firebase/auth');

			const actionCodeSettings = {
				url: Capacitor.isNativePlatform()
					? 'https://fototv-90cf0.firebaseapp.com/auth/callback'
					: `${window.location.origin}/auth/callback`,
				handleCodeInApp: true,
				android: {
					packageName: 'com.phototv.app',
					installApp: false,
					minimumVersion: '1'
				},
				ios: {
					bundleId: 'com.phototv.app'
				}
			};

			await sendSignInLinkToEmail(auth, email, actionCodeSettings);

			return {
				success: true,
				method: 'magic-link',
				email: email,
				message: 'Magic link sent successfully'
			};
		} catch (error) {
			console.error('Magic link test failed:', error);
			return {
				success: false,
				method: 'magic-link',
				error: error.message,
				code: error.code
			};
		}
	}

	/**
	 * Comprehensive debug info without localStorage dependencies
	 */
	static getDebugInfo(): any {
		const info = {
			timestamp: new Date().toISOString(),
			platform: {
				capacitor: Capacitor.getPlatform(),
				native: Capacitor.isNativePlatform(),
				userAgent: navigator.userAgent
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
				storageMethod: Capacitor.isNativePlatform() ? 'in-memory' : 'localStorage'
			},
			environment: {
				dev: import.meta.env.DEV,
				mode: import.meta.env.MODE,
				hasFirebaseKeys: !!(
					import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
				)
			}
		};

		console.log('=== DEBUG INFO ===');
		console.log(JSON.stringify(info, null, 2));
		return info;
	}

	/**
	 * Test configuration and certificates
	 */
	static async testConfiguration(): Promise<any> {
		const results = [];

		// Test 1: Plugin availability
		const pluginTest = await this.testPluginAvailability();
		results.push({
			test: 'Plugin Availability',
			passed: pluginTest.available,
			details: pluginTest
		});

		// Test 2: Firebase config
		results.push({
			test: 'Firebase Configuration',
			passed: !!(auth.app.options.projectId && auth.app.options.authDomain),
			details: {
				projectId: auth.app.options.projectId,
				authDomain: auth.app.options.authDomain,
				apiKey: auth.app.options.apiKey ? 'Present' : 'Missing'
			}
		});

		// Test 3: Current user state
		results.push({
			test: 'Current User State',
			passed: true, // This is informational
			details: {
				hasUser: !!auth.currentUser,
				user: auth.currentUser
					? {
							uid: auth.currentUser.uid,
							email: auth.currentUser.email
						}
					: null
			}
		});

		const overallPassed = results.every((r) => r.passed);

		return {
			success: overallPassed,
			summary: `${results.filter((r) => r.passed).length}/${results.length} tests passed`,
			results: results
		};
	}
}

// Auto-export for window debugging
if (typeof window !== 'undefined') {
	(window as any).AuthTest = AuthTest;
}
