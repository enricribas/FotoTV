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
		<img src={imageUrl} alt="" class="framed-image" />
	</div>
{/if}

<style>
	:root {
		--frame-border-width: 50px;
	}

	.picture-frame {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--frame-border-width);
		background-color: #fafafa;
		border: 1px solid #e5e5e5;
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.1),
			0 4px 8px rgba(0, 0, 0, 0.15),
			0 8px 16px rgba(0, 0, 0, 0.1),
			inset 4px 4px 8px rgba(0, 0, 0, 0.3),
			inset 0 0 0 2px rgba(0, 0, 0, 0.15);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}

	.picture-frame::before {
		content: '';
		position: absolute;
		top: calc(var(--frame-border-width) / 2);
		left: calc(var(--frame-border-width) / 2);
		right: calc(var(--frame-border-width) / 2);
		bottom: calc(var(--frame-border-width) / 2);
		background-color: gray;
		box-shadow:
			inset 4px 4px 8px rgba(0, 0, 0, 0.3),
			inset 0 0 0 2px rgba(0, 0, 0, 0.15);
		pointer-events: none;
	}

	.framed-image {
		display: block;
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
		box-shadow:
			inset 4px 4px 8px rgba(0, 0, 0, 0.3),
			inset 0 0 0 2px rgba(0, 0, 0, 0.15),
			0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.1);
		position: relative;
		z-index: 1;
	}
</style>
