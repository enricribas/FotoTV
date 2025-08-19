<script lang="ts">
	import type { StorageReference } from 'firebase/storage';
	import PictureFrame from './PictureFrame.svelte';

	interface Props {
		loading: boolean;
		error: string | null;
		imageRefs: StorageReference[];
		currentImageUrl: string | null;
		onGoBack: () => void;
	}

	let { loading, error, imageRefs, currentImageUrl, onGoBack }: Props = $props();
</script>

<div class="absolute inset-0 flex items-center justify-center">
	{#if loading}
		<div class="loading loading-spinner loading-lg"></div>
	{:else if error}
		<button class="btn btn-primary" onclick={onGoBack}>Upload Images through phone app</button>
	{:else if imageRefs.length > 0}
		<div class="absolute inset-0 flex items-center justify-center p-8">
			<PictureFrame imageUrl={currentImageUrl} isLoading={false} />
		</div>
	{/if}
</div>
