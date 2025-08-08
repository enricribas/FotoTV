import { SocialLogin } from '@capgo/capacitor-social-login';
import { Capacitor } from '@capacitor/core';
import { auth, googleProvider } from './firebase';
import { signInWithCredential, GoogleAuthProvider, User } from 'firebase/auth';

/**
 * A service to handle authentication via social logins
 * using @capgo/capacitor-social-login plugin
 */
export class SocialAuthService {
  private isNative = Capacitor.isNativePlatform();
  private initialized = false;

  /**
   * Initialize the social login plugin
   * This must be called before any other method
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize the plugin with Google configuration
      await SocialLogin.initialize({
        google: {
          clientId: import.meta.env.VITE_FIREBASE_CLIENT_ID || '',
          serverClientId: import.meta.env.VITE_FIREBASE_CLIENT_ID || '',
          scopes: ['profile', 'email'],
          // Don't include problematic parameter that causes the error
          // includeGrantedScopes: false
        }
      });

      this.initialized = true;
      console.log('Social login initialized successfully');
    } catch (error) {
      console.error('Failed to initialize social login:', error);
      throw error;
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<User | null> {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      console.log('Starting Google Sign-In');

      const result = await SocialLogin.login({
        provider: 'google',
        options: {
          // These options work for mobile platforms
          scopes: ['profile', 'email'],
        }
      });

      if (!result.idToken) {
        throw new Error('No ID token returned from Google sign-in');
      }

      console.log('Google Sign-In successful, authenticating with Firebase');

      // Create a credential with the token
      const credential = GoogleAuthProvider.credential(result.idToken);

      // Sign in to Firebase with the credential
      const userCredential = await signInWithCredential(auth, credential);
      return userCredential.user;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    try {
      return auth.signOut();
    } catch (error) {
      console.error('Sign Out Error:', error);
      throw error;
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Add an auth state change listener
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return auth.onAuthStateChanged(callback);
  }
}

// Export a singleton instance
export const socialAuthService = new SocialAuthService();

// Initialize on import if in browser
if (typeof window !== 'undefined') {
  socialAuthService.initialize().catch(console.error);
}
