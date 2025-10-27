<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { User } from 'firebase/auth';

	export let isOpen: boolean;
	export let user: User | null;

	const dispatch = createEventDispatcher();

	function close() {
		isOpen = false;
		dispatch('close');
	}

	function handleLogout() {
		dispatch('logout');
		close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			close();
		}
	}

	function getUserInitials(user: User | null): string {
		if (!user) return '';
		if (user.displayName) {
			return user.displayName
				.split(' ')
				.map((name) => name[0])
				.join('')
				.toUpperCase()
				.slice(0, 2);
		}
		if (user.email) {
			return user.email[0].toUpperCase();
		}
		return 'U';
	}

	function getUserDisplayText(user: User | null): string {
		if (!user) return '';
		return user.displayName || user.email || 'User';
	}
</script>

{#if isOpen && user}
	<div
		class="fixed inset-0 z-50 overflow-y-auto"
		aria-labelledby="profile-modal-title"
		role="dialog"
		aria-modal="true"
		on:keydown={handleKeydown}
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
				class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:align-middle"
			>
				<div class="bg-white px-4 pt-5 pb-4 sm:p-6">
					<!-- User Profile Section -->
					<div class="flex flex-col items-center">
						<!-- Avatar -->
						{#if user.photoURL}
							<div class="mb-4">
								<img
									src={user.photoURL}
									alt="User avatar"
									class="h-20 w-20 rounded-full ring-4 ring-orange-500 ring-offset-2"
								/>
							</div>
						{:else}
							<div
								class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 ring-4 ring-orange-500 ring-offset-2"
							>
								<span class="text-2xl font-bold text-white">
									{getUserInitials(user)}
								</span>
							</div>
						{/if}

						<!-- User Info -->
						<h3 class="text-lg font-medium text-gray-900" id="profile-modal-title">
							{getUserDisplayText(user)}
						</h3>
						{#if user.email && user.email !== user.displayName}
							<p class="mt-1 text-sm text-gray-500">{user.email}</p>
						{/if}

						<!-- Divider -->
						<div class="my-4 w-full border-t border-gray-200"></div>

						<!-- Actions -->
						<div class="w-full space-y-3">
							<button
								type="button"
								on:click={handleLogout}
								class="flex w-full items-center justify-center rounded-lg border border-red-500 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
							>
								<svg
									class="mr-2 h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
								Logout
							</button>

							<button
								type="button"
								on:click={close}
								class="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
