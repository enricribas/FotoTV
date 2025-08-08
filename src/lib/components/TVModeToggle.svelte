<script lang="ts">
	import { onMount } from 'svelte';
	import { enableTVMode, disableTVMode, isTVModeEnabled } from '$lib/advancedDeviceDetection';

	let isTVMode = false;
	let showToggle = false;

	onMount(() => {
		isTVMode = isTVModeEnabled();
		// Show toggle in development mode or if explicitly enabled
		showToggle = import.meta.env.DEV || localStorage.getItem('show_tv_toggle') === 'true';
	});

	function toggleTVMode() {
		if (isTVMode) {
			disableTVMode();
		} else {
			enableTVMode();
		}
	}

	function toggleShowToggle() {
		const newValue = !showToggle;
		showToggle = newValue;
		if (newValue) {
			localStorage.setItem('show_tv_toggle', 'true');
		} else {
			localStorage.removeItem('show_tv_toggle');
		}
	}
</script>

<!-- Development TV Mode Toggle -->
{#if showToggle}
	<div class="fixed bottom-4 right-4 z-50">
		<div class="dropdown dropdown-top dropdown-end">
			<div tabindex="0" role="button" class="btn btn-circle btn-sm bg-purple-600 text-white hover:bg-purple-700">
				{isTVMode ? '📺' : '📱'}
			</div>
			<div tabindex="0" class="dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
				<div class="space-y-2">
					<div class="text-xs font-semibold text-gray-600">Development Mode</div>

					<button
						class="btn btn-sm w-full {isTVMode ? 'btn-success' : 'btn-outline'}"
						on:click={toggleTVMode}
					>
						{#if isTVMode}
							📺 TV Mode (ON)
						{:else}
							📱 Mobile Mode
						{/if}
					</button>

					<div class="text-xs text-gray-500">
						{#if isTVMode}
							App is in TV mode - shows TV login interface
						{:else}
							App is in mobile mode - shows regular login
						{/if}
					</div>

					<div class="border-t pt-2">
						<div class="text-xs text-gray-600 mb-1">Quick Access URLs:</div>
						<div class="space-y-1">
							<a
								href="?tv=true"
								class="btn btn-xs btn-outline w-full"
								target="_blank"
							>
								📺 Open TV Mode
							</a>
							<a
								href="/"
								class="btn btn-xs btn-outline w-full"
								target="_blank"
							>
								📱 Open Mobile Mode
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else if import.meta.env.DEV}
	<!-- Hidden toggle to show the main toggle -->
	<button
		class="fixed bottom-2 right-2 z-50 opacity-10 hover:opacity-100 transition-opacity"
		on:click={toggleShowToggle}
		title="Show TV mode toggle"
	>
		<div class="w-3 h-3 bg-purple-600 rounded-full"></div>
	</button>
{/if}
