import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { User } from 'firebase/auth';

export interface UserProfile {
	uid: string;
	email: string;
	displayName?: string | null;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export class UserService {
	/**
	 * Create a new user profile in Firestore when they first log in
	 * @param user - The authenticated user
	 * @returns The created user profile
	 */
	static async createUserProfile(user: User): Promise<UserProfile> {
		const userProfile: any = {
			uid: user.uid,
			email: user.email || '',
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now()
		};

		// Only add displayName if it exists to avoid undefined values in Firestore
		if (user.displayName) {
			userProfile.displayName = user.displayName;
		}

		try {
			const userDocRef = doc(db, 'users', user.uid);
			await setDoc(userDocRef, userProfile);
			return userProfile as UserProfile;
		} catch (error) {
			console.error('Error creating user profile:', error);
			throw error;
		}
	}

	/**
	 * Get user profile from Firestore
	 * @param user - The authenticated user
	 * @returns The user profile or null if not found
	 */
	static async getUserProfile(user: User): Promise<UserProfile | null> {
		try {
			const userDocRef = doc(db, 'users', user.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const data = userDoc.data();
				return {
					uid: data.uid,
					email: data.email,
					displayName: data.displayName || null,
					createdAt: data.createdAt,
					updatedAt: data.updatedAt
				} as UserProfile;
			}

			return null;
		} catch (error) {
			console.error('Error getting user profile:', error);
			return null;
		}
	}

	/**
	 * Get or create user profile - ensures a profile exists
	 * @param user - The authenticated user
	 * @returns The user profile
	 */
	static async getOrCreateUserProfile(user: User): Promise<UserProfile> {
		let profile = await this.getUserProfile(user);

		if (!profile) {
			profile = await this.createUserProfile(user);
		}

		return profile;
	}

	/**
	 * Update user profile
	 * @param user - The authenticated user
	 * @param updates - Fields to update
	 */
	static async updateProfile(
		user: User,
		updates: Partial<Pick<UserProfile, 'displayName'>>
	): Promise<void> {
		try {
			const userDocRef = doc(db, 'users', user.uid);

			// Filter out undefined values to avoid Firestore errors
			const cleanUpdates: any = {
				updatedAt: Timestamp.now()
			};

			if (updates.displayName !== undefined) {
				cleanUpdates.displayName = updates.displayName;
			}

			await updateDoc(userDocRef, cleanUpdates);
		} catch (error) {
			console.error('Error updating user profile:', error);
			throw error;
		}
	}
}
