<script lang="ts">
	import { writable } from 'svelte/store';
	import AuthForm from '$lib/components/AuthForm.svelte';
	import PasswordResetForm from '$lib/components/PasswordResetForm.svelte';
	import { enableTVMode } from '$lib/advancedDeviceDetection';

	export let isCompactLayout: boolean = false;

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

<div
	class="{isCompactLayout ? 'lg:flex lg:gap-8' : ''} space-y-6 {isCompactLayout
		? 'lg:space-y-0'
		: ''}"
>
	{#if $showForgotPassword}
		<PasswordResetForm onBack={hideForgotPasswordForm} />
	{:else}
		<!-- Auth form -->
		<div class={isCompactLayout ? 'lg:w-1/2' : 'w-full'}>
			<AuthForm onShowPasswordReset={showForgotPasswordForm} />

			<!-- TV Mode Button -->
			<div class="mt-6 text-center">
				<div class="mb-3 flex items-center">
					<div class="flex-1 border-t border-gray-300"></div>
					<span class="px-3 text-sm text-gray-500">or</span>
					<div class="flex-1 border-t border-gray-300"></div>
				</div>

				<button class="btn btn-outline w-full" on:click={handleTVMode}>I'm on a TV</button>
			</div>
		</div>
	{/if}
</div>
