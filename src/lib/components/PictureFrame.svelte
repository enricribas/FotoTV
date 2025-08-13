<script lang="ts">
	interface Props {
		imageUrl: string | null;
		isLoading: boolean;
	}

	let { imageUrl, isLoading }: Props = $props();
</script>

{#if isLoading}
	<div class="loading loading-spinner loading-lg"></div>
{:else if imageUrl}
	<div class="picture-frame">
		<div class="image-container">
			<img src={imageUrl} alt="" />
			<div class="shadow-overlay"></div>
		</div>
	</div>
{/if}

<style>
	:root {
		--frame-border-width: 50px;
		--inside-frame-border-width: 5px;
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

	img {
		display: block;
		max-width: calc(100vw - var(--frame-border-width));
		max-height: calc(100vh - var(--frame-border-width));
		width: auto;
		height: auto;
		object-fit: contain;
		border: var(--inside-frame-border-width) solid white;
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
