<script lang="ts">
	interface Props {
		showControls: boolean;
		onGoBack: () => void;
		onPrevious: () => void;
		onNext: () => void;
		onDelete: () => void;
		isEchoShowDevice: boolean;
		onToggleTouchDebug: () => void;
		showTouchDebug: boolean;
	}

	let {
		showControls,
		onGoBack,
		onPrevious,
		onNext,
		onDelete,
		isEchoShowDevice,
		onToggleTouchDebug,
		showTouchDebug
	}: Props = $props();
</script>

{#if showControls}
	<!-- Back Button -->
	<button
		class="fixed top-[50px] left-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gray-200/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-gray-300/90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
		onclick={onGoBack}
		tabindex="0"
		aria-label="Go back to main menu"
	>
		<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"
			/>
		</svg>
	</button>

	<!-- Navigation Controls -->
	<div class="fixed top-[50px] right-4 z-20 flex space-x-3">
		<button
			class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-gray-300/90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
			onclick={onPrevious}
			tabindex="0"
			aria-label="Previous image"
		>
			<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-gray-300/90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
			onclick={onNext}
			tabindex="0"
			aria-label="Next image"
		>
			<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>

	<!-- Delete Button -->
	<button
		class="fixed top-[50px] left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 transform items-center justify-center rounded-full bg-red-200/90 text-red-700 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-red-300/90 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
		onclick={onDelete}
		tabindex="0"
		aria-label="Delete current image"
	>
		<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
			/>
		</svg>
	</button>

	<!-- Debug Controls (Only for Echo Show) -->
	{#if isEchoShowDevice}
		<div class="fixed bottom-4 left-4 z-20 flex flex-col space-y-2">
			<button
				class="flex h-12 w-24 items-center justify-center rounded-lg bg-blue-600/90 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-blue-700/90 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
				onclick={onToggleTouchDebug}
				tabindex="0"
				aria-label="Toggle touch debug"
			>
				<span class="text-xs font-medium">{showTouchDebug ? 'Hide' : 'Debug'}</span>
			</button>
		</div>
	{/if}

	<!-- Touch instruction overlay (shows briefly on first touch) -->
	<div class="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
		<div
			class="rounded-lg bg-black/50 px-6 py-3 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300"
			id="touch-hint"
		>
			<p class="text-center text-sm">Tap to show/hide controls • Swipe left/right to navigate</p>
		</div>
	</div>
{/if}
