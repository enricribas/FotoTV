<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { TVAuthService } from '$lib/tvAuth';
	import type { User } from 'firebase/auth';

	export let onLoginSuccess: (user: User) => void = () => {};

	let authCode = '';
	let authStatus: 'idle' | 'waiting' | 'approved' | 'denied' | 'expired' = 'idle';
	let timeRemaining = '';
	let loading = false;
	let error = '';

	let unsubscribeCode: (() => void) | null = null;
	let unsubscribeStatus: (() => void) | null = null;
	let timeInterval: NodeJS.Timeout | null = null;

	onMount(() => {
		// Subscribe to auth code changes
		unsubscribeCode = TVAuthService.authCode.subscribe((code) => {
			authCode = code || '';
		});

		// Subscribe to auth status changes
		unsubscribeStatus = TVAuthService.authStatus.subscribe((status) => {
			authStatus = status;

			if (status === 'waiting' && authCode) {
				startTimeUpdater();
			} else {
				stopTimeUpdater();
			}
		});

		// Automatically start TV authentication
		startTVAuth();
	});

	onDestroy(() => {
		if (unsubscribeCode) unsubscribeCode();
		if (unsubscribeStatus) unsubscribeStatus();
		stopTimeUpdater();
	});

	function startTimeUpdater() {
		if (timeInterval) clearInterval(timeInterval);

		timeInterval = setInterval(() => {
			if (authCode) {
				// Calculate time remaining from when auth started
				const startTime = Date.now() - 1000; // Approximate start time
				const remaining = Math.max(0, 5 * 60 * 1000 - (Date.now() - startTime));
				const minutes = Math.floor(remaining / 60000);
				const seconds = Math.floor((remaining % 60000) / 1000);
				timeRemaining = `${minutes}:${seconds.toString().padStart(2, '0')}`;
			}
		}, 1000);
	}

	function stopTimeUpdater() {
		if (timeInterval) {
			clearInterval(timeInterval);
			timeInterval = null;
		}
	}

	async function startTVAuth() {
		loading = true;
		error = '';

		try {
			const result = await TVAuthService.requestTVAuth();

			if (result.success && result.user) {
				onLoginSuccess(result.user);
			} else if (result.error) {
				error = result.error;
			}
		} catch {
			error = 'Failed to start TV authentication';
		} finally {
			loading = false;
		}
	}

	function cancelAuth() {
		TVAuthService.cancelTVAuth();
		stopTimeUpdater();
		error = '';
	}

	function getStatusMessage() {
		switch (authStatus) {
			case 'waiting':
				return 'Waiting for approval from your phone...';
			case 'approved':
				return 'Login approved! Welcome to PhotoTV!';
			case 'denied':
				return 'Authentication was denied. Please try again.';
			case 'expired':
				return 'Code expired. Please generate a new code.';
			default:
				return '';
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-8">
	<div
		class="bg-opacity-10 w-full max-w-md rounded-2xl bg-white p-8 text-center text-white shadow-xl backdrop-blur-lg"
	>
		{#if loading && authStatus === 'idle' && !error}
			<!-- Loading state - auto-starting authentication -->
			<div class="space-y-6">
				<div class="bg-opacity-10 rounded-lg bg-white p-4">
					<p class="text-sm text-gray-600">
						To sign in on your TV, you'll need to approve the login from a device where you're
						already signed in.
					</p>
				</div>

				<div class="flex flex-col items-center justify-center space-y-4">
					<span class="loading loading-spinner loading-lg text-white"></span>
					<p class="text-gray-600">Starting TV authentication...</p>
				</div>
			</div>
		{:else if authStatus === 'idle' && error}
			<!-- Error state -->
			<div class="space-y-6">
				<div class="bg-opacity-10 rounded-lg bg-white p-4">
					<p class="text-sm text-gray-600">
						To sign in on your TV, you'll need to approve the login from a device where you're
						already signed in.
					</p>
				</div>

				<div class="alert alert-error">
					<span>❌ {error}</span>
				</div>
				<button class="btn btn-primary btn-lg w-full text-lg" on:click={startTVAuth}>
					Try Again
				</button>
			</div>
		{:else if authStatus === 'waiting' && authCode}
			<!-- Waiting state - show code -->
			<div class="space-y-6">
				<div class="text-center">
					<p class="mb-4 text-gray-600">Enter this code on your signed-in device:</p>

					<!-- Large code display -->
					<div class="mx-auto mb-4 inline-flex space-x-2">
						{#each authCode.split('') as letter, index (index)}
							<div
								class="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-3xl font-bold text-black"
							>
								{letter}
							</div>
						{/each}
					</div>

					<!-- Time remaining -->
					{#if timeRemaining}
						<p class="text-sm text-blue-300">
							Code expires in: <span class="font-mono font-bold">{timeRemaining}</span>
						</p>
					{/if}
				</div>

				<!-- Status message -->
				<div class="bg-opacity-10 rounded-lg bg-white p-4">
					<div class="flex items-center justify-center space-x-2">
						<span class="text-gray-600">Waiting for approval from your phone...</span>
					</div>
				</div>

				<!-- Instructions -->
				<div class="space-y-2 text-left text-sm text-gray-600">
					<ol class="ml-4 list-inside list-decimal space-y-1">
						<li>Open FotoTV on your phone</li>
						<li>Go to "Approve TV Login" section</li>
						<li>Enter the code: <span class="font-mono font-bold text-white">{authCode}</span></li>
						<li>Tap "Approve TV Login" to sign in</li>
					</ol>
				</div>

				<!-- Cancel button -->
				<button class="btn btn-ghost btn-sm w-full" on:click={cancelAuth}> Cancel </button>
			</div>
		{:else}
			<!-- Other states - approved, denied, expired -->
			<div class="space-y-6">
				<div class="text-center">
					<p class="text-lg">{getStatusMessage()}</p>
				</div>

				{#if authStatus === 'denied' || authStatus === 'expired'}
					<button class="btn btn-primary btn-lg w-full" on:click={startTVAuth}> Try Again </button>
				{/if}
			</div>
		{/if}
	</div>
</div>
