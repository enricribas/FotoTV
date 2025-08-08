<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AuthService } from '$lib/auth';
	import { Capacitor } from '@capacitor/core';
	import { Browser } from '@capacitor/browser';

	let loading = true;
	let message = 'Processing authentication...';

	onMount(async () => {
		try {
			const url = window.location.href;
			console.log('Auth callback URL:', url);

			// Check if this is a magic link
			if (AuthService.isEmailLink(url)) {
				console.log('Processing magic link');
				message = 'Completing sign-in from email link...';

				const user = await AuthService.completeMagicLinkSignIn(url);

				if (user) {
					message = 'Email sign-in successful! Redirecting...';
					console.log('Magic link sign-in successful:', user.uid);

					// Close browser if on mobile
					if (Capacitor.isNativePlatform()) {
						try {
							await Browser.close();
						} catch (e) {
							console.warn('Could not close browser:', e);
						}
					}

					setTimeout(() => {
						goto('/', { replaceState: true });
					}, 1000);
				} else {
					message = 'Email sign-in failed. Please try again.';
					setTimeout(() => {
						goto('/', { replaceState: true });
					}, 3000);
				}
			} else {
				// For other auth flows, check if user is already signed in
				// The Capacitor Firebase plugin should have handled the authentication
				const user = await AuthService.getCurrentUserAsync();

				if (user) {
					message = 'Authentication successful! Redirecting...';
					console.log('User is authenticated:', user.uid);

					// Close browser if on mobile
					if (Capacitor.isNativePlatform()) {
						try {
							await Browser.close();
						} catch (e) {
							console.warn('Could not close browser:', e);
						}
					}

					setTimeout(() => {
						goto('/', { replaceState: true });
					}, 1000);
				} else {
					message = 'No authentication found. Redirecting to home...';
					console.log('No authenticated user found');

					setTimeout(() => {
						goto('/', { replaceState: true });
					}, 2000);
				}
			}
		} catch (error) {
			console.error('Auth callback error:', error);
			message = 'Authentication failed. Please try again.';

			setTimeout(() => {
				goto('/', { replaceState: true });
			}, 3000);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Authentication - PhotoTV</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="text-center">
		<div class="mb-4">
			{#if loading}
				<div class="loading loading-spinner loading-lg text-blue-500"></div>
			{:else}
				<div class="mb-2 text-4xl">
					{#if message.includes('successful')}
						✅
					{:else if message.includes('failed') || message.includes('error')}
						❌
					{:else}
						ℹ️
					{/if}
				</div>
			{/if}
		</div>

		<h1 class="mb-2 text-xl font-semibold text-gray-900">
			{message}
		</h1>

		<p class="text-sm text-gray-600">
			{#if loading}
				Please wait while we process your authentication...
			{:else}
				You will be redirected automatically...
			{/if}
		</p>
	</div>
</div>
