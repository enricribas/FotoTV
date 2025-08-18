import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { ImageCollection } from '$lib/types/collection.types';

export interface CollectionStoreState {
	collections: ImageCollection[];
	selectedCollectionUuid: string;
	selectedCollection: ImageCollection | null;
	isLoading: boolean;
}

const STORAGE_KEY = 'photoTV_selectedCollection';

// Helper functions for localStorage
function getStoredCollectionUuid(userId: string): string | null {
	if (!browser) return null;
	try {
		const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
		return stored;
	} catch (error) {
		console.warn('Failed to read selected collection from localStorage:', error);
		return null;
	}
}

function storeCollectionUuid(userId: string, uuid: string): void {
	if (!browser) return;
	try {
		localStorage.setItem(`${STORAGE_KEY}_${userId}`, uuid);
	} catch (error) {
		console.warn('Failed to store selected collection in localStorage:', error);
	}
}

function removeStoredCollectionUuid(userId: string): void {
	if (!browser) return;
	try {
		localStorage.removeItem(`${STORAGE_KEY}_${userId}`);
	} catch (error) {
		console.warn('Failed to remove selected collection from localStorage:', error);
	}
}

const initialState: CollectionStoreState = {
	collections: [],
	selectedCollectionUuid: '',
	selectedCollection: null,
	isLoading: false
};

function createCollectionStore() {
	const { subscribe, set, update } = writable<CollectionStoreState>(initialState);

	return {
		subscribe,

		// Set all collections and try to restore selection from localStorage
		setCollections: (collections: ImageCollection[], userId?: string) => {
			update((state) => {
				let selectedUuid = state.selectedCollectionUuid;

				// Try to restore from localStorage if we have a userId
				if (userId && !selectedUuid) {
					const storedUuid = getStoredCollectionUuid(userId);
					if (storedUuid && collections.some((c) => c.uuid === storedUuid)) {
						selectedUuid = storedUuid;
					}
				}

				const selectedCollection = collections.find((c) => c.uuid === selectedUuid) || null;

				return {
					...state,
					collections,
					selectedCollectionUuid: selectedUuid,
					selectedCollection
				};
			});
		},

		// Set selected collection by UUID and persist to localStorage
		setSelectedCollection: (uuid: string, userId?: string) => {
			update((state) => {
				const collection = state.collections.find((c) => c.uuid === uuid) || null;

				// Store in localStorage if we have a userId
				if (userId) {
					storeCollectionUuid(userId, uuid);
				}

				return {
					...state,
					selectedCollectionUuid: uuid,
					selectedCollection: collection
				};
			});
		},

		// Get stored collection UUID for a user
		getStoredSelection: (userId: string): string | null => {
			return getStoredCollectionUuid(userId);
		},

		// Update a specific collection (useful for updating counts)
		updateCollection: (uuid: string, updates: Partial<ImageCollection>) => {
			update((state) => {
				const collections = state.collections.map((collection) =>
					collection.uuid === uuid ? { ...collection, ...updates } : collection
				);

				const selectedCollection =
					state.selectedCollectionUuid === uuid
						? collections.find((c) => c.uuid === uuid) || null
						: state.selectedCollection;

				return {
					...state,
					collections,
					selectedCollection
				};
			});
		},

		// Set loading state
		setLoading: (isLoading: boolean) => {
			update((state) => ({
				...state,
				isLoading
			}));
		},

		// Reset store to initial state and clear localStorage
		reset: (userId?: string) => {
			if (userId) {
				removeStoredCollectionUuid(userId);
			}
			set(initialState);
		}
	};
}

export const collectionStore = createCollectionStore();
