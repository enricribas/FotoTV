# Authentication Setup Guide for PhotoTV

This guide will help you configure Firebase Authentication for both web and Android native app functionality.

## Prerequisites

1. Firebase project created at [Firebase Console](https://console.firebase.google.com/)
2. Android app registered in your Firebase project
3. Google Play Console account (for production releases)

## Step 1: Firebase Project Configuration

### 1.1 Enable Authentication Methods

In your Firebase Console:

1. Go to **Authentication** → **Sign-in method**
2. Enable **Google** sign-in provider
3. Enable **Email/Password** (for magic links)
4. Add your domain to **Authorized domains** (e.g., `your-domain.com`)

### 1.2 Configure Google Sign-In

1. In Google sign-in settings, add your **Web client ID**
2. Download the `google-services.json` file
3. Place it in `PhotoTV/android/app/google-services.json`

## Step 2: Android Configuration

### 2.1 Add SHA Fingerprints

You need to add SHA-1 and SHA-256 fingerprints for both debug and release builds:

#### Debug Fingerprint (for development):
```bash
# Navigate to your project
cd PhotoTV

# Get debug fingerprint
keytool -list -v -keystore android/app/.gradle/caches/transforms-3/*/transformed/jetified-gradle-*/jars/classes.jar -alias androiddebugkey -storepass android -keypass android

# Or use the debug keystore directly
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

#### Release Fingerprint (for production):
```bash
# Generate release keystore if you don't have one
keytool -genkey -v -keystore android/app/release-key.keystore -alias release-key -keyalg RSA -keysize 2048 -validity 10000

# Get release fingerprint
keytool -list -v -keystore android/app/release-key.keystore -alias release-key
```

Add both fingerprints to your Firebase project:
1. Go to **Project Settings** → **Your apps** → Android app
2. Add SHA certificate fingerprints

### 2.2 Update Android Manifest

The manifest has been updated to include deep link handling. Update the domain in the intent filter:

```xml
<!-- Replace 'your_project_id' with your actual Firebase project ID -->
<data android:scheme="https"
      android:host="your_project_id.firebaseapp.com" />
```

### 2.3 Configure Environment Variables

Create a `.env` file in the project root with your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Step 3: Update Configuration Files

### 3.1 Update Android Manifest Domain

In `PhotoTV/android/app/src/main/AndroidManifest.xml`, replace:
```xml
<data android:scheme="https"
      android:host="your_project_id.firebaseapp.com" />
```

With your actual Firebase project ID.

### 3.2 Update AuthService Configuration

In `PhotoTV/src/lib/auth.ts`, update these placeholders:

```typescript
// Line ~59: Replace with your Firebase project ID
url: 'https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/action'

// Line ~63: Replace with your dynamic link domain (optional)
dynamicLinkDomain: 'YOUR_PROJECT_ID.page.link'
```

## Step 4: Google Play Console Setup (Production Only)

### 4.1 App Signing Certificate

1. Upload your APK/AAB to Google Play Console
2. Go to **Release** → **Setup** → **App signing**
3. Copy the **SHA-1** and **SHA-256** from the "App signing key certificate"
4. Add these fingerprints to your Firebase project

### 4.2 OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. Configure your app details and add authorized domains

## Step 5: Testing

### 5.1 Web Testing

1. Run `npm run dev`
2. Test both Google sign-in and magic links
3. Verify authentication works in browser

### 5.2 Android Testing

1. Build debug APK: `npm run android:debug`
2. Install on device/emulator
3. Test Google sign-in (should open browser and redirect back)
4. Test magic links (email should open in browser, then redirect to app)

### 5.3 Production Testing

1. Build release APK: `npm run android:release` (requires signing setup)
2. Test on physical device
3. Verify Google Play Store version works correctly

## Troubleshooting

### Google Sign-In Issues

- **"Sign in failed"**: Check SHA fingerprints are correct
- **"Unauthorized client"**: Verify OAuth client configuration
- **No redirect**: Check intent filters in AndroidManifest.xml

### Magic Link Issues

- **Links don't open app**: Verify deep link configuration
- **Authentication fails**: Check Firebase project domain settings
- **Email not received**: Verify email template and sender reputation

### Common Android Issues

- **App not opening from browser**: Check `android:autoVerify="true"` and domain verification
- **OAuth not working**: Ensure `google-services.json` is in correct location
- **Build errors**: Run `npx cap sync` after configuration changes

## Production Checklist

- [ ] Firebase project configured with correct domains
- [ ] Google sign-in enabled with proper OAuth setup
- [ ] SHA fingerprints added for both debug and release
- [ ] `google-services.json` file added to Android project
- [ ] Environment variables configured
- [ ] Deep link domains updated in AndroidManifest.xml
- [ ] AuthService configuration updated with correct project ID
- [ ] App tested on physical device
- [ ] Google Play Console app signing configured
- [ ] OAuth consent screen configured

## Support

If you encounter issues:

1. Check Firebase Console for error logs
2. Review Android logcat for authentication errors
3. Verify all configuration files are updated
4. Test on both debug and release builds
5. Ensure all Firebase rules allow your authentication methods

For additional help, refer to:
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Capacitor Browser Plugin](https://capacitorjs.com/docs/apis/browser)
- [Android Deep Links Guide](https://developer.android.com/training/app-links)