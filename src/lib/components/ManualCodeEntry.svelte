<script lang="ts">
	import { TVAuthService } from '$lib/tvAuth';
	import { onMount } from 'svelte';

	export let onSuccess: (() => void) | undefined = undefined;

	let code = '';
	let loading = false;
	let message = '';
	let messageType: 'success' | 'error' | 'info' = 'info';
	let codeInput: HTMLInputElement;

	async function approveCode() {
		if (code.length !== 4) {
			showMessage('Please enter a 4-letter code', 'error');
			return;
		}

		loading = true;
		try {
			const result = await TVAuthService.approveCode(code);
			if (result.success) {
				showMessage('TV login approved successfully!', 'success');
				code = '';
				// Close modal after short delay to show success message
				setTimeout(() => {
					onSuccess?.();
				}, 1500);
			} else {
				showMessage(result.error || 'Failed to approve code', 'error');
			}
		} catch {
			showMessage('Failed to approve code', 'error');
		} finally {
			loading = false;
		}
	}

	function showMessage(text: string, type: 'success' | 'error' | 'info') {
		message = text;
		messageType = type;
		setTimeout(() => {
			message = '';
		}, 5000);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			approveCode();
		}
	}

	onMount(() => {
		// Automatically focus the input when the component mounts
		if (codeInput) {
			codeInput.focus();
		}
	});
</script>

<div class="mx-auto w-full max-w-md p-4">
	<!-- Header -->
	<div class="mb-6">
		<p class="mt-1 text-sm text-gray-600">Enter the 4-letter code from your TV to approve login</p>
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

	<!-- Code Input -->
	<div class="space-y-4">
		<div>
			<input
				bind:this={codeInput}
				id="tv-code-input"
				type="text"
				class="input input-bordered w-full text-center font-mono text-2xl tracking-widest uppercase"
				placeholder="ABCD"
				maxlength="4"
				bind:value={code}
				on:input={(e) => {
					const target = e.target as HTMLInputElement;
					code = target.value.toUpperCase().replace(/[^A-Z]/g, '');
				}}
				on:keydown={handleKeydown}
				disabled={loading}
			/>
		</div>

		<!-- Action Buttons -->
		<div class="space-y-2">
			<button
				class="btn w-full border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
				class:loading
				disabled={code.length !== 4 || loading}
				on:click={approveCode}
			>
				{#if loading}
					<span class="loading loading-spinner loading-sm"></span>
					Approving...
				{:else}
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					Approve TV Login
				{/if}
			</button>
		</div>
	</div>

	<!-- Help Text -->
	<div class="mt-6 rounded-lg bg-blue-50 p-3">
		<h4 class="mb-1 text-sm font-semibold text-blue-800">How it works:</h4>
		<ol class="list-inside list-decimal space-y-1 text-xs text-blue-700">
			<li>Your TV displays a 4-letter code</li>
			<li>Enter the exact code here</li>
			<li>Click "Approve" to sign in your TV</li>
		</ol>
		<p class="mt-2 text-xs text-blue-600">⚠️ Only approve codes you recognize from your own TV</p>
	</div>
</div>
