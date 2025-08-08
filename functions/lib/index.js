"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldCodes = exports.cleanupExpiredCodes = exports.generateTVToken = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const scheduler_1 = require("firebase-functions/v2/scheduler");
// Initialize Firebase Admin SDK with Firebase Admin service account
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    serviceAccountId: 'firebase-adminsdk-fbsvc@fototv-90cf0.iam.gserviceaccount.com'
});
const db = admin.firestore();
const auth = admin.auth();
/**
 * Generate a custom token for TV authentication
 * Called by TV device after code is approved
 */
exports.generateTVToken = (0, https_1.onCall)(async (request) => {
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
        const codeData = codeDoc.data();
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
        console.log('Attempting to create custom token for user:', codeData.approvedBy);
        console.log('Service account email:', process.env.FIREBASE_SERVICE_ACCOUNT);
        let customToken;
        try {
            customToken = await auth.createCustomToken(codeData.approvedBy, {
                // Add custom claims for TV device
                isTVDevice: true,
                approvedAt: admin.firestore.Timestamp.now().toMillis(),
                deviceId: codeData.deviceId
            });
            console.log('Custom token created successfully');
        }
        catch (tokenError) {
            console.error('Custom token creation failed:', {
                error: tokenError,
                code: tokenError.code,
                message: tokenError.message,
                stack: tokenError.stack
            });
            throw new functions.https.HttpsError('internal', `Failed to create custom token: ${tokenError.message}`);
        }
        // Mark the code as used (optional - prevent reuse)
        await codeDoc.ref.update({
            status: 'expired',
            usedAt: admin.firestore.Timestamp.now()
        });
        return {
            customToken,
            userInfo: codeData.approvedByUser
        };
    }
    catch (error) {
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
exports.cleanupExpiredCodes = (0, scheduler_1.onSchedule)('every 5 minutes', async (event) => {
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
        expiredSnapshot.docs.forEach((doc) => {
            batch.update(doc.ref, { status: 'expired' });
        });
        await batch.commit();
        console.log(`Cleaned up ${expiredSnapshot.size} expired codes`);
    }
    catch (error) {
        console.error('Error cleaning up expired codes:', error);
    }
});
/**
 * Delete old expired codes
 * Runs daily to clean up database
 */
exports.deleteOldCodes = (0, scheduler_1.onSchedule)('every 24 hours', async (event) => {
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
        oldSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        console.log(`Deleted ${oldSnapshot.size} old codes`);
    }
    catch (error) {
        console.error('Error deleting old codes:', error);
    }
});
//# sourceMappingURL=index.js.map