<script lang="ts">
	import { AndroidAuth } from '$lib/androidAuth';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';

	const loading = writable(false);
	const message = writable('');
	const debugInfo = writable('');
	const showDebug = writable(false);

	async function signInWithGoogle() {
		if ($loading) return;

		loading.set(true);
		message.set('');
		debugInfo.set('Starting Google Sign-In for Android...');

		try {
			console.log('🤖 Android Google Sign-In initiated');

			const user = await AndroidAuth.signInWithGoogle();

			if (user) {
				message.set('✅ Successfully signed in!');
				debugInfo.set(`Signed in as: ${user.email || user.uid}`);
			} else {
				message.set('Sign-in was cancelled');
				debugInfo.set('User cancelled the sign-in process');
			}

		} catch (error: any) {
			console.error('Android Google Sign-In error:', error);

			// Provide helpful error messages
			let userMessage = 'Sign-in failed';
			let debugMessage = error.message;

			if (error.message?.includes('configuration error')) {
				userMessage = 'App configuration error';
				debugMessage = 'Check Google Play certificates in Firebase Console';
			} else if (error.message?.includes('NETWORK_ERROR')) {
				userMessage = 'Network error - check internet connection';
			} else if (error.message?.includes('DEVELOPER_ERROR')) {
				userMessage = 'Authentication setup error';
				debugMessage = 'Google Play signing certificates missing from Firebase';
			}

			message.set(userMessage);
			debugInfo.set(`❌ ${debugMessage}`);

		} finally {
			loading.set(false);
		}
	}

	async function testConfiguration() {
		debugInfo.set('Testing Android authentication configuration...');

		try {
			const result = await AndroidAuth.testConfiguration();

			if (result.success) {
				debugInfo.set('✅ Configuration test passed');
			} else {
				debugInfo.set(`❌ Configuration issues: ${result.recommendations.join(', ')}`);
			}

			console.log('Android auth test result:', result);

		} catch (error) {
			debugInfo.set(`❌ Test failed: ${error.message}`);
		}
	}

	function getDebugInfo() {
		const info = AndroidAuth.getDebugInfo();
		debugInfo.set(`Platform: ${info.platform.capacitor}, Plugin: ${info.authentication.pluginAvailable ? 'Available' : 'Missing'}, User: ${info.authentication.currentUser ? 'Signed In' : 'Not signed in'}`);
		console.log('Android auth debug info:', info);
	}

	function toggleDebug() {
		showDebug.set(!$showDebug);
		if ($showDebug) {
			getDebugInfo();
		}
	}

	onMount(async () => {
		// Show basic info on load
		if (import.meta.env.DEV) {
			getDebugInfo();
		}
	});
</script>

<svelte:head>
	<title>PhotoTV - Android Login</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 p-4">

	<!-- App Header -->
	<div class="mb-8 text-center">
		<div class="flex items-center justify-center space-x-3">
			<img src="/FotoTV-logo2.png" alt="FotoTV Logo" class="h-12 w-auto" />
			<h1 class="text-3xl font-bold text-gray-800">FotoTV</h1>
		</div>
		<p class="mt-2 text-gray-600">Android Mobile App</p>
	</div>

	<!-- Main Login Card -->
	<div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">

		<!-- Google Sign-In Button -->
		<button
			class="btn w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 text-lg py-4"
			on:click={signInWithGoogle}
			disabled={$loading}
		>
			{#if $loading}
				<span class="loading loading-spinner loading-sm mr-2"></span>
				Signing in...
			{:else}
				<svg class="mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
					<g>
						<path
							fill="#4285F4"
							d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C36.45 2.7 30.68 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.2C12.13 13.99 17.56 9.5 24 9.5z"
						/>
						<path
							fill="#34A853"
							d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"
						/>
						<path
							fill="#FBBC05"
							d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.7 15.32 0 19.56 0 24c0 4.44.7 8.68 2.69 12.24l7.98-6.2z"
						/>
						<path
							fill="#EA4335"
							d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.19-5.6c-2.01 1.35-4.59 2.15-8.7 2.15-6.44 0-11.87-4.49-13.33-10.55l-7.98 6.2C6.73 42.18 14.82 48 24 48z"
						/>
						<path fill="none" d="M0 0h48v48H0z" />
					</g>
				</svg>
				Sign in with Google
			{/if}
		</button>

		<div class="mt-2 text-center text-xs text-gray-500">
			Native Android Authentication
		</div>

		<!-- Status Messages -->
		{#if $message}
			<div class="mt-4 rounded-lg p-3 text-center text-sm font-medium {$message.includes('Successfully') || $message.includes('✅') ? 'bg-green-100 text-green-700' : $message.includes('cancelled') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}">
				{$message}
			</div>
		{/if}

		<!-- Platform Info -->
		<div class="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
			<div class="grid grid-cols-2 gap-2">
				<div><strong>Platform:</strong></div>
				<div>{Capacitor.getPlatform()}</div>
				<div><strong>Native:</strong></div>
				<div>{Capacitor.isNativePlatform() ? 'Yes' : 'No'}</div>
				<div><strong>Package:</strong></div>
				<div>com.phototv.app</div>
			</div>
		</div>

		<!-- Debug Toggle (Development Only) -->
		{#if import.meta.env.DEV}
			<button
				class="mt-4 w-full rounded border border-gray-300 bg-gray-50 p-2 text-xs text-gray-600 hover:bg-gray-100"
				on:click={toggleDebug}
			>
				{$showDebug ? 'Hide' : 'Show'} Debug Info
			</button>
		{/if}
	</div>

	<!-- Debug Section (Development Only) -->
	{#if import.meta.env.DEV && $showDebug}
		<div class="mt-6 w-full max-w-lg rounded-lg bg-gray-800 p-4 text-white">
			<h3 class="mb-3 text-lg font-semibold">Android Auth Debug</h3>

			<!-- Debug Controls -->
			<div class="space-y-2">
				<button
					class="w-full rounded bg-blue-600 p-2 text-sm text-white hover:bg-blue-700"
					on:click={testConfiguration}
				>
					Test Configuration
				</button>

				<button
					class="w-full rounded bg-green-600 p-2 text-sm text-white hover:bg-green-700"
					on:click={getDebugInfo}
				>
					Get Debug Info
				</button>
			</div>

			<!-- Debug Output -->
			{#if $debugInfo}
				<div class="mt-4 rounded bg-gray-700 p-3">
					<div class="text-xs font-semibold text-gray-300">Debug Output:</div>
					<div class="mt-2 font-mono text-xs text-green-400 break-words">
						{$debugInfo}
					</div>
				</div>
			{/if}

			<!-- Instructions -->
			<div class="mt-4 rounded bg-gray-700 p-3 text-xs text-gray-300">
				<div class="font-semibold text-white">🔧 Production Troubleshooting:</div>
				<div class="mt-2 space-y-1">
					<div>1. Ensure Google Play certificates are in Firebase Console</div>
					<div>2. Check google-services.json is in android/app/</div>
					<div>3. Verify package name: com.phototv.app</div>
					<div>4. Test with production APK from Google Play</div>
				</div>
			</div>

			<!-- Quick Actions -->
			<div class="mt-4 text-center">
				<button
					class="text-xs text-red-400 underline hover:text-red-300"
					on:click={() => console.log('AndroidAuth Debug:', AndroidAuth.getDebugInfo())}
				>
					Log Full Debug Info to Console
				</button>
			</div>
		</div>
	{/if}

	<!-- Production Instructions -->
	{#if !import.meta.env.DEV}
		<div class="mt-6 w-full max-w-sm rounded-lg bg-blue-50 p-4 text-center">
			<div class="text-sm text-blue-800">
				<div class="font-semibold">Having trouble signing in?</div>
				<div class="mt-2 text-xs">
					This app requires Google Play Store certificates to be configured in Firebase Console.
					Contact support if authentication continues to fail.
				</div>
			</div>
		</div>
	{/if}
</div>
