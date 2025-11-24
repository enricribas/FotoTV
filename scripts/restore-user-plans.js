// Script to restore missing plan fields for users
// This script helps identify and fix users who have lost their plan field

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Make sure to set up your service account key
// Download it from Firebase Console > Project Settings > Service Accounts > Generate new private key
const serviceAccount = require('./path/to/your/service-account-key.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id'
});

const db = admin.firestore();

async function restoreUserPlans() {
	console.log('Starting user plan restoration...');

	try {
		// Get all users from Firebase Auth
		const listUsersResult = await admin.auth().listUsers();
		const users = listUsersResult.users;

		console.log(`Found ${users.length} users to check`);

		let usersWithoutPlan = 0;
		let usersWithPlan = 0;
		let errors = 0;

		for (const user of users) {
			try {
				// Get user document
				const userDocRef = db.collection('users').doc(user.uid);
				const userDoc = await userDocRef.get();

				if (!userDoc.exists) {
					console.log(`⚠️  User ${user.email} (${user.uid}) - No user document found`);
					continue;
				}

				const userData = userDoc.data();

				if (!userData.plan) {
					console.log(`❌ User ${user.email} (${user.uid}) - Missing plan field`);
					usersWithoutPlan++;

					// If you want to automatically set a default plan, uncomment the following:
					/*
					await userDocRef.update({
						plan: 'free', // or whatever default plan you want
						updatedAt: admin.firestore.Timestamp.now()
					});
					console.log(`   ✓ Set default plan to 'free'`);
					*/
				} else {
					console.log(`✓ User ${user.email} (${user.uid}) - Has plan: ${userData.plan}`);
					usersWithPlan++;
				}

			} catch (error) {
				console.error(`❌ Error processing user ${user.email}:`, error.message);
				errors++;
			}

			// Add a small delay to avoid rate limiting
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		console.log('\n--- Summary ---');
		console.log(`Total users checked: ${users.length}`);
		console.log(`Users with plan: ${usersWithPlan}`);
		console.log(`Users WITHOUT plan: ${usersWithoutPlan}`);
		console.log(`Errors: ${errors}`);

		if (usersWithoutPlan > 0) {
			console.log('\n⚠️  Found users without plan field!');
			console.log('To fix this issue:');
			console.log('1. Review the users listed above');
			console.log('2. Uncomment the auto-fix code in this script to set a default plan');
			console.log('3. Or manually update each user\'s plan in Firebase Console');
		}

	} catch (error) {
		console.error('Script failed:', error);
		process.exit(1);
	}
}

// Function to manually restore a specific user's plan
async function restoreSpecificUserPlan(uid, plan) {
	try {
		const userDocRef = db.collection('users').doc(uid);
		await userDocRef.update({
			plan: plan,
			updatedAt: admin.firestore.Timestamp.now()
		});
		console.log(`✓ Successfully restored plan '${plan}' for user ${uid}`);
	} catch (error) {
		console.error(`❌ Failed to restore plan for user ${uid}:`, error.message);
	}
}

// Function to batch restore plans for multiple users
async function batchRestorePlans(userPlans) {
	// userPlans should be an object like: { 'uid1': 'pro', 'uid2': 'free', ... }
	console.log(`Restoring plans for ${Object.keys(userPlans).length} users...`);

	for (const [uid, plan] of Object.entries(userPlans)) {
		await restoreSpecificUserPlan(uid, plan);
		await new Promise((resolve) => setTimeout(resolve, 100)); // Rate limiting
	}

	console.log('Batch restoration complete!');
}

// Main execution
if (require.main === module) {
	// Check command line arguments
	const args = process.argv.slice(2);

	if (args.length === 0) {
		// Default: run the check
		restoreUserPlans()
			.then(() => {
				console.log('\nScript completed!');
				process.exit(0);
			})
			.catch((error) => {
				console.error('Fatal error:', error);
				process.exit(1);
			});
	} else if (args[0] === '--restore' && args.length === 3) {
		// Restore specific user: node restore-user-plans.js --restore UID PLAN
		const uid = args[1];
		const plan = args[2];
		restoreSpecificUserPlan(uid, plan)
			.then(() => process.exit(0))
			.catch(() => process.exit(1));
	} else {
		console.log('Usage:');
		console.log('  node restore-user-plans.js                    # Check all users');
		console.log('  node restore-user-plans.js --restore UID PLAN # Restore specific user');
		process.exit(1);
	}
}

module.exports = {
	restoreUserPlans,
	restoreSpecificUserPlan,
	batchRestorePlans
};
