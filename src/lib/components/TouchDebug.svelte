<script lang="ts">
	import { onMount } from 'svelte';
	import {
		isEchoShow,
		getAdvancedDeviceInfo,
		type AdvancedDeviceInfo
	} from '$lib/advancedDeviceDetection';

	let touchEvents: string[] = [];
	let deviceInfo: AdvancedDeviceInfo | null = null;
	let isEchoShowDevice = false;
	let touchSupported = false;

	export let visible = false;

	onMount(async () => {
		isEchoShowDevice = await isEchoShow();
		deviceInfo = await getAdvancedDeviceInfo();
		touchSupported = 'ontouchstart' in window;
	});

	function addEvent(event: string) {
		touchEvents = [event, ...touchEvents.slice(0, 9)]; // Keep last 10 events
	}

	function handleTouchStart(event: TouchEvent) {
		const touch = event.touches[0];
		addEvent(`TouchStart: x=${Math.round(touch.clientX)}, y=${Math.round(touch.clientY)}`);
	}

	function handleTouchMove(event: TouchEvent) {
		const touch = event.touches[0];
		addEvent(`TouchMove: x=${Math.round(touch.clientX)}, y=${Math.round(touch.clientY)}`);
	}

	function handleTouchEnd(event: TouchEvent) {
		const touch = event.changedTouches[0];
		addEvent(`TouchEnd: x=${Math.round(touch.clientX)}, y=${Math.round(touch.clientY)}`);
	}

	function handleClick(event: MouseEvent) {
		addEvent(`Click: x=${Math.round(event.clientX)}, y=${Math.round(event.clientY)}`);
	}

	function clearEvents() {
		touchEvents = [];
	}

	function toggleDebug() {
		visible = !visible;
	}

	function testFireTVTouch() {
		addEvent('Fire TV Touch Test - Manual trigger');
		// Enable touch debugging
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('touch_debug', 'true');
			addEvent('Touch debug logging enabled');
		}

		// Test touch event registration
		testTouchEventRegistration();
	}

	function testTouchEventRegistration() {
		addEvent('Testing touch event registration...');

		// Test if touch events are available
		if ('ontouchstart' in window) {
			addEvent('✓ ontouchstart available in window');
		} else {
			addEvent('✗ ontouchstart NOT available in window');
		}

		if ('TouchEvent' in window) {
			addEvent('✓ TouchEvent constructor available');
		} else {
			addEvent('✗ TouchEvent constructor NOT available');
		}

		// Test touch points
		addEvent(`Touch points: ${navigator.maxTouchPoints || 'unknown'}`);

		// Test if we're in Fire TV WebView
		const ua = navigator.userAgent;
		if (ua.includes('AFT') || ua.includes('Amazon')) {
			addEvent('✓ Fire TV detected in user agent');
		} else {
			addEvent('? Fire TV not clearly detected in user agent');
		}
	}

	function forceEchoShowMode() {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('force_echo_show', 'true');
			localStorage.setItem('touch_debug', 'true');
			addEvent('Force Echo Show mode enabled - reloading...');
			setTimeout(() => window.location.reload(), 1000);
		}
	}

	function resetDetection() {
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('force_echo_show');
			localStorage.removeItem('touch_debug');
			localStorage.removeItem('tv_mode');
			addEvent('Device detection reset - reloading...');
			setTimeout(() => window.location.reload(), 1000);
		}
	}
</script>

{#if visible}
	<div
		class="fixed inset-4 z-50 flex flex-col rounded-lg bg-black/90 p-4 text-white"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		onclick={handleClick}
		onkeydown={(e) => {
			if (e.key === 'Enter') {
				addEvent('Debug Area Enter Key');
			}
		}}
		role="button"
		tabindex="0"
	>
		<div class="flex items-center justify-between border-b border-gray-600 pb-2">
			<h2 class="text-lg font-bold">Touch Debug - Echo Show</h2>
			<button class="rounded bg-red-600 px-3 py-1 text-sm hover:bg-red-700" onclick={toggleDebug}>
				Close
			</button>
		</div>

		<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
			<!-- Device Info -->
			<div class="rounded bg-gray-800 p-3">
				<h3 class="mb-2 font-semibold text-yellow-400">Device Info</h3>
				<div class="space-y-1 text-xs">
					<p><strong>Is Echo Show:</strong> {isEchoShowDevice}</p>
					<p><strong>Touch Supported:</strong> {touchSupported}</p>
					<p><strong>Screen Type:</strong> {deviceInfo?.screenType || 'Unknown'}</p>
					<p><strong>Is TV:</strong> {deviceInfo?.isTV || false}</p>
					<p><strong>Is Touch Device:</strong> {deviceInfo?.isTouchDevice || false}</p>
					<p><strong>Fire TV Check:</strong> {navigator.userAgent.includes('AFT')}</p>
					<p><strong>WebView:</strong> {navigator.userAgent.includes('wv')}</p>
					<p><strong>User Agent:</strong> {navigator.userAgent.slice(0, 60)}...</p>
					<p><strong>Platform:</strong> {navigator.platform}</p>
					<p><strong>Screen:</strong> {window.screen.width}x{window.screen.height}</p>
					<p><strong>Viewport:</strong> {window.innerWidth}x{window.innerHeight}</p>
					<p><strong>Touch Debug:</strong> {localStorage?.getItem('touch_debug') || 'false'}</p>
				</div>
				<div class="mt-2">
					<div class="flex flex-wrap gap-1">
						<button
							class="rounded bg-orange-600 px-2 py-1 text-xs hover:bg-orange-700"
							onclick={testFireTVTouch}
						>
							Test Fire TV Touch
						</button>
						<button
							class="rounded bg-purple-600 px-2 py-1 text-xs hover:bg-purple-700"
							onclick={forceEchoShowMode}
						>
							Force Echo Show
						</button>
						<button
							class="rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-700"
							onclick={resetDetection}
						>
							Reset Detection
						</button>
					</div>
				</div>
			</div>

			<!-- Touch Events -->
			<div class="rounded bg-gray-800 p-3">
				<div class="flex items-center justify-between">
					<h3 class="font-semibold text-yellow-400">Touch Events</h3>
					<button
						class="rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700"
						onclick={clearEvents}
					>
						Clear
					</button>
				</div>
				<div class="mt-2 h-48 overflow-y-auto">
					{#each touchEvents as event, index (index)}
						<div class="border-b border-gray-700 py-1 font-mono text-xs">{event}</div>
					{/each}
					{#if touchEvents.length === 0}
						<p class="text-xs text-gray-400">Touch or click anywhere to see events...</p>
					{/if}
				</div>
			</div>
		</div>

		<!-- Test Areas -->
		<div class="mt-4 grid grid-cols-3 gap-2">
			<div
				class="rounded bg-blue-600 p-4 text-center hover:bg-blue-700"
				ontouchstart={(e) => {
					e.stopPropagation();
					addEvent('Blue Area Touched');
				}}
				onclick={(e) => {
					e.stopPropagation();
					addEvent('Blue Area Clicked');
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						e.stopPropagation();
						addEvent('Blue Area Enter Key');
					}
				}}
				role="button"
				tabindex="0"
			>
				<p class="text-sm">Touch Test 1</p>
			</div>
			<div
				class="rounded bg-green-600 p-4 text-center hover:bg-green-700"
				ontouchstart={(e) => {
					e.stopPropagation();
					addEvent('Green Area Touched');
				}}
				onclick={(e) => {
					e.stopPropagation();
					addEvent('Green Area Clicked');
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						e.stopPropagation();
						addEvent('Green Area Enter Key');
					}
				}}
				role="button"
				tabindex="0"
			>
				<p class="text-sm">Touch Test 2</p>
			</div>
			<div
				class="rounded bg-purple-600 p-4 text-center hover:bg-purple-700"
				ontouchstart={(e) => {
					e.stopPropagation();
					addEvent('Purple Area Touched');
				}}
				onclick={(e) => {
					e.stopPropagation();
					addEvent('Purple Area Clicked');
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						e.stopPropagation();
						addEvent('Purple Area Enter Key');
					}
				}}
				role="button"
				tabindex="0"
			>
				<p class="text-sm">Touch Test 3</p>
			</div>
		</div>

		<!-- Swipe Test Area -->
		<div class="mt-4">
			<div
				class="rounded border-2 border-dashed border-yellow-400 bg-yellow-900/20 p-6 text-center"
				ontouchstart={(e) => {
					const touch = e.touches[0];
					addEvent(`Swipe Start: ${Math.round(touch.clientX)}, ${Math.round(touch.clientY)}`);
				}}
				ontouchmove={(e) => {
					const touch = e.touches[0];
					addEvent(`Swipe Move: ${Math.round(touch.clientX)}, ${Math.round(touch.clientY)}`);
				}}
				ontouchend={(e) => {
					const touch = e.changedTouches[0];
					addEvent(`Swipe End: ${Math.round(touch.clientX)}, ${Math.round(touch.clientY)}`);
				}}
			>
				<p class="text-sm text-yellow-400">Swipe Test Area</p>
				<p class="text-xs text-gray-300">Try swiping left/right here</p>
			</div>
		</div>

		<!-- Fire TV Specific Instructions -->
		<div class="mt-4 rounded border border-yellow-600 bg-yellow-900/30 p-4">
			<h3 class="font-semibold text-yellow-400">Fire TV Echo Show Troubleshooting</h3>
			<div class="mt-2 space-y-1 text-xs text-gray-300">
				<p><strong>Common Issues:</strong></p>
				<p>
					• <span class="text-red-400">Virtual Remote Overlay:</span> Android manifest needs touchscreen
					support
				</p>
				<p>
					• <span class="text-red-400">Touch Events Not Firing:</span> WebView may block touch - check
					console
				</p>
				<p>
					• <span class="text-red-400">Device Not Detected:</span> Use "Force Echo Show" button above
				</p>

				<p class="mt-2"><strong>Testing Steps:</strong></p>
				<p>1. Click "Test Fire TV Touch" to check touch event registration</p>
				<p>2. If no touch events, try "Force Echo Show" mode</p>
				<p>3. Check browser console for [Touch] debug messages</p>
				<p>4. Test touch in colored areas below</p>

				<p class="mt-2"><strong>Keyboard Shortcuts:</strong></p>
				<p>• <strong>D</strong> = Toggle debug panel | <strong>E</strong> = Force Echo Show</p>
				<p>• <strong>T</strong> = Toggle touch logging | <strong>I</strong> = Device info</p>
				<p>• <strong>R</strong> = Reset detection</p>
			</div>
		</div>

		<!-- Current Status -->
		<div class="mt-4 rounded border border-blue-600 bg-blue-900/30 p-4">
			<h3 class="font-semibold text-blue-400">Current Status</h3>
			<div class="mt-2 space-y-1 text-xs text-gray-300">
				<p>
					<strong>Device Detection:</strong>
					{isEchoShowDevice ? 'Echo Show Detected ✓' : 'Not Echo Show ✗'}
				</p>
				<p><strong>Touch Support:</strong> {touchSupported ? 'Available ✓' : 'Not Available ✗'}</p>
				<p>
					<strong>Touch Debug:</strong>
					{localStorage?.getItem('touch_debug') === 'true' ? 'Enabled ✓' : 'Disabled ✗'}
				</p>
				<p>
					<strong>Force Mode:</strong>
					{localStorage?.getItem('force_echo_show') === 'true' ? 'Active ✓' : 'Inactive ✗'}
				</p>
				<p>
					<strong>User Agent:</strong>
					{navigator.userAgent.includes('AFT') || navigator.userAgent.includes('Amazon')
						? 'Fire TV Detected ✓'
						: 'Standard Browser ✗'}
				</p>
			</div>
		</div>
	</div>
{/if}
