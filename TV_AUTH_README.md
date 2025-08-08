# TV Authentication System

This document explains how the TV authentication system works in PhotoTV.

## Overview

The TV authentication system allows users to sign in on TV devices without typing passwords. Instead, it uses a simple 4-letter code system where logged-in users can manually approve TV login requests by entering the code.

## How It Works

### For TV Devices

1. **Detection**: The app automatically detects if it's running on an Android TV device
2. **Code Generation**: When not logged in, the TV shows a "Start TV Sign In" button
3. **Code Storage**: After clicking, a 4-letter code (e.g., "ABCD") is generated and stored in Firestore
4. **Code Display**: The code is displayed on the TV screen
5. **Waiting**: The TV polls Firestore waiting for approval
6. **Auto-Login**: Once approved, the TV automatically signs in

### For Mobile/Logged-in Devices

1. **Manual Entry**: Logged-in users see an "Approve TV Login" section in the app
2. **Code Input**: Users manually enter the 4-letter code they see on their TV
3. **Firestore Update**: The code is verified and marked as approved in Firestore
4. **No Automatic Notifications**: No push notifications or automatic popups are shown

## Files Structure

```
src/lib/
├── tvAuth.ts                    # Core TV authentication service (Firestore-based)
├── advancedDeviceDetection.ts   # TV device detection logic
└── components/
    ├── TVLogin.svelte          # TV login interface (shows code)
    └── ManualCodeEntry.svelte  # Manual code entry for approval
```

## Key Features

- **4-Letter Codes**: Simple, TV-friendly codes using only letters A-Z
- **Firestore Storage**: Codes are securely stored in Firestore database
- **Auto-Expiry**: Codes expire after 5 minutes for security
- **Manual Approval**: Users must manually enter codes to approve (no automatic notifications)
- **Device Detection**: Automatically shows TV UI on Android TV devices
- **Secure**: Firestore security rules prevent unauthorized access

## Usage Examples

### Detecting TV Devices
```javascript
import { isAndroidTV } from '$lib/advancedDeviceDetection';

const isTV = await isAndroidTV();
if (isTV) {
  // Show TV-specific UI
}
```

### Starting TV Authentication (TV Device)
```javascript
import { TVAuthService } from '$lib/tvAuth';

const result = await TVAuthService.requestTVAuth();
if (result.success) {
  // User is now logged in
}
```

### Approving from Mobile (Manual Entry)
```javascript
import { TVAuthService } from '$lib/tvAuth';

// User manually enters the 4-letter code
const result = await TVAuthService.approveCode('ABCD');
if (result.success) {
  // TV login approved
}
```

## Current Implementation Status

- ✅ TV device detection
- ✅ 4-letter code generation and display  
- ✅ Manual code entry interface for mobile
- ✅ Automatic UI switching based on device type
- ✅ Firestore integration for secure code storage
- ✅ Firestore security rules for access control
- ⚠️ Simulated authentication (needs custom token implementation)

## Production Implementation Notes

For a production version, you would need to:

1. **Firebase Custom Tokens**: Implement server-side custom token generation
2. **Server-side Cleanup**: Move expired code cleanup to Cloud Functions
3. **Rate Limiting**: Add rate limiting for code generation
4. **Monitoring**: Add logging and monitoring for authentication attempts
5. **Custom Token Flow**: Replace simulation with real Firebase custom token authentication

## Security Considerations

- Codes expire after 5 minutes
- Only logged-in users can approve codes
- Each code is single-use
- Firestore security rules prevent unauthorized access
- Manual approval required (no automatic notifications)
- Codes are stored securely in Firestore with proper access controls
- Device identification helps prevent abuse

## Firestore Security Rules

The system includes Firestore security rules that:
- Allow TV devices to create new codes (unauthenticated)
- Allow logged-in users to read and update codes
- Validate code format and structure
- Prevent unauthorized modifications
- Track who approved each code

## Testing Locally

1. **Mobile Mode**: `npm run dev:mobile` (port 5173)
2. **TV Mode**: `npm run dev:tv` (port 5174)
3. **Android Build**: `npm run android:debug` (for debug) or `npm run android:release` (for release)
4. **Flow**: 
   - Sign in on mobile first
   - Generate code on TV
   - Manually enter code in mobile app's "Approve TV Login" section