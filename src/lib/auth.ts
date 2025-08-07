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
				// For native apps, use redirect flow
				await signInWithRedirect(auth, googleProvider);
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
			const result = await getRedirectResult(auth);
			return result?.user || null;
		} catch (error) {
			console.error('Redirect Result Error:', error);
			return null;
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
					packageName: 'com.knomni.fototv',
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
			await this.handleRedirectResult();

			// Set up app state change listener for OAuth returns
			document.addEventListener('visibilitychange', async () => {
				if (document.visibilityState === 'visible') {
					await this.handleRedirectResult();
				}
			});
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
