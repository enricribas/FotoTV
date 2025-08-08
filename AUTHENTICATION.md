# PhotoTV Authentication

This document describes the email/password authentication system used in PhotoTV.

## Overview

PhotoTV uses Firebase Authentication with email and password for user registration and login. We've removed Google Login and Magic Link authentication to simplify the system.

## Features

- **User Registration**: Create new accounts with email, password, and display name
- **User Login**: Sign in with email and password
- **Password Reset**: Send password reset emails to users
- **Form Validation**: Client-side validation for email format and password strength
- **Error Handling**: User-friendly error messages for all authentication scenarios

## Authentication Service

The `AuthService` class in `src/lib/auth.ts` provides the following methods:

### Registration
```typescript
AuthService.register(email: string, password: string, displayName?: string): Promise<User>
```

### Login
```typescript
AuthService.signIn(email: string, password: string): Promise<User>
```

### Password Reset
```typescript
AuthService.resetPassword(email: string): Promise<void>
```

### Sign Out
```typescript
AuthService.signOut(): Promise<void>
```

### Utility Methods
- `AuthService.getCurrentUser()`: Get current authenticated user
- `AuthService.isSignedIn()`: Check if user is signed in
- `AuthService.isValidEmail(email)`: Validate email format
- `AuthService.isValidPassword(password)`: Validate password strength

## UI Components

### LoggedOutView
Located in `src/routes/LoggedOutView.svelte`, this component provides:
- Registration form with name, email, password, and confirm password
- Login form with email and password
- Password reset form
- Form validation and error display
- Toggle between registration and login modes

### Authentication Flow
1. Users can register with email/password or sign in if they already have an account
2. Password must be at least 6 characters long
3. Email format is validated on the client side
4. Success/error messages are displayed to guide users
5. Upon successful authentication, users are automatically signed in

## Password Requirements

- Minimum 6 characters
- Valid email format required
- Passwords must match during registration

## Error Handling

The system provides user-friendly error messages for common scenarios:
- Email already in use
- Invalid email format
- Weak password
- User not found
- Wrong password
- Network errors
- Too many failed attempts

## Firebase Configuration

Make sure your Firebase project has email/password authentication enabled:
1. Go to Firebase Console > Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Configure your Firebase project settings in your environment variables

## Environment Variables

Required Firebase configuration variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

## Removed Features

The following authentication methods have been removed:
- Google Login integration
- Magic Link email authentication
- Social login providers
- Authentication debugging tools
- Platform-specific native authentication
- Android-specific authentication handlers

This simplifies the authentication system and removes dependencies on external providers while still providing a secure and user-friendly authentication experience.