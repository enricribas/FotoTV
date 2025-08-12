<script lang="ts">
	import { AuthService } from '$lib/auth';
	import { writable } from 'svelte/store';

	export let onBack: () => void;

	const isLoading = writable(false);
	const resetEmail = writable('');
	const message = writable('');
	const messageType = writable<'success' | 'error'>('error');

	function clearMessage() {
		message.set('');
	}

	function setMessage(msg: string, type: 'success' | 'error' = 'error') {
		message.set(msg);
		messageType.set(type);
	}

	async function handlePasswordReset() {
		if ($isLoading) return;

		clearMessage();

		if (!$resetEmail) {
			setMessage('Please enter your email address');
			return;
		}

		if (!AuthService.isValidEmail($resetEmail)) {
			setMessage('Please enter a valid email address');
			return;
		}

		isLoading.set(true);

		try {
			await AuthService.resetPassword($resetEmail);
			setMessage('Password reset email sent! Check your inbox.', 'success');
			resetEmail.set('');
		} catch (error: unknown) {
			const authError = error as { message?: string };
			setMessage(authError.message || 'Failed to send password reset email');
		} finally {
			isLoading.set(false);
		}
	}
</script>

<div class="space-y-4">
	<div class="text-center">
		<h2 class="text-2xl font-bold text-gray-800">Reset Password</h2>
		<p class="mt-2 text-sm text-gray-600">
			Enter your email address and we'll send you a link to reset your password
		</p>
	</div>

	<div class="space-y-4">
		<div>
			<label for="reset-email" class="mb-1 block text-sm font-medium text-gray-700">
				Email Address
			</label>
			<input
				id="reset-email"
				type="email"
				placeholder="Enter your email"
				bind:value={$resetEmail}
				class="input input-bordered w-full"
				disabled={$isLoading}
				on:input={clearMessage}
			/>
		</div>

		<button
			class="btn w-full border-0 bg-blue-500 text-white hover:bg-blue-600"
			on:click={handlePasswordReset}
			disabled={$isLoading}
		>
			{#if $isLoading}
				<span class="loading loading-spinner loading-sm mr-2"></span>
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
				Send Reset Email
			{/if}
		</button>

		<button class="btn btn-ghost w-full text-gray-600" on:click={onBack} disabled={$isLoading}>
			Back to Sign In
		</button>
	</div>

	<!-- Message Display -->
	{#if $message}
		<div
			class="rounded-lg p-3 text-center text-sm {$messageType === 'error'
				? 'border border-red-200 bg-red-50 text-red-600'
				: 'border border-green-200 bg-green-50 text-green-600'}"
		>
			{$message}
		</div>
	{/if}
</div>
