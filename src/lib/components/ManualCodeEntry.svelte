<script lang="ts">
	import { TVAuthService } from '$lib/tvAuth';

	let code = '';
	let loading = false;
	let message = '';
	let messageType: 'success' | 'error' | 'info' = 'info';

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
			} else {
				showMessage(result.error || 'Failed to approve code', 'error');
			}
		} catch (error) {
			showMessage('Failed to approve code', 'error');
		} finally {
			loading = false;
		}
	}

	async function denyCode() {
		if (code.length !== 4) {
			showMessage('Please enter a 4-letter code', 'error');
			return;
		}

		loading = true;
		try {
			const result = await TVAuthService.denyCode(code);
			if (result.success) {
				showMessage('TV login denied', 'info');
				code = '';
			} else {
				showMessage(result.error || 'Failed to deny code', 'error');
			}
		} catch (error) {
			showMessage('Failed to deny code', 'error');
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
</script>

<div class="w-full max-w-md mx-auto p-4">
	<!-- Header -->
	<div class="mb-6">
		<h2 class="text-xl font-bold text-gray-800 flex items-center">
			<span class="mr-2">📺</span>
			TV Login Code
		</h2>
		<p class="text-sm text-gray-600 mt-1">
			Enter the 4-letter code from your TV to approve login
		</p>
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
			<label class="label" for="tv-code-input">
				<span class="label-text">4-Letter Code:</span>
			</label>
			<input
				id="tv-code-input"
				type="text"
				class="input input-bordered w-full text-center text-2xl font-mono uppercase tracking-widest"
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
				class="btn btn-success w-full"
				class:loading
				disabled={code.length !== 4 || loading}
				on:click={approveCode}
			>
				{#if loading}
					Approving...
				{:else}
					<span class="mr-2">✓</span>
					Approve TV Login
				{/if}
			</button>

			<button
				class="btn btn-error btn-sm w-full"
				disabled={code.length !== 4 || loading}
				on:click={denyCode}
			>
				<span class="mr-1">✗</span>
				Deny
			</button>
		</div>
	</div>

	<!-- Help Text -->
	<div class="mt-6 p-3 bg-blue-50 rounded-lg">
		<h4 class="font-semibold text-blue-800 text-sm mb-1">How it works:</h4>
		<ol class="text-xs text-blue-700 space-y-1 list-decimal list-inside">
			<li>Your TV displays a 4-letter code</li>
			<li>Enter the exact code here</li>
			<li>Click "Approve" to sign in your TV</li>
		</ol>
		<p class="text-xs text-blue-600 mt-2">
			⚠️ Only approve codes you recognize from your own TV
		</p>
	</div>
</div>
