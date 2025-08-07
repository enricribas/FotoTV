#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const androidDir = path.join(projectRoot, 'android');

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

function runCommand(command, cwd = androidDir) {
	try {
		return execSync(command, { cwd, stdio: 'inherit' });
	} catch (error) {
		console.error('Command failed:', error.message);
		return null;
	}
}

async function main() {
	console.log('🔑 Android Release Signing Setup');
	console.log('===============================\n');

	// 1. Check if keystore already exists
	const releaseKeystorePath = path.join(androidDir, 'release-key.keystore');
	const keystorePropsPath = path.join(androidDir, 'keystore.properties');

	if (fs.existsSync(releaseKeystorePath)) {
		console.log('⚠️ A release keystore already exists at:', releaseKeystorePath);
		const overwrite = await prompt('Do you want to create a new one and overwrite it? (y/N): ');

		if (overwrite.toLowerCase() !== 'y') {
			console.log('Keeping existing keystore.');

			// If properties file doesn't exist, we should still create it
			if (!fs.existsSync(keystorePropsPath)) {
				console.log("⚠️ Keystore properties file is missing. Let's create it.");
			} else {
				console.log('✅ Setup complete. Your existing keystore and properties are ready to use.');
				rl.close();
				return;
			}
		}
	}

	// 2. Prompt for keystore details
	console.log('\n📋 Please provide information for your release keystore:');
	const keyAlias = (await prompt('Key alias (default: release-key): ')) || 'release-key';
	const storePassword = await prompt('Keystore password: ');

	if (!storePassword) {
		console.error('❌ Keystore password cannot be empty.');
		rl.close();
		return;
	}

	const keyPassword =
		(await prompt(`Key password (press Enter to use the same as keystore password): `)) ||
		storePassword;
	const validity = (await prompt('Validity in years (default: 25): ')) || '25';

	// 3. Create the keystore
	console.log('\n🔐 Creating keystore...');
	const keystoreCmd = `keytool -genkey -v -keystore release-key.keystore -alias ${keyAlias} -keyalg RSA -keysize 2048 -validity ${parseInt(validity) * 365}`;

	console.log(`\nℹ️ Running: ${keystoreCmd}`);
	console.log('You will be prompted to enter additional information...\n');

	const result = runCommand(keystoreCmd);

	if (!result) {
		console.error('❌ Failed to create keystore. Please check the error above and try again.');
		rl.close();
		return;
	}

	// 4. Create keystore.properties
	console.log('\n📝 Creating keystore.properties...');
	const keystoreProps = `storePassword=${storePassword}
keyPassword=${keyPassword}
keyAlias=${keyAlias}
storeFile=release-key.keystore
`;

	fs.writeFileSync(keystorePropsPath, keystoreProps);

	// 5. Get and display SHA-1 fingerprint for Firebase
	console.log('\n🔍 Getting SHA-1 fingerprint for Firebase...');
	try {
		const sha1Output = execSync(
			`keytool -list -v -keystore release-key.keystore -alias ${keyAlias} -storepass ${storePassword}`,
			{ cwd: androidDir }
		).toString();

		const sha1Match = sha1Output.match(/SHA1: ([\w:]+)/);
		if (sha1Match && sha1Match[1]) {
			console.log('\n✅ SHA-1 Fingerprint (add this to Firebase console):');
			console.log('**' + sha1Match[1] + '**');
		}

		const sha256Match = sha1Output.match(/SHA256: ([\w:]+)/);
		if (sha256Match && sha256Match[1]) {
			console.log('\n✅ SHA-256 Fingerprint (also add this to Firebase console):');
			console.log('**' + sha256Match[1] + '**');
		}
	} catch (error) {
		console.error('Could not retrieve fingerprints:', error.message);
	}

	// 6. Finish
	console.log('\n🎉 Signing setup complete!');
	console.log('\nℹ️ Your release keystore is located at:');
	console.log(releaseKeystorePath);
	console.log('\nℹ️ Your keystore properties are located at:');
	console.log(keystorePropsPath);

	console.log('\n⚠️ IMPORTANT: Keep these files safe and secure!');
	console.log("If you lose your keystore, you won't be able to update your app on Google Play.");

	console.log('\n📱 Next steps:');
	console.log('1. Add the SHA-1 and SHA-256 fingerprints to your Firebase project');
	console.log('2. Run a signed build: npm run android:release');
	console.log('3. Create a bundle for Play Store: npm run android:bundle');

	rl.close();
}

main().catch(console.error);
