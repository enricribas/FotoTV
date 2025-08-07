// src/lib/auth.ts
import { auth, googleProvider } from '$lib/firebase';
import {
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
	type User
} from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

// Check if running on native platform
const isNative = Capacitor.isNativePlatform();

export class AuthService {
	/**
	 * Sign in with Google - handles both web and native
	 */
	static async signInWithGoogle(): Promise<User | null> {
		try {
			if (isNative) {
				// Configure OAuth provider with custom parameters
				googleProvider.setCustomParameters({
					// For better native mobile experience
					prompt: 'select_account',
					// Tag for native app identification
					state: 'com.phototv.app',
					// Add timestamp to prevent caching issues
					t: Date.now().toString()
				});

				// Use Firebase's built-in redirect system
				// This is more reliable than constructing the URL manually
				await signInWithRedirect(auth, googleProvider);
				console.log('Initiated Google Sign-In with redirect');

				// The result will be handled by getRedirectResult on app resume
				return null;
			} else {
				// For web, use popup
				const result = await signInWithPopup(auth, googleProvider);
				return result.user;
			}
		} catch (error) {
			console.error('Google Sign-In Error:', error);
			throw error;
		}
	}

	/**
	 * Handle redirect result (for native apps)
	 */
	static async handleRedirectResult(): Promise<User | null> {
		try {
			console.log('Checking for redirect result...');
			const result = await getRedirectResult(auth);

			if (result && result.user) {
				console.log('Successfully handled redirect result', {
					uid: result.user.uid,
					provider: result.providerId
				});
				return result.user;
			} else {
				console.log('No redirect result found');
				return null;
			}
		} catch (error) {
			console.error('Redirect Result Error:', error);
			throw error; // Rethrow to see the actual error in debug tools
		}
	}

	/**
	 * Send magic link email
	 */
	static async sendMagicLink(email: string): Promise<void> {
		const actionCodeSettings = {
			url: isNative
				? 'https://fototv-90cf0.firebaseapp.com/__/auth/action'
				: window.location.origin + '/auth/callback',
			handleCodeInApp: true,
			...(isNative && {
				// For native apps, use custom URL scheme
				dynamicLinkDomain: 'fototv-90cf0.page.link',
				android: {
					packageName: 'com.phototv.app',
					installApp: false,
					minimumVersion: '1'
				}
			})
		};

		try {
			await sendSignInLinkToEmail(auth, email, actionCodeSettings);

			// Store email for completion
			if (typeof window !== 'undefined') {
				window.localStorage.setItem('emailForSignIn', email);
			}
		} catch (error) {
			console.error('Magic Link Error:', error);
			throw error;
		}
	}

	/**
	 * Complete magic link sign in
	 */
	static async completeMagicLinkSignIn(url?: string): Promise<User | null> {
		const linkUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

		if (!isSignInWithEmailLink(auth, linkUrl)) {
			return null;
		}

		try {
			let email =
				typeof window !== 'undefined' ? window.localStorage.getItem('emailForSignIn') : null;

			if (!email && typeof window !== 'undefined') {
				email = window.prompt('Please provide your email for confirmation');
			}

			if (!email) {
				throw new Error('Email is required to complete sign in');
			}

			const result = await signInWithEmailLink(auth, email, linkUrl);

			// Clean up
			if (typeof window !== 'undefined') {
				window.localStorage.removeItem('emailForSignIn');

				// For native apps, close the browser after successful auth
				if (isNative) {
					await Browser.close();
				}
			}

			return result.user;
		} catch (error) {
			console.error('Magic Link Completion Error:', error);
			throw error;
		}
	}

	/**
	 * Open URL in system browser (for native apps)
	 */
	static async openInBrowser(url: string): Promise<void> {
		if (isNative) {
			await Browser.open({
				url,
				presentationStyle: 'popover'
			});
		} else {
			window.open(url, '_blank');
		}
	}

	/**
	 * Initialize auth for the current platform
	 */
	static async initialize(): Promise<void> {
		if (isNative) {
			// Handle any pending redirect results
			try {
				const result = await this.handleRedirectResult();
				if (result) {
					console.log('Successfully signed in from redirect');
				}
			} catch (e) {
				console.error('Error handling redirect result:', e);
			}

			// Set up app state change listener for OAuth returns
			document.addEventListener('visibilitychange', async () => {
				if (document.visibilityState === 'visible') {
					await this.handleRedirectResult();
				}
			});

			// Listen for app resume events on Capacitor
			try {
				// @ts-ignore - Capacitor app not in types
				const { App } = await import('@capacitor/app');
				App.addListener('appStateChange', async (state: { isActive: boolean }) => {
					if (state.isActive) {
						console.log('App became active, checking auth state');
						// App came to foreground, try to get auth result
						await this.handleRedirectResult();
					}
				});

				// Listen for URL open events (deep links)
				App.addListener('appUrlOpen', async (data: { url: string }) => {
					console.log('App opened with URL:', data.url);
					if (data.url) {
						// Check if it's an auth deep link
						if (data.url.includes('oauth') || data.url.includes('auth')) {
							console.log('Handling auth redirect from deep link');
							await this.handleRedirectResult();
						}
						// Check if it's a magic link
						if (isSignInWithEmailLink(auth, data.url)) {
							console.log('Handling magic link from deep link');
							await this.completeMagicLinkSignIn(data.url);
						}
					}
				});
			} catch (e) {
				console.warn('Could not add Capacitor App listeners', e);
			}
		}

		// Check for magic links on app/page load
		if (typeof window !== 'undefined') {
			await this.completeMagicLinkSignIn();
		}
	}

	/**
	 * Sign out user
	 */
	static async signOut(): Promise<void> {
		try {
			await auth.signOut();
		} catch (error) {
			console.error('Sign Out Error:', error);
			throw error;
		}
	}
}

// Auto-initialize when the module loads
if (typeof window !== 'undefined') {
	AuthService.initialize().catch(console.error);
}
