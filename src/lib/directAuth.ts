// src/lib/directAuth.ts
import { auth } from './firebase';
import {
	GoogleAuthProvider,
	signInWithCredential,
	getAuth,
	signInAnonymously
} from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

// Use either the real client ID from env or a fallback for development
const GOOGLE_CLIENT_ID =
	import.meta.env.VITE_GOOGLE_CLIENT_ID ||
	import.meta.env.VITE_FIREBASE_CLIENT_ID ||
	'341116492373-943d7474frnl1n9uv4rf16lfg1oprn4o.apps.googleusercontent.com';

// Helper to generate a random string for state/nonce
const generateRandomString = (length = 10) => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

/**
 * Direct Google Auth implementation that bypasses Firebase redirects
 * and handles the OAuth flow manually to avoid session storage issues
 */
export class DirectAuth {
	/**
	 * Start Google Sign In process - opens Google auth page in system browser
	 */
	static async signInWithGoogle() {
		try {
			// For debugging - log the client ID we're using
			console.log(`Using Google Client ID: ${GOOGLE_CLIENT_ID}`);

			// Generate state and nonce for security
			const state = generateRandomString(20);
			const nonce = generateRandomString(16);

			// Store for verification when the flow completes
			localStorage.setItem('auth_state', state);
			localStorage.setItem('auth_nonce', nonce);

			// Define redirect URL - this must be authorized in your Google Console
			const redirectUri = 'https://fototv-90cf0.firebaseapp.com/__/auth/handler';

			// Create Google OAuth URL with minimal parameters to avoid session issues
			const oauthUrl =
				`https://accounts.google.com/o/oauth2/v2/auth?` +
				`client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
				`&redirect_uri=${encodeURIComponent(redirectUri)}` +
				`&response_type=id_token` +
				`&scope=${encodeURIComponent('email profile openid')}` +
				`&nonce=${nonce}` +
				`&state=${state}` +
				`&prompt=select_account`;

			console.log('Opening Google auth URL');

			// Open in system browser
			await Browser.open({
				url: oauthUrl,
				windowName: '_blank',
				presentationStyle: 'popover'
			});

			// We'll handle the result in the URL handler
			return null;
		} catch (error) {
			console.error('Error starting Google Sign In:', error);
			throw error;
		}
	}

	/**
	 * Handle sign-in completion - called when the browser redirects back to app
	 */
	static async handleSignInResult(url: string) {
		try {
			console.log('Handling sign-in result from URL:', url);

			// Extract token from URL fragment
			const hashParams = new URLSearchParams(url.split('#')[1] || '');
			const queryParams = new URLSearchParams(url.split('?')[1] || '');

			// Check for state parameter to verify the flow
			const state = hashParams.get('state') || queryParams.get('state');
			const storedState = localStorage.getItem('auth_state');

			if (state !== storedState) {
				console.error('State mismatch', { received: state, expected: storedState });
				return null;
			}

			// Clear stored state
			localStorage.removeItem('auth_state');
			localStorage.removeItem('auth_nonce');

			// Get ID token from hash
			const idToken = hashParams.get('id_token');
			if (!idToken) {
				console.error('No ID token found in URL');
				return null;
			}

			// Create Google credential from ID token
			const credential = GoogleAuthProvider.credential(idToken);

			// Sign in to Firebase with credential
			const result = await signInWithCredential(auth, credential);
			console.log('Successfully signed in with Google:', result.user.uid);

			// Close browser window if it's still open
			try {
				await Browser.close();
			} catch (e) {
				// Ignore errors here
			}

			return result.user;
		} catch (error) {
			console.error('Error handling sign-in result:', error);
			throw error;
		}
	}

	/**
	 * Sign in anonymously - useful for quick testing
	 */
	static async signInAnonymously() {
		try {
			const result = await signInAnonymously(auth);
			return result.user;
		} catch (error) {
			console.error('Error signing in anonymously:', error);
			throw error;
		}
	}

	/**
	 * Sign out current user
	 */
	static async signOut() {
		return auth.signOut();
	}

	/**
	 * Get current user
	 */
	static getCurrentUser() {
		return auth.currentUser;
	}
}
