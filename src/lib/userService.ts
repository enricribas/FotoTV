import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { User } from 'firebase/auth';
import type { UserProfile, UserProfileUpdates } from '$lib/types/user.types';

export class UserService {
	static async createUserProfile(user: User): Promise<UserProfile> {
		const userProfile: Partial<UserProfile> = {
			uid: user.uid,
			email: user.email || '',
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now()
		};

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

	static async getOrCreateUserProfile(user: User): Promise<UserProfile> {
		let profile = await this.getUserProfile(user);

		if (!profile) {
			profile = await this.createUserProfile(user);
		}

		return profile;
	}

	static async updateProfile(user: User, updates: UserProfileUpdates): Promise<void> {
		try {
			const userDocRef = doc(db, 'users', user.uid);

			const cleanUpdates: Record<string, unknown> = {
				updatedAt: Timestamp.now(),
				...Object.fromEntries(Object.entries(updates).filter(([, value]) => value !== undefined))
			};

			await updateDoc(userDocRef, cleanUpdates);
		} catch (error) {
			console.error('Error updating user profile:', error);
			throw error;
		}
	}
}
