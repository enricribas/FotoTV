# Continue Google Login Setup for Android - PhotoTV

## 🚨 CRITICAL ISSUE FIXED

I've identified and fixed a **critical package name mismatch** that was preventing Google authentication from working. Your `google-services.json` was using `com.knomni.fototv` but your app is configured for `com.phototv.app`.

**✅ FIXED**: Updated `google-services.json` to use the correct package name `com.phototv.app`

## Current Status

Based on your conversation thread, you've been dealing with:
- ✅ "Missing initial state" errors (certificate mismatch issue)
- ✅ Understanding that Google Play Store re-signs APKs
- ✅ Need to add Google Play certificates to Firebase Console

## What I've Just Fixed

### 1. Package Name Mismatch ✅
```diff
- "package_name": "com.knomni.fototv"
+ "package_name": "com.phototv.app"
```

### 2. Authentication Code Issues ✅
- Fixed TypeScript errors in `src/lib/auth.ts`
- Removed deprecated `configure()` method
- Added better error handling for Android-specific issues
- Improved certificate error messages

### 3. Better Error Messages ✅
The app now provides clear error messages for common issues:
- Missing Google Play Services
- Certificate configuration errors
- Network issues

## Next Steps to Complete Google Login

### Step 1: Verify Current Setup

Run the verification script I created:

```bash
npm run verify:auth
```

This will check:
- Package name consistency
- Certificate hashes
- Firebase configuration
- Environment variables

### Step 2: Update Firebase Console

You need to **re-register your Android app** in Firebase Console with the correct package name:

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `fototv-90cf0`
3. **Option A - Update existing app**:
   - Go to Project Settings → Your Android App
   - If possible, update package name to `com.phototv.app`
   
4. **Option B - Add new Android app** (recommended):
   - Click "Add app" → Android
   - Package name: `com.phototv.app`
   - App nickname: `PhotoTV`
   - Download the new `google-services.json`
   - Replace the existing file

### Step 3: Add Your Certificates to Firebase

You need to add **3 types** of certificates:

#### A. Debug Certificate (for development)
```bash
# Get your debug certificate
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

#### B. Release Certificate (if you're signing manually)
```bash
# If you have a release keystore
keytool -list -v -keystore android/app/release-key.keystore -alias release-key
```

#### C. Google Play Store Certificate (for production) ⚠️ CRITICAL
1. Upload your APK to Google Play Console
2. Go to **Release** → **Setup** → **App signing**
3. Copy SHA-1 and SHA-256 from **"App signing key certificate"**
4. Add both to Firebase Console

**Add all certificates to Firebase:**
1. Firebase Console → Project Settings → Your Android App
2. Click "Add fingerprint"
3. Paste each SHA-1 and SHA-256
4. Save

### Step 4: Test the Setup

#### Test Development Build
```bash
# Sync Capacitor
npx cap sync

# Build debug APK
npm run android:debug

# Install on device/emulator and test Google login
```

#### Test Production Flow
```bash
# Build release APK
npm run android:release

# Upload to Google Play Console (Internal Testing)
# Wait 1-2 hours for certificate propagation
# Download from Play Store and test
```

## Common Issues and Solutions

### Issue: "DEVELOPER_ERROR" in Google Sign-In

**Cause**: Package name or certificate mismatch

**Solution**:
1. Verify package name is `com.phototv.app` everywhere
2. Ensure debug certificate is added to Firebase
3. For production, ensure Google Play certificates are added

### Issue: Authentication works in debug but not production

**Cause**: Missing Google Play Store signing certificate

**Solution**:
1. Upload APK to Google Play Console first
2. Get certificates from Play Console → App signing
3. Add to Firebase Console
4. Wait 1-2 hours for propagation

### Issue: "Sign in failed" or "Network error"

**Solutions**:
1. Check internet connection
2. Verify Google Play Services is installed and updated
3. Clear app data and try again
4. Check Firebase Console logs for authentication attempts

## Verification Checklist

Before testing, ensure:

- [ ] **Package name is `com.phototv.app` everywhere**
- [ ] **google-services.json has correct package name**
- [ ] **Firebase project has Android app with `com.phototv.app`**
- [ ] **Debug certificate SHA-1 added to Firebase**
- [ ] **Google Play certificate SHA-1 added to Firebase (for production)**
- [ ] **Capacitor synced**: `npx cap sync`
- [ ] **App built successfully**: `npm run android:debug`

## Debug Information

If you encounter issues, get debug info:

```javascript
// In your app's console
import { AuthService } from '$lib/auth';

// Check plugin availability
console.log(await AuthService.testPluginAvailability());

// Get comprehensive debug info
console.log(AuthService.getDebugInfo());
```

## Configuration Files Status

### ✅ Fixed Files
- `src/lib/auth.ts` - Updated authentication logic
- `android/app/google-services.json` - Fixed package name
- `capacitor.config.ts` - Already correctly configured

### ✅ Correct Configuration
- `android/app/src/main/AndroidManifest.xml` - Intent filters configured
- Package structure matches `com.phototv.app`

## Production Deployment Workflow

1. **Development Phase**:
   ```bash
   npm run verify:auth              # Verify setup
   npm run android:debug            # Build debug
   # Test on device/emulator
   ```

2. **Release Phase**:
   ```bash
   npm run android:release          # Build release
   # Upload to Google Play Console
   ```

3. **Production Phase**:
   ```bash
   # Get Google Play certificates
   # Add to Firebase Console
   # Wait 1-2 hours
   # Download from Play Store and test
   ```

## Support

If you still encounter issues:

1. **Run verification**: `npm run verify:auth`
2. **Check Firebase Console logs**: Authentication section
3. **Verify certificates**: Ensure all SHA fingerprints are added
4. **Test step by step**: Debug → Release → Production

The main issue was the package name mismatch, which should now be resolved. Once you update the Firebase Console with the correct package name and add your certificates, Google authentication should work properly! 🚀