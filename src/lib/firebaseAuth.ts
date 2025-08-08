import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { User } from 'firebase/auth';

// Import the Firebase auth instance for web
import { auth as firebaseAuth } from './firebase';

class FirebaseAuthService {
  private isNative = Capacitor.isNativePlatform();

  /**
   * Sign in with Google - handles both web and native
   */
  async signInWithGoogle(): Promise<User | null> {
    try {
      console.log('Starting Google Sign-In with @capacitor-firebase/authentication');

      // Sign in with the plugin - works on all platforms
      const result = await FirebaseAuthentication.signInWithGoogle();

      if (!result.user) {
        console.log('No user returned from Google sign-in');
        return null;
      }

      console.log('Google Sign-In successful', {
        uid: result.user.uid,
        email: result.user.email
      });

      // On the web, the plugin already handles setting the current user in Firebase Auth
      // For native, we return the user object from the plugin
      return this.isNative ? result.user as unknown as User : firebaseAuth.currentUser;
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
      await FirebaseAuthentication.signOut();
    } catch (error) {
      console.error('Sign Out Error:', error);
      throw error;
    }
  }

  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const result = await FirebaseAuthentication.getCurrentUser();
      return result.user ? result.user as unknown as User : null;
    } catch (error) {
      console.error('Get Current User Error:', error);
      return null;
    }
  }

  /**
   * Get the authentication state observable
   */
  addAuthStateChangeListener(callback: (user: User | null) => void): Promise<void> {
    return FirebaseAuthentication.addAuthStateChangeListener(
      (change) => {
        callback(change.user as unknown as User);
      }
    );
  }

  /**
   * Initialize auth - call this at app startup
   */
  async initialize(): Promise<void> {
    try {
      // Get current auth state
      const user = await this.getCurrentUser();

      // Add auth state change listener
      await this.addAuthStateChangeListener((user) => {
        console.log('Auth state changed:', user ? `User: ${user.uid}` : 'No user');
      });

      console.log('Auth initialized:', user ? `User: ${user.uid}` : 'No user');
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  }
}

// Export a singleton instance
export const firebaseAuthService = new FirebaseAuthService();

// Initialize on import
if (typeof window !== 'undefined') {
  firebaseAuthService.initialize().catch(console.error);
}
