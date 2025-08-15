<script lang="ts">
	export let showHelperText: boolean;
	export let isTVMode: boolean;
	export let onClose: () => void;
</script>

{#if showHelperText && !isTVMode}
	<div class="relative mt-6 mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:mb-0">
		<button
			class="absolute top-2 right-2 text-lg leading-none text-gray-400 hover:text-gray-600"
			on:click={onClose}
			aria-label="Close helper text"
		>
			×
		</button>
		<div class="space-y-2 pr-6 text-sm text-gray-600">
			<div class="flex items-center">
				<span class="mr-2">📱</span>
				<span><strong>Phone:</strong> Upload photos and approve TV logins</span>
			</div>
			<div class="flex items-center">
				<span class="mr-2">📺</span>
				<span><strong>TV:</strong> View slideshow on the big screen</span>
			</div>
		</div>
		<div class="mt-3 rounded bg-blue-50 p-2 text-center">
			<p class="text-xs text-blue-700">
				<strong>Recommended:</strong> Sign in on your phone first, then use "Connect TV TV Login" to
				connect your TV
			</p>
		</div>
	</div>
{/if}
