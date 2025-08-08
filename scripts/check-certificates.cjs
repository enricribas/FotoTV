#!/usr/bin/env node

/**
 * Certificate Checker for PhotoTV
 *
 * This script helps you verify that all necessary certificates are configured
 * for Google authentication to work in production.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔐 PhotoTV Certificate Checker\n');

const errors = [];
const warnings = [];
const info = [];

// Check if google-services.json exists
function checkGoogleServices() {
    const googleServicesPath = path.join(__dirname, '../android/app/google-services.json');

    if (!fs.existsSync(googleServicesPath)) {
        errors.push('❌ google-services.json not found at android/app/google-services.json');
        return null;
    }

    try {
        const content = JSON.parse(fs.readFileSync(googleServicesPath, 'utf8'));
        info.push('✅ google-services.json found and valid');

        const projectId = content.project_info?.project_id;
        const packageName = content.client?.[0]?.client_info?.android_client_info?.package_name;
        const oauthClients = content.client?.[0]?.oauth_client || [];

        info.push(`📱 Package Name: ${packageName}`);
        info.push(`🔥 Firebase Project: ${projectId}`);
        info.push(`🔑 OAuth Clients: ${oauthClients.length}`);

        // Check for web client ID (type 3)
        const webClient = oauthClients.find(client => client.client_type === 3);
        if (webClient) {
            info.push(`🌐 Web Client ID: ${webClient.client_id}`);
        } else {
            warnings.push('⚠️  No web client ID found in google-services.json');
        }

        // Check for Android client (type 1)
        const androidClients = oauthClients.filter(client => client.client_type === 1);
        info.push(`📱 Android Clients: ${androidClients.length}`);

        androidClients.forEach((client, index) => {
            const hash = client.android_info?.certificate_hash;
            if (hash) {
                info.push(`   Client ${index + 1}: SHA-1 ${hash}`);
            }
        });

        return content;
    } catch (error) {
        errors.push(`❌ Invalid google-services.json: ${error.message}`);
        return null;
    }
}

// Check debug keystore
function checkDebugKeystore() {
    try {
        const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
        const userHome = process.env.HOME || process.env.USERPROFILE;

        let debugKeystorePath = path.join(userHome, '.android', 'debug.keystore');

        if (!fs.existsSync(debugKeystorePath)) {
            warnings.push('⚠️  Debug keystore not found at ~/.android/debug.keystore');
            return;
        }

        try {
            const output = execSync(
                `keytool -list -v -keystore "${debugKeystorePath}" -alias androiddebugkey -storepass android -keypass android`,
                { encoding: 'utf8', stdio: 'pipe' }
            );

            const sha1Match = output.match(/SHA1:\s*([A-F0-9:]+)/);
            const sha256Match = output.match(/SHA256:\s*([A-F0-9:]+)/);

            if (sha1Match) {
                info.push(`🔓 Debug SHA-1: ${sha1Match[1]}`);
            }
            if (sha256Match) {
                info.push(`🔓 Debug SHA-256: ${sha256Match[1]}`);
            }

        } catch (error) {
            warnings.push('⚠️  Could not read debug keystore certificate');
        }

    } catch (error) {
        warnings.push('⚠️  Could not check debug keystore');
    }
}

// Check release keystore if it exists
function checkReleaseKeystore() {
    const releaseKeystorePath = path.join(__dirname, '../android/app/release-key.keystore');

    if (!fs.existsSync(releaseKeystorePath)) {
        warnings.push('⚠️  Release keystore not found at android/app/release-key.keystore');
        return;
    }

    try {
        // This will prompt for password, so we just check if file exists
        info.push('✅ Release keystore found at android/app/release-key.keystore');
        console.log('\n📝 To get release keystore fingerprint, run:');
        console.log('   keytool -list -v -keystore android/app/release-key.keystore -alias release-key');

    } catch (error) {
        warnings.push('⚠️  Could not access release keystore');
    }
}

// Check Firebase project configuration
function checkFirebaseConfig() {
    const envExamplePath = path.join(__dirname, '../env.example');
    const envPath = path.join(__dirname, '../.env');

    if (!fs.existsSync(envPath)) {
        warnings.push('⚠️  .env file not found - copy from env.example');
        return;
    }

    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const requiredVars = [
            'VITE_FIREBASE_API_KEY',
            'VITE_FIREBASE_PROJECT_ID',
            'VITE_FIREBASE_APP_ID'
        ];

        let missingVars = 0;
        requiredVars.forEach(varName => {
            if (!envContent.includes(`${varName}=`) || envContent.includes(`${varName}=your_`)) {
                warnings.push(`⚠️  ${varName} not configured in .env`);
                missingVars++;
            }
        });

        if (missingVars === 0) {
            info.push('✅ Firebase environment variables configured');
        }

    } catch (error) {
        errors.push(`❌ Could not read .env file: ${error.message}`);
    }
}

// Main checker function
function runChecks() {
    console.log('Running certificate and configuration checks...\n');

    const googleServices = checkGoogleServices();
    checkDebugKeystore();
    checkReleaseKeystore();
    checkFirebaseConfig();

    // Print results
    console.log('\n📊 RESULTS:\n');

    if (info.length > 0) {
        console.log('ℹ️  Information:');
        info.forEach(msg => console.log(`   ${msg}`));
        console.log('');
    }

    if (warnings.length > 0) {
        console.log('⚠️  Warnings:');
        warnings.forEach(msg => console.log(`   ${msg}`));
        console.log('');
    }

    if (errors.length > 0) {
        console.log('❌ Errors:');
        errors.forEach(msg => console.log(`   ${msg}`));
        console.log('');
    }

    // Production-specific guidance
    console.log('🏭 PRODUCTION SETUP REQUIRED:\n');

    console.log('1. 📤 Upload your APK/AAB to Google Play Console');
    console.log('2. 🔐 Go to Release → Setup → App signing');
    console.log('3. 📋 Copy the SHA-1 and SHA-256 from "App signing key certificate"');
    console.log('4. 🔥 Add these certificates to Firebase Console:');
    console.log('   - Go to Project Settings → Your apps → Android app');
    console.log('   - Click "Add fingerprint"');
    console.log('   - Paste both SHA-1 and SHA-256 from Google Play');
    console.log('5. ⏰ Wait 1-2 hours for changes to propagate');
    console.log('6. 🧪 Test the production APK downloaded from Google Play\n');

    console.log('🚨 CRITICAL: The "missing initial state" error in production is almost always');
    console.log('   caused by missing Google Play signing certificates in Firebase!\n');

    if (errors.length > 0) {
        console.log('❌ Please fix the errors above before proceeding.');
        process.exit(1);
    } else if (warnings.length > 0) {
        console.log('⚠️  Some warnings found. Check them before production deployment.');
        process.exit(0);
    } else {
        console.log('✅ All checks passed! Remember to add Google Play certificates to Firebase.');
        process.exit(0);
    }
}

// Run the checks
runChecks();
