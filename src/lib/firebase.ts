// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
	browserLocalPersistence,
	setPersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Capacitor } from '@capacitor/core';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Configure auth persistence
setPersistence(auth, browserLocalPersistence).catch((err) =>
	console.error('Error setting auth persistence:', err)
);

// Configure Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Configure for different platforms
if (Capacitor.isNativePlatform()) {
	// Native app settings
	googleProvider.setCustomParameters({
		// Force selection screen
		prompt: 'select_account',
		// For native app identification
		state: JSON.stringify({ app: 'com.phototv.app', platform: Capacitor.getPlatform() }),
		// Prevents caching issues
		nonce: Math.random().toString(36).substring(2, 15)
	});
} else {
	// Web settings
	googleProvider.setCustomParameters({
		prompt: 'select_account'
	});
}

export const db = getFirestore(app);
export const storage = getStorage(app);
