<script lang="ts">
	export let authStatus: 'idle' | 'waiting' | 'approved' | 'denied' | 'expired';
	export let onTryAgain: (() => void) | undefined = undefined;
	export let onBackToLogin: () => void;

	function getStatusMessage() {
		switch (authStatus) {
			case 'waiting':
				return 'Waiting for approval from your phone...';
			case 'approved':
				return 'Login approved! Welcome to PhotoTV!';
			case 'denied':
				return 'Authentication was denied. Please try again.';
			case 'expired':
				return 'Code expired. Please generate a new code.';
			default:
				return '';
		}
	}
</script>

<div class="space-y-6">
	<div class="text-center">
		<p class="text-lg">{getStatusMessage()}</p>
	</div>

	{#if (authStatus === 'denied' || authStatus === 'expired') && onTryAgain}
		<button class="btn btn-primary btn-lg w-full" on:click={onTryAgain}>Try Again</button>
	{/if}

	<!-- Back button -->
	<button
		class="btn btn-sm mt-2 w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
		on:click={onBackToLogin}
	>
		← Back to Login
	</button>
</div>
