<script lang="ts">
	interface Props {
		imageUrl: string | null;
		isLoading: boolean;
		transitionDuration?: number;
	}

	let { imageUrl, isLoading, transitionDuration = 500 }: Props = $props();

	let primaryImageUrl = $state<string | null>(null);
	let secondaryImageUrl = $state<string | null>(null);
	let showPrimary = $state(true);
	let isTransitioning = $state(false);

	// Track when imageUrl changes to trigger transitions
	$effect(() => {
		if (imageUrl && imageUrl !== (showPrimary ? primaryImageUrl : secondaryImageUrl)) {
			handleImageChange(imageUrl);
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
	<div class="picture-frame">
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
		--frame-color: #f0f0f0;
	}

	.picture-frame {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--frame-color);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
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
