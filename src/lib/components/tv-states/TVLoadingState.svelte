<script lang="ts">
	export let onBackToLogin: () => void;
</script>

<div class="space-y-6">
	<div class="bg-opacity-10 rounded-lg bg-white p-4">
		<p class="text-sm text-gray-600">
			To sign in on your TV, you'll need to approve the login from a device where you're already
			signed in.
		</p>
	</div>

	<div class="flex flex-col items-center justify-center space-y-4">
		<span class="loading loading-spinner loading-lg text-white"></span>
		<p class="text-gray-600">Starting TV authentication...</p>
	</div>

	<!-- Back button -->
	<button
		class="btn btn-sm mt-4 w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
		on:click={onBackToLogin}
	>
		← Back to Login
	</button>
</div>
