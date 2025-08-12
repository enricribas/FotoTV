<script lang="ts">
	interface Props {
		showDialog: boolean;
		isDeleting: boolean;
		onConfirm: () => void;
		onCancel: () => void;
	}

	let { showDialog, isDeleting, onConfirm, onCancel }: Props = $props();
</script>

{#if showDialog}
	<div class="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
		<div class="mx-4 max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="mb-4 text-lg font-bold text-gray-900">Delete Image</h3>
			<p class="mb-6 text-gray-700">
				Are you sure you want to delete this image? This action cannot be undone.
			</p>
			<div class="flex justify-end space-x-3">
				<button
					class="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
					onclick={onCancel}
					disabled={isDeleting}
				>
					Cancel
				</button>
				<button
					class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
					onclick={onConfirm}
					disabled={isDeleting}
				>
					{#if isDeleting}
						<span class="loading loading-spinner loading-sm"></span>
						Deleting...
					{:else}
						Delete
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
