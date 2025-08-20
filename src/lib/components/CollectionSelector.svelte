<script lang="ts">
	import type { ImageCollection } from '$lib/types/collection.types';
	import type { UserProfile } from '$lib/types/user.types';
	import { onMount, createEventDispatcher } from 'svelte';
	import { CollectionService } from '$lib/collectionService';
	import { UserService } from '$lib/userService';
	import type { User } from 'firebase/auth';

	export let selectedCollectionUuid: string;
	export let collections: ImageCollection[] = [];
	export let user: User;

	const dispatch = createEventDispatcher<{
		collectionChange: { collectionUuid: string; collection: ImageCollection };
		collectionsUpdated: void;
	}>();

	let isOpen = false;
	let selectedCollection: ImageCollection | null = null;
	let isCreating = false;
	let newCollectionName = '';
	let userProfile: UserProfile | null = null;

	// Check if user has pro plan
	$: hasProPlan = userProfile?.plan === 'pro';

	// Load user profile to check plan
	async function loadUserProfile() {
		if (user) {
			userProfile = await UserService.getUserProfile(user);
		}
	}

	// Find the selected collection object
	$: selectedCollection = collections.find((c) => c.uuid === selectedCollectionUuid) || null;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectCollection(collection: ImageCollection) {
		dispatch('collectionChange', {
			collectionUuid: collection.uuid,
			collection: collection
		});
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleClickOutside(event: Event) {
		const target = event.target as HTMLElement;
		const dropdown = document.getElementById('collection-selector');
		if (dropdown && !dropdown.contains(target)) {
			isOpen = false;
		}
	}

	async function createNewCollection() {
		if (!newCollectionName.trim()) return;

		try {
			isCreating = true;
			const newCollectionUuid = await CollectionService.createCollection(
				user,
				newCollectionName.trim()
			);

			// Wait for the collection to be fully available
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Notify parent to reload collections
			dispatch('collectionsUpdated');

			// Reset form
			newCollectionName = '';
			isOpen = false;

			// Wait a bit more then auto-select the new collection
			setTimeout(async () => {
				// Verify the collection exists before selecting
				const collectionExists = await CollectionService.verifyCollectionExists(
					user,
					newCollectionUuid
				);
				if (collectionExists) {
					// Reload collections to get the latest data
					const updatedCollections = await CollectionService.getUserCollections(user);
					const newCollection = updatedCollections.find((c) => c.uuid === newCollectionUuid);
					if (newCollection) {
						// Update the collections array so the new collection shows up immediately
						collections = [...collections, newCollection];

						dispatch('collectionChange', {
							collectionUuid: newCollectionUuid,
							collection: newCollection
						});
					}
				}
			}, 500);
		} catch (error) {
			console.error('Failed to create collection:', error);
			const message = error instanceof Error ? error.message : 'Unknown error';
			alert('Failed to create collection: ' + message);
		} finally {
			isCreating = false;
		}
	}

	function handleCreateKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			createNewCollection();
		} else if (event.key === 'Escape') {
			newCollectionName = '';
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		// Load user profile when component mounts
		loadUserProfile();

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{#if collections.length > 1}
	<div id="collection-selector" class="relative mx-auto w-full max-w-md">
		<button
			type="button"
			class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm hover:bg-gray-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
			on:click={toggleDropdown}
			aria-haspopup="listbox"
			aria-expanded={isOpen}
		>
			<div class="flex min-w-0 flex-1 items-center">
				<span class="block truncate text-sm font-medium text-gray-900">
					{selectedCollection ? selectedCollection.name : 'Select Collection'}
				</span>
			</div>
			<svg
				class="h-5 w-5 text-gray-400 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if isOpen}
			<div
				class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg"
			>
				<ul class="py-1" role="listbox">
					{#each collections as collection (collection.uuid)}
						<li>
							<button
								type="button"
								class="w-full px-4 py-2 text-left text-sm hover:bg-orange-50 hover:text-orange-900 focus:bg-orange-50 focus:text-orange-900 focus:outline-none {selectedCollectionUuid ===
								collection.uuid
									? 'bg-orange-100 text-orange-900'
									: 'text-gray-900'}"
								on:click={() => selectCollection(collection)}
								role="option"
								aria-selected={selectedCollectionUuid === collection.uuid}
							>
								<div class="flex items-center justify-between">
									<div class="min-w-0 flex-1">
										<span class="block truncate font-medium">
											{collection.name}
										</span>
										<span class="block truncate text-xs text-gray-500">
											{collection.currentImageCount} / {collection.imageUploadLimit} images
										</span>
									</div>
									{#if selectedCollectionUuid === collection.uuid}
										<svg
											class="ml-2 h-4 w-4 flex-shrink-0 text-orange-600"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/>
										</svg>
									{/if}
								</div>
							</button>
						</li>
					{/each}

					<!-- Add New Collection Section (Pro users only) -->
					{#if hasProPlan}
						<li class="border-t border-gray-200">
							<div class="px-4 py-2">
								<div class="flex items-center space-x-2">
									<input
										type="text"
										placeholder="New collection name"
										bind:value={newCollectionName}
										on:keydown={handleCreateKeydown}
										class="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
										disabled={isCreating}
									/>
									<button
										type="button"
										on:click={createNewCollection}
										disabled={isCreating || !newCollectionName.trim()}
										class="rounded bg-orange-500 px-2 py-1 text-xs text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
									>
										{#if isCreating}
											<svg class="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
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
											Add
										{/if}
									</button>
								</div>
							</div>
						</li>
					{/if}
				</ul>
			</div>
		{/if}
	</div>
{/if}
