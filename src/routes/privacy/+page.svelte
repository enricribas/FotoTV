<script lang="ts">
	const lastUpdated = 'December 22, 2024';
	const appName = 'PhotoTV';
</script>

<svelte:head>
	<title>Privacy Policy - {appName}</title>
	<meta name="description" content="Privacy Policy for {appName} - Personal photo viewing app" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<div class="overflow-hidden rounded-lg bg-white shadow">
			<div class="bg-blue-600 px-6 py-4">
				<h1 class="text-2xl font-bold text-white">Privacy Policy</h1>
				<p class="mt-1 text-blue-100">Last updated: {lastUpdated}</p>
			</div>

			<div class="px-6 py-8">
				<div class="prose prose-gray max-w-none">
					<p class="mb-6 text-lg text-gray-700">
						{appName} is a personal photo viewing app that lets you display your photos on your TV. Your
						privacy is important to us, and we've designed this app to be as privacy-friendly as possible.
					</p>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">What This App Does</h2>
					<p class="mb-4 text-gray-700">
						{appName} is a simple app that:
					</p>
					<ul class="mb-6 list-disc pl-6 text-gray-700">
						<li>Lets you upload and view your personal photos</li>
						<li>Displays your photos in a slideshow on your TV or larger screen</li>
						<li>Helps you connect your phone to your TV for viewing</li>
					</ul>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">Your Photos</h2>
					<p class="mb-4 text-gray-700">
						<strong>Your photos are private and personal to you.</strong> Here's what happens with them:
					</p>
					<ul class="mb-6 list-disc pl-6 text-gray-700">
						<li>Photos you upload are stored securely in Google Firebase Cloud Storage</li>
						<li>Only you can see your photos - they're tied to your Google account</li>
						<li>No one else has access to your photos, including us</li>
						<li>You can delete your photos anytime through the app</li>
						<li>If you stop using the app, your photos remain in your control</li>
					</ul>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">Account Information</h2>
					<p class="mb-4 text-gray-700">
						To use the app, you sign in with your Google account. We only receive:
					</p>
					<ul class="mb-6 list-disc pl-6 text-gray-700">
						<li>Your email address (to identify your account)</li>
						<li>Your name and profile picture (from your Google profile)</li>
						<li>This information is used only to provide the app's functionality</li>
					</ul>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">TV Connection</h2>
					<p class="mb-4 text-gray-700">When connecting your phone to your TV:</p>
					<ul class="mb-6 list-disc pl-6 text-gray-700">
						<li>The app creates temporary 4-letter codes (like "ABCD") for pairing</li>
						<li>These codes expire automatically after 5 minutes</li>
						<li>No permanent connection data is stored</li>
					</ul>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">What We Don't Do</h2>
					<ul class="mb-6 list-disc pl-6 text-gray-700">
						<li>
							<strong>We don't look at your photos</strong> - they're stored encrypted and we have no
							reason to access them
						</li>
						<li>
							<strong>We don't sell any data</strong> - there's nothing to sell since it's just your
							personal photos
						</li>
						<li>
							<strong>We don't track you</strong> - no analytics, no tracking cookies, no behavioral
							monitoring
						</li>
						<li>
							<strong>We don't share anything</strong> - your photos and information stay with you
						</li>
						<li>
							<strong>We don't send notifications or emails</strong> - except for essential account security
							from Google
						</li>
					</ul>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">Technical Details</h2>
					<p class="mb-4 text-gray-700">For transparency, here's what services we use:</p>
					<ul class="mb-6 list-disc pl-6 text-gray-700">
						<li>
							<strong>Google Firebase:</strong> Handles your login and stores your photos securely
						</li>
						<li><strong>Netlify:</strong> Serves the web app (doesn't see your photos or data)</li>
					</ul>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">Your Control</h2>
					<p class="mb-4 text-gray-700">You have complete control over your data:</p>
					<ul class="mb-6 list-disc pl-6 text-gray-700">
						<li>Delete individual photos anytime through the app</li>
						<li>Sign out to disconnect the app from your Google account</li>
						<li>Your Google account settings control what we can access</li>
					</ul>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">Children</h2>
					<p class="mb-4 text-gray-700">
						This app requires a Google account to sign in, which means users must be 13+ (or the
						minimum age in their country for Google accounts).
					</p>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">Changes to This Policy</h2>
					<p class="mb-4 text-gray-700">
						If we need to update this policy, we'll update the date above. Since this is a simple
						app with minimal data usage, changes should be rare.
					</p>

					<h2 class="mt-8 mb-4 text-xl font-semibold text-gray-900">Questions?</h2>
					<p class="mb-4 text-gray-700">
						This app is designed to be simple and privacy-focused. If you have questions about how
						your data is handled, you can reach out to us, though the app's functionality should be
						straightforward - it's just for viewing your own photos on your TV.
					</p>

					<div class="mt-8 rounded-lg bg-green-50 p-4">
						<p class="text-sm text-green-800">
							<strong>Bottom line:</strong> This app is designed for your personal use to view your own
							photos. Your photos are private, stored securely, and only accessible by you. We don't
							analyze, share, or profit from your personal photos in any way.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Back to app link -->
		<div class="mt-8 text-center">
			<a
				href="/"
				class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
			>
				← Back to {appName}
			</a>
		</div>
	</div>
</div>

<style>
	:global(.prose h2) {
		border-bottom: 1px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	:global(.prose ul li) {
		margin-bottom: 0.25rem;
	}

	:global(.prose strong) {
		color: #111827;
	}
</style>
