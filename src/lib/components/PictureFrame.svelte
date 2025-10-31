<script lang="ts">
	interface Props {
		imageUrl: string | null;
		isLoading: boolean;
		transitionDuration?: number;
		theme?: 'light' | 'dark';
	}

	let { imageUrl, isLoading, transitionDuration = 500, theme = 'light' }: Props = $props();

	let primaryImageUrl = $state<string | null>(null);
	let secondaryImageUrl = $state<string | null>(null);
	let showPrimary = $state(true);
	let isTransitioning = $state(false);
	let isFirstRender = $state(true);

	// Track when imageUrl changes to trigger transitions
	$effect(() => {
		if (imageUrl && imageUrl !== (showPrimary ? primaryImageUrl : secondaryImageUrl)) {
			handleImageChange(imageUrl);
		}
	});

	// Mark as first image loaded
	$effect(() => {
		if (primaryImageUrl) {
			// Use setTimeout to delay enabling transitions until after first render
			setTimeout(() => {
				isFirstRender = false;
			}, 100);
		}
	});

	function handleImageChange(newImageUrl: string) {
		// If no current image, show immediately
		if (!primaryImageUrl && !secondaryImageUrl) {
			primaryImageUrl = newImageUrl;
			showPrimary = true;
			return;
		}

		// Start transition
		isTransitioning = true;

		// Load new image into the inactive slot
		if (showPrimary) {
			secondaryImageUrl = newImageUrl;
		} else {
			primaryImageUrl = newImageUrl;
		}

		// Use requestAnimationFrame to ensure image is rendered before starting transition
		requestAnimationFrame(() => {
			// Flip to show the new image
			showPrimary = !showPrimary;

			// End transition after animation completes
			setTimeout(() => {
				isTransitioning = false;
				// Clear the old image to free memory
				if (showPrimary) {
					secondaryImageUrl = null;
				} else {
					primaryImageUrl = null;
				}
			}, transitionDuration);
		});
	}
</script>

	{#if isLoading && !primaryImageUrl && !secondaryImageUrl}
	<div class="loading loading-spinner loading-lg"></div>
{:else}
	<div class="picture-frame" class:dark-theme={theme === 'dark'} class:no-transition={isFirstRender}>
		<div class="image-container">
			<!-- Primary image -->
			{#if primaryImageUrl}
				<img
					src={primaryImageUrl}
					alt=""
					class="main-image"
					class:active={showPrimary}
					class:inactive={!showPrimary && isTransitioning}
					style="transition-duration: {transitionDuration}ms;"
				/>
			{/if}

			<!-- Secondary image -->
			{#if secondaryImageUrl}
				<img
					src={secondaryImageUrl}
					alt=""
					class="main-image"
					class:active={!showPrimary}
					class:inactive={showPrimary && isTransitioning}
					style="transition-duration: {transitionDuration}ms;"
				/>
			{/if}

			<div class="shadow-overlay"></div>
		</div>
	</div>
{/if}

<style>
	:root {
		--frame-border-width: 50px;
		--inside-frame-border-width: 2px;
	}

	.picture-frame {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f0f0f0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}

	.picture-frame:not(.no-transition) {
		transition: background-color 0.3s ease-in-out;
	}

	.picture-frame.dark-theme {
		background-color: #2a2a2a;
	}

	.image-container {
		position: relative;
		display: inline-block;
	}

	.main-image {
		display: block;
		max-width: calc(100vw - var(--frame-border-width));
		max-height: calc(100vh - var(--frame-border-width));
		width: auto;
		height: auto;
		object-fit: contain;
		border: var(--inside-frame-border-width) solid white;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transition: opacity ease-in-out;
	}

	.picture-frame:not(.no-transition) .main-image {
		transition: opacity ease-in-out, border-color 0.3s ease-in-out;
	}

	.picture-frame.dark-theme .main-image {
		border-color: #1a1a1a;
	}

	.main-image.active {
		opacity: 1;
		position: relative;
	}

	.main-image.inactive {
		opacity: 0;
	}

	.shadow-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		box-shadow:
			inset 0 0 20px rgba(0, 0, 0, 0.6),
			inset 0 0 40px rgba(0, 0, 0, 0.4),
			inset 0 0 80px rgba(0, 0, 0, 0.2);
		pointer-events: none;
		z-index: 2;
	}
</style>
