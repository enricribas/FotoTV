<script lang="ts">
	import { writable } from 'svelte/store';
	import AuthForm from '$lib/components/AuthForm.svelte';
	import PasswordResetForm from '$lib/components/PasswordResetForm.svelte';
	import { enableTVMode } from '$lib/advancedDeviceDetection';

	export let isCompactLayout: boolean = false;

	const showForgotPassword = writable(false);
	let currentStage: 1 | 2 = 1;

	function showForgotPasswordForm() {
		showForgotPassword.set(true);
	}

	function hideForgotPasswordForm() {
		showForgotPassword.set(false);
	}

	function handleTVMode() {
		enableTVMode();
	}

	function handleStageChange(stage: 1 | 2) {
		currentStage = stage;
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
		<!-- Left column - Instructions/info (when in compact layout) -->
		{#if isCompactLayout}
			<div class="lg:w-1/2 lg:pr-4" class:lg:pt-12={currentStage === 2}>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-800">Welcome to FotoTV</h2>
					<div class="space-y-3 text-sm text-gray-600">
						<div class="flex items-start">
							<span class="mr-3 text-lg">📱</span>
							<div>
								<p class="font-medium">Upload from your phone</p>
								<p class="text-xs">Share photos instantly to your TV</p>
							</div>
						</div>
						<div class="flex items-start">
							<span class="mr-3 text-lg">📺</span>
							<div>
								<p class="font-medium">View on your TV</p>
								<p class="text-xs">Beautiful slideshows on the big screen</p>
							</div>
						</div>
						<div class="flex items-start">
							<span class="mr-3 text-lg">🔒</span>
							<div>
								<p class="font-medium">Secure & Private</p>
								<p class="text-xs">Your photos are always protected</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Right column - Auth form (when in compact layout) -->
		<div class={isCompactLayout ? 'lg:w-1/2' : 'w-full'}>
			<AuthForm onShowPasswordReset={showForgotPasswordForm} onStageChange={handleStageChange} />

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
