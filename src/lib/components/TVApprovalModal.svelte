<script lang="ts">
	import ManualCodeEntry from '$lib/components/ManualCodeEntry.svelte';

	export let showModal: boolean;
	export let onClose: () => void;
	export let onSuccess: () => void;
</script>

{#if showModal}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
		<div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<button class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2" on:click={onClose}>
				✕
			</button>
			<ManualCodeEntry {onSuccess} />
		</div>
	</div>
{/if}
