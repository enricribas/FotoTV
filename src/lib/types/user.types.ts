import type { Timestamp } from 'firebase/firestore';

export interface UserProfile {
	uid: string;
	email: string;
	displayName?: string | null;
	plan?: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface UserProfileUpdates {
	displayName?: string | null;
	plan?: string;
}
