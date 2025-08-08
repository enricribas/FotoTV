import { firebaseAuthService } from './firebaseAuth';
import { socialAuthService } from './socialAuth';
import type { User } from 'firebase/auth';

/**
 * Example class showing how to use the authentication services
 * Choose ONE of the auth services to use in your app:
 * 1. firebaseAuthService - Uses @capacitor-firebase/authentication (recommended)
 * 2. socialAuthService - Uses @capgo/capacitor-social-login (alternative)
 */
export class AuthExample {
  private currentUser: User | null = null;

  constructor(
    // Choose which service to use by uncommenting one of these:
    private authService = firebaseAuthService
    // private authService = socialAuthService
  ) {
    // Set up auth state listener
    if ('addAuthStateChangeListener' in this.authService) {
      this.authService.addAuthStateChangeListener(this.handleAuthStateChanged.bind(this));
    } else if ('onAuthStateChanged' in this.authService) {
      this.authService.onAuthStateChanged(this.handleAuthStateChanged.bind(this));
    }
  }

  /**
   * Handle auth state changes
   */
  private handleAuthStateChanged(user: User | null): void {
    this.currentUser = user;
    console.log('Auth state changed:', user ? `User: ${user.uid}` : 'No user');

    // You can trigger UI updates or navigation here
    if (user) {
      // User is signed in, show authenticated UI
      console.log('User is authenticated:', user.email);
    } else {
      // User is signed out, show sign-in UI
      console.log('User is not authenticated');
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<User | null> {
    try {
      const user = await this.authService.signInWithGoogle();
      return user;
    } catch (error) {
      console.error('Failed to sign in with Google:', error);
      throw error;
    }
  }

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
      throw error;
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    if ('getCurrentUser' in this.authService) {
      // For firebaseAuthService which has async getCurrentUser
      this.authService.getCurrentUser().then(user => {
        this.currentUser = user;
        return user;
      });
    }
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}

// Example usage:
// const auth = new AuthExample();
//
// // Sign in
// auth.signInWithGoogle()
//   .then(user => console.log('Signed in:', user?.email))
//   .catch(err => console.error('Sign in error:', err));
//
// // Sign out
// auth.signOut()
//   .then(() => console.log('Signed out'))
//   .catch(err => console.error('Sign out error:', err));
