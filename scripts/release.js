#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function runCommand(command, description, cwd = projectRoot, silent = false) {
  console.log(`\n🔄 ${description}...`);
  try {
    const output = execSync(command, {
      cwd,
      stdio: silent ? 'pipe' : 'inherit'
    });
    console.log(`✅ ${description} completed`);
    return silent ? output.toString().trim() : null;
  } catch (error) {
    console.error(`❌ ${description} failed:`);
    console.error(error.message);
    if (silent) console.error(error.stdout?.toString());
    process.exit(1);
  }
}

function checkKeystore() {
  const keystorePath = path.join(projectRoot, 'android', 'release-key.keystore');
  const keystorePropsPath = path.join(projectRoot, 'android', 'keystore.properties');

  if (!fs.existsSync(keystorePath)) {
    console.log('⚠️  Release keystore not found');
    return false;
  }

  if (!fs.existsSync(keystorePropsPath)) {
    console.log('⚠️  keystore.properties file not found');
    return false;
  }

  return true;
}

async function main() {
  console.log('🚀 PhotoTV Release Automation\n');

  // 1. Get release type
  const releaseType = await prompt('Enter release type (patch/minor/major): ');
  if (!['patch', 'minor', 'major'].includes(releaseType)) {
    console.error('❌ Invalid release type. Must be patch, minor, or major.');
    process.exit(1);
  }

  // 2. Get current version
  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  const currentVersion = packageJson.version;
  console.log(`Current version: ${currentVersion}`);

  // 3. Ask for release notes
  console.log('\n📝 Enter release notes (press Enter twice to finish):');
  let releaseNotes = [];
  let line;
  while (true) {
    line = await prompt('> ');
    if (!line) break;
    releaseNotes.push(line);
  }

  // 4. Confirm release
  console.log('\n📋 Release Summary:');
  console.log(`- Type: ${releaseType}`);
  console.log(`- Current version: ${currentVersion}`);
  console.log('- Release notes:');
  releaseNotes.forEach(note => console.log(`  * ${note}`));

  const confirmation = await prompt('\nProceed with release? (y/N): ');
  if (confirmation.toLowerCase() !== 'y') {
    console.log('Release cancelled by user');
    process.exit(0);
  }

  // 5. Bump version
  runCommand(`npm run bump ${releaseType}`, `Bumping version (${releaseType})`);

  // Read the new version
  const updatedPackageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  const newVersion = updatedPackageJson.version;
  console.log(`\n📦 New version: ${newVersion}`);

  // 6. Build web version
  runCommand('npm run build', 'Building web version');

  // 7. Sync Capacitor
  runCommand('npx cap sync', 'Syncing Capacitor changes');

  // 8. Build debug APK for testing
  runCommand('npm run android:debug', 'Building debug APK for testing');
  console.log(`\n🔍 Debug APK created at: android/app/build/outputs/apk/debug/app-debug.apk`);

  // Ask to continue
  const testConfirmation = await prompt('\nTest the debug APK and continue? (y/N): ');
  if (testConfirmation.toLowerCase() !== 'y') {
    console.log('Release paused. You can resume later.');
    process.exit(0);
  }

  // 9. Check for keystore configuration
  const keystoreConfigured = checkKeystore();
  if (!keystoreConfigured) {
    console.log('\n⚠️  Release signing not configured. Setting up now...');

    // Set up keystore
    const setupKeystore = await prompt('Set up signing keystore now? (y/N): ');
    if (setupKeystore.toLowerCase() === 'y') {
      const keystorePassword = await prompt('Enter keystore password: ');
      const keyAlias = 'release-key';

      runCommand(
        `keytool -genkey -v -keystore release-key.keystore -alias ${keyAlias} -keyalg RSA -keysize 2048 -validity 10000`,
        'Generating keystore',
        path.join(projectRoot, 'android')
      );

      // Create keystore.properties
      const keystoreProps = `storePassword=${keystorePassword}
keyPassword=${keystorePassword}
keyAlias=${keyAlias}
storeFile=release-key.keystore
`;
      fs.writeFileSync(path.join(projectRoot, 'android', 'keystore.properties'), keystoreProps);
      console.log('✅ Keystore and keystore.properties created');
    } else {
      console.log('⚠️ Skipping release build - signing not configured');
    }
  }

  // 10. Build release APK and Bundle
  if (keystoreConfigured || setupKeystore?.toLowerCase() === 'y') {
    runCommand('npm run android:release', 'Building release APK');
    console.log(`\n📱 Release APK created at: android/app/build/outputs/apk/release/app-release.apk`);

    runCommand('npm run android:bundle', 'Building Android App Bundle (AAB)');
    console.log(`\n📦 App Bundle created at: android/app/build/outputs/bundle/release/app-release.aab`);
  }

  // 11. Commit changes and tag release
  const commitChanges = await prompt('\nCommit changes and tag release? (y/N): ');
  if (commitChanges.toLowerCase() === 'y') {
    // Save release notes to a file
    fs.writeFileSync(
      path.join(projectRoot, 'RELEASE_NOTES.md'),
      `# Version ${newVersion}\n\n${releaseNotes.join('\n')}\n`
    );

    runCommand('git add .', 'Adding all changes to git');
    runCommand(`git commit -m "Release version ${newVersion}"`, 'Committing changes');
    runCommand(`git tag v${newVersion}`, 'Tagging release');

    const pushChanges = await prompt('Push changes to remote repository? (y/N): ');
    if (pushChanges.toLowerCase() === 'y') {
      runCommand('git push', 'Pushing commits');
      runCommand('git push --tags', 'Pushing tags');
    }
  }

  // 12. Deploy web version
  const deployWeb = await prompt('\nDeploy web version? (y/N): ');
  if (deployWeb.toLowerCase() === 'y') {
    runCommand('npm run deploy', 'Deploying web version');
  }

  console.log('\n✨ Release process completed!');
  console.log(`\n📱 Next steps:`);
  console.log(`1. Upload AAB to Google Play Console: android/app/build/outputs/bundle/release/app-release.aab`);
  console.log(`2. Fill in release notes in Google Play Console`);
  console.log(`3. Test the app from Google Play after publishing`);

  rl.close();
}

main().catch(error => {
  console.error('❌ Error in release process:', error);
  process.exit(1);
});
