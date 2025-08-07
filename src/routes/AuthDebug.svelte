<script lang="ts">
	import { authDebugLog, getPlatformInfo } from '$lib/authDebug';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { auth, googleProvider } from '$lib/firebase';
	import { AuthService } from '$lib/auth';
	import { Capacitor } from '@capacitor/core';

	const showDebug = writable(false);
	const platformInfo = writable({});
	const testEmail = writable('');
	const testResult = writable('');

	function toggleDebug() {
		showDebug.update((val) => !val);
	}

	function clearLogs() {
		authDebugLog.set([]);
	}

	function refreshInfo() {
		platformInfo.set(getPlatformInfo());
	}

	async function testGoogleSignIn() {
		testResult.set('Testing Google Sign-In...');
		try {
			await AuthService.signInWithGoogle();
			testResult.set('Google Sign-In initiated successfully');
		} catch (error) {
			testResult.set(`Error: ${error.message || 'Unknown error'}`);
			console.error('Google Sign-In Test Error:', error);
		}
	}

	async function testMagicLink() {
		if (!$testEmail) {
			testResult.set('Please enter an email address');
			return;
		}

		testResult.set(`Sending magic link to ${$testEmail}...`);
		try {
			await AuthService.sendMagicLink($testEmail);
			testResult.set(`Magic link sent to ${$testEmail}`);
		} catch (error) {
			testResult.set(`Error: ${error.message || 'Unknown error'}`);
			console.error('Magic Link Test Error:', error);
		}
	}

	async function signOut() {
		testResult.set('Signing out...');
		try {
			await auth.signOut();
			testResult.set('Signed out successfully');
		} catch (error) {
			testResult.set(`Error: ${error.message || 'Unknown error'}`);
		}
	}

	onMount(() => {
		refreshInfo();
	});
</script>

<div class="fixed bottom-4 right-4 z-50">
	<button
		class="rounded-full bg-gray-800 p-3 text-white shadow-lg hover:bg-gray-700"
		on:click={toggleDebug}
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
			/>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
		</svg>
	</button>

	{#if $showDebug}
		<div
			class="mt-4 h-[80vh] w-[90vw] max-w-lg overflow-auto rounded-lg bg-gray-800 p-4 text-white shadow-xl"
		>
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-bold">Auth Debug</h2>
				<button
					class="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700"
					on:click={() => showDebug.set(false)}
				>
					Close
				</button>
			</div>

			<div class="mt-4">
				<div class="flex justify-between">
					<h3 class="text-lg font-semibold">Platform Info</h3>
					<button
						class="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
						on:click={refreshInfo}
					>
						Refresh
					</button>
				</div>
				<div class="mt-2 rounded bg-gray-700 p-2 text-xs">
					<pre>{JSON.stringify($platformInfo, null, 2)}</pre>
				</div>
			</div>

			<div class="mt-4">
				<h3 class="text-lg font-semibold">Test Auth</h3>
				<div class="mt-2 flex flex-col space-y-2">
					<button
						class="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
						on:click={testGoogleSignIn}
					>
						Test Google Sign-In
					</button>

					<div class="flex space-x-2">
						<input
							type="email"
							placeholder="test@example.com"
							bind:value={$testEmail}
							class="flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white"
						/>
						<button
							class="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
							on:click={testMagicLink}
						>
							Test Magic Link
						</button>
					</div>

					<button
						class="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
						on:click={signOut}
					>
						Sign Out
					</button>

					{#if $testResult}
						<div class="mt-2 rounded bg-gray-700 p-2 text-xs">
							{$testResult}
						</div>
					{/if}
				</div>
			</div>

			<div class="mt-4">
				<div class="flex justify-between">
					<h3 class="text-lg font-semibold">Debug Logs</h3>
					<button
						class="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
						on:click={clearLogs}
					>
						Clear
					</button>
				</div>
				<div class="mt-2 h-[30vh] overflow-auto rounded bg-gray-700 p-2 text-xs">
					{#each $authDebugLog as log}
						<div class="py-1">{log}</div>
					{/each}
				</div>
			</div>

			<div class="mt-4 text-xs text-gray-400">
				<p>Debug Version: 1.0.0</p>
				<p>Platform: {Capacitor.getPlatform()}</p>
				<p>Is Native: {Capacitor.isNativePlatform() ? 'Yes' : 'No'}</p>
			</div>
		</div>
	{/if}
</div>
