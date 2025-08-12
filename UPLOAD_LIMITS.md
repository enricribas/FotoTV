# Upload Limits Feature

This document explains the upload limit functionality implemented in PhotoTV.

## Overview

PhotoTV now includes upload limits to manage storage usage and provide a controlled experience for users. By default, each collection can contain up to **10 images**.

## How It Works

### User Registration
- When a new user registers, a user profile is automatically created in Firestore
- The profile includes basic user metadata (email, display name, timestamps)
- When the user's first collection is created, it includes upload limit settings

### Collection Creation
- Each new collection is created with:
  - `imageUploadLimit`: 10 (default)
  - `currentImageCount`: 0 (starts at zero)
  - Collection metadata (name, creation timestamp)

### Existing Users
- When existing users sign in, the system automatically creates a profile if one doesn't exist
- The system syncs each collection's image count with actual uploaded images

### Upload Process
1. **Pre-upload check**: Before allowing file selection, the system checks if the current collection has remaining uploads
2. **Limit enforcement**: If collection limit is reached, upload is prevented with a clear message
3. **Count tracking**: After successful upload, the collection's image count is incremented
4. **Real-time updates**: Upload limit display is updated immediately for the current collection

## User Interface

### Upload Limit Display
- Shows current collection usage (e.g., "7/10 uploads remaining in this collection")
- Visual progress bar with color coding:
  - Green: Normal usage
  - Amber: Running low (≤2 remaining)
  - Red: Limit reached
- Warning messages for low/exhausted collection limits

### Upload Button States
- **Normal**: Standard upload button
- **Uploading**: Shows spinner and "Uploading..." text
- **Limit Reached**: Disabled button with warning icon and "Collection Upload Limit Reached" text

## Technical Implementation

### Files Modified/Created
- `src/lib/userService.ts` - New service for managing user profiles
- `src/lib/collectionService.ts` - Updated to include upload limits per collection
- `src/lib/auth.ts` - Updated to create profiles on registration
- `src/routes/LoggedInView.svelte` - Updated with collection-based limit checking and UI
- `src/routes/+page.svelte` - Updated to initialize profiles for existing users
- `src/lib/components/UploadLimitDisplay.svelte` - New component for limit visualization
- `firestore.rules` - Updated to allow user profile and collection access

### Firestore Structure
```
users/{userId} {
  uid: string,
  email: string,
  displayName?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}

users/{userId}/collections/{collectionId} {
  name: string,
  imageUploadLimit: number,
  currentImageCount: number,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Key Methods
- `UserService.getOrCreateUserProfile(user)` - Ensures user profile exists
- `CollectionService.canUploadImage(user, collectionUuid)` - Checks if upload is allowed for collection
- `CollectionService.incrementImageCount(user, collectionUuid)` - Updates collection count after upload
- `CollectionService.syncImageCount(user, collectionUuid)` - Syncs collection with actual storage
- `CollectionService.createCollection(user, name)` - Creates new collection with default limits

## Error Handling

- If Firestore operations fail, the system logs errors but continues to function
- Upload limits default to 10 if collection data is missing
- Clear error messages are shown to users when collection limits are reached
- Each collection operates independently - limits in one collection don't affect others

## Future Enhancements

### Potential Features
- Admin interface to adjust collection limits
- Premium plans with higher collection limits
- Temporary limit increases per collection
- Usage analytics and reporting per collection
- Multiple collections with different limits

### Migration for Existing Collections
- Existing collections will automatically get upload limit fields when accessed
- New collections are created with default limits
- Image counts are synced with actual storage on collection access

## Security

- Users can only read/write their own profiles and collections (enforced by Firestore rules)
- Upload limits are server-side validated through Firestore at the collection level
- Collection counts are synced regularly to prevent drift
- Each collection's limits are isolated from other collections

## Monitoring

### Recommended Monitoring
- Track profile and collection creation success rates
- Monitor collection image count accuracy
- Watch for users hitting collection limits frequently
- Track sync operation performance per collection

### Debugging
- Check browser console for upload limit errors
- Verify Firestore rules allow profile and collection access
- Ensure user profiles and collections are created on first login
- Confirm collection image counts match actual storage
- Check that collection UUID is properly tracked in upload process