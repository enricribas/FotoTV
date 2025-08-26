<script lang="ts">
	import { writable } from 'svelte/store';
	import AuthForm from '$lib/components/AuthForm.svelte';
	import PasswordResetForm from '$lib/components/PasswordResetForm.svelte';
	import { enableTVMode } from '$lib/advancedDeviceDetection';

	const showForgotPassword = writable(false);

	function showForgotPasswordForm() {
		showForgotPassword.set(true);
	}

	function hideForgotPasswordForm() {
		showForgotPassword.set(false);
	}

	function handleTVMode() {
		enableTVMode();
	}
</script>

<div class="space-y-6">
	{#if $showForgotPassword}
		<PasswordResetForm onBack={hideForgotPasswordForm} />
	{:else}
		<AuthForm onShowPasswordReset={showForgotPasswordForm} />

		<!-- TV Mode Button -->
		<div class="text-center">
			<div class="mb-3 flex items-center">
				<div class="flex-1 border-t border-gray-300"></div>
				<span class="px-3 text-sm text-gray-500">or</span>
				<div class="flex-1 border-t border-gray-300"></div>
			</div>

			<button class="btn btn-outline w-full" on:click={handleTVMode}>I'm on a TV</button>
		</div>
	{/if}
</div>
