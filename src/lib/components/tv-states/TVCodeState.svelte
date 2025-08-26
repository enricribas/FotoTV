<script lang="ts">
	export let authCode: string;
	export let timeRemaining: string;
	export let onCancel: () => void;
	export let onBackToLogin: () => void;
</script>

<div class="space-y-6">
	<div class="text-center">
		<p class="mb-4 text-gray-600">Enter this code on your signed-in device:</p>

		<!-- Large code display -->
		<div class="mx-auto mb-4 inline-flex space-x-2">
			{#each authCode.split('') as letter, index (index)}
				<div
					class="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-3xl font-bold text-black"
				>
					{letter}
				</div>
			{/each}
		</div>

		<!-- Time remaining -->
		{#if timeRemaining}
			<p class="text-sm text-blue-300">
				Code expires in: <span class="font-mono font-bold">{timeRemaining}</span>
			</p>
		{/if}
	</div>

	<!-- Status message -->
	<div class="bg-opacity-10 rounded-lg bg-white p-4">
		<div class="flex items-center justify-center space-x-2">
			<span class="text-gray-600">Waiting for approval from your phone...</span>
		</div>
	</div>

	<!-- Instructions -->
	<div class="space-y-2 text-left text-sm text-gray-600">
		<ol class="ml-4 list-inside list-decimal space-y-1">
			<li>Open FotoTV on your phone</li>
			<li>Go to "Connect TV" section</li>
			<li>Enter the code: <span class="font-mono font-bold text-white">{authCode}</span></li>
			<li>Tap "Connect TV" to sign in</li>
		</ol>
	</div>

	<!-- Cancel button -->
	<button class="btn btn-ghost btn-sm w-full" on:click={onCancel}>Cancel</button>

	<!-- Back button -->
	<button
		class="btn btn-sm mt-2 w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
		on:click={onBackToLogin}
	>
		← This is not a TV
	</button>
</div>
