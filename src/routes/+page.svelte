<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, signOut } from 'firebase/auth';
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { ImageService } from '$lib/imageService';
	import LoggedInView from './LoggedInView.svelte';
	import LoggedOutView from './LoggedOutView.svelte';
	import AuthHelper from './AuthHelper.svelte';
	import AuthDebug from './AuthDebug.svelte';
	import { Capacitor } from '@capacitor/core';
	import { AndroidAuth } from '$lib/androidAuth';

	const user = writable<User | null>(null);
	const uploadedImages = writable<string[]>([]);

	onMount(async () => {
		// Initialize Android-specific auth if on native platform
		if (Capacitor.isNativePlatform()) {
			try {
				await AndroidAuth.initialize();
				console.log('AndroidAuth initialized successfully');
			} catch (error) {
				console.error('Failed to initialize AndroidAuth:', error);
			}
		}

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
		signOut(auth).catch(console.error);
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
			<h1 class="{$user ? 'text-lg' : 'text-3xl'} font-bold text-gray-800">FotoTV</h1>
		</div>
	</div>

	<!-- Main content centered -->
	<div class="w-full max-w-md">
		{#if $user}
			<LoggedInView user={$user} uploadedImages={$uploadedImages} />
		{:else}
			<LoggedOutView />
		{/if}
	</div>

	<!-- Debug Info Display -->
	{#if import.meta.env.DEV}
		<div
			class="bg-opacity-75 fixed bottom-4 left-4 z-50 max-w-xs rounded-lg bg-black p-3 text-xs text-white"
		>
			<div class="mb-1 font-bold">Debug Info:</div>
			<div>Platform: {Capacitor.getPlatform()}</div>
			<div>Native: {Capacitor.isNativePlatform() ? 'Yes' : 'No'}</div>
			<div>Auth Status: {$user ? 'Signed In' : 'Signed Out'}</div>
			{#if $user}
				<div class="mt-1">UID: {$user.uid.substring(0, 8)}...</div>
				<div>Provider: {$user.providerData[0]?.providerId || 'unknown'}</div>
			{/if}
		</div>
	{/if}

	<!-- Auth Debug Component -->
	<AuthDebug />

	<!-- Auth Helper for redirects -->
	<AuthHelper />
</div>
