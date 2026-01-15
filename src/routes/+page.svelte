<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { setupAuthStateListener } from '$lib/utils/authUtils';

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
	<title>FotoTV - Transform Your TV into a Beautiful Photo Display</title>
	<meta
		name="description"
		content="Turn any TV into a stunning photo slideshow. Upload from your phone, display on your TV. Simple, private, and beautiful."
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

	<!-- Two-Step Setup Process -->
	<div class="px-6 pt-24 pb-2">
		<div class="mx-auto max-w-5xl">
			<div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
				<!-- Step 1: TV -->
				<div class="flex-1">
					<h3 class="mb-4 pl-16 text-left text-lg font-semibold text-gray-800">
						Step 1: Get FotoTV for your TV
					</h3>
					<div class="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
						<a
							href="https://play.google.com/store/apps/details?id=com.phototv.app&hl=en"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 text-white transition-colors hover:bg-blue-900"
						>
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
								/>
							</svg>
							<div class="text-left">
								<div class="text-xs">AVAILABLE ON</div>
								<div class="text-sm font-semibold">Google Play</div>
							</div>
						</a>
						<a
							href="https://www.amazon.com/Knomni-FotoTV/dp/B0FP33YB92"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 text-white transition-colors hover:bg-blue-900"
						>
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 8.206 3.166 13.58 3.166 2.844 0 5.454-.404 7.77-1.207 2.314-.803 4.065-1.689 5.253-2.654.115-.094.23-.094.345 0 .116.095.088.203-.086.318-1.253 1.181-3.14 2.155-5.66 2.925-2.52.769-5.339 1.154-8.459 1.154-2.573 0-4.96-.404-7.162-1.207-2.2-.804-3.897-1.712-5.089-2.725-.13-.116-.144-.224-.043-.318l.203-.23z"
								/>
							</svg>
							<div class="text-left">
								<div class="text-xs">AVAILABLE ON</div>
								<div class="text-sm font-semibold">Fire TV</div>
							</div>
						</a>
					</div>
				</div>

				<!-- Step 2: Phone -->
				<div class="flex-1">
					<h3 class="mb-4 pl-16 text-left text-lg font-semibold text-gray-800">
						Step 2: Upload photos from your phone
					</h3>
					<div class="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
						<a
							href="https://play.google.com/store/apps/details?id=com.phototv.app&hl=en"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 text-white transition-colors hover:bg-blue-900"
						>
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
								/>
							</svg>
							<div class="text-left">
								<div class="text-xs">ANDROID</div>
								<div class="text-sm font-semibold">Google Play</div>
							</div>
						</a>
						<a
							href="https://fototv.ca"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 text-white transition-colors hover:bg-blue-900"
						>
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
								/>
							</svg>
							<div class="text-left">
								<div class="text-xs">IPHONE / ANDROID</div>
								<div class="text-sm font-semibold">Web Version</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Hero Section -->
	<section class="flex min-h-screen items-center justify-center px-6 pt-0">
		<div class="mx-auto max-w-4xl">
			<h1 class="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
				Turn Your TV Into a <span class="text-orange-600">Personal Photo Gallery</span>
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-600">
				Upload your favorite memories from your phone and display them beautifully on your TV.
				Simple, private, and perfect for sharing moments with family.
			</p>
			<div class="relative mx-auto mb-12 max-w-2xl">
				<div class="relative aspect-video overflow-hidden rounded-2xl bg-gray-200 shadow-2xl">
					<div class="absolute inset-0 rounded-2xl bg-gray-800 p-4">
						<div class="relative h-full w-full overflow-hidden rounded-xl bg-black">
							<div
								class="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 transition-all duration-1000"
							>
								<div class="text-center text-white">
									<svg
										class="mx-auto mb-4 h-16 w-16 opacity-80"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
										></path>
									</svg>
									<p class="text-lg font-semibold opacity-90">Your Photos Here</p>
								</div>
							</div>
						</div>
					</div>
					<div
						class="absolute -bottom-2 left-1/2 h-4 w-24 -translate-x-1/2 transform rounded-b-lg bg-gray-800"
					></div>
				</div>
			</div>
			<div class="flex flex-col items-center justify-center gap-6">
				<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<a
						href="/app"
						class="rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-orange-700"
						>Get Started Free</a
					>
					<button
						class="rounded-lg border-2 border-orange-600 px-8 py-4 text-lg font-semibold text-orange-600 transition-colors hover:bg-orange-50"
						>Learn More</button
					>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="bg-white py-20">
		<div class="mx-auto max-w-6xl px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
					Simple. Private. Beautiful.
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					Everything you need to turn your TV into a stunning photo display
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
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Upload from Your Phone</h3>
					<p class="text-gray-600">
						Simply open the app on your phone, upload your photos, and they instantly appear on your
						TV.
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
								d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Perfect for TV</h3>
					<p class="text-gray-600">
						Optimized interface that looks beautiful on any TV screen or large display.
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
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Private & Secure</h3>
					<p class="text-gray-600">
						Your photos are private and secure. Only you can see and manage your personal
						collection.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- How it Works -->
	<section class="bg-orange-50 py-20">
		<div class="mx-auto max-w-6xl px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
				<p class="text-lg text-gray-600">Get started in just 3 simple steps</p>
			</div>

			<div class="grid gap-12 md:grid-cols-3">
				<!-- Step 1 -->
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-xl font-bold text-white"
					>
						1
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Open on Your TV</h3>
					<p class="text-gray-600">
						Download the FotoTV app from Google Play Store (Google TV) or Amazon Appstore (Fire TV),
						or use your TV browser and connect using the simple 4-letter code.
					</p>
				</div>

				<!-- Step 2 -->
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-xl font-bold text-white"
					>
						2
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Upload from Phone</h3>
					<p class="text-gray-600">
						Use your phone to upload photos directly to your TV display. No cables needed.
					</p>
				</div>

				<!-- Step 3 -->
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-xl font-bold text-white"
					>
						3
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">Share with Others</h3>
					<p class="text-gray-600">
						Share collections with friends and family so they can add their photos too from their
						own phones. Enjoy!
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-orange-600 py-20">
		<div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
			<h2 class="mb-6 text-3xl font-bold text-white sm:text-4xl">Ready to Transform Your TV?</h2>
			<p class="mb-8 text-xl text-orange-100">
				Start displaying your favorite memories on the big screen today.
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
