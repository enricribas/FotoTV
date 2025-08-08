<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, signOut } from 'firebase/auth';
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { ImageService } from '$lib/imageService';
	import { isAndroidTV, isTVModeEnabled } from '$lib/advancedDeviceDetection';

	import LoggedInView from './LoggedInView.svelte';
	import LoggedOutView from './LoggedOutView.svelte';
	import TVLogin from '$lib/components/TVLogin.svelte';

	const user = writable<User | null>(null);
	const uploadedImages = writable<string[]>([]);
	let isTVDevice = false;
	let isTVModeForced = false;

	onMount(() => {
		// Check if TV mode is forced (for testing)
		isTVModeForced = isTVModeEnabled();

		// Check if this is a TV device
		isAndroidTV()
			.then((isTV) => {
				isTVDevice = isTV;
			})
			.catch((error) => {
				console.warn('Failed to detect TV device:', error);
			});

		const unsubscribe = onAuthStateChanged(auth, async (u) => {
			user.set(u);
			if (u) {
				const images = await ImageService.loadUserImages(u);
				uploadedImages.set(images);
			} else {
				uploadedImages.set([]);
			}
		});

		return unsubscribe;
	});

	function logout() {
		signOut(auth).catch(() => {
			// Logout failed, but we'll ignore errors since user can retry
		});
	}

	function handleTVLoginSuccess(tvUser: User) {
		user.set(tvUser);
	}
</script>

<div
	class="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 p-4"
>
	<!-- User info and logout button in top right corner of entire page -->
	{#if $user}
		<div class="absolute top-4 right-4 z-10 flex items-center space-x-2">
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
						{$user.displayName
							? $user.displayName.charAt(0).toUpperCase()
							: $user.email?.charAt(0).toUpperCase() || 'U'}
					</span>
				</div>
			{/if}
			<div class="text-sm text-gray-800">
				<span class="font-semibold">{$user.displayName || $user.email}</span>
			</div>
			<button
				class="btn btn-sm ml-2 border-white bg-white text-gray-700 hover:bg-gray-100"
				on:click={logout}
			>
				Logout
			</button>
		</div>
	{/if}

	<!-- FotoTV logo and text - centered when logged out, top-left when logged in -->
	<div
		class="{$user
			? 'absolute top-4 left-4'
			: 'absolute top-8 left-1/2 -translate-x-1/2 transform'} z-10"
	>
		<div class="flex items-center space-x-3">
			<img src="/FotoTV-logo2.png" alt="FotoTV Logo" class="{$user ? 'h-8' : 'h-16'} w-auto" />
			<div class="flex items-center space-x-2">
				<h1 class="{$user ? 'text-lg' : 'text-3xl'} font-bold text-gray-800">FotoTV</h1>
			</div>
		</div>
	</div>

	<!-- Main content centered -->
	<div class="w-full max-w-md">
		{#if $user}
			<LoggedInView user={$user} uploadedImages={$uploadedImages} />
		{:else if isTVDevice || isTVModeForced}
			<!-- TV Login Flow -->
			<TVLogin onLoginSuccess={handleTVLoginSuccess} />
		{:else}
			<!-- Regular Login Flow -->
			<LoggedOutView />
		{/if}
	</div>
</div>
