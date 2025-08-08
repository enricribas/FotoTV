<script lang="ts">
	import { AuthService } from '$lib/auth';
	import { AuthTest } from '$lib/authTest';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';

	const showEmailForm = writable(false);
	const email = writable('');
	const sending = writable(false);
	const message = writable('');
	const loginInProgress = writable(false);
	const debugInfo = writable('');
	const showDebug = writable(false);
	const isNative = Capacitor.isNativePlatform();

	async function signInWithGoogle() {
		if ($loginInProgress) return;

		loginInProgress.set(true);
		message.set('');
		debugInfo.set('Starting Google sign-in...');

		try {
			console.log('=== GOOGLE SIGN-IN START ===');

			if (isNative) {
				// Use the test method for better debugging
				const result = await AuthTest.testGoogleSignIn();

				if (result.success) {
					message.set('Google Sign-In successful!');
					debugInfo.set(
						`✅ Success via ${result.method}: ${result.user?.email || result.user?.uid}`
					);

					// Give Firebase Auth time to sync
					setTimeout(() => {
						if (AuthService.getCurrentUser()) {
							debugInfo.set(`✅ Firebase Auth synced: ${AuthService.getCurrentUser()?.uid}`);
						}
					}, 2000);
				} else {
					message.set(`Sign-in failed: ${result.error}`);
					debugInfo.set(`❌ Failed (${result.method}): ${result.error}`);

					if (result.nativeError && result.webFallbackError) {
						debugInfo.set(`❌ Native: ${result.nativeError} | Web: ${result.webFallbackError}`);
					}
				}
			} else {
				// For web, use the standard AuthService
				const user = await AuthService.signInWithGoogle();
				if (user) {
					message.set('Google Sign-In successful!');
					debugInfo.set(`✅ Web success: ${user.email || user.uid}`);
				} else {
					message.set('Sign-in was cancelled');
					debugInfo.set('❌ Web sign-in cancelled by user');
				}
			}
		} catch (error: any) {
			console.error('Google login error:', error);
			message.set(`Sign-in failed: ${error.message || 'Unknown error'}`);
			debugInfo.set(`❌ Exception: ${error.message} | Code: ${error.code || 'unknown'}`);
		} finally {
			setTimeout(() => {
				loginInProgress.set(false);
			}, 2000);
		}
	}

	async function sendMagicLink() {
		if (!$email) {
			message.set('Please enter your email address');
			return;
		}

		sending.set(true);
		message.set('');
		debugInfo.set(`Sending magic link to ${$email}...`);

		try {
			await AuthService.sendMagicLink($email);
			message.set('Check your email for the magic link!');
			debugInfo.set(`✅ Magic link sent to ${$email}`);
			email.set('');
		} catch (error: any) {
			console.error('Error sending magic link:', error);
			message.set('Error sending magic link. Please try again.');
			debugInfo.set(`❌ Magic link failed: ${error.message}`);
		} finally {
			sending.set(false);
		}
	}

	function toggleEmailForm() {
		showEmailForm.set(!$showEmailForm);
		message.set('');
		email.set('');
		debugInfo.set('');
	}

	async function testPluginAvailability() {
		debugInfo.set('Testing plugin...');
		const result = await AuthTest.testPluginAvailability();
		debugInfo.set(
			`Plugin test: ${result.available ? '✅ Available' : '❌ Not available'} | ${result.error || 'OK'}`
		);
	}

	async function runFullTest() {
		debugInfo.set('Running full configuration test...');
		const result = await AuthTest.testConfiguration();
		debugInfo.set(
			`Config test: ${result.success ? '✅' : '❌'} ${result.summary} | Check console for details`
		);
		console.log('Full test results:', result);
	}

	function showDebugInfo() {
		const info = AuthService.getDebugInfo();
		debugInfo.set(
			`Debug: Platform=${info.platform.native ? 'Native' : 'Web'}, Plugin=${info.plugin.available ? 'Yes' : 'No'}, Firebase=${info.firebase.hasCurrentUser ? 'Signed In' : 'Not signed in'}, Storage=${info.storage.storageMethod}`
		);
		console.log('Full debug info:', info);
	}

	function toggleDebug() {
		showDebug.set(!$showDebug);
		if ($showDebug) {
			showDebugInfo();
		}
	}

	onMount(async () => {
		// Initialize and show basic debug info
		showDebugInfo();
	});
</script>

<div class="space-y-4">
	<!-- Google Sign In Button -->
	<div class="space-y-1">
		<button
			class="btn w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
			on:click={signInWithGoogle}
			disabled={$loginInProgress}
		>
			{#if $loginInProgress}
				<span class="loading loading-spinner loading-sm mr-2"></span>
				Signing in...
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
				Sign in with Google
			{/if}
		</button>
		<div class="text-center text-xs text-gray-500">
			{isNative ? 'uses native authentication' : 'uses web popup'}
		</div>
	</div>

	<!-- Divider -->
	<div class="flex items-center">
		<div class="flex-1 border-t border-gray-300"></div>
		<span class="px-3 text-sm text-gray-500">or</span>
		<div class="flex-1 border-t border-gray-300"></div>
	</div>

	<!-- Email Magic Link Button/Form -->
	{#if $showEmailForm}
		<div class="space-y-3">
			<input
				type="email"
				placeholder="Enter your email"
				bind:value={$email}
				class="input input-bordered w-full"
				disabled={$sending}
			/>
			<button
				class="btn w-full border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
				on:click={sendMagicLink}
				disabled={$sending}
			>
				{#if $sending}
					<span class="loading loading-spinner loading-sm"></span>
					Sending...
				{:else}
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					Send Magic Link
				{/if}
			</button>
			<button class="btn btn-ghost w-full text-gray-600" on:click={toggleEmailForm}>
				Cancel
			</button>
		</div>
	{:else}
		<div class="space-y-1">
			<button
				class="btn w-full border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
				on:click={toggleEmailForm}
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
				Email Magic Link
			</button>
			<div class="text-center text-xs text-gray-500">no storage dependencies</div>
		</div>
	{/if}

	<!-- Message Display -->
	{#if $message}
		<div
			class="text-center text-sm {$message.includes('failed') || $message.includes('Error')
				? 'text-red-600'
				: 'text-green-600'}"
		>
			{$message}
		</div>
	{/if}

	<!-- Debug Toggle Button -->
	{#if import.meta.env.DEV}
		<button
			class="w-full rounded border border-gray-300 bg-gray-50 p-2 text-xs text-gray-600"
			on:click={toggleDebug}
		>
			{$showDebug ? 'Hide' : 'Show'} Debug Info
		</button>
	{/if}

	<!-- Debug Section -->
	{#if import.meta.env.DEV && $showDebug}
		<div class="rounded-lg border border-gray-300 bg-gray-50 p-3 text-xs text-gray-600">
			<div class="mb-2 font-semibold">Platform Information:</div>
			<div><strong>Platform:</strong> {Capacitor.getPlatform()}</div>
			<div><strong>Native:</strong> {isNative ? 'Yes' : 'No'}</div>
			<div><strong>WebView:</strong> {isNative ? 'Capacitor WebView' : 'Browser'}</div>
			<div>
				<strong>Storage:</strong>
				{isNative ? 'In-Memory (no localStorage)' : 'localStorage'}
			</div>

			<!-- Debug controls -->
			<div class="mt-3 space-y-2">
				<button
					class="w-full rounded border border-blue-300 bg-blue-50 p-2 text-xs text-blue-700"
					on:click={testPluginAvailability}
				>
					Test Plugin Availability
				</button>
				<button
					class="w-full rounded border border-green-300 bg-green-50 p-2 text-xs text-green-700"
					on:click={runFullTest}
				>
					Run Full Configuration Test
				</button>
				<button
					class="w-full rounded border border-purple-300 bg-purple-50 p-2 text-xs text-purple-700"
					on:click={showDebugInfo}
				>
					Refresh Debug Info
				</button>
			</div>

			<!-- Debug info display -->
			{#if $debugInfo}
				<div class="mt-3 rounded bg-white p-2 text-xs">
					<div class="font-semibold">Debug Output:</div>
					<div class="mt-1 font-mono break-words">{$debugInfo}</div>
				</div>
			{/if}

			<div class="mt-3 text-[10px] text-gray-500">
				<strong>Key Fix:</strong> Removed localStorage dependency for native apps. Authentication now
				uses in-memory storage and proper Capacitor plugin integration.
			</div>
		</div>
	{/if}
</div>
