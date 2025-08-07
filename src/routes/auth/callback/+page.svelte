<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AuthService } from '$lib/auth';

	let loading = true;
	let message = 'Processing authentication...';

	onMount(async () => {
		try {
			// Handle magic link completion
			const user = await AuthService.completeMagicLinkSignIn();

			if (user) {
				message = 'Authentication successful! Redirecting...';
				setTimeout(() => {
					goto('/', { replaceState: true });
				}, 1000);
			} else {
				message = 'No authentication link found.';
				setTimeout(() => {
					goto('/', { replaceState: true });
				}, 2000);
			}
		} catch (error) {
			console.error('Auth callback error:', error);
			message = 'Authentication failed. Please try again.';
			setTimeout(() => {
				goto('/', { replaceState: true });
			}, 3000);
		} finally {
			loading = false;
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="text-center">
		<div class="mb-4">
			{#if loading}
				<span class="loading loading-spinner loading-lg text-blue-500"></span>
			{:else}
				<div class="text-4xl">
					{#if message.includes('successful')}
						✅
					{:else if message.includes('failed')}
						❌
					{:else}
						ℹ️
					{/if}
				</div>
			{/if}
		</div>

		<h1 class="mb-2 text-xl font-semibold text-gray-900">
			{message}
		</h1>

		<p class="text-sm text-gray-600">
			You will be redirected automatically...
		</p>
	</div>
</div>
