<script lang="ts">
	import type { ImageCollection } from '$lib/types/collection.types';
	import type { User } from 'firebase/auth';
	import { createEventDispatcher, onMount } from 'svelte';
	import { CollectionService } from '$lib/collectionService';
	import { formatCollectionDisplayName, getCollectionOwnerName } from '$lib/utils/collectionUtils';

	let {
		collections = [],
		user,
		isOpen = false,
		selectedFile = null,
		selectedFiles = []
	}: {
		collections?: ImageCollection[];
		user: User;
		isOpen?: boolean;
		selectedFile?: File | null;
		selectedFiles?: File[];
	} = $props();

	const dispatch = createEventDispatcher<{
		confirm: { selectedCollections: ImageCollection[] };
		cancel: void;
	}>();

	let selectedCollectionUuids = $state<string[]>([]);
	let uploadLimits = $state<
		Record<string, { canUpload: boolean; remaining: number; limit: number }>
	>({});
	let loadingLimits = $state(true);
	let collectionOwnerNames = $state<Record<string, string>>({});
	let usingSavedSelections = $state(false);

	// LocalStorage key for saving selected collections
	const STORAGE_KEY = 'phototv_last_selected_collections';

	// Load upload limits for all collections
	async function loadUploadLimits() {
		loadingLimits = true;
		try {
			const limits: Record<string, { canUpload: boolean; remaining: number; limit: number }> = {};

			for (const collection of collections) {
				const limit = await CollectionService.canUploadImage(user, collection.uuid);
				limits[collection.uuid] = limit;
			}

			uploadLimits = limits;

			// Load owner names for collections
			await loadOwnerNames();
		} catch (error) {
			console.error('Error loading upload limits:', error);
		} finally {
			loadingLimits = false;
		}
	}

	// Load owner names for collections
	async function loadOwnerNames() {
		const ownerNames: Record<string, string> = {};

		for (const collection of collections) {
			if (collection.owner && collection.owner !== user.uid) {
				const ownerName = await getCollectionOwnerName(collection, user.uid);
				if (ownerName) {
					ownerNames[collection.uuid] = ownerName;
				}
			}
		}

		collectionOwnerNames = ownerNames;
	}

	// Load saved selections from localStorage
	function loadSavedSelections(): string[] | null {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				// Validate that it's an array of strings
				if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
					return parsed;
				}
			}
		} catch (error) {
			console.error('Error loading saved selections:', error);
		}
		return null;
	}

	// Save selections to localStorage
	function saveSelections(selections: string[]) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
		} catch (error) {
			console.error('Error saving selections:', error);
		}
	}

	// Initialize with collections that can accept uploads
	function initializeSelection() {
		// First, try to load saved selections
		const savedSelections = loadSavedSelections();

		if (savedSelections && savedSelections.length > 0) {
			// Filter saved selections to only include collections that:
			// 1. Still exist in the current collections list
			// 2. Can accept uploads
			selectedCollectionUuids = savedSelections.filter((uuid) =>
				collections.some((c) => c.uuid === uuid && uploadLimits[c.uuid]?.canUpload)
			);

			// If we successfully restored at least one saved selection
			if (selectedCollectionUuids.length > 0) {
				usingSavedSelections = true;
			} else {
				// If no saved collections are valid, fall back to selecting all that can upload
				selectedCollectionUuids = collections
					.filter((collection) => uploadLimits[collection.uuid]?.canUpload)
					.map((collection) => collection.uuid);
				usingSavedSelections = false;
			}
		} else {
			// No saved selections, default to all collections that can accept uploads
			selectedCollectionUuids = collections
				.filter((collection) => uploadLimits[collection.uuid]?.canUpload)
				.map((collection) => collection.uuid);
			usingSavedSelections = false;
		}
	}

	function toggleCollection(collectionUuid: string) {
		if (selectedCollectionUuids.includes(collectionUuid)) {
			selectedCollectionUuids = selectedCollectionUuids.filter((id) => id !== collectionUuid);
		} else {
			selectedCollectionUuids = [...selectedCollectionUuids, collectionUuid];
		}
	}

	function handleConfirm() {
		const selectedCollections = collections.filter((collection) =>
			selectedCollectionUuids.includes(collection.uuid)
		);

		if (selectedCollections.length === 0) {
			alert('Please select at least one collection to upload to.');
			return;
		}

		// Check that all selected collections can accept uploads
		const invalidCollections = selectedCollections.filter(
			(collection) => !uploadLimits[collection.uuid]?.canUpload
		);

		if (invalidCollections.length > 0) {
			alert(
				`The following collections have reached their upload limit: ${invalidCollections.map((c) => c.name).join(', ')}`
			);
			return;
		}

		// Save the selected collections for next time
		saveSelections(selectedCollectionUuids);

		dispatch('confirm', { selectedCollections });
	}

	function handleCancel() {
		dispatch('cancel');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleCancel();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleCancel();
		}
	}

	// Initialize when component mounts or when collections change
	$effect(() => {
		if (isOpen && collections.length > 0) {
			loadUploadLimits().then(() => {
				initializeSelection();
			});
		}
	});

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{#if isOpen}
	<!-- Modal Backdrop -->
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="button"
		aria-label="Close modal"
		tabindex="-1"
	>
		<!-- Modal Content -->
		<div
			class="w-full max-w-md rounded-lg bg-white shadow-xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={handleKeydown}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabindex="0"
		>
			<!-- Header -->
			<div class="border-b border-gray-200 px-6 py-4">
				<h3 id="modal-title" class="text-lg font-semibold text-gray-900">
					Select Collections to Upload To
				</h3>
				{#if selectedFiles && selectedFiles.length > 0}
					<p class="mt-1 text-sm text-gray-600">
						Uploading: {selectedFiles.length} file{selectedFiles.length === 1 ? '' : 's'}
						{#if selectedFiles.length <= 3}
							({selectedFiles.map((f) => f.name).join(', ')})
						{/if}
					</p>
				{:else if selectedFile}
					<p class="mt-1 text-sm text-gray-600">
						Uploading: {selectedFile.name}
					</p>
				{/if}
			</div>

			<!-- Content -->
			<div class="max-h-96 overflow-y-auto px-6 py-4">
				{#if loadingLimits}
					<div class="flex items-center justify-center py-8">
						<div class="flex items-center space-x-2">
							<svg class="h-5 w-5 animate-spin text-orange-500" fill="none" viewBox="0 0 24 24">
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
							<span class="text-sm text-gray-600">Loading upload limits...</span>
						</div>
					</div>
				{:else}
					<div class="space-y-3">
						{#each collections as collection (collection.uuid)}
							{@const limit = uploadLimits[collection.uuid]}
							{@const canUpload = limit?.canUpload ?? false}
							{@const isSelected = selectedCollectionUuids.includes(collection.uuid)}

							<label
								class="flex cursor-pointer items-start space-x-3 rounded-lg border p-3 transition-colors {canUpload
									? 'border-gray-200 hover:bg-gray-50'
									: 'cursor-not-allowed border-red-200 bg-red-50'} {isSelected && canUpload
									? 'border-orange-200 bg-orange-50'
									: ''}"
							>
								<input
									type="checkbox"
									class="mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 disabled:cursor-not-allowed"
									checked={isSelected}
									disabled={!canUpload}
									onchange={() => toggleCollection(collection.uuid)}
								/>

								<div class="min-w-0 flex-1">
									<div class="flex items-center justify-between">
										<h4 class="text-sm font-medium {canUpload ? 'text-gray-900' : 'text-red-600'}">
											{formatCollectionDisplayName(
												collection,
												collectionOwnerNames[collection.uuid]
											)}
										</h4>
										{#if !canUpload}
											<span class="text-xs font-medium text-red-600"> Limit Reached </span>
										{/if}
									</div>

									<p class="text-xs {canUpload ? 'text-gray-500' : 'text-red-500'}">
										{collection.currentImageCount} / {collection.imageUploadLimit} images
										{#if limit}
											• {limit.remaining} remaining
										{/if}
									</p>

									{#if !canUpload}
										<p class="mt-1 text-xs text-red-500">
											This collection has reached its upload limit
										</p>
									{/if}
								</div>
							</label>
						{/each}
					</div>

					{#if usingSavedSelections}
						<div class="mt-3 rounded-lg bg-blue-50 p-3">
							<p class="text-xs text-blue-700">
								<svg class="mr-1 inline-block h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								Using your previous selection
							</p>
						</div>
					{/if}

					{#if collections.filter((c) => uploadLimits[c.uuid]?.canUpload).length === 0}
						<div class="mt-4 rounded-lg bg-red-50 p-4">
							<div class="flex">
								<svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clip-rule="evenodd"
									/>
								</svg>
								<div class="ml-3">
									<h3 class="text-sm font-medium text-red-800">
										No collections available for upload
									</h3>
									<p class="mt-1 text-sm text-red-700">
										All your collections have reached their upload limits.
									</p>
								</div>
							</div>
						</div>
					{/if}
				{/if}
			</div>

			<!-- Footer -->
			<div class="border-t border-gray-200 px-6 py-4">
				<div class="flex items-center justify-between">
					<p class="text-xs text-gray-500">
						{selectedCollectionUuids.length} collection{selectedCollectionUuids.length === 1
							? ''
							: 's'}
						selected
					</p>

					<div class="flex space-x-3">
						<button
							class="btn btn-sm border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
							onclick={handleCancel}
						>
							Cancel
						</button>

						<button
							class="btn btn-sm border-orange-500 bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
							onclick={handleConfirm}
							disabled={loadingLimits ||
								selectedCollectionUuids.length === 0 ||
								collections.filter((c) => uploadLimits[c.uuid]?.canUpload).length === 0}
						>
							{#if loadingLimits}
								<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
							{:else}
								Upload to Selected
							{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
