<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { TVAuthService } from '$lib/tvAuth';
	import type { TVAuthRequest } from '$lib/tvAuth';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { isAndroidTV, isTVModeEnabled } from '$lib/advancedDeviceDetection';
	import type { User } from 'firebase/auth';

	let pendingRequests: TVAuthRequest[] = [];
	let showNotification = false;
	let currentRequest: TVAuthRequest | null = null;
	let message = '';
	let messageType: 'success' | 'error' | 'info' = 'info';
	let isLoggedIn = false;
	let isTVDevice = false;

	let unsubscribePending: (() => void) | null = null;
	let unsubscribeAuth: (() => void) | null = null;
	let pollInterval: NodeJS.Timeout | null = null;
	let messageTimeout: NodeJS.Timeout | null = null;

	onMount(async () => {
		// Check if this is a TV device
		try {
			isTVDevice = (await isAndroidTV()) || isTVModeEnabled();
		} catch (error) {
			console.warn('Failed to detect TV device:', error);
		}

		// Subscribe to auth state changes
		unsubscribeAuth = onAuthStateChanged(auth, (user: User | null) => {
			isLoggedIn = !!user;
		});

		// Subscribe to pending requests
		unsubscribePending = TVAuthService.pendingRequests.subscribe((requests) => {
			pendingRequests = requests;

			// Only show notification if:
			// 1. User is logged in
			// 2. Not on a TV device
			// 3. There are pending requests
			const shouldShow = isLoggedIn && !isTVDevice && requests.length > 0;

			if (shouldShow && !showNotification) {
				currentRequest = requests[0]; // Show the first request
				showNotification = true;
			} else if (requests.length === 0) {
				showNotification = false;
				currentRequest = null;
			}
		});

		// Load initial requests
		TVAuthService.getPendingRequests();

		// Poll for new requests every 2 seconds
		pollInterval = setInterval(() => {
			TVAuthService.getPendingRequests();
		}, 2000);
	});

	onDestroy(() => {
		if (unsubscribePending) unsubscribePending();
		if (unsubscribeAuth) unsubscribeAuth();
		if (pollInterval) clearInterval(pollInterval);
		if (messageTimeout) clearTimeout(messageTimeout);
	});

	function approveRequest() {
		if (!currentRequest) return;

		const success = TVAuthService.approveRequest(currentRequest.code);
		if (success) {
			showMessage('TV login approved successfully!', 'success');
			// Remove from local list and close notification
			pendingRequests = pendingRequests.filter((r) => r.code !== currentRequest!.code);
			setTimeout(() => {
				closeNotification();
			}, 2000);
		} else {
			showMessage('Failed to approve - code may have expired', 'error');
		}
	}

	function denyRequest() {
		if (!currentRequest) return;

		const success = TVAuthService.denyRequest(currentRequest.code);
		if (success) {
			showMessage('TV login denied', 'info');
			// Remove from local list and close notification
			pendingRequests = pendingRequests.filter((r) => r.code !== currentRequest!.code);
			setTimeout(() => {
				closeNotification();
			}, 1500);
		} else {
			showMessage('Failed to deny - code may have expired', 'error');
		}
	}

	function closeNotification() {
		showNotification = false;
		currentRequest = null;
		message = '';
	}

	function nextRequest() {
		if (pendingRequests.length > 1) {
			const currentIndex = pendingRequests.findIndex((r) => r.code === currentRequest?.code);
			const nextIndex = (currentIndex + 1) % pendingRequests.length;
			currentRequest = pendingRequests[nextIndex];
		}
	}

	function prevRequest() {
		if (pendingRequests.length > 1) {
			const currentIndex = pendingRequests.findIndex((r) => r.code === currentRequest?.code);
			const prevIndex = currentIndex === 0 ? pendingRequests.length - 1 : currentIndex - 1;
			currentRequest = pendingRequests[prevIndex];
		}
	}

	function showMessage(text: string, type: 'success' | 'error' | 'info') {
		message = text;
		messageType = type;

		if (messageTimeout) clearTimeout(messageTimeout);
		messageTimeout = setTimeout(() => {
			message = '';
		}, 4000);
	}

	function formatTimeAgo(timestamp: number): string {
		const now = Date.now();
		const diff = now - timestamp;
		const minutes = Math.floor(diff / 60000);
		const seconds = Math.floor((diff % 60000) / 1000);

		if (minutes > 0) {
			return `${minutes}m ${seconds}s ago`;
		}
		return `${seconds}s ago`;
	}

	function getTimeRemaining(timestamp: number): string {
		return TVAuthService.getTimeRemaining(timestamp);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!showNotification) return;

		switch (event.key) {
			case 'Escape':
				closeNotification();
				break;
			case 'Enter':
				approveRequest();
				break;
			case 'ArrowLeft':
				prevRequest();
				break;
			case 'ArrowRight':
				nextRequest();
				break;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if showNotification && currentRequest && isLoggedIn && !isTVDevice}
	<!-- Full-screen overlay -->
	<div
		class="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 backdrop-blur-sm"
	>
		<div class="animate-pulse-once w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
			<!-- Header -->
			<div class="mb-6 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100"
				>
					<span class="animate-bounce text-3xl">📺</span>
				</div>
				<h2 class="text-2xl font-bold text-gray-800">TV Login Request</h2>
				<p class="mt-1 text-sm text-gray-600">A TV wants to sign in with your account</p>
			</div>

			<!-- Message -->
			{#if message}
				<div
					class="alert mb-4"
					class:alert-success={messageType === 'success'}
					class:alert-error={messageType === 'error'}
					class:alert-info={messageType === 'info'}
				>
					<span class="text-sm">{message}</span>
				</div>
			{/if}

			<!-- Device Info -->
			<div class="mb-6 rounded-lg bg-gray-50 p-4">
				<div class="mb-3 flex items-center justify-between">
					<div>
						<h3 class="text-lg font-semibold text-gray-800">
							{TVAuthService.getDeviceDisplayName(currentRequest.userAgent)}
						</h3>
						<p class="text-sm text-gray-500">
							Requested {formatTimeAgo(currentRequest.timestamp)}
						</p>
					</div>
					<div class="text-right">
						<div class="text-xs text-gray-500">Expires in</div>
						<div class="font-mono text-sm font-bold text-red-600">
							{getTimeRemaining(currentRequest.timestamp)}
						</div>
					</div>
				</div>

				<!-- Large Code Display -->
				<div class="text-center">
					<p class="mb-3 text-sm text-gray-600">Authentication Code:</p>
					<div class="mb-4 flex justify-center space-x-2">
						{#each currentRequest.code.split('') as letter}
							<div
								class="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold text-white shadow-lg"
							>
								{letter}
							</div>
						{/each}
					</div>
					<p class="text-xs text-gray-500">Make sure this code matches what's shown on your TV</p>
				</div>
			</div>

			<!-- Multiple requests indicator -->
			{#if pendingRequests.length > 1}
				<div class="mb-4 flex items-center justify-center space-x-2">
					<button
						class="btn btn-ghost btn-xs"
						on:click={prevRequest}
						disabled={pendingRequests.length <= 1}
					>
						←
					</button>
					<span class="text-xs text-gray-500">
						{pendingRequests.findIndex((r) => r.code === currentRequest?.code) + 1} of {pendingRequests.length}
					</span>
					<button
						class="btn btn-ghost btn-xs"
						on:click={nextRequest}
						disabled={pendingRequests.length <= 1}
					>
						→
					</button>
				</div>
			{/if}

			<!-- Action Buttons -->
			<div class="space-y-3">
				<button
					class="btn btn-lg w-full border-blue-500 bg-blue-500 text-lg text-white hover:bg-blue-600"
					on:click={approveRequest}
				>
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					Approve TV Login
				</button>

				<div class="flex space-x-3">
					<button class="btn btn-error btn-md flex-1" on:click={denyRequest}>
						<span class="mr-1">✗</span>
						Deny
					</button>
					<button class="btn btn-ghost btn-md flex-1" on:click={closeNotification}> Later </button>
				</div>
			</div>

			<!-- Help Text -->
			<div class="mt-6 rounded-lg bg-blue-50 p-3">
				<h4 class="mb-1 text-sm font-semibold text-blue-800">⚠️ Security Check</h4>
				<p class="text-xs text-blue-700">
					Only approve if you're trying to sign in on a TV and the code matches exactly.
				</p>
			</div>

			<!-- Keyboard shortcuts -->
			<div class="mt-4 text-center">
				<p class="text-xs text-gray-400">
					Press <kbd class="kbd kbd-xs">Enter</kbd> to approve, <kbd class="kbd kbd-xs">Esc</kbd> to
					close
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes pulse-once {
		0% {
			transform: scale(0.95);
			opacity: 0;
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.animate-pulse-once {
		animation: pulse-once 0.5s ease-out;
	}
</style>
