// Migration script to create user profiles and update collections with upload limits
// Run this script once to set up upload limits for users and collections created before this feature was added

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
const storage = admin.storage();

async function migrateUserProfilesAndCollections() {
	console.log('Starting user profile and collection migration...');

	try {
		// Get all users from Firebase Auth
		const listUsersResult = await admin.auth().listUsers();
		const users = listUsersResult.users;

		console.log(`Found ${users.length} users to migrate`);

		for (const user of users) {
			console.log(`Processing user: ${user.email} (${user.uid})`);

			// Check if user profile already exists
			const userDocRef = db.collection('users').doc(user.uid);
			const userDoc = await userDocRef.get();

			if (!userDoc.exists) {
				// Create user profile (simplified - no upload limits at user level)
				const userProfile = {
					uid: user.uid,
					email: user.email || '',
					displayName: user.displayName || null,
					createdAt: admin.firestore.Timestamp.now(),
					updatedAt: admin.firestore.Timestamp.now()
				};

				// Check for any existing data that might have been partially written
				// This helps preserve fields like 'plan' if they were set before
				try {
					const existingDoc = await userDocRef.get();
					if (existingDoc.exists) {
						const existingData = existingDoc.data();
						if (existingData.plan) {
							userProfile.plan = existingData.plan;
						}
					}
				} catch (error) {
					// Ignore errors, proceed without plan field
				}

				try {
					await userDocRef.set(userProfile, { merge: true });
					console.log(`  - Created user profile (merged with existing data)`);
				} catch (error) {
					console.error(`  - Failed to create user profile:`, error.message);
				}
			} else {
				console.log(`  - User profile already exists`);
			}

			// Process collections for this user
			try {
				const collectionsSnapshot = await db.collection(`users/${user.uid}/collections`).get();

				if (collectionsSnapshot.empty) {
					console.log(`  - No collections found for this user`);
					continue;
				}

				for (const collectionDoc of collectionsSnapshot.docs) {
					const collectionUuid = collectionDoc.id;
					const collectionData = collectionDoc.data();

					console.log(`  - Processing collection: ${collectionUuid}`);

					// Check if collection already has upload limit fields
					if (
						collectionData.imageUploadLimit !== undefined &&
						collectionData.currentImageCount !== undefined
					) {
						console.log(`    - Collection already has upload limit fields, skipping`);
						continue;
					}

					// Count images in Firebase Storage for this collection
					let imageCount = 0;
					try {
						const [files] = await storage
							.bucket()
							.getFiles({ prefix: `images/${collectionUuid}/` });
						imageCount = files.length;
						console.log(`    - Found ${imageCount} existing images`);
					} catch (error) {
						console.warn(
							`    - Could not count images for collection ${collectionUuid}:`,
							error.message
						);
						imageCount = 0;
					}

					// Update collection with upload limit fields
					try {
						await collectionDoc.ref.update({
							imageUploadLimit: 10, // Default limit
							currentImageCount: imageCount,
							updatedAt: admin.firestore.Timestamp.now()
						});
						console.log(`    - Updated collection with ${imageCount} images counted`);
					} catch (error) {
						console.error(`    - Failed to update collection:`, error.message);
					}
				}
			} catch (error) {
				console.warn(`  - Could not process collections for user ${user.email}:`, error.message);
			}

			// Add a small delay to avoid rate limiting
			await new Promise((resolve) => setTimeout(resolve, 200));
		}

		console.log('Migration completed successfully!');
	} catch (error) {
		console.error('Migration failed:', error);
		process.exit(1);
	}
}

// Run the migration
migrateUserProfilesAndCollections()
	.then(() => {
		console.log('All done!');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Fatal error:', error);
		process.exit(1);
	});
