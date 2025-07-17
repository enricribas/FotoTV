// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDXlu3twONtxnlsSYAjJcLng0UsNEgKkkg",
  authDomain: "fototv-90cf0.firebaseapp.com",
  projectId: "fototv-90cf0",
  storageBucket: "fototv-90cf0.firebasestorage.app",
  messagingSenderId: "341116492373",
  appId: "1:341116492373:web:74768f1c508198574d12dc",
  measurementId: "G-K7K2NXMWW3"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); 