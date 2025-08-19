<script lang="ts">
	import { AuthService } from '$lib/auth';
	import { writable } from 'svelte/store';

	export let onShowPasswordReset: () => void;

	// Form state
	const stage = writable<1 | 2>(1); // 1: email/password, 2: name/confirm password
	const isLoading = writable(false);

	// Form data
	const email = writable('');
	const password = writable('');
	const confirmPassword = writable('');
	const displayName = writable('');

	// Messages
	const message = writable('');
	const messageType = writable<'success' | 'error'>('error');

	function clearMessage() {
		message.set('');
	}

	function setMessage(msg: string, type: 'success' | 'error' = 'error') {
		message.set(msg);
		messageType.set(type);
	}

	function validateStage1(): boolean {
		if (!$email || !$password) {
			setMessage('Please fill in all required fields');
			return false;
		}

		if (!AuthService.isValidEmail($email)) {
			setMessage('Please enter a valid email address');
			return false;
		}

		const passwordValidation = AuthService.isValidPassword($password);
		if (!passwordValidation.valid) {
			setMessage(passwordValidation.message || 'Invalid password');
			return false;
		}

		return true;
	}

	function validateStage2(): boolean {
		if (!$displayName?.trim()) {
			setMessage('Please enter your name');
			return false;
		}

		if ($password !== $confirmPassword) {
			setMessage('Passwords do not match');
			return false;
		}

		return true;
	}

	async function handleStage1Submit() {
		if (!validateStage1()) {
			return;
		}

		isLoading.set(true);
		clearMessage();

		try {
			// Attempt to sign in first
			await AuthService.trySignIn($email, $password);
			setMessage('Signed in successfully!', 'success');
		} catch {
			// Any authentication failure means we should proceed to stage 2
			// (could be wrong password, user doesn't exist, etc.)
			stage.set(2);
			clearMessage();
		} finally {
			isLoading.set(false);
		}
	}

	async function handleStage2Submit() {
		if (!validateStage2()) {
			return;
		}

		isLoading.set(true);
		clearMessage();

		try {
			await AuthService.register($email, $password, $displayName);
			setMessage('Account created successfully! You are now signed in.', 'success');
		} catch (error: unknown) {
			const authError = error as { message?: string };

			// If user already exists, automatically return to stage 1
			if (authError.message?.includes('email address is already registered')) {
				console.info(
					'%c[PhotoTV Auth]%c User already exists - redirecting back to stage 1 for password correction.',
					'color: #2563eb; font-weight: bold',
					'color: #6b7280'
				);
				setMessage(
					'An account with this email already exists. Please check your password and try again.'
				);
				// Clear stage 2 fields and return to stage 1
				displayName.set('');
				confirmPassword.set('');
				stage.set(1);
			} else {
				setMessage(authError.message || 'An error occurred during registration. Please try again.');
			}
		} finally {
			isLoading.set(false);
		}
	}

	async function handleSubmit() {
		if ($isLoading) return;

		if ($stage === 1) {
			await handleStage1Submit();
		} else {
			await handleStage2Submit();
		}
	}

	function goBackToStage1() {
		stage.set(1);
		confirmPassword.set('');
		displayName.set('');
		clearMessage();
	}
</script>

<div class="space-y-4">
	<div class="text-center">
		<h2 class="text-2xl font-bold text-gray-800">
			{$stage === 1 ? '' : 'Complete Your Account'}
		</h2>
	</div>

	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		{#if $stage === 2}
			<div>
				<label for="display-name" class="mb-1 block text-sm font-medium text-gray-700">
					Display Name
				</label>
				<input
					id="display-name"
					type="text"
					placeholder="Name to display"
					bind:value={$displayName}
					class="input input-bordered w-full"
					disabled={$isLoading}
					on:input={clearMessage}
					required
				/>
			</div>
		{/if}

		<div>
			<input
				id="email"
				type="email"
				placeholder="Enter your email"
				bind:value={$email}
				class="input input-bordered w-full"
				disabled={$isLoading || $stage === 2}
				on:input={clearMessage}
				required
			/>
		</div>

		<div>
			<input
				id="password"
				type="password"
				placeholder="Enter your password"
				bind:value={$password}
				class="input input-bordered w-full"
				disabled={$isLoading || $stage === 2}
				on:input={clearMessage}
				required
			/>
		</div>

		{#if $stage === 2}
			<div>
				<label for="confirm-password" class="mb-1 block text-sm font-medium text-gray-700">
					Confirm Password
				</label>
				<input
					id="confirm-password"
					type="password"
					placeholder="Confirm your password"
					bind:value={$confirmPassword}
					class="input input-bordered w-full"
					disabled={$isLoading}
					on:input={clearMessage}
					required
				/>
				<p class="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
			</div>
		{/if}

		<button
			type="submit"
			class="btn w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
			disabled={$isLoading}
		>
			{#if $isLoading}
				<span class="loading loading-spinner loading-sm mr-2"></span>
				{$stage === 1 ? 'Checking your account...' : 'Creating Account...'}
			{:else}
				{$stage === 1 ? 'Sign-in / Sign-up' : 'Create Account'}
			{/if}
		</button>
	</form>

	<!-- Stage 2 back button -->
	{#if $stage === 2}
		<div class="text-center">
			<button
				class="text-sm text-blue-600 underline hover:text-blue-700"
				on:click={goBackToStage1}
				disabled={$isLoading}
			>
				← Back to sign in
			</button>
		</div>
	{/if}

	<!-- Bottom actions -->
	{#if $stage === 1}
		<div class="text-center">
			<button
				class="text-sm text-blue-600 underline hover:text-blue-700"
				on:click={onShowPasswordReset}
				disabled={$isLoading}
			>
				Forgot your password?
			</button>
		</div>
	{/if}

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
