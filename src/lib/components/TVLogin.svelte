<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { TVAuthService } from '$lib/tvAuth';
	import type { User } from 'firebase/auth';

	import TVLoadingState from './tv-states/TVLoadingState.svelte';
	import TVErrorState from './tv-states/TVErrorState.svelte';
	import TVCodeState from './tv-states/TVCodeState.svelte';
	import TVFinalState from './tv-states/TVFinalState.svelte';

	export let onLoginSuccess: (user: User) => void = () => {};
	export let onBackToLogin: (() => void) | undefined = undefined;
	export let isEchoShowDevice: boolean = false;

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

	function handleBackToLogin() {
		// Cancel any ongoing auth first
		cancelAuth();
		// Call the callback which will handle disabling TV mode
		if (onBackToLogin) {
			onBackToLogin();
		}
	}
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center p-8"
	style={isEchoShowDevice
		? 'touch-action: manipulation; -webkit-touch-callout: none; -webkit-user-select: none;'
		: ''}
>
	<div
		class="bg-opacity-10 w-full max-w-md rounded-2xl bg-white p-8 text-center text-white shadow-xl backdrop-blur-lg"
		class:max-w-lg={isEchoShowDevice}
	>
		{#if loading && authStatus === 'idle' && !error}
			<TVLoadingState onBackToLogin={handleBackToLogin} />
		{:else if authStatus === 'idle' && error}
			<TVErrorState {error} onTryAgain={startTVAuth} onBackToLogin={handleBackToLogin} />
		{:else if authStatus === 'waiting' && authCode}
			<TVCodeState
				{authCode}
				{timeRemaining}
				onCancel={cancelAuth}
				onBackToLogin={handleBackToLogin}
			/>
		{:else}
			<TVFinalState {authStatus} onTryAgain={startTVAuth} onBackToLogin={handleBackToLogin} />
		{/if}
	</div>
</div>
