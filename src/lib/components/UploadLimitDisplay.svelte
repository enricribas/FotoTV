<script lang="ts">
	export let remaining: number;
	export let limit: number;
	export let canUpload: boolean;

	$: used = limit - remaining;
	$: percentage = limit > 0 ? (used / limit) * 100 : 0;
	$: isLow = remaining <= 2 && remaining > 0;
	$: isExhausted = remaining === 0;
</script>

<div class="w-full rounded-lg border bg-white p-4 shadow-sm">
	<div class="mb-3 flex items-center justify-between">
		<h3 class="text-sm font-medium text-gray-700">Upload Limit</h3>
		<span
			class="text-sm font-semibold"
			class:text-green-600={canUpload && !isLow}
			class:text-amber-600={isLow}
			class:text-red-600={isExhausted}
		>
			{used}/{limit}
		</span>
	</div>

	<!-- Progress Bar -->
	<div class="mb-2 h-2 w-full rounded-full bg-gray-200">
		<div
			class="h-2 rounded-full transition-all duration-300"
			class:bg-green-500={canUpload && !isLow}
			class:bg-amber-500={isLow}
			class:bg-red-500={isExhausted}
			style="width: {percentage}%"
		></div>
	</div>

	<!-- Status Message -->
	<div class="text-center text-xs">
		{#if isExhausted}
			<span class="font-medium text-red-600">
				<svg class="mr-1 inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
					/>
				</svg>
				Collection upload limit reached
			</span>
		{:else if isLow}
			<span class="font-medium text-amber-600">
				<svg class="mr-1 inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
					/>
				</svg>
				Running low on uploads!
			</span>
		{:else}
			<span class="text-gray-600">
				<svg class="mr-1 inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				{remaining} uploads remaining
			</span>
		{/if}
	</div>
</div>
