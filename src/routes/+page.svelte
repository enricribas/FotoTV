<script lang="ts">
	import type { User } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import {
		setupAuthStateListener,
		handleLogout,
		getUserInitials,
		getUserDisplayText,
		handleTVLoginSuccess,
		setupDeviceDetection
	} from '$lib/utils/authUtils';
	import { disableTVMode } from '$lib/advancedDeviceDetection';
	import { goto } from '$app/navigation';
	import { CollectionService } from '$lib/collectionService';
	import { UserService } from '$lib/userService';
	import UploadLimitDisplay from '$lib/components/UploadLimitDisplay.svelte';
	import CollectionSelector from '$lib/components/CollectionSelector.svelte';
	import { collectionStore } from '$lib/stores/collectionStore';
	import type { ImageCollection } from '$lib/types/collection.types';

	import LoggedInView from './LoggedInView.svelte';
	import LoggedOutView from './LoggedOutView.svelte';
	import TVLogin from '$lib/components/TVLogin.svelte';

	const user = writable<User | null>(null);
	let isTVDevice = false;
	let isTVModeForced = false;
	let uploadLimit = { canUpload: true, remaining: 10, limit: 10 };
	let currentCollectionUuid = '';
	let showUploadLimit = false;
	let currentUser: User | null = null;
	let userCollections: ImageCollection[] = [];

	onMount(() => {
		let unsubscribe: (() => void) | undefined;

		// Setup device detection
		setupDeviceDetection().then((deviceInfo) => {
			isTVDevice = deviceInfo.isTVDevice;
			isTVModeForced = deviceInfo.isTVModeForced;
		});

		// Setup auth listener
		unsubscribe = setupAuthStateListener(
			(u) => {
				user.set(u);
				handleUserChange(u);
			},
			(error) => console.error('Auth error:', error)
		);

		// Listen for collection changes
		const handleCollectionsChanged = () => {
			handleCollectionsUpdated();
		};

		window.addEventListener('collectionsChanged', handleCollectionsChanged);

		return () => {
			unsubscribe?.();
			window.removeEventListener('collectionsChanged', handleCollectionsChanged);
		};
	});

	async function logout() {
		const result = await handleLogout();
		if (!result.success && result.error) {
			console.error('Logout error:', result.error);
		}
	}

	// Handle going back to normal login from TV mode
	function onBackToLogin() {
		disableTVMode();
	}

	function onTVLoginSuccess(tvUser: User) {
		handleTVLoginSuccess(tvUser, (u) => user.set(u), goto);
	}

	// Handle user authentication state changes
	async function handleUserChange(newUser: User | null) {
		if (newUser && newUser !== currentUser) {
			currentUser = newUser;
			await initializeUserData(newUser);
		} else if (!newUser) {
			const previousUserId = currentUser?.uid;
			currentUser = null;
			showUploadLimit = false;
			currentCollectionUuid = '';
			collectionStore.reset(previousUserId);
			userCollections = [];
		}
	}

	// Initialize user data when user logs in
	async function initializeUserData(user: User) {
		try {
			collectionStore.setLoading(true);
			await UserService.getOrCreateUserProfile(user);

			// Load user collections
			userCollections = await CollectionService.getUserCollections(user);
			collectionStore.setCollections(userCollections, user.uid);

			// Try to restore stored selection first, otherwise use primary collection
			let selectedUuid = collectionStore.getStoredSelection(user.uid);

			// Verify the stored selection is valid
			if (selectedUuid && !userCollections.some((c) => c.uuid === selectedUuid)) {
				selectedUuid = null;
			}

			// If no valid stored selection, use primary collection
			if (!selectedUuid) {
				selectedUuid = await CollectionService.getPrimaryCollection(user);
			}

			currentCollectionUuid = selectedUuid;
			collectionStore.setSelectedCollection(selectedUuid, user.uid);

			await updateUploadLimits(user);
			showUploadLimit = true;
		} catch (error) {
			console.error('Error initializing user data:', error);
		} finally {
			collectionStore.setLoading(false);
		}
	}

	// Update upload limits based on current collection
	async function updateUploadLimits(user: User) {
		try {
			if (currentCollectionUuid) {
				uploadLimit = await CollectionService.canUploadImage(user, currentCollectionUuid);
			}
		} catch (error) {
			console.error('Error checking upload limits:', error);
		}
	}

	// Handle collection selection change
	function handleCollectionChange(
		event: CustomEvent<{ collectionUuid: string; collection: ImageCollection }>
	) {
		const { collectionUuid } = event.detail;
		currentCollectionUuid = collectionUuid;
		collectionStore.setSelectedCollection(collectionUuid, currentUser?.uid);

		// Update upload limits for the new collection
		if (currentUser) {
			updateUploadLimits(currentUser);
		}
	}

	// Handle collections being updated (e.g., new collection created)
	async function handleCollectionsUpdated() {
		if (currentUser) {
			try {
				// Reload collections
				userCollections = await CollectionService.getUserCollections(currentUser);
				collectionStore.setCollections(userCollections, currentUser.uid);
			} catch (error) {
				console.error('Error refreshing collections:', error);
			}
		}
	}
</script>

<div
	class="to-cyan-0 relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-orange-100 p-4"
>
	{#if $user}
		<div class="absolute top-[66px] right-4 z-10 flex items-center space-x-2">
			{#if $user.photoURL}
				<div class="avatar">
					<div class="h-8 w-8 rounded-full ring ring-orange-500 ring-offset-1 ring-offset-white">
						<img src={$user.photoURL} alt="User avatar" />
					</div>
				</div>
			{:else}
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 ring ring-orange-500 ring-offset-1 ring-offset-white"
				>
					<span class="text-sm font-semibold text-white">
						{getUserInitials($user)}
					</span>
				</div>
			{/if}
			<div class="text-sm text-gray-800">
				<span class="font-semibold">{getUserDisplayText($user)}</span>
			</div>
			<button
				class="btn btn-sm ml-2 border-white bg-white text-gray-700 hover:bg-gray-100"
				on:click={logout}
			>
				Logout
			</button>
		</div>
	{/if}

	<div
		class="{$user
			? 'absolute top-[66px] left-4'
			: 'absolute top-[66px] left-1/2 -translate-x-1/2 transform'} z-10"
	>
		<div class="flex items-center space-x-3">
			<img src="/FotoTV-logo2.png" alt="FotoTV Logo" class="{$user ? 'h-8' : 'h-16'} w-auto" />
			<div class="flex items-center space-x-2">
				<h1 class="{$user ? 'text-lg' : 'text-3xl'} font-bold text-gray-800">FotoTV</h1>
			</div>
		</div>
	</div>

	<div class="w-full max-w-md">
		{#if $user}
			<!-- Collection Selector - only show if user has multiple collections -->
			<div class="mb-6">
				<CollectionSelector
					selectedCollectionUuid={currentCollectionUuid}
					collections={userCollections}
					user={$user}
					on:collectionChange={handleCollectionChange}
					on:collectionsUpdated={handleCollectionsUpdated}
				/>
			</div>

			<LoggedInView
				user={$user}
				{uploadLimit}
				{currentCollectionUuid}
				collections={userCollections}
				onLimitsUpdate={() => updateUploadLimits($user)}
			/>
		{:else if isTVDevice || isTVModeForced}
			<TVLogin onLoginSuccess={onTVLoginSuccess} {onBackToLogin} />
		{:else}
			<LoggedOutView />
		{/if}
	</div>

	{#if $user && showUploadLimit}
		<div class="fixed bottom-[66px] left-1/2 z-10 w-full max-w-xs -translate-x-1/2 transform px-4">
			<UploadLimitDisplay
				remaining={uploadLimit.remaining}
				limit={uploadLimit.limit}
				canUpload={uploadLimit.canUpload}
			/>
		</div>
	{/if}
</div>
