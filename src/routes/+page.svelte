<script lang="ts">
	import { writable } from 'svelte/store';
	import type { User } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import {
		setupAuthStateListener,
		handleLogout,
		getUserInitials,
		getUserDisplayText,
		handleTVLoginSuccess,
		setupDeviceDetection
	} from '$lib/utils/authUtils';
	import { isEchoShow } from '$lib/advancedDeviceDetection';
	import { disableTVMode } from '$lib/advancedDeviceDetection';
	import { goto } from '$app/navigation';
	import { CollectionService } from '$lib/collectionService';
	import { UserService } from '$lib/userService';

	import { collectionStore } from '$lib/stores/collectionStore';
	import type { ImageCollection } from '$lib/types/collection.types';

	import LoggedInView from './LoggedInView.svelte';
	import LoggedOutView from './LoggedOutView.svelte';
	import TVLogin from '$lib/components/TVLogin.svelte';
	import UserProfileModal from '$lib/components/UserProfileModal.svelte';

	const user = writable<User | null>(null);
	let isTVDevice = false;
	let isTVModeForced = false;
	let isEchoShowDevice = false;
	let uploadLimit = { canUpload: true, remaining: 10, limit: 10 };
	let currentCollectionUuid = '';
	let showUploadLimit = false;
	let currentUser: User | null = null;
	let userCollections: ImageCollection[] = [];
	let isCompactLayout = false;
	let showProfileModal = false;

	// Check if window size requires compact layout
	function checkCompactLayout() {
		if (browser) {
			isCompactLayout = window.innerHeight < 800 || window.innerWidth < 1200;
		}
	}

	onMount(() => {
		let unsubscribe: (() => void) | undefined;

		// Check initial layout
		checkCompactLayout();

		// Listen for window resize
		window.addEventListener('resize', checkCompactLayout);

		// Setup device detection
		const checkDeviceDetection = async () => {
			const deviceInfo = await setupDeviceDetection();
			isTVDevice = deviceInfo.isTVDevice;
			isTVModeForced = deviceInfo.isTVModeForced;
			isEchoShowDevice = await isEchoShow();
		};

		checkDeviceDetection();

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

		// Listen for collection switch events from multi-collection uploads
		const handleSwitchCollection = (e: Event) => {
			const customEvent = e as CustomEvent<{ collectionUuid: string; collection: ImageCollection }>;
			handleCollectionChange(customEvent);
		};
		window.addEventListener('switch-collection', handleSwitchCollection);

		// Listen for storage changes to detect TV mode being disabled
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === 'tv_mode_disabled') {
				checkDeviceDetection();
			}
		};
		window.addEventListener('storage', handleStorageChange);

		return () => {
			unsubscribe?.();
			window.removeEventListener('collectionsChanged', handleCollectionsChanged);
			window.removeEventListener('switch-collection', handleSwitchCollection);
			window.removeEventListener('resize', checkCompactLayout);
			window.removeEventListener('storage', handleStorageChange);
		};
	});

	async function logout() {
		const result = await handleLogout();
		if (!result.success && result.error) {
			console.error('Logout error:', result.error);
		}
	}

	function toggleProfileModal() {
		showProfileModal = !showProfileModal;
	}

	function handleProfileLogout() {
		showProfileModal = false;
		logout();
	}

	function handleNameUpdated() {
		// Force re-render to update the displayed name
		user.update((u) => u);
	}

	// Handle going back to normal login from TV mode
	async function onBackToLogin() {
		disableTVMode();
		// Re-check device detection after disabling TV mode
		const deviceInfo = await setupDeviceDetection();
		isTVDevice = deviceInfo.isTVDevice;
		isTVModeForced = deviceInfo.isTVModeForced;
		isEchoShowDevice = await isEchoShow();
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

			// If user has no collections, create the defaults
			if (userCollections.length === 0) {
				await CollectionService.getPrimaryCollection(user); // This creates default collections
				// Reload collections after creation
				userCollections = await CollectionService.getUserCollections(user);
				collectionStore.setCollections(userCollections, user.uid);
			}

			// Check if there's a redirect URL stored from a share link
			const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
			if (redirectUrl) {
				sessionStorage.removeItem('redirectAfterLogin');
				// Navigate to the share URL after user data is loaded
				setTimeout(() => goto(redirectUrl), 100);
				return;
			}

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
			// Only show upload limit when within 5 photos of the limit
			showUploadLimit = uploadLimit.remaining <= 5;
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
				// Update showUploadLimit based on remaining photos
				showUploadLimit = uploadLimit.remaining <= 5;
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
	style={isEchoShowDevice
		? 'touch-action: manipulation; -webkit-touch-callout: none; -webkit-user-select: none;'
		: ''}
>
	{#if $user}
		<button
			class="absolute top-[66px] right-4 z-10 flex cursor-pointer items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-white/20"
			on:click={toggleProfileModal}
		>
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
				<div class="text-xs text-gray-500">
					<!-- eslint-disable-next-line no-undef -->
					v{typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '4.21.0'} | {userCollections.length}
					collections
				</div>
			</div>
		</button>
	{/if}

	<div
		class="{$user
			? 'absolute top-[66px] left-4'
			: isTVDevice || isTVModeForced
				? 'absolute top-[66px] left-4'
				: 'absolute top-[66px] left-4 sm:left-1/2 sm:-translate-x-1/2 sm:transform'} z-10"
	>
		<div class="flex items-center space-x-3">
			<img
				src="/FotoTV-logo2.png"
				alt="FotoTV Logo"
				class="{$user ? 'h-8' : isTVDevice || isTVModeForced ? 'h-8' : 'h-12 sm:h-16'} w-auto"
			/>
			<div class="flex items-center space-x-2">
				<h1
					class="{$user
						? 'text-lg'
						: isTVDevice || isTVModeForced
							? 'text-lg'
							: 'text-2xl sm:text-3xl'} font-bold text-gray-800"
				>
					FotoTV
				</h1>
			</div>
		</div>
	</div>

	<div
		class="w-full max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl {isCompactLayout
			? 'lg:max-w-5xl'
			: ''} {$user ? 'main-content-with-header' : ''}"
	>
		{#if $user}
			<LoggedInView
				user={$user}
				{uploadLimit}
				{currentCollectionUuid}
				collections={userCollections}
				onLimitsUpdate={() => updateUploadLimits($user)}
				{showUploadLimit}
				on:collectionChange={handleCollectionChange}
				on:collectionsUpdated={handleCollectionsUpdated}
			/>
		{:else if isTVDevice || isTVModeForced}
			<TVLogin onLoginSuccess={onTVLoginSuccess} {onBackToLogin} {isEchoShowDevice} />
		{:else}
			<LoggedOutView {isCompactLayout} />
		{/if}
	</div>
</div>

<UserProfileModal
	isOpen={showProfileModal}
	user={$user}
	on:close={() => (showProfileModal = false)}
	on:logout={handleProfileLogout}
	on:nameUpdated={handleNameUpdated}
/>
