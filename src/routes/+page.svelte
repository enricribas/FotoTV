<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { setupAuthStateListener } from '$lib/utils/authUtils';

	let showFeatures = false;

	function scrollToFeatures() {
		const featuresSection = document.getElementById('features');
		if (featuresSection) {
			featuresSection.scrollIntoView({ behavior: 'smooth' });
		}
	}

	onMount(() => {
		// Check if user is already logged in and redirect to app
		const unsubscribe = setupAuthStateListener(
			(user) => {
				if (user) {
					// User is logged in, redirect to app
					goto('/app');
				}
			},
			(error) => console.error('Auth error on landing page:', error)
		);

		return () => {
			unsubscribe?.();
		};
	});
</script>

<svelte:head>
	<title>FotoTV - Share Photos on Your TV</title>
	<meta
		name="description"
		content="Turn your TV into a photo display. Send photos from your phone, see them on your big screen. Simple and free."
	/>
</svelte:head>

<div class="relative min-h-screen bg-gradient-to-b from-orange-50 to-white">
	<!-- Header -->
	<header class="absolute top-0 right-0 left-0 z-10">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
			<div class="flex items-center space-x-3">
				<img src="/FotoTV-logo2.png" alt="FotoTV Logo" class="h-10 w-auto" />
				<span class="text-2xl font-bold text-gray-800">FotoTV</span>
			</div>
			<a
				href="/app"
				class="rounded-lg bg-orange-600 px-6 py-2 font-semibold text-white shadow-lg transition-colors hover:bg-orange-700"
			>
				Get Started
			</a>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="flex min-h-screen items-center justify-center px-6 pt-20">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
				Show Your Family Photos<br />
				<span class="text-orange-600">on Your TV</span>
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-600">
				Your family sends you photos from their phones. You see them right on your TV — no cables, no complicated setup.
			</p>

			<!-- Simple 3-Step Overview -->
			<div class="mb-12 rounded-2xl bg-white p-8 shadow-lg">
				<div class="grid gap-6 sm:grid-cols-3">
					<div class="flex flex-col items-center">
						<div class="mb-4 rounded-full bg-orange-100 p-4">
							<svg class="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
						</div>
						<h3 class="mb-2 text-lg font-semibold text-gray-900">1. Install on TV</h3>
						<p class="text-sm text-gray-600">Download the app from Google Play or Fire TV store</p>
					</div>
					<div class="flex flex-col items-center">
						<div class="mb-4 rounded-full bg-orange-100 p-4">
							<svg class="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<h3 class="mb-2 text-lg font-semibold text-gray-900">2. Share a Link</h3>
						<p class="text-sm text-gray-600">Send a link to family members who want to share photos</p>
					</div>
					<div class="flex flex-col items-center">
						<div class="mb-4 rounded-full bg-orange-100 p-4">
							<svg class="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						</div>
						<h3 class="mb-2 text-lg font-semibold text-gray-900">3. Enjoy Photos</h3>
						<p class="text-sm text-gray-600">Photos appear on your TV automatically</p>
					</div>
				</div>
			</div>

			<!-- CTA Buttons -->
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/app"
					class="rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-orange-700"
					>Get Started Free</a
				>
				<button
					on:click={scrollToFeatures}
					class="rounded-lg border-2 border-orange-600 px-8 py-4 text-lg font-semibold text-orange-600 transition-colors hover:bg-orange-50"
					>Learn More</button
				>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="bg-white py-20">
		<div class="mx-auto max-w-6xl px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
					Why FotoTV?
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					Designed for families who want to share memories the easy way
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<!-- Feature 1 -->
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100"
					>
						<svg
							class="h-8 w-8 text-orange-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Easy to Use</h3>
					<p class="text-gray-600">
						No confusing settings. Just send photos from your phone and they show up on your TV.
					</p>
				</div>

				<!-- Feature 2 -->
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100"
					>
						<svg
							class="h-8 w-8 text-orange-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Your Photos Stay Private</h3>
					<p class="text-gray-600">
						Only you and the people you share with can see your photos. Nobody else.
					</p>
				</div>

				<!-- Feature 3 -->
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100"
					>
						<svg
							class="h-8 w-8 text-orange-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 20a3 3 0 00-3-3H8a3 3 0 00-3 3v2h14v-2z"
							/>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Share with Family</h3>
					<p class="text-gray-600">
						Invite anyone in your family to add their photos. Everyone can see them together.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- How It Works Section -->
	<section class="bg-orange-50 py-20">
		<div class="mx-auto max-w-6xl px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">How to Get Started</h2>
			</div>

			<div class="grid gap-12 md:grid-cols-2">
				<!-- Step 1: Install -->
				<div class="rounded-2xl bg-white p-8 shadow-lg">
					<div class="mb-6 flex items-center">
						<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-xl font-bold text-white">
							1
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Install on Your TV</h3>
					</div>
					<p class="mb-6 text-gray-600">
						Pick whichever is easier for your TV:
					</p>
					<div class="space-y-3">
						<a
							href="https://play.google.com/store/apps/details?id=com.phototv.app&hl=en"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition-colors hover:border-orange-600 hover:bg-orange-50"
						>
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
								/>
							</svg>
							<div class="text-left">
								<div class="text-sm font-semibold text-gray-900">Google TV</div>
								<div class="text-xs text-gray-500">Search "FotoTV" in Play Store</div>
							</div>
						</a>
						<a
							href="https://www.amazon.com/Knomni-FotoTV/dp/B0FP33YB92"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition-colors hover:border-orange-600 hover:bg-orange-50"
						>
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 8.206 3.166 13.58 3.166 2.844 0 5.454-.404 7.77-1.207 2.314-.803 4.065-1.689 5.253-2.654.115-.094.23-.094.345 0 .116.095.088.203-.086.318-1.253 1.181-3.14 2.155-5.66 2.925-2.52.769-5.339 1.154-8.459 1.154-2.573 0-4.96-.404-7.162-1.207-2.2-.804-3.897-1.712-5.089-2.725-.13-.116-.144-.224-.043-.318l.203-.23z"
								/>
							</svg>
							<div class="text-left">
								<div class="text-sm font-semibold text-gray-900">Fire TV</div>
								<div class="text-xs text-gray-500">Search "FotoTV" in Appstore</div>
							</div>
						</a>
					</div>
				</div>

				<!-- Step 2: Share -->
				<div class="rounded-2xl bg-white p-8 shadow-lg">
					<div class="mb-6 flex items-center">
						<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-xl font-bold text-white">
							2
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Invite Family</h3>
					</div>
					<p class="mb-6 text-gray-600">
						Once you sign in, you'll get a link or code to share with family members.
					</p>
					<div class="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
						<p class="mb-2 font-semibold">💡 Pro Tip:</p>
						<p>
							Text or email the link to anyone you want to add photos. They don't need to install anything — they can use it right on their phone's web browser.
						</p>
					</div>
				</div>
			</div>

			<!-- Step 3 -->
			<div class="mt-12">
				<div class="rounded-2xl bg-white p-8 shadow-lg">
					<div class="mb-6 flex items-center">
						<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-xl font-bold text-white">
							3
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Enjoy Your Photos</h3>
					</div>
					<p class="text-gray-600">
						Your TV will automatically show a beautiful slideshow of all the photos you and your family share. Sit back and enjoy!
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="bg-orange-600 py-16">
		<div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
			<h2 class="mb-6 text-3xl font-bold text-white sm:text-4xl">Ready to Share Your Photos?</h2>
			<p class="mb-8 text-xl text-orange-100">
				It's free and takes just a few minutes to set up.
			</p>
			<a
				href="/app"
				class="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-lg transition-colors hover:bg-orange-50"
			>
				Get Started Now
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-gray-900 py-12">
		<div class="mx-auto max-w-6xl px-6 lg:px-8">
			<div class="flex flex-col items-center justify-between md:flex-row">
				<div class="mb-4 flex items-center space-x-3 md:mb-0">
					<img src="/FotoTV-logo2.png" alt="FotoTV Logo" class="h-8 w-auto" />
					<span class="text-xl font-bold text-white">FotoTV</span>
				</div>
				<div class="flex space-x-6 text-gray-400">
					<a href="/privacy" class="transition-colors hover:text-white">Privacy</a>
					<a href="/terms" class="transition-colors hover:text-white">Terms</a>
				</div>
			</div>
			<div class="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
				<p>&copy; 2025 FotoTV. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
