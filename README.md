# PhotoTV

A personal photo viewing app that lets you display your photos on your TV or larger screen.

## Features

- Upload and view your personal photos
- Display photos in a slideshow on your TV
- Connect your phone to your TV for viewing
- Private and secure - only you can see your photos
- TV-optimized interface with device detection
- Simple 4-letter code pairing system

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
