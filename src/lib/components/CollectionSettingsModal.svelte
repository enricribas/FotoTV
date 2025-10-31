<script lang="ts">
	import type { ImageCollection } from '$lib/types/collection.types';
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { formatCollectionDisplayName, getCollectionOwnerName } from '$lib/utils/collectionUtils';
	import { auth } from '$lib/firebase';

	export let isOpen: boolean = false;
	export let collection: ImageCollection | null = null;

	const dispatch = createEventDispatcher<{
		close: void;
		save: { duration: number; name?: string; theme?: 'light' | 'dark' };
	}>();

	let duration = 30;
	let collectionName = '';
	let theme: 'light' | 'dark' = 'light';
	let isSaving = false;
	let collectionOwnerName: string | undefined;

	// Initialize values from collection
	$: if (collection) {
		duration = collection.time || 30;
		collectionName = collection.name || '';
		theme = collection.theme || 'light';
		// Reset saving state when collection changes
		isSaving = false;
		// Load owner name if needed
		loadOwnerName();
	}

	// Reset saving state when modal opens/closes
	$: if (isOpen) {
		isSaving = false;
	}

	async function loadOwnerName() {
		if (collection && auth.currentUser) {
			collectionOwnerName = await getCollectionOwnerName(collection, auth.currentUser.uid);
		}
	}

	// Handle duration input changes
	function handleDurationChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = parseInt(target.value);
		if (!isNaN(value)) {
			duration = value;
		}
	}

	function handleClose() {
		isSaving = false;
		dispatch('close');
	}

	async function handleSave() {
		isSaving = true;
		const saveData: { duration: number; name?: string; theme?: 'light' | 'dark' } = { duration };

		// Only include name if it has changed
		if (collectionName.trim() && collectionName.trim() !== collection?.name) {
			saveData.name = collectionName.trim();
		}

		// Only include theme if it has changed
		if (theme !== (collection?.theme || 'light')) {
			saveData.theme = theme;
		}

		dispatch('save', saveData);
		// Reset isSaving after a short delay to show the saving state
		setTimeout(() => {
			isSaving = false;
		}, 100);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	function formatDuration(seconds: number): string {
		if (seconds === 60) {
			return '1 minute';
		} else if (seconds < 60) {
			return `${seconds} seconds`;
		} else if (seconds >= 3600 && seconds % 3600 === 0) {
			const hours = seconds / 3600;
			return hours === 1 ? '1 hour' : `${hours} hours`;
		} else if (seconds >= 3600) {
			const hours = Math.floor(seconds / 3600);
			const minutes = Math.floor((seconds % 3600) / 60);
			const secs = seconds % 60;
			let parts = [];
			if (hours > 0) parts.push(hours === 1 ? '1 hour' : `${hours} hours`);
			if (minutes > 0) parts.push(minutes === 1 ? '1 minute' : `${minutes} minutes`);
			if (secs > 0) parts.push(`${secs} seconds`);
			return parts.join(' ');
		} else if (seconds % 60 === 0) {
			const minutes = seconds / 60;
			return minutes === 1 ? '1 minute' : `${minutes} minutes`;
		} else {
			const minutes = Math.floor(seconds / 60);
			const secs = seconds % 60;
			return minutes > 0 ? `${minutes} minutes ${secs} seconds` : `${seconds} seconds`;
		}
	}
</script>

{#if isOpen && collection}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 bg-black/50"
		transition:fade={{ duration: 200 }}
		on:click={handleBackdropClick}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<!-- Modal -->
		<div
			class="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl"
			transition:scale={{ duration: 200, start: 0.95 }}
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="presentation"
		>
			<!-- Header -->
			<div class="mb-4 flex items-center justify-between">
				<h2 id="modal-title" class="text-xl font-semibold text-gray-900">
					{formatCollectionDisplayName(collection, collectionOwnerName)} Settings
				</h2>
				<button
					type="button"
					on:click={handleClose}
					class="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
					aria-label="Close modal"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Collection Name Setting -->
			<div class="mb-6">
				<label for="collection-name-input" class="mb-2 block text-sm font-medium text-gray-700">
					Collection Name
				</label>
				<input
					id="collection-name-input"
					type="text"
					bind:value={collectionName}
					placeholder="Enter collection name"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
					disabled={isSaving}
				/>
			</div>

			<!-- Duration Setting -->
			<div class="mb-6">
				<label for="duration-input" class="mb-2 block text-sm font-medium text-gray-700">
					Slide Duration (seconds)
				</label>
				<div class="flex items-center space-x-3">
					<input
						id="duration-input"
						type="number"
						bind:value={duration}
						on:input={handleDurationChange}
						step="1"
						class="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
						disabled={isSaving}
					/>
					<span class="text-sm text-gray-500">{formatDuration(duration)}</span>
				</div>
				<p class="mt-2 text-xs text-gray-500">
					How long each image will be displayed in the slideshow
				</p>
			</div>

			<!-- Theme Setting -->
			<div class="mb-6">
				<label for="theme-select" class="mb-2 block text-sm font-medium text-gray-700">
					Slideshow Theme
				</label>
				<select
					id="theme-select"
					bind:value={theme}
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
					disabled={isSaving}
				>
					<option value="light">Light Mode</option>
					<option value="dark">Dark Mode</option>
				</select>
				<p class="mt-2 text-xs text-gray-500">
					Background color around photos in the slideshow
				</p>
			</div>

			<!-- Shared With Section (only for owned collections) -->
			{#if !collection.owner && collection.sharedWith && collection.sharedWith.length > 0}
				<div class="mb-6 border-t border-gray-200 pt-6">
					<h3 class="mb-3 text-sm font-medium text-gray-700">Shared With</h3>
					<div class="space-y-2">
						{#each collection.sharedWith as person (person.uid)}
							<div class="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
								<div class="flex items-center space-x-3">
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-medium text-orange-800"
									>
										{person.displayName.charAt(0).toUpperCase()}
									</div>
									<span class="text-sm text-gray-900">{person.displayName}</span>
								</div>
								<span class="text-xs text-gray-500">
									{new Date(person.sharedAt).toLocaleDateString()}
								</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Footer -->
			<div class="flex justify-end space-x-3">
				<button
					type="button"
					on:click={handleClose}
					class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
					disabled={isSaving}
				>
					Cancel
				</button>
				<button
					type="button"
					on:click={handleSave}
					class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isSaving}
				>
					{#if isSaving}
						<svg class="mr-2 inline h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
						Saving...
					{:else}
						Save
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
