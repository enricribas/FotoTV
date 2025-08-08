import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth, db } from './firebase';
import {
	collection,
	doc,
	addDoc,
	getDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
	getDocs,
	serverTimestamp,
	Timestamp
} from 'firebase/firestore';
import { signInWithCustomToken } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

export interface TVAuthCode {
	id?: string;
	code: string;
	deviceId: string;
	userAgent: string;
	createdAt: Timestamp;
	expiresAt: Timestamp;
	status: 'pending' | 'approved' | 'denied' | 'expired';
	approvedBy?: string; // User ID who approved
	approvedByUser?: {
		uid: string;
		email: string | null;
		displayName: string | null;
		photoURL: string | null;
	}; // Full user info of approver
}

/**
 * TV Authentication Service
 * Uses Firestore to store TV auth codes and manual approval by logged-in users
 */
export class TVAuthService {
	private static readonly CODE_LENGTH = 4;
	private static readonly CODE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
	private static readonly COLLECTION_NAME = 'tv_auth_codes';
	private static readonly DEVICE_ID_KEY = 'tv_device_id';

	// Stores for reactive state
	public static readonly authCode = writable<string | null>(null);
	public static readonly authStatus = writable<
		'idle' | 'waiting' | 'approved' | 'denied' | 'expired'
	>('idle');

	/**
	 * Generate a random 4-letter code (A-Z only)
	 */
	private static generateCode(): string {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let code = '';
		for (let i = 0; i < this.CODE_LENGTH; i++) {
			code += letters.charAt(Math.floor(Math.random() * letters.length));
		}
		return code;
	}

	/**
	 * Get or create a unique device ID for this device
	 */
	private static getDeviceId(): string {
		if (typeof window === 'undefined') return 'server';

		let deviceId = localStorage.getItem(this.DEVICE_ID_KEY);
		if (!deviceId) {
			deviceId = 'dev_' + Math.random().toString(36).substring(2, 15);
			localStorage.setItem(this.DEVICE_ID_KEY, deviceId);
		}
		return deviceId;
	}

	/**
	 * Store auth code in Firestore
	 */
	private static async storeAuthCode(authCode: TVAuthCode): Promise<string | null> {
		try {
			const docRef = await addDoc(collection(db, this.COLLECTION_NAME), {
				code: authCode.code,
				deviceId: authCode.deviceId,
				userAgent: authCode.userAgent,
				createdAt: serverTimestamp(),
				expiresAt: new Date(Date.now() + this.CODE_EXPIRY_MS),
				status: 'pending'
			});
			return docRef.id;
		} catch (error) {
			console.error('Failed to store auth code:', error);
			return null;
		}
	}

	/**
	 * Get auth code from Firestore for TV polling (any status)
	 */
	private static async getAuthCode(code: string): Promise<TVAuthCode | null> {
		try {
			const q = query(collection(db, this.COLLECTION_NAME), where('code', '==', code));
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				return null;
			}

			const doc = querySnapshot.docs[0];
			const data = doc.data();

			// Check if expired
			const now = new Date();
			const expiresAt = data.expiresAt.toDate();

			if (now > expiresAt) {
				// Mark as expired
				await updateDoc(doc.ref, { status: 'expired' });
				return null;
			}

			return {
				id: doc.id,
				code: data.code,
				deviceId: data.deviceId,
				userAgent: data.userAgent,
				createdAt: data.createdAt,
				expiresAt: data.expiresAt,
				status: data.status,
				approvedBy: data.approvedBy,
				approvedByUser: data.approvedByUser
			};
		} catch (error) {
			console.error('Failed to get auth code:', error);
			return null;
		}
	}

	/**
	 * Get pending auth code for approval (pending status only)
	 */
	private static async getPendingAuthCode(code: string): Promise<TVAuthCode | null> {
		try {
			const q = query(
				collection(db, this.COLLECTION_NAME),
				where('code', '==', code),
				where('status', '==', 'pending')
			);
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				return null;
			}

			const doc = querySnapshot.docs[0];
			const data = doc.data();

			// Check if expired
			const now = new Date();
			const expiresAt = data.expiresAt.toDate();

			if (now > expiresAt) {
				// Mark as expired
				await updateDoc(doc.ref, { status: 'expired' });
				return null;
			}

			return {
				id: doc.id,
				code: data.code,
				deviceId: data.deviceId,
				userAgent: data.userAgent,
				createdAt: data.createdAt,
				expiresAt: data.expiresAt,
				status: data.status,
				approvedBy: data.approvedBy,
				approvedByUser: data.approvedByUser
			};
		} catch (error) {
			console.error('Failed to get pending auth code:', error);
			return null;
		}
	}

	/**
	 * Update auth code status in Firestore
	 */
	private static async updateAuthCode(
		codeId: string,
		status: TVAuthCode['status'],
		approvedBy?: string
	): Promise<boolean> {
		try {
			const updateData: any = { status };
			if (approvedBy) {
				updateData.approvedBy = approvedBy;
			}

			await updateDoc(doc(db, this.COLLECTION_NAME, codeId), updateData);
			return true;
		} catch (error) {
			console.error('Failed to update auth code:', error);
			return false;
		}
	}

	/**
	 * Update auth code status in Firestore with full user info
	 */
	private static async updateAuthCodeWithUser(
		codeId: string,
		status: TVAuthCode['status'],
		approvedBy: string,
		approvedByUser: any
	): Promise<boolean> {
		try {
			const updateData = {
				status,
				approvedBy,
				approvedByUser
			};

			await updateDoc(doc(db, this.COLLECTION_NAME, codeId), updateData);
			return true;
		} catch (error) {
			console.error('Failed to update auth code:', error);
			return false;
		}
	}

	/**
	 * Start TV authentication process - generates code and stores in Firestore
	 * Call this on the TV device that needs to be authenticated
	 */
	static async requestTVAuth(): Promise<{ success: boolean; user?: User; error?: string }> {
		const code = this.generateCode();
		const deviceId = this.getDeviceId();

		const authCode: TVAuthCode = {
			code,
			deviceId,
			userAgent: navigator.userAgent,
			createdAt: Timestamp.now(),
			expiresAt: Timestamp.fromDate(new Date(Date.now() + this.CODE_EXPIRY_MS)),
			status: 'pending'
		};

		// Store the code in Firestore
		const codeId = await this.storeAuthCode(authCode);
		if (!codeId) {
			return { success: false, error: 'Failed to generate code' };
		}

		authCode.id = codeId;

		// Update UI state
		this.authCode.set(code);
		this.authStatus.set('waiting');

		// Poll for approval from Firestore
		return new Promise((resolve) => {
			const pollInterval = setInterval(async () => {
				try {
					const storedCode = await this.getAuthCode(code);

					if (!storedCode) {
						clearInterval(pollInterval);
						this.authStatus.set('expired');
						this.authCode.set(null);
						resolve({ success: false, error: 'Code expired or not found' });
						return;
					}

					if (storedCode.status === 'approved') {
						clearInterval(pollInterval);
						this.authStatus.set('approved');
						this.authCode.set(null);

						// Authenticate with custom token from Cloud Function
						this.authenticateWithCustomToken(resolve, storedCode.approvedByUser, code);
						return;
					}

					if (storedCode.status === 'denied') {
						clearInterval(pollInterval);
						this.authStatus.set('denied');
						this.authCode.set(null);
						resolve({ success: false, error: 'Authentication denied' });
						return;
					}

					if (storedCode.status === 'expired') {
						clearInterval(pollInterval);
						this.authStatus.set('expired');
						this.authCode.set(null);
						resolve({ success: false, error: 'Code expired' });
						return;
					}
				} catch (error) {
					console.error('Error polling for approval:', error);
				}
			}, 2000); // Poll every 2 seconds

			// Auto-expire after timeout
			setTimeout(() => {
				clearInterval(pollInterval);
				if (this.authStatus.getValue?.() === 'waiting') {
					this.authStatus.set('expired');
					this.authCode.set(null);
					resolve({ success: false, error: 'Code expired' });
				}
			}, this.CODE_EXPIRY_MS);
		});
	}

	/**
	 * Authenticate TV with real Firebase user using custom token from Cloud Function
	 */
	private static async authenticateWithCustomToken(
		resolve: (value: { success: boolean; user?: User; error?: string }) => void,
		approvedByUser?: any,
		code?: string
	): Promise<void> {
		try {
			if (!code) {
				resolve({ success: false, error: 'No code available for authentication' });
				return;
			}

			// Call Cloud Function to generate custom token
			const functions = getFunctions();
			const generateTVToken = httpsCallable(functions, 'generateTVToken');

			const result = await generateTVToken({ code });
			const { customToken, userInfo } = result.data as any;

			if (!customToken) {
				resolve({ success: false, error: 'Failed to generate authentication token' });
				return;
			}

			// Sign in with the custom token
			const userCredential = await signInWithCustomToken(auth, customToken);

			resolve({
				success: true,
				user: userCredential.user
			});
		} catch (error: any) {
			console.error('Custom token authentication failed:', error);

			let errorMessage = 'Authentication failed';
			if (error?.code === 'functions/not-found') {
				errorMessage = 'Code not found or not approved';
			} else if (error?.code === 'functions/deadline-exceeded') {
				errorMessage = 'Code has expired';
			} else if (error?.message) {
				errorMessage = error.message;
			}

			resolve({
				success: false,
				error: errorMessage
			});
		}
	}

	/**
	 * Manually approve a TV authentication code
	 * Call this on logged-in devices when user enters a code
	 */
	static async approveCode(code: string): Promise<{ success: boolean; error?: string }> {
		try {
			// Get current user
			const currentUser = auth.currentUser;
			if (!currentUser) {
				return { success: false, error: 'User not logged in' };
			}

			// Find the code in Firestore (pending only for approval)
			const storedCode = await this.getPendingAuthCode(code.toUpperCase());
			if (!storedCode) {
				return { success: false, error: 'Invalid or expired code' };
			}

			// Store the approving user's info
			const approvedByUser = {
				uid: currentUser.uid,
				email: currentUser.email,
				displayName: currentUser.displayName,
				photoURL: currentUser.photoURL
			};

			// Update the code status to approved with user info
			const success = await this.updateAuthCodeWithUser(
				storedCode.id!,
				'approved',
				currentUser.uid,
				approvedByUser
			);

			if (success) {
				return { success: true };
			} else {
				return { success: false, error: 'Failed to approve code' };
			}
		} catch (error) {
			console.error('Error approving code:', error);
			return { success: false, error: 'Failed to approve code' };
		}
	}

	/**
	 * Deny a TV authentication code
	 */
	static async denyCode(code: string): Promise<{ success: boolean; error?: string }> {
		try {
			// Get current user
			const currentUser = auth.currentUser;
			if (!currentUser) {
				return { success: false, error: 'User not logged in' };
			}

			// Find the code in Firestore
			const storedCode = await this.getAuthCode(code.toUpperCase());
			if (!storedCode) {
				return { success: false, error: 'Invalid or expired code' };
			}

			// Update the code status to denied
			const success = await this.updateAuthCode(storedCode.id!, 'denied', currentUser.uid);
			if (success) {
				return { success: true };
			} else {
				return { success: false, error: 'Failed to deny code' };
			}
		} catch (error) {
			console.error('Error denying code:', error);
			return { success: false, error: 'Failed to deny code' };
		}
	}

	/**
	 * Cancel current TV auth request
	 */
	static cancelTVAuth(): void {
		this.authCode.set(null);
		this.authStatus.set('idle');
	}

	/**
	 * Clean up expired codes - now handled by Cloud Functions
	 * This method is kept for backward compatibility but does nothing
	 */
	static async cleanupExpiredCodes(): Promise<void> {
		// Cleanup is now handled by the cleanupExpiredCodes Cloud Function
		// No client-side action needed
	}

	/**
	 * Initialize the service
	 */
	static initialize(): void {
		if (typeof window === 'undefined') return;

		// Cleanup is now handled by Cloud Functions automatically
		// No periodic client-side cleanup needed
	}

	/**
	 * Format time remaining for a code
	 */
	static getTimeRemaining(createdAt: Timestamp): string {
		const now = Date.now();
		const expiresAt = createdAt.toMillis() + this.CODE_EXPIRY_MS;
		const remaining = Math.max(0, expiresAt - now);

		const minutes = Math.floor(remaining / 60000);
		const seconds = Math.floor((remaining % 60000) / 1000);

		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	/**
	 * Check if current device is likely a TV
	 */
	static async isLikelyTV(): Promise<boolean> {
		// Import here to avoid SSR issues
		const { isAndroidTV } = await import('./advancedDeviceDetection');
		return await isAndroidTV();
	}

	/**
	 * Get display name for device type
	 */
	static getDeviceDisplayName(userAgent: string): string {
		const ua = userAgent.toLowerCase();

		if (ua.includes('android tv') || ua.includes('googletv')) {
			return '📺 Android TV';
		}
		if (ua.includes('smart-tv') || ua.includes('smarttv')) {
			return '📺 Smart TV';
		}
		if (ua.includes('mobile')) {
			return '📱 Mobile Device';
		}
		if (ua.includes('tablet')) {
			return '📱 Tablet';
		}
		if (ua.includes('electron')) {
			return '💻 Desktop App';
		}

		return '🖥️ Unknown Device';
	}
}

// Initialize on import
if (typeof window !== 'undefined') {
	TVAuthService.initialize();
}
