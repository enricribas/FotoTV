<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { TVAuthService } from '$lib/tvAuth';
	import type { TVAuthRequest } from '$lib/tvAuth';

	let pendingRequests: TVAuthRequest[] = [];
	let inputCode = '';
	let showManualInput = false;
	let message = '';
	let messageType: 'success' | 'error' | 'info' = 'info';

	let unsubscribePending: (() => void) | null = null;
	let pollInterval: NodeJS.Timeout | null = null;

	onMount(() => {
		// Subscribe to pending requests
		unsubscribePending = TVAuthService.pendingRequests.subscribe((requests) => {
			pendingRequests = requests;
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
		if (pollInterval) clearInterval(pollInterval);
	});

	function approveRequest(request: TVAuthRequest) {
		const success = TVAuthService.approveRequest(request.code);
		if (success) {
			showMessage('TV login approved successfully!', 'success');
			// Remove from local list
			pendingRequests = pendingRequests.filter((r) => r.code !== request.code);
		} else {
			showMessage('Failed to approve login - code may have expired', 'error');
		}
	}

	function denyRequest(request: TVAuthRequest) {
		const success = TVAuthService.denyRequest(request.code);
		if (success) {
			showMessage('TV login denied', 'info');
			// Remove from local list
			pendingRequests = pendingRequests.filter((r) => r.code !== request.code);
		} else {
			showMessage('Failed to deny login - code may have expired', 'error');
		}
	}

	function approveByCode() {
		const code = inputCode.trim().toUpperCase();
		if (code.length !== 4) {
			showMessage('Please enter a 4-letter code', 'error');
			return;
		}

		const success = TVAuthService.approveRequest(code);
		if (success) {
			showMessage(`TV login approved for code ${code}!`, 'success');
			inputCode = '';
			showManualInput = false;
		} else {
			showMessage('Invalid or expired code', 'error');
		}
	}

	function showMessage(text: string, type: 'success' | 'error' | 'info') {
		message = text;
		messageType = type;
		setTimeout(() => {
			message = '';
		}, 5000);
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
		if (event.key === 'Enter') {
			approveByCode();
		}
	}
</script>

<div class="mx-auto w-full max-w-md p-4">
	<!-- Header -->
	<div class="mb-6">
		<h2 class="flex items-center text-xl font-bold text-gray-800">
			<span class="mr-2">📺</span>
			TV Login Requests
		</h2>
		<p class="mt-1 text-sm text-gray-600">Approve TV devices to sign in with your account</p>
	</div>

	<!-- Message -->
	{#if message}
		<div
			class="alert mb-4"
			class:alert-success={messageType === 'success'}
			class:alert-error={messageType === 'error'}
			class:alert-info={messageType === 'info'}
		>
			<span>{message}</span>
		</div>
	{/if}

	<!-- Pending Requests -->
	{#if pendingRequests.length > 0}
		<div class="mb-6 space-y-4">
			{#each pendingRequests as request (request.code)}
				<div class="card bg-white shadow-md">
					<div class="card-body p-4">
						<div class="mb-3 flex items-center justify-between">
							<div>
								<h3 class="text-lg font-semibold">
									{TVAuthService.getDeviceDisplayName(request.userAgent)}
								</h3>
								<p class="text-sm text-gray-500">
									Requested {formatTimeAgo(request.timestamp)}
								</p>
							</div>
							<div class="text-right">
								<div class="text-xs text-gray-500">Expires in</div>
								<div class="font-mono text-sm font-bold text-orange-600">
									{getTimeRemaining(request.timestamp)}
								</div>
							</div>
						</div>

						<!-- Code Display -->
						<div class="mb-4">
							<p class="mb-2 text-sm text-gray-600">Authentication Code:</p>
							<div class="flex justify-center space-x-1">
								{#each request.code.split('') as letter}
									<div
										class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg font-bold text-blue-800"
									>
										{letter}
									</div>
								{/each}
							</div>
						</div>

						<!-- Action Buttons -->
						<div class="flex space-x-2">
							<button
								class="btn btn-sm flex-1 border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
								on:click={() => approveRequest(request)}
							>
								<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Approve
							</button>
							<button class="btn btn-error btn-sm flex-1" on:click={() => denyRequest(request)}>
								<span class="mr-1">✗</span>
								Deny
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="py-8 text-center">
			<div class="mb-2 text-4xl">📺</div>
			<p class="text-gray-500">No pending TV login requests</p>
			<p class="mt-1 text-sm text-gray-400">
				When someone tries to sign in on a TV, requests will appear here
			</p>
		</div>
	{/if}

	<!-- Manual Code Input Toggle -->
	<div class="border-t pt-4">
		{#if !showManualInput}
			<button class="btn btn-ghost btn-sm w-full" on:click={() => (showManualInput = true)}>
				<span class="mr-2">⌨️</span>
				Enter code manually
			</button>
		{:else}
			<div class="space-y-3">
				<div>
					<label class="label" for="manual-code-input">
						<span class="label-text">Enter 4-letter code:</span>
					</label>
					<input
						id="manual-code-input"
						type="text"
						class="input input-bordered w-full text-center font-mono text-lg uppercase"
						placeholder="ABCD"
						maxlength="4"
						bind:value={inputCode}
						on:input={(e) => {
							const target = e.target as HTMLInputElement;
							inputCode = target.value.toUpperCase().replace(/[^A-Z]/g, '');
						}}
						on:keydown={handleKeydown}
					/>
				</div>
				<div class="flex space-x-2">
					<button
						class="btn btn-sm flex-1 border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
						disabled={inputCode.length !== 4}
						on:click={approveByCode}
					>
						<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Approve
					</button>
					<button
						class="btn btn-ghost btn-sm"
						on:click={() => {
							showManualInput = false;
							inputCode = '';
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		{/if}
	</div>

	<!-- Help Text -->
	<div class="mt-6 rounded-lg bg-blue-50 p-3">
		<h4 class="mb-1 text-sm font-semibold text-blue-800">How it works:</h4>
		<ol class="list-inside list-decimal space-y-1 text-xs text-blue-700">
			<li>TV displays a 4-letter code</li>
			<li>Enter the code here or tap "Approve" above</li>
			<li>TV automatically signs in with your account</li>
		</ol>
	</div>
</div>
