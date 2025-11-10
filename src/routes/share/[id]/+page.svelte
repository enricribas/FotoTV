<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { db, auth } from '$lib/firebase';
	import { doc, getDoc, setDoc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore';
	import { onAuthStateChanged, type User } from 'firebase/auth';
	import type { ImageCollection } from '$lib/types/collection.types';
	import SharedSlideshow from '$lib/components/SharedSlideshow.svelte';
	import { CollectionService } from '$lib/collectionService';

	interface ShareData {
		collection: ImageCollection;
		owner: string;
		ownerEmail?: string;
		ownerDisplayName?: string;
	}

	let loading = true;
	let error = '';
	let collection: ImageCollection | null = null;
	let ownerEmail = '';
	let ownerDisplayName = '';
	let currentUser: User | null = null;
	let isAuthenticating = true;
	let isCopying = false;
	let shareId: string;
	let showCopySuccess = false;

	async function loadSharedCollection() {
		try {
			shareId = $page.params.id;

			// Get share document
			const shareDoc = await getDoc(doc(db, 'shares', shareId));

			if (!shareDoc.exists()) {
				error = 'This share link is invalid or has expired.';
				return;
			}

			const shareData = shareDoc.data() as ShareData;

			// Get collection data from the share document
			if (shareData.collection) {
				collection = shareData.collection as ImageCollection;
			} else {
				error = 'The shared collection data is not available.';
				return;
			}

			// Get owner email if available
			if (shareData.ownerEmail) {
				ownerEmail = shareData.ownerEmail;
			}

			// Get owner display name if owner field exists
			if (shareData.owner) {
				try {
					const userDoc = await getDoc(doc(db, 'users', shareData.owner));
					if (userDoc.exists()) {
						const userData = userDoc.data();
						if (userData.displayName) {
							ownerDisplayName = userData.displayName;
						}
					}
				} catch (err) {
					console.error('Error loading owner profile:', err);
				}
			}

			// If user is logged in and doesn't own this collection, copy it
			if (currentUser && shareData.owner !== currentUser.uid) {
				await copyCollectionToUser(shareData);
			}
		} catch (err) {
			console.error('Error loading shared collection:', err);
			error = 'Failed to load the shared collection. Please try again later.';
		} finally {
			loading = false;
		}
	}

	async function copyCollectionToUser(shareData: ShareData) {
		if (isCopying || !currentUser) return;

		isCopying = true;
		try {
			// Check if user already has this shared collection
			let userCollections = await CollectionService.getUserCollections(currentUser);

			// If user has no collections, create the defaults first
			if (userCollections.length === 0) {
				await CollectionService.getPrimaryCollection(currentUser); // This creates default collections
				// Reload collections after creation
				userCollections = await CollectionService.getUserCollections(currentUser);
			}

			const existingShared = userCollections.find((c) => c.uuid === shareData.collection.uuid);

			if (!existingShared) {
				// Create a new collection document for the user, preserving the original UUID
				const originalUuid = shareData.collection.uuid;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { uuid, ...collectionWithoutUuid } = shareData.collection;
				const collectionData = {
					...collectionWithoutUuid,
					owner: shareData.owner, // Original owner's ID
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp()
				};

				await setDoc(
					doc(db, 'users', currentUser.uid, 'collections', originalUuid),
					collectionData
				);

				// Update the original collection's sharedWith array
				await updateOriginalCollectionSharedWith(shareData);

				// Show success message
				showCopySuccess = true;
				setTimeout(() => {
					showCopySuccess = false;
				}, 3000);
			}
		} catch (err) {
			console.error('Error copying collection:', err);
		} finally {
			isCopying = false;
		}
	}

	async function updateOriginalCollectionSharedWith(shareData: ShareData) {
		if (!currentUser) return;

		try {
			// Get current user's display name
			const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
			const userData = userDoc.exists() ? userDoc.data() : null;
			const displayName = userData?.displayName || currentUser.email || 'Unknown User';

			// Update the original owner's collection with sharedWith info
			const originalCollectionRef = doc(
				db,
				'users',
				shareData.owner,
				'collections',
				shareData.collection.uuid
			);

			await updateDoc(originalCollectionRef, {
				sharedWith: arrayUnion({
					uid: currentUser.uid,
					displayName: displayName,
					sharedAt: new Date()
				})
			});
		} catch (err) {
			console.error('Error updating original collection sharedWith:', err);
			// Don't throw - this is not critical for the share to work
		}
	}

	function handleLogin() {
		// Store the current share URL to return after login
		sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
		goto('/');
	}

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			currentUser = user;
			isAuthenticating = false;

			if (user) {
				// User is logged in, load the shared collection
				await loadSharedCollection();
			} else {
				// User is not logged in, still load to show preview
				await loadSharedCollection();
			}
		});

		return () => unsubscribe();
	});
</script>

<svelte:head>
	<title>{collection ? `${collection.name} - Shared Collection` : 'Loading...'} | PhotoTV</title>
</svelte:head>

<div class="min-h-screen bg-gray-100">
	{#if loading || isAuthenticating}
		<div class="flex h-screen items-center justify-center">
			<div class="text-center">
				<svg class="mx-auto h-12 w-12 animate-spin text-orange-600" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<p class="mt-4 text-gray-600">
					{isAuthenticating ? 'Checking authentication...' : 'Loading shared collection...'}
				</p>
			</div>
		</div>
	{:else if error}
		<div class="flex h-screen items-center justify-center px-4">
			<div class="text-center">
				<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
					<svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				</div>
				<h1 class="mt-4 text-2xl font-semibold text-gray-900">Oops!</h1>
				<p class="mt-2 text-gray-600">{error}</p>
				<div class="mt-6">
					<a
						href="/"
						class="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
					>
						Go to PhotoTV
					</a>
				</div>
			</div>
		</div>
	{:else if collection}
		<div class="relative h-screen w-screen overflow-hidden">
			<!-- Header -->
			<div
				class="absolute top-0 right-0 left-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6"
			>
				<div class="flex items-center justify-between">
					<div class="text-white">
						<h1 class="text-2xl font-bold">
							{#if ownerDisplayName}
								{ownerDisplayName} - {collection.name}
							{:else}
								{collection.name}
							{/if}
						</h1>
						<p class="text-sm opacity-90">
							{collection.currentImageCount} photos
							{#if ownerEmail}
								• Shared by {ownerEmail}
							{/if}
						</p>
					</div>
					<a
						href="/"
						class="inline-flex items-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						Back to PhotoTV
					</a>
				</div>
			</div>

			<!-- Auth prompt for non-logged in users -->
			{#if !currentUser}
				<div
					class="absolute right-0 bottom-0 left-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6"
				>
					<div class="mx-auto max-w-2xl text-center text-white">
						<h2 class="mb-2 text-xl font-semibold">Want to save this collection?</h2>
						<p class="mb-4 text-sm opacity-90">
							Sign in to add this collection to your library and access it anytime
						</p>
						<button
							on:click={handleLogin}
							class="inline-flex items-center rounded-md bg-orange-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
						>
							Sign In to Save Collection
						</button>
					</div>
				</div>
			{/if}

			<!-- Success notification -->
			{#if showCopySuccess}
				<div class="absolute top-20 left-1/2 z-30 -translate-x-1/2 transform">
					<div class="flex items-center rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg">
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Collection added to your library!
					</div>
				</div>
			{/if}

			<!-- Slideshow Display -->
			{#if collection.currentImageCount > 0}
				<SharedSlideshow
					collectionUuid={collection.uuid}
					interval={collection.time || 10}
					theme={collection.theme || 'light'}
				/>
			{:else}
				<div class="flex h-full items-center justify-center">
					<div class="text-center">
						<svg
							class="mx-auto h-24 w-24 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<h2 class="mt-4 text-xl font-semibold text-gray-700">No photos in this collection</h2>
						<p class="mt-2 text-gray-500">This collection doesn't have any photos yet.</p>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>
