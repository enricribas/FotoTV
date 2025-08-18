<script lang="ts">
	interface Props {
		showControls: boolean;
		onGoBack: () => void;
		onPrevious: () => void;
		onNext: () => void;
		onDelete: () => void;
	}

	let { showControls, onGoBack, onPrevious, onNext, onDelete }: Props = $props();
</script>

{#if showControls}
	<!-- Back Button -->
	<button
		class="btn btn-circle btn-ghost hover:bg-opacity-20 fixed top-[66px] left-4 z-20 bg-gray-200 text-gray-700 hover:bg-gray-300"
		onclick={onGoBack}
		aria-label="Go back to main menu"
	>
		<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"
			/>
		</svg>
	</button>

	<!-- Navigation Controls -->
	<div class="fixed top-[66px] right-4 z-20 flex space-x-2">
		<button
			class="btn btn-circle btn-ghost hover:bg-opacity-20 bg-gray-200 text-gray-700 hover:bg-gray-300"
			onclick={onPrevious}
			aria-label="Previous image"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			class="btn btn-circle btn-ghost hover:bg-opacity-20 bg-gray-200 text-gray-700 hover:bg-gray-300"
			onclick={onNext}
			aria-label="Next image"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>

	<!-- Delete Button -->
	<button
		class="btn btn-circle btn-ghost hover:bg-opacity-20 fixed top-[66px] left-1/2 z-20 -translate-x-1/2 transform bg-gray-200 text-gray-700 hover:bg-gray-300"
		onclick={onDelete}
		aria-label="Delete current image"
	>
		<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
			/>
		</svg>
	</button>
{/if}
