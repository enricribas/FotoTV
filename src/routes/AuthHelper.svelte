<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { auth } from '$lib/firebase';
	import { Capacitor } from '@capacitor/core';
	import { AuthService } from '$lib/auth';

	// States for auth flow
	const isRedirecting = writable(false);
	const message = writable('');
	const redirectTimer = writable(0);
	const maxRedirectTime = 120; // 2 minutes
	const isNative = Capacitor.isNativePlatform();

	let timer: ReturnType<typeof setInterval> | null = null;
	let visibilityHandler: (() => void) | null = null;

	// Handle redirect timeouts
	function startRedirectTimer() {
		isRedirecting.set(true);
		message.set('Waiting for authentication...');
		redirectTimer.set(0);

		// Clear any existing timer
		if (timer) clearInterval(timer);

		// Start a new timer
		timer = setInterval(() => {
			redirectTimer.update((t) => {
				if (t >= maxRedirectTime) {
					message.set('Authentication timed out. Please try again.');
					isRedirecting.set(false);
					clearInterval(timer!);
					return 0;
				}
				return t + 1;
			});
		}, 1000);
	}

	function clearRedirectState() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		isRedirecting.set(false);
		redirectTimer.set(0);
	}

	// Listen for auth state changes
	function setupAuthListeners() {
		// Document visibility change (user comes back from auth provider)
		visibilityHandler = async () => {
			if (document.visibilityState === 'visible' && $isRedirecting) {
				message.set('Returning from authentication provider...');

				// Give a moment for any redirects to complete
				setTimeout(async () => {
					try {
						// Check if we got signed in
						if (auth.currentUser) {
							message.set('Authentication successful!');
							clearRedirectState();
						} else {
							// Try to get redirect result
							const user = await AuthService.handleRedirectResult();
							if (user) {
								message.set('Authentication successful!');
								clearRedirectState();
							}
						}
					} catch (error) {
						console.error('Auth visibility check error:', error);
					}
				}, 1000);
			}
		};

		document.addEventListener('visibilitychange', visibilityHandler);

		// Watch for auth state changes
		return auth.onAuthStateChanged((user) => {
			if (user && $isRedirecting) {
				message.set('Authentication successful!');
				clearRedirectState();
			}
		});
	}

	onMount(() => {
		// Watch for Google Login button clicks
		const authListener = setupAuthListeners();

		// Monitor login attempts
		const originalSignIn = AuthService.signInWithGoogle;
		AuthService.signInWithGoogle = async function(...args) {
			if (isNative) {
				startRedirectTimer();
			}
			return originalSignIn.apply(AuthService, args);
		};

		return () => {
			if (authListener) authListener();
			AuthService.signInWithGoogle = originalSignIn;
		};
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
		if (visibilityHandler) {
			document.removeEventListener('visibilitychange', visibilityHandler);
		}
	});
</script>

{#if $isRedirecting}
	<div
		class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
		style="backdrop-filter: blur(3px);"
	>
		<div class="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
			<div class="flex flex-col items-center">
				<div class="loading loading-spinner loading-lg text-orange-500 mb-4"></div>
				<h3 class="text-lg font-semibold mb-2">{$message}</h3>
				<p class="text-sm text-gray-600 mb-4">
					Please complete authentication in your browser. This window will close automatically.
				</p>
				<div class="w-full bg-gray-200 rounded-full h-2 mb-2">
					<div
						class="bg-orange-500 h-2 rounded-full transition-all duration-300"
						style="width: {($redirectTimer / maxRedirectTime) * 100}%"
					></div>
				</div>
				<p class="text-xs text-gray-500">
					{Math.max(0, maxRedirectTime - $redirectTimer)} seconds remaining
				</p>
				<button
					class="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
					on:click={() => clearRedirectState()}
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}
