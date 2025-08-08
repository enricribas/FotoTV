import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { onCall } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { CallableRequest } from 'firebase-functions/v2/https';

// Initialize Firebase Admin SDK with Firebase Admin service account
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	serviceAccountId: 'firebase-adminsdk-fbsvc@fototv-90cf0.iam.gserviceaccount.com'
});

const db = admin.firestore();
const auth = admin.auth();

interface TVAuthCode {
	code: string;
	deviceId: string;
	userAgent: string;
	createdAt: admin.firestore.Timestamp;
	expiresAt: admin.firestore.Timestamp;
	status: 'pending' | 'approved' | 'denied' | 'expired';
	approvedBy?: string;
	approvedByUser?: {
		uid: string;
		email: string | null;
		displayName: string | null;
		photoURL: string | null;
	};
}

/**
 * Generate a custom token for TV authentication
 * Called by TV device after code is approved
 */
export const generateTVToken = onCall(async (request: CallableRequest) => {
	const data = request.data;
	try {
		const { code } = data;

		if (!code || typeof code !== 'string' || code.length !== 4) {
			throw new functions.https.HttpsError('invalid-argument', 'Invalid code format');
		}

		// Find the approved code in Firestore
		const codesRef = db.collection('tv_auth_codes');
		const query = codesRef
			.where('code', '==', code.toUpperCase())
			.where('status', '==', 'approved');
		const snapshot = await query.get();

		if (snapshot.empty) {
			throw new functions.https.HttpsError('not-found', 'Code not found or not approved');
		}

		const codeDoc = snapshot.docs[0];
		const codeData = codeDoc.data() as TVAuthCode;

		// Check if code is expired
		const now = new Date();
		if (codeData.expiresAt.toDate() < now) {
			// Mark as expired
			await codeDoc.ref.update({ status: 'expired' });
			throw new functions.https.HttpsError('deadline-exceeded', 'Code has expired');
		}

		// Verify we have approver info
		if (!codeData.approvedBy || !codeData.approvedByUser) {
			throw new functions.https.HttpsError('failed-precondition', 'Code approval data incomplete');
		}

		// Generate custom token for the approving user
		const customToken = await auth.createCustomToken(codeData.approvedBy, {
			// Add custom claims for TV device
			isTVDevice: true,
			approvedAt: admin.firestore.Timestamp.now().toMillis(),
			deviceId: codeData.deviceId
		});

		// Mark the code as used (optional - prevent reuse)
		await codeDoc.ref.update({
			status: 'expired',
			usedAt: admin.firestore.Timestamp.now()
		});

		return {
			customToken,
			userInfo: codeData.approvedByUser
		};
	} catch (error) {
		console.error('Error generating TV token:', error);

		if (error instanceof functions.https.HttpsError) {
			throw error;
		}

		throw new functions.https.HttpsError('internal', 'Failed to generate token');
	}
});

/**
 * Clean up expired TV auth codes
 * Runs every 5 minutes
 */
export const cleanupExpiredCodes = onSchedule('every 5 minutes', async () => {
	try {
		const now = new Date();
		const codesRef = db.collection('tv_auth_codes');

		// Find expired codes
		const expiredQuery = codesRef.where('expiresAt', '<', now).where('status', '!=', 'expired');
		const expiredSnapshot = await expiredQuery.get();

		if (expiredSnapshot.empty) {
			console.log('No expired codes to clean up');
			return;
		}

		// Update expired codes in batches
		const batch = db.batch();
		expiredSnapshot.docs.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
			batch.update(doc.ref, { status: 'expired' });
		});

		await batch.commit();
		console.log(`Cleaned up ${expiredSnapshot.size} expired codes`);
	} catch (error) {
		console.error('Error cleaning up expired codes:', error);
	}
});

/**
 * Delete old expired codes
 * Runs daily to clean up database
 */
export const deleteOldCodes = onSchedule('every 24 hours', async () => {
	try {
		const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
		const codesRef = db.collection('tv_auth_codes');

		// Find old expired codes
		const oldQuery = codesRef.where('expiresAt', '<', oneDayAgo);
		const oldSnapshot = await oldQuery.get();

		if (oldSnapshot.empty) {
			console.log('No old codes to delete');
			return;
		}

		// Delete old codes in batches
		const batch = db.batch();
		oldSnapshot.docs.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
			batch.delete(doc.ref);
		});

		await batch.commit();
		console.log(`Deleted ${oldSnapshot.size} old codes`);
	} catch (error) {
		console.error('Error deleting old codes:', error);
	}
});
