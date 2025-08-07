#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🔍 Checking authentication configuration...\n');

let hasErrors = false;
let hasWarnings = false;

function error(message) {
	console.log(`❌ ERROR: ${message}`);
	hasErrors = true;
}

function warning(message) {
	console.log(`⚠️  WARNING: ${message}`);
	hasWarnings = true;
}

function success(message) {
	console.log(`✅ ${message}`);
}

function info(message) {
	console.log(`ℹ️  ${message}`);
}

// Check 1: Environment file
console.log('📋 Environment Configuration');
const envPath = path.join(projectRoot, '.env');
if (!fs.existsSync(envPath)) {
	error('Missing .env file - copy env.example to .env and configure Firebase settings');
} else {
	success('.env file exists');

	const envContent = fs.readFileSync(envPath, 'utf8');
	const requiredVars = [
		'VITE_FIREBASE_API_KEY',
		'VITE_FIREBASE_AUTH_DOMAIN',
		'VITE_FIREBASE_PROJECT_ID',
		'VITE_FIREBASE_STORAGE_BUCKET',
		'VITE_FIREBASE_MESSAGING_SENDER_ID',
		'VITE_FIREBASE_APP_ID',
		'VITE_FIREBASE_MEASUREMENT_ID'
	];

	let missingVars = [];
	requiredVars.forEach((varName) => {
		if (!envContent.includes(varName) || envContent.includes(`${varName}=your_`)) {
			missingVars.push(varName);
		}
	});

	if (missingVars.length > 0) {
		error(`Missing or unconfigured environment variables: ${missingVars.join(', ')}`);
	} else {
		success('All required environment variables are configured');
	}
}

console.log('\n📱 Android Configuration');

// Check 2: google-services.json
const googleServicesPath = path.join(projectRoot, 'android', 'app', 'google-services.json');
if (!fs.existsSync(googleServicesPath)) {
	error('Missing google-services.json file in android/app/');
	info('Download this file from Firebase Console > Project Settings > Your Android app');
} else {
	success('google-services.json file exists');

	try {
		const googleServices = JSON.parse(fs.readFileSync(googleServicesPath, 'utf8'));
		if (googleServices.project_info && googleServices.project_info.project_id) {
			success(`Google Services configured for project: ${googleServices.project_info.project_id}`);
		} else {
			warning('google-services.json file appears to be malformed');
		}
	} catch (err) {
		error('google-services.json file is not valid JSON');
	}
}

// Check 3: AndroidManifest.xml intent filters
const manifestPath = path.join(projectRoot, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
if (!fs.existsSync(manifestPath)) {
	error('AndroidManifest.xml not found');
} else {
	const manifestContent = fs.readFileSync(manifestPath, 'utf8');

	if (manifestContent.includes('your_project_id.firebaseapp.com')) {
		warning(
			'AndroidManifest.xml still contains placeholder "your_project_id" - update with your Firebase project ID'
		);
	} else if (manifestContent.includes('.firebaseapp.com')) {
		success('Deep link domain configured in AndroidManifest.xml');
	} else {
		error('Deep link configuration missing in AndroidManifest.xml');
	}

	if (manifestContent.includes('android:scheme="com.knomni.fototv"')) {
		success('Custom URL scheme configured');
	} else {
		warning('Custom URL scheme not found in AndroidManifest.xml');
	}

	if (manifestContent.includes('android:autoVerify="true"')) {
		success('App Link verification enabled');
	} else {
		warning('App Link verification not enabled - may affect magic link handling');
	}
}

console.log('\n🔗 Deep Link Configuration');

// Check 4: AuthService configuration
const authServicePath = path.join(projectRoot, 'src', 'lib', 'auth.ts');
if (!fs.existsSync(authServicePath)) {
	error('AuthService not found at src/lib/auth.ts');
} else {
	const authContent = fs.readFileSync(authServicePath, 'utf8');

	if (authContent.includes('your_project_id.firebaseapp.com')) {
		warning(
			'AuthService still contains placeholder "your_project_id" - update with your Firebase project ID'
		);
	} else {
		success('AuthService appears to be configured');
	}

	if (authContent.includes('@capacitor/browser')) {
		success('Capacitor Browser plugin imported');
	} else {
		error('Capacitor Browser plugin not found in AuthService');
	}
}

console.log('\n📦 Dependencies');

// Check 5: Required packages
const packageJsonPath = path.join(projectRoot, 'package.json');
if (fs.existsSync(packageJsonPath)) {
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
	const requiredDeps = ['@capacitor/browser', 'firebase'];

	let missingDeps = [];
	requiredDeps.forEach((dep) => {
		if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
			missingDeps.push(dep);
		}
	});

	if (missingDeps.length > 0) {
		error(`Missing required dependencies: ${missingDeps.join(', ')}`);
		info('Run: npm install ' + missingDeps.join(' '));
	} else {
		success('All required dependencies are installed');
	}
}

// Check 6: Capacitor sync status
console.log('\n⚙️  Build Configuration');
const capacitorConfigPath = path.join(projectRoot, 'capacitor.config.ts');
if (!fs.existsSync(capacitorConfigPath)) {
	error('capacitor.config.ts not found');
} else {
	const capacitorContent = fs.readFileSync(capacitorConfigPath, 'utf8');

	if (capacitorContent.includes('Browser:')) {
		success('Browser plugin configured in Capacitor config');
	} else {
		warning('Browser plugin not explicitly configured in Capacitor config');
	}

	if (capacitorContent.includes('appId: "com.knomni.fototv"')) {
		success('App ID configured');
	} else {
		warning('Check App ID configuration in capacitor.config.ts');
	}
}

// Summary
console.log('\n📊 Configuration Summary');
if (hasErrors) {
	console.log('❌ Configuration has errors that must be fixed before authentication will work');
	console.log('\nNext steps:');
	console.log('1. Fix all ERROR items above');
	console.log('2. Run: npm run android:debug to test');
	console.log('3. Check AUTHENTICATION_SETUP.md for detailed instructions');
} else if (hasWarnings) {
	console.log('⚠️  Configuration is mostly complete but has some warnings');
	console.log('\nNext steps:');
	console.log('1. Address WARNING items for best experience');
	console.log('2. Run: npx cap sync');
	console.log('3. Run: npm run android:debug to test');
} else {
	console.log('✅ Configuration looks good!');
	console.log('\nNext steps:');
	console.log('1. Run: npx cap sync');
	console.log('2. Run: npm run android:debug to test');
	console.log('3. Test both Google Sign-In and Magic Links');
}

console.log('\n📖 For detailed setup instructions, see: AUTHENTICATION_SETUP.md');

if (hasErrors) {
	process.exit(1);
}
