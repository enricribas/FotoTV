#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Get bump type from command line arguments
const args = process.argv.slice(2);
const bumpType = args[0];

const validBumpTypes = ['patch', 'minor', 'major'];

if (!bumpType || !validBumpTypes.includes(bumpType)) {
  console.error('❌ Please provide a valid bump type');
  console.log('Usage: npm run bump <patch|minor|major>');
  console.log('Examples:');
  console.log('  npm run bump patch  # 1.0.0 → 1.0.1');
  console.log('  npm run bump minor  # 1.0.0 → 1.1.0');
  console.log('  npm run bump major  # 1.0.0 → 2.0.0');
  process.exit(1);
}

function getCurrentVersion() {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
}

function bumpVersion(currentVersion, type) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  switch (type) {
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'major':
      return `${major + 1}.0.0`;
    default:
      throw new Error(`Invalid bump type: ${type}`);
  }
}

function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: projectRoot });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

async function main() {
  const currentVersion = getCurrentVersion();
  const newVersion = bumpVersion(currentVersion, bumpType);

  console.log(`🚀 Bumping version from ${currentVersion} to ${newVersion} (${bumpType})\n`);

  // Update version in all files
  runCommand(`node scripts/update-version.js ${newVersion}`, 'Updating version numbers');

  // Sync with Capacitor
  runCommand('npx cap sync', 'Syncing with Capacitor');

  console.log('\n✨ Version bump completed successfully!');
  console.log(`📝 Version updated: ${currentVersion} → ${newVersion}`);
  console.log('\nNext steps:');
  console.log('1. Test your app');
  console.log('2. Build: npx cap build android');
  console.log('3. Commit changes: git add . && git commit -m "bump version to ' + newVersion + '"');
  console.log('4. Tag release: git tag v' + newVersion);
}

main().catch(console.error);
