<script lang="ts">
	export let error: string;
	export let onTryAgain: () => void;
	export let onBackToLogin: () => void;
</script>

<div class="space-y-6">
	<div class="bg-opacity-10 rounded-lg bg-white p-4">
		<p class="text-sm text-gray-600">
			To sign in on your TV, you'll need to approve the login from a device where you're already
			signed in.
		</p>
	</div>

	<div class="alert alert-error">
		<span>❌ {error}</span>
	</div>

	<button class="btn btn-primary btn-lg w-full text-lg" on:click={onTryAgain}> Try Again </button>

	<!-- Back button -->
	<button
		class="btn btn-sm w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
		on:click={onBackToLogin}
	>
		← Back to Login
	</button>
</div>
