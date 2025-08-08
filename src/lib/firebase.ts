// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
	browserLocalPersistence,
	setPersistence,
	connectAuthEmulator
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

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Set persistent local authentication
setPersistence(auth, browserLocalPersistence).catch((err) =>
	console.error('Error setting auth persistence:', err)
);

// Configure Google provider with minimal settings
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Simple configuration that works on both platforms
googleProvider.setCustomParameters({
	// Always force the user to select account
	prompt: 'select_account'
});

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// Debug info
console.log(
	`Firebase initialized. Platform: ${Capacitor.getPlatform()}, Native: ${Capacitor.isNativePlatform()}`
);
