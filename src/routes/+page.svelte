<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, googleProvider, storage } from '$lib/firebase';
	import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import type { User } from 'firebase/auth';
	import { writable } from 'svelte/store';

	const user = writable<User | null>(null);
	const uploading = writable<boolean>(false);
	const uploadedImages = writable<string[]>([]);

	let fileInput: HTMLInputElement;

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (u) => user.set(u));
		return unsubscribe;
	});

	function login() {
		signInWithPopup(auth, googleProvider).catch(console.error);
	}

	function logout() {
		signOut(auth).catch(console.error);
	}

	function triggerFileUpload() {
		fileInput?.click();
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0 || !$user) return;

		uploading.set(true);

		try {
			const file = files[0];

			// Validate file type
			if (!file.type.startsWith('image/')) {
				alert('Please select an image file');
				return;
			}

			// Create a unique filename
			const timestamp = Date.now();
			const fileName = `${$user.uid}/${timestamp}_${file.name}`;
			const storageRef = ref(storage, `images/${fileName}`);

			// Upload the file
			const snapshot = await uploadBytes(storageRef, file);

			// Get the download URL
			const downloadURL = await getDownloadURL(snapshot.ref);

			// Add to uploaded images list
			uploadedImages.update((images) => [...images, downloadURL]);

			console.log('File uploaded successfully:', downloadURL);
		} catch (error) {
			console.error('Upload failed:', error);
			alert('Upload failed. Please try again.');
		} finally {
			uploading.set(false);
			// Reset file input
			target.value = '';
		}
	}
</script>

<!-- Hidden file input -->
<input
	bind:this={fileInput}
	type="file"
	accept="image/*"
	on:change={handleFileUpload}
	class="hidden"
/>

<div class="bg-base-200 flex min-h-screen flex-col items-center justify-center p-4">
	<div class="card bg-base-100 w-full max-w-md p-8 shadow-xl">
		<h1 class="mb-4 text-center text-2xl font-bold text-blue-500">FotoTV</h1>
		{#if $user}
			<div class="flex flex-col items-center space-y-4">
				<div class="avatar mb-2">
					<div class="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
						<img src={$user.photoURL} alt="User avatar" />
					</div>
				</div>
				<p class="mb-2">Welcome, <span class="font-semibold">{$user.displayName}</span>!</p>

				<!-- Upload Button -->
				<button class="btn btn-secondary w-full" on:click={triggerFileUpload} disabled={$uploading}>
					{#if $uploading}
						<span class="loading loading-spinner loading-sm"></span>
						Uploading...
					{:else}
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/>
						</svg>
						Upload Photo
					{/if}
				</button>

				<button class="btn btn-error w-full" on:click={logout}>Logout</button>
			</div>
		{:else}
			<button class="btn btn-primary w-full" on:click={login}>
				<svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
					><g
						><path
							fill="#4285F4"
							d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C36.45 2.7 30.68 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.2C12.13 13.99 17.56 9.5 24 9.5z"
						/><path
							fill="#34A853"
							d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"
						/><path
							fill="#FBBC05"
							d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.7 15.32 0 19.56 0 24c0 4.44.7 8.68 2.69 12.24l7.98-6.2z"
						/><path
							fill="#EA4335"
							d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.19-5.6c-2.01 1.35-4.59 2.15-8.7 2.15-6.44 0-11.87-4.49-13.33-10.55l-7.98 6.2C6.73 42.18 14.82 48 24 48z"
						/><path fill="none" d="M0 0h48v48H0z" /></g
					></svg
				>
				Sign in with Google
			</button>
		{/if}
	</div>

	<!-- Display uploaded images -->
	{#if $user && $uploadedImages.length > 0}
		<div class="card bg-base-100 mt-4 w-full max-w-md p-6 shadow-xl">
			<h2 class="mb-4 text-lg font-semibold">Uploaded Photos</h2>
			<div class="grid grid-cols-2 gap-4">
				{#each $uploadedImages as imageUrl, index (imageUrl)}
					<div class="aspect-square overflow-hidden rounded-lg border">
						<img
							src={imageUrl}
							alt="Photo {index + 1}"
							class="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
