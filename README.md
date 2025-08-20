# PhotoTV

A personal photo viewing app that lets you display your photos on your TV or larger screen.

## Features

- Upload and view your personal photos
- Display photos in a slideshow on your TV
- Connect your phone to your TV for viewing
- Private and secure - only you can see your photos
- TV-optimized interface with device detection
- Simple 4-letter code pairing system

## Slideshow Configuration

## Collection Management

### Default Collections

When a new user is created, they automatically get two default collections:

- **Art** - Set as the primary collection for general photos
- **Family** - For family-related photos

### Creating Additional Collections

Users can create additional collections beyond the default ones, but this feature requires a **Pro plan**. To enable this:

1. In Firestore, add a `plan` field to the user's profile document with the value `"pro"`
2. The "Add New Collection" option will then appear in the collection dropdown

### Collection Timing

You can customize the slideshow timing by adding a `time` field to your collection data in Firebase:

- The `time` field should be set in **seconds** (not milliseconds)
- If no `time` field is present, the slideshow defaults to 30 seconds between images
- Valid values are any positive number (e.g., 5, 10, 45, 120)
- Invalid values (0, negative numbers, or missing field) will use the 30-second default

### Example Firebase Collection Document

```json
{
	"name": "My Photos",
	"imageUploadLimit": 10,
	"currentImageCount": 5,
	"time": 45,
	"createdAt": "2024-01-01T00:00:00Z",
	"updatedAt": "2024-01-01T00:00:00Z"
}
```

In this example, images will transition every 45 seconds instead of the default 30 seconds.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev

# For mobile development
npm run dev:mobile

# For TV development
npm run dev:tv
```

## Building

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

### Netlify Deployment

The app is configured for automatic deployment to Netlify:

```bash
# Deploy to production
npm run deploy

# Deploy a preview/draft version
npm run deploy:preview

# Quick deploy (without rebuild)
npm run deploy:quick
```

The `predeploy` script will automatically run linting and tests before deployment.

### Android Build

Build the Android app:

```bash
# Sync web assets to Android
npx cap sync

# Build debug version
npm run android:debug

# Build release version (requires signing setup)
npm run android:release
```

## Project Structure

- `src/routes/` - SvelteKit pages and components
- `src/lib/` - Shared utilities and services
- `android/` - Android native project
- `build/` - Production build output
- `static/` - Static assets
