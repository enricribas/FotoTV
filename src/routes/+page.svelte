<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { ImageService } from '$lib/imageService';
	import LoggedInView from './LoggedInView.svelte';
	import LoggedOutView from './LoggedOutView.svelte';

	const user = writable<User | null>(null);
	const uploadedImages = writable<string[]>([]);

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, async (u) => {
			user.set(u);
			if (u) {
				const images = await ImageService.loadUserImages(u);
				uploadedImages.set(images);
			} else {
				uploadedImages.set([]);
			}
		});
		return unsubscribe;
	});
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 p-4"
>
	<div class="card w-full max-w-md border border-orange-200 bg-white p-8 shadow-xl">
		<h1 class="mb-4 text-center text-2xl font-bold text-orange-600">FotoTV</h1>
		{#if $user}
			<LoggedInView user={$user} uploadedImages={$uploadedImages} />
		{:else}
			<LoggedOutView />
		{/if}
	</div>
</div>
