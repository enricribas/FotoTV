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
	class="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 p-4"
>
	<!-- User info in top right corner of entire page -->
	{#if $user}
		<div class="absolute top-4 right-4 flex items-center space-x-2 bg-white rounded-lg p-2 shadow-md z-10">
			{#if $user.photoURL}
				<div class="avatar">
					<div class="w-8 h-8 rounded-full ring ring-orange-500 ring-offset-1 ring-offset-white">
						<img src={$user.photoURL} alt="User avatar" />
					</div>
				</div>
			{:else}
				<div class="w-8 h-8 rounded-full ring ring-orange-500 ring-offset-1 ring-offset-white bg-orange-500 flex items-center justify-center">
					<span class="text-white text-sm font-semibold">
						{$user.displayName ? $user.displayName.charAt(0).toUpperCase() : $user.email?.charAt(0).toUpperCase() || 'U'}
					</span>
				</div>
			{/if}
			<div class="text-sm text-gray-700">
				<span class="font-semibold text-red-600">{$user.displayName || $user.email}</span>
			</div>
		</div>
	{/if}

	<div class="card w-full max-w-md border border-orange-200 bg-white p-8 shadow-xl">
		<div class="mb-4 flex justify-center">
			<img src="/FotoTV-logo.jpeg" alt="FotoTV Logo" class="h-16 w-auto" />
		</div>
		<h1 class="mb-4 text-center text-2xl font-bold text-orange-600">FotoTV</h1>
		{#if $user}
			<LoggedInView user={$user} uploadedImages={$uploadedImages} />
		{:else}
			<LoggedOutView />
		{/if}
	</div>
</div>
