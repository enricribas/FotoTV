<script lang="ts">
	import { AuthService } from '$lib/auth';
	import { writable } from 'svelte/store';

	export let onShowPasswordReset: () => void;

	// Form state
	const isRegistering = writable(true);
	const isLoading = writable(false);

	// Form data
	const email = writable('');
	const password = writable('');
	const confirmPassword = writable('');
	const displayName = writable('');

	// Messages
	const message = writable('');
	const messageType = writable<'success' | 'error'>('error');

	function toggleMode() {
		isRegistering.update((v) => !v);
		clearForm();
	}

	function clearForm() {
		email.set('');
		password.set('');
		confirmPassword.set('');
		displayName.set('');
		message.set('');
	}

	function clearMessage() {
		message.set('');
	}

	function setMessage(msg: string, type: 'success' | 'error' = 'error') {
		message.set(msg);
		messageType.set(type);
	}

	function validateForm(): boolean {
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

		if ($isRegistering) {
			if (!$displayName?.trim()) {
				setMessage('Please enter your name');
				return false;
			}

			if ($password !== $confirmPassword) {
				setMessage('Passwords do not match');
				return false;
			}
		}

		return true;
	}

	async function handleSubmit() {
		if ($isLoading) return;

		clearMessage();

		if (!validateForm()) {
			return;
		}

		isLoading.set(true);

		try {
			if ($isRegistering) {
				await AuthService.register($email, $password, $displayName);
				setMessage('Account created successfully! You are now signed in.', 'success');
			} else {
				await AuthService.signIn($email, $password);
				setMessage('Signed in successfully!', 'success');
			}
		} catch (error: unknown) {
			const authError = error as { message?: string };
			setMessage(authError.message || 'An error occurred. Please try again.');
		} finally {
			isLoading.set(false);
		}
	}
</script>

<div class="space-y-4">
	<div class="text-center">
		<h2 class="text-2xl font-bold text-gray-800">
			{$isRegistering ? 'Create Account' : 'Sign In'}
		</h2>
		<p class="mt-2 text-sm text-gray-600">
			{$isRegistering
				? 'Create your FotoTV account to get started'
				: 'Welcome back! Please sign in to continue'}
		</p>
	</div>

	<!-- Mode toggle at the top for better visibility -->
	{#if !$isRegistering}
		<div class="text-center">
			<p class="text-sm text-gray-600">
				Don't have an account?
				<button
					class="ml-1 font-semibold text-orange-600 underline hover:text-orange-700"
					on:click={toggleMode}
					disabled={$isLoading}
				>
					Create Account
				</button>
			</p>
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		{#if $isRegistering}
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
			<label for="email" class="mb-1 block text-sm font-medium text-gray-700">
				Email Address
			</label>
			<input
				id="email"
				type="email"
				placeholder="Enter your email"
				bind:value={$email}
				class="input input-bordered w-full"
				disabled={$isLoading}
				on:input={clearMessage}
				required
			/>
		</div>

		<div>
			<label for="password" class="mb-1 block text-sm font-medium text-gray-700"> Password </label>
			<input
				id="password"
				type="password"
				placeholder="Enter your password"
				bind:value={$password}
				class="input input-bordered w-full"
				disabled={$isLoading}
				on:input={clearMessage}
				required
			/>
			{#if $isRegistering}
				<p class="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
			{/if}
		</div>

		{#if $isRegistering}
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
			</div>
		{/if}

		<button
			type="submit"
			class="btn w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
			disabled={$isLoading}
		>
			{#if $isLoading}
				<span class="loading loading-spinner loading-sm mr-2"></span>
				{$isRegistering ? 'Creating Account...' : 'Signing In...'}
			{:else}
				{$isRegistering ? 'Create Account' : 'Sign In'}
			{/if}
		</button>
	</form>

	<!-- Bottom actions -->
	<div class="space-y-2 text-center">
		{#if !$isRegistering}
			<button
				class="text-sm text-blue-600 underline hover:text-blue-700"
				on:click={onShowPasswordReset}
				disabled={$isLoading}
			>
				Forgot your password?
			</button>
		{/if}

		{#if $isRegistering}
			<div class="flex items-center">
				<div class="flex-1 border-t border-gray-300"></div>
				<span class="px-3 text-sm text-gray-500">or</span>
				<div class="flex-1 border-t border-gray-300"></div>
			</div>

			<p class="text-sm text-gray-600">
				Already have an account?
				<button
					class="ml-1 text-blue-600 underline hover:text-blue-700"
					on:click={toggleMode}
					disabled={$isLoading}
				>
					Sign In
				</button>
			</p>
		{/if}
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
