<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import type { ImageCollection } from '$lib/types/collection.types';
	import type { User } from 'firebase/auth';
	import { db } from '$lib/firebase';
	import {
		doc,
		setDoc,
		query,
		collection,
		where,
		getDocs,
		serverTimestamp
	} from 'firebase/firestore';
	import QRCode from 'qrcode';
	import { formatCollectionDisplayName, getCollectionOwnerName } from '$lib/utils/collectionUtils';
	import { setupKeyboardNavigation, shouldUseTVUI } from '$lib/tvUtils';

	export let isOpen: boolean;
	export let imageCollection: ImageCollection | null;
	export let user: User;

	const dispatch = createEventDispatcher();

	let shareUrl = '';
	let copying = false;
	let loading = false;
	let qrCodeDataUrl = '';
	let collectionOwnerName: string | undefined;
	let modalElement: HTMLElement;
	let keyboardNavCleanup: (() => void) | null = null;
	let isTVDevice = false;

	// Generate a UUID v4
	function generateUUID(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	async function generateShareUrl() {
		if (!imageCollection || !user) return;

		loading = true;
		try {
			// Check if share already exists for this collection
			const sharesRef = collection(db, 'shares');
			const q = query(
				sharesRef,
				where('collectionId', '==', imageCollection.uuid),
				where('owner', '==', user.uid)
			);
			const querySnapshot = await getDocs(q);

			let shareId: string;

			if (!querySnapshot.empty) {
				// Use existing share
				shareId = querySnapshot.docs[0].id;
			} else {
				// Create new share
				shareId = generateUUID();
				const shareDoc = doc(db, 'shares', shareId);
				await setDoc(shareDoc, {
					collectionId: imageCollection.uuid,
					owner: user.uid,
					createdAt: serverTimestamp(),
					collectionName: imageCollection.name,
					// Store complete collection data for public access
					collection: {
						uuid: imageCollection.uuid,
						name: imageCollection.name,
						owner: user.uid,
						currentImageCount: imageCollection.currentImageCount,
						imageUploadLimit: imageCollection.imageUploadLimit,
						time: imageCollection.time || 10,
						createdAt: imageCollection.createdAt,
						updatedAt: imageCollection.updatedAt
					}
				});
			}

			// Hardcode production URL to ensure it works in Android WebView
			// Using Firebase hosting URL based on project ID
			shareUrl = `https://fototv-90cf0.web.app/share/${shareId}`;

			// Generate QR code
			try {
				qrCodeDataUrl = await QRCode.toDataURL(shareUrl, {
					width: 200,
					margin: 2,
					color: {
						dark: '#000000',
						light: '#FFFFFF'
					}
				});
			} catch (qrError) {
				console.error('Error generating QR code:', qrError);
			}
		} catch (error) {
			console.error('Error generating share URL:', error);
			alert('Failed to generate share URL');
		} finally {
			loading = false;
		}
	}

	async function copyToClipboard() {
		if (!shareUrl) return;

		copying = true;
		try {
			await navigator.clipboard.writeText(shareUrl);
			// Show feedback
			setTimeout(() => {
				copying = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy:', error);
			alert('Failed to copy URL to clipboard');
			copying = false;
		}
	}

	function close() {
		cleanupTVNavigation();
		isOpen = false;
		shareUrl = '';
		qrCodeDataUrl = '';
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
		// Don't handle other keys here if TV navigation is active
		// Let setupKeyboardNavigation handle arrow keys
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			close();
		}
	}

	// Generate share URL when modal opens
	$: if (isOpen && imageCollection) {
		generateShareUrl();
		loadOwnerName();
		setupTVNavigation();
	}

	function setupTVNavigation() {
		if (modalElement && isTVDevice && isOpen) {
			// Small delay to ensure modal is fully rendered
			setTimeout(() => {
				keyboardNavCleanup = setupKeyboardNavigation(modalElement);
				// Focus the first focusable element
				const firstFocusable = modalElement.querySelector(
					'input, button:not([disabled])'
				) as HTMLElement;
				if (firstFocusable) {
					firstFocusable.focus();
				}
			}, 100);
		}
	}

	function cleanupTVNavigation() {
		if (keyboardNavCleanup) {
			keyboardNavCleanup();
			keyboardNavCleanup = null;
		}
	}

	async function loadOwnerName() {
		if (imageCollection && user) {
			collectionOwnerName = await getCollectionOwnerName(imageCollection, user.uid);
		}
	}

	onMount(() => {
		// Load TV device status
		shouldUseTVUI().then((result) => {
			isTVDevice = result;
		});

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	onDestroy(() => {
		cleanupTVNavigation();
	});
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 overflow-y-auto"
		aria-labelledby="share-modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
			<!-- Background overlay -->
			<div
				class="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity"
				on:click={handleBackdropClick}
				aria-hidden="true"
			></div>

			<!-- Modal panel -->
			<div
				bind:this={modalElement}
				class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
			>
				<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div
							class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10"
						>
							<svg class="h-6 w-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M16 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.928 9.24a4.02 4.02 0 0 1-.026 1.644l5.04 2.537a4 4 0 1 1-.867 1.803l-5.09-2.562a4 4 0 1 1 .083-5.228l5.036-2.522a4 4 0 1 1 .929 1.772L7.928 9.24zM4 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
								/>
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg leading-6 font-medium text-gray-900" id="share-modal-title">
								Share Collection
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									{#if imageCollection}
										Share "{formatCollectionDisplayName(imageCollection, collectionOwnerName)}" with
										others using the link below.
									{/if}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="px-4 pb-4 sm:px-6">
					{#if loading}
						<div class="flex items-center justify-center py-4">
							<svg class="h-8 w-8 animate-spin text-orange-600" fill="none" viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						</div>
					{:else if shareUrl}
						<div class="mt-3">
							<label for="share-url" class="block text-sm font-medium text-gray-700">
								Share URL
							</label>
							<div class="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									id="share-url"
									class="flex-1 rounded-l-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-orange-500 focus:ring-orange-500 {isTVDevice
										? 'focus:ring-4 focus:ring-blue-500 focus:ring-offset-2'
										: ''}"
									value={shareUrl}
									readonly
								/>
								<button
									type="button"
									on:click={copyToClipboard}
									class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none {isTVDevice
										? 'focus:ring-4 focus:ring-blue-500 focus:ring-offset-2'
										: ''}"
								>
									{#if copying}
										<svg
											class="h-5 w-5 text-green-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
										<span class="ml-2 text-green-600">Copied!</span>
									{:else}
										<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
											/>
										</svg>
										<span class="ml-2">Copy</span>
									{/if}
								</button>
							</div>

							{#if qrCodeDataUrl}
								<div class="mt-4 text-center">
									<p class="mb-2 text-sm text-gray-600">Or scan this QR code:</p>
									<div class="flex justify-center">
										<img
											src={qrCodeDataUrl}
											alt="QR Code for sharing"
											class="rounded border border-gray-300"
										/>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>

				<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					<button
						type="button"
						on:click={close}
						class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm {isTVDevice
							? 'focus:ring-4 focus:ring-blue-500 focus:ring-offset-2'
							: ''}"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
