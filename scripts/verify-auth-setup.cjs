#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 PhotoTV Authentication Setup Verification\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  log(`${exists ? '✅' : '❌'} ${description}: ${exists ? 'Found' : 'Missing'}`,
      exists ? colors.green : colors.red);
  return exists;
}

function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    log(`❌ Error reading ${filePath}: ${error.message}`, colors.red);
    return null;
  }
}

// 1. Check project structure
log('📁 Checking Project Structure', colors.bold);
const projectRoot = process.cwd();
checkFile(path.join(projectRoot, 'android/app/google-services.json'), 'Google Services JSON');
checkFile(path.join(projectRoot, 'capacitor.config.ts'), 'Capacitor Config');
checkFile(path.join(projectRoot, 'android/app/src/main/AndroidManifest.xml'), 'Android Manifest');

console.log();

// 2. Verify google-services.json configuration
log('🔧 Checking Google Services Configuration', colors.bold);
const googleServicesPath = path.join(projectRoot, 'android/app/google-services.json');
const googleServices = readJsonFile(googleServicesPath);

if (googleServices) {
  const client = googleServices.client?.[0];
  const packageName = client?.client_info?.android_client_info?.package_name;
  const projectId = googleServices.project_info?.project_id;

  log(`Project ID: ${projectId}`, colors.blue);
  log(`Package Name: ${packageName}`, colors.blue);

  if (packageName === 'com.phototv.app') {
    log('✅ Package name is correct', colors.green);
  } else {
    log('❌ Package name mismatch! Should be "com.phototv.app"', colors.red);
    log('   You need to update this in Firebase Console or regenerate google-services.json', colors.yellow);
  }

  // Check OAuth clients
  const oauthClients = client?.oauth_client || [];
  const androidClients = oauthClients.filter(c => c.client_type === 1);
  const webClient = oauthClients.find(c => c.client_type === 3);

  log(`Android OAuth clients: ${androidClients.length}`, colors.blue);
  log(`Web OAuth client: ${webClient ? 'Found' : 'Missing'}`, webClient ? colors.green : colors.red);

  // Show certificate hashes
  if (androidClients.length > 0) {
    log('\n📜 Certificate Hashes in google-services.json:', colors.bold);
    androidClients.forEach((client, index) => {
      log(`  ${index + 1}. ${client.android_info?.certificate_hash}`, colors.blue);
    });
  }
} else {
  log('❌ Could not read google-services.json', colors.red);
}

console.log();

// 3. Check Capacitor configuration
log('⚙️  Checking Capacitor Configuration', colors.bold);
try {
  const capacitorConfigPath = path.join(projectRoot, 'capacitor.config.ts');
  const capacitorConfig = fs.readFileSync(capacitorConfigPath, 'utf8');

  if (capacitorConfig.includes('com.phototv.app')) {
    log('✅ Capacitor app ID is correct', colors.green);
  } else {
    log('❌ Capacitor app ID mismatch', colors.red);
  }

  if (capacitorConfig.includes('FirebaseAuthentication')) {
    log('✅ Firebase Authentication plugin configured', colors.green);
  } else {
    log('❌ Firebase Authentication plugin not found in config', colors.red);
  }
} catch (error) {
  log('❌ Could not read capacitor.config.ts', colors.red);
}

console.log();

// 4. Generate current debug certificate hash
log('🔑 Current Debug Certificate Information', colors.bold);
try {
  // Try to get debug keystore hash
  const debugKeystorePath = path.join(process.env.HOME || '', '.android/debug.keystore');

  if (fs.existsSync(debugKeystorePath)) {
    log('✅ Debug keystore found', colors.green);

    try {
      const keytoolOutput = execSync(
        `keytool -list -v -keystore "${debugKeystorePath}" -alias androiddebugkey -storepass android -keypass android`,
        { encoding: 'utf8' }
      );

      // Extract SHA-1 and SHA-256
      const sha1Match = keytoolOutput.match(/SHA1:\s*([A-F0-9:]+)/);
      const sha256Match = keytoolOutput.match(/SHA256:\s*([A-F0-9:]+)/);

      if (sha1Match) {
        log(`Debug SHA-1: ${sha1Match[1]}`, colors.blue);
      }
      if (sha256Match) {
        log(`Debug SHA-256: ${sha256Match[1]}`, colors.blue);
      }

      // Check if debug certificate is in google-services.json
      if (googleServices && sha1Match) {
        const debugHash = sha1Match[1].toLowerCase().replace(/:/g, '');
        const hasDebugCert = androidClients.some(client =>
          client.android_info?.certificate_hash?.toLowerCase() === debugHash
        );

        if (hasDebugCert) {
          log('✅ Debug certificate is registered in Firebase', colors.green);
        } else {
          log('❌ Debug certificate NOT registered in Firebase', colors.red);
          log('   Add this SHA-1 to Firebase Console > Project Settings > Your Android App', colors.yellow);
        }
      }

    } catch (keytoolError) {
      log('❌ Could not extract certificate info from debug keystore', colors.red);
    }
  } else {
    log('❌ Debug keystore not found', colors.red);
    log('   Run: npx cap run android to generate debug keystore', colors.yellow);
  }
} catch (error) {
  log('❌ Error checking debug certificate', colors.red);
}

console.log();

// 5. Check environment variables
log('🌍 Environment Configuration', colors.bold);
const envPath = path.join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasFirebaseKeys = envContent.includes('VITE_FIREBASE_API_KEY') &&
                         envContent.includes('VITE_FIREBASE_PROJECT_ID');

  if (hasFirebaseKeys) {
    log('✅ Firebase environment variables found', colors.green);
  } else {
    log('❌ Firebase environment variables missing', colors.red);
  }
} else {
  log('❌ .env file not found', colors.red);
  log('   Copy env.example to .env and fill in Firebase configuration', colors.yellow);
}

console.log();

// 6. Provide next steps
log('📋 Next Steps for Production Setup', colors.bold);
log('1. 🔥 Firebase Console Setup:', colors.yellow);
log('   - Go to https://console.firebase.google.com/');
log('   - Select project: fototv-90cf0');
log('   - Go to Project Settings > Your Android App');
log('   - Verify package name is: com.phototv.app');
log('   - Add ALL certificate SHA fingerprints (debug, release, Google Play)');

log('\n2. 📱 Google Play Console (for production):', colors.yellow);
log('   - Upload your APK to Google Play Console');
log('   - Go to Release > Setup > App signing');
log('   - Copy SHA-1 and SHA-256 from "App signing key certificate"');
log('   - Add these to Firebase Console');

log('\n3. 🏗️  Build and Test:', colors.yellow);
log('   - Build debug: npm run android:debug');
log('   - Test on device/emulator');
log('   - Build release: npm run android:release');
log('   - Test signed APK');

log('\n4. 🚀 Production Deployment:', colors.yellow);
log('   - Upload to Google Play Store');
log('   - Wait 1-2 hours for certificate propagation');
log('   - Download from Play Store and test');

console.log();

// 7. Generate helpful commands
log('🛠️  Helpful Commands', colors.bold);
log('Build debug APK:     npm run android:debug', colors.blue);
log('Build release APK:   npm run android:release', colors.blue);
log('Sync Capacitor:      npx cap sync', colors.blue);
log('Open Android Studio: npx cap open android', colors.blue);
log('Check certificates:  npm run cert:check', colors.blue);

console.log();
log('🎯 Authentication should work once all certificates are properly configured in Firebase!', colors.green);
