#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Get version from command line arguments
const args = process.argv.slice(2);
const newVersion = args[0];

if (!newVersion) {
  console.error('❌ Please provide a version number');
  console.log('Usage: npm run version <version>');
  console.log('Example: npm run version 1.3.0');
  process.exit(1);
}

// Validate version format (basic semver check)
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(newVersion)) {
  console.error('❌ Invalid version format. Please use semantic versioning (e.g., 1.3.0)');
  process.exit(1);
}

async function updatePackageJson() {
  const packageJsonPath = path.join(projectRoot, 'package.json');

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const oldVersion = packageJson.version;

    packageJson.version = newVersion;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, '\t') + '\n');
    console.log(`✅ Updated package.json: ${oldVersion} → ${newVersion}`);
  } catch (error) {
    console.error('❌ Failed to update package.json:', error.message);
    process.exit(1);
  }
}

async function updateAndroidBuildGradle() {
  const buildGradlePath = path.join(projectRoot, 'android', 'app', 'build.gradle');

  if (!fs.existsSync(buildGradlePath)) {
    console.log('⚠️  Android build.gradle not found, skipping Android version update');
    return;
  }

  try {
    let buildGradleContent = fs.readFileSync(buildGradlePath, 'utf8');

    // Extract current versionCode and increment it
    const versionCodeMatch = buildGradleContent.match(/versionCode (\d+)/);
    const currentVersionCode = versionCodeMatch ? parseInt(versionCodeMatch[1]) : 1;
    const newVersionCode = currentVersionCode + 1;

    // Extract current versionName
    const versionNameMatch = buildGradleContent.match(/versionName "([^"]+)"/);
    const oldVersionName = versionNameMatch ? versionNameMatch[1] : 'unknown';

    // Update versionCode
    buildGradleContent = buildGradleContent.replace(
      /versionCode \d+/,
      `versionCode ${newVersionCode}`
    );

    // Update versionName
    buildGradleContent = buildGradleContent.replace(
      /versionName "[^"]+"/,
      `versionName "${newVersion}"`
    );

    fs.writeFileSync(buildGradlePath, buildGradleContent);
    console.log(`✅ Updated Android build.gradle:`);
    console.log(`   versionCode: ${currentVersionCode} → ${newVersionCode}`);
    console.log(`   versionName: ${oldVersionName} → ${newVersion}`);
  } catch (error) {
    console.error('❌ Failed to update Android build.gradle:', error.message);
    process.exit(1);
  }
}

async function updateIosBuildSettings() {
  const infoPlistPath = path.join(projectRoot, 'ios', 'App', 'App', 'Info.plist');

  if (!fs.existsSync(infoPlistPath)) {
    console.log('⚠️  iOS Info.plist not found, skipping iOS version update');
    return;
  }

  try {
    let infoPlistContent = fs.readFileSync(infoPlistPath, 'utf8');

    // Update CFBundleShortVersionString (version name)
    const shortVersionMatch = infoPlistContent.match(/<key>CFBundleShortVersionString<\/key>\s*<string>([^<]+)<\/string>/);
    const oldShortVersion = shortVersionMatch ? shortVersionMatch[1] : 'unknown';

    infoPlistContent = infoPlistContent.replace(
      /(<key>CFBundleShortVersionString<\/key>\s*<string>)[^<]+(<\/string>)/,
      `$1${newVersion}$2`
    );

    // Update CFBundleVersion (build number) - increment it
    const bundleVersionMatch = infoPlistContent.match(/<key>CFBundleVersion<\/key>\s*<string>([^<]+)<\/string>/);
    const currentBundleVersion = bundleVersionMatch ? parseInt(bundleVersionMatch[1]) || 1 : 1;
    const newBundleVersion = currentBundleVersion + 1;

    infoPlistContent = infoPlistContent.replace(
      /(<key>CFBundleVersion<\/key>\s*<string>)[^<]+(<\/string>)/,
      `$1${newBundleVersion}$2`
    );

    fs.writeFileSync(infoPlistPath, infoPlistContent);
    console.log(`✅ Updated iOS Info.plist:`);
    console.log(`   CFBundleShortVersionString: ${oldShortVersion} → ${newVersion}`);
    console.log(`   CFBundleVersion: ${currentBundleVersion} → ${newBundleVersion}`);
  } catch (error) {
    console.error('❌ Failed to update iOS Info.plist:', error.message);
    process.exit(1);
  }
}

async function main() {
  console.log(`🚀 Updating version to ${newVersion}...\n`);

  await updatePackageJson();
  await updateAndroidBuildGradle();
  await updateIosBuildSettings();

  console.log('\n✨ Version update completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Run: npx cap sync');
  console.log('2. Build: npx cap build android');
  console.log('3. Test your app');
  console.log('4. Commit your changes: git add . && git commit -m "bump version to ' + newVersion + '"');
}

main().catch(console.error);
