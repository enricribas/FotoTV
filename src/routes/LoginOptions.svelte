<script lang="ts">
	import { DirectAuth } from '$lib/directAuth';
	import { writable } from 'svelte/store';
	import { Capacitor } from '@capacitor/core';
	import { onMount } from 'svelte';

	const showAdvanced = writable(false);
	const message = writable('');
	const loading = writable(false);

	const isNative = Capacitor.isNativePlatform();

	// Direct Google sign-in
	async function signInWithGoogle() {
		loading.set(true);
		message.set('');
		try {
			await DirectAuth.signInWithGoogle();
			message.set('Opening Google Sign-In...');
		} catch (error) {
			console.error('Google sign-in error:', error);
			message.set(`Error: ${error.message || 'Unknown error'}`);
		} finally {
			setTimeout(() => loading.set(false), 2000);
		}
	}

	// Anonymous sign-in for testing
	async function signInAnonymously() {
		loading.set(true);
		message.set('');
		try {
			const user = await DirectAuth.signInAnonymously();
			message.set(`Anonymous sign-in successful! (${user.uid.substring(0, 6)}...)`);
		} catch (error) {
			console.error('Anonymous sign-in error:', error);
			message.set(`Error: ${error.message || 'Unknown error'}`);
		} finally {
			loading.set(false);
		}
	}

	function toggleAdvanced() {
		showAdvanced.update(value => !value);
	}

	onMount(() => {
		// Check platform
		console.log(`Platform: ${Capacitor.getPlatform()}, Native: ${isNative}`);
	});
</script>

<div class="w-full">
	<div class="mb-2 rounded-lg bg-gray-50 p-4 shadow-inner">
		<h3 class="mb-3 text-center text-lg font-semibold">Alternative Login Methods</h3>

		<div class="space-y-3">
			<!-- Direct Google Sign-In -->
			<button
				class="btn btn-lg w-full border-0 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
				on:click={signInWithGoogle}
				disabled={$loading}
			>
				{#if $loading}
					<span class="loading loading-spinner loading-sm mr-2"></span>
					Processing...
				{:else}
					<svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
						><g
							><path
								fill="#4285F4"
								d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C36.45 2.7 30.68 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.2C12.13 13.99 17.56 9.5 24 9.5z"
							/><path
								fill="#34A853"
								d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"
							/><path
								fill="#FBBC05"
								d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.7 15.32 0 19.56 0 24c0 4.44.7 8.68 2.69 12.24l7.98-6.2z"
							/><path
								fill="#EA4335"
								d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.19-5.6c-2.01 1.35-4.59 2.15-8.7 2.15-6.44 0-11.87-4.49-13.33-10.55l-7.98 6.2C6.73 42.18 14.82 48 24 48z"
							/><path fill="none" d="M0 0h48v48H0z" /></g
						></svg
					>
					Direct Google Login
				{/if}
			</button>

			<!-- Anonymous Sign-In (for testing) -->
			<button
				class="btn w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
				on:click={signInAnonymously}
				disabled={$loading}
			>
				<svg
					class="mr-2 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
					<circle cx="12" cy="7" r="4" />
				</svg>
				Anonymous Login
			</button>

			{#if $message}
				<div
					class="mt-3 text-center text-sm {$message.includes('Error')
						? 'text-red-600'
						: 'text-green-600'}"
				>
					{$message}
				</div>
			{/if}
		</div>

		<!-- Advanced options toggle -->
		<div class="mt-4 text-center">
			<button
				class="text-xs text-gray-500 underline"
				on:click={toggleAdvanced}
				aria-expanded={$showAdvanced}
			>
				{$showAdvanced ? 'Hide advanced options' : 'Show advanced options'}
			</button>
		</div>

		<!-- Advanced options -->
		{#if $showAdvanced}
			<div class="mt-3 rounded border border-gray-200 bg-white p-3 text-xs text-gray-700">
				<div class="mb-2 font-semibold">Debug Information:</div>
				<div><strong>Platform:</strong> {Capacitor.getPlatform()}</div>
				<div><strong>Native:</strong> {isNative ? 'Yes' : 'No'}</div>
				<div><strong>Auth Method:</strong> DirectAuth (Custom OAuth Flow)</div>
				<div class="mt-2 text-[10px] text-gray-500">
					This implementation bypasses Firebase's redirect flow and handles OAuth tokens directly.
				</div>
			</div>
		{/if}
	</div>
</div>
