<script lang="ts">
	import { writable } from 'svelte/store';
	import AuthForm from '$lib/components/AuthForm.svelte';
	import PasswordResetForm from '$lib/components/PasswordResetForm.svelte';

	const showForgotPassword = writable(false);

	function showForgotPasswordForm() {
		showForgotPassword.set(true);
	}

	function hideForgotPasswordForm() {
		showForgotPassword.set(false);
	}
</script>

<div class="space-y-6">
	{#if $showForgotPassword}
		<PasswordResetForm onBack={hideForgotPasswordForm} />
	{:else}
		<AuthForm onShowPasswordReset={showForgotPasswordForm} />
	{/if}
</div>
