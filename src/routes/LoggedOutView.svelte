<script lang="ts">
	import { auth, googleProvider } from '$lib/firebase';
	import { signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
	import { writable } from 'svelte/store';

	const showEmailForm = writable(false);
	const email = writable('');
	const sending = writable(false);
	const message = writable('');

	function login() {
		signInWithPopup(auth, googleProvider).catch(console.error);
	}

	async function sendMagicLink() {
		if (!$email) {
			message.set('Please enter your email address');
			return;
		}

		sending.set(true);
		message.set('');

		try {
			const actionCodeSettings = {
				url: window.location.href,
				handleCodeInApp: true,
			};

			await sendSignInLinkToEmail(auth, $email, actionCodeSettings);
			
			// Save the email for later use
			window.localStorage.setItem('emailForSignIn', $email);
			
			message.set('Check your email for the magic link!');
			email.set('');
		} catch (error: any) {
			console.error('Error sending magic link:', error);
			message.set('Error sending magic link. Please try again.');
		} finally {
			sending.set(false);
		}
	}

	function toggleEmailForm() {
		showEmailForm.set(!$showEmailForm);
		message.set('');
		email.set('');
	}

	// Check if user clicked on magic link
	async function checkMagicLink() {
		if (isSignInWithEmailLink(auth, window.location.href)) {
			let email = window.localStorage.getItem('emailForSignIn');
			
			if (!email) {
				email = window.prompt('Please provide your email for confirmation');
			}

			if (email) {
				try {
					await signInWithEmailLink(auth, email, window.location.href);
					window.localStorage.removeItem('emailForSignIn');
				} catch (error) {
					console.error('Error signing in with magic link:', error);
					message.set('Error signing in. Please try again.');
				}
			}
		}
	}

	// Check for magic link on component mount
	checkMagicLink();
</script>

<div class="space-y-4">
	<!-- Google Sign In Button -->
	<div class="space-y-1">
		<button
			class="btn w-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
			on:click={login}
		>
			<svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
				><g
					><path
						fill="#4285F4"
						d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C36.45 2.7 30.68 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.2C12.13 13.99 17.56 9.5 24 9.5z"
					/><path
						fill="#34A853"
						d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"
					/><path
						fill="#FBBC05"
						d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.7 15.32 0 19.56 0 24c0 4.44.7 8.68 2.69 12.24l7.98-6.2z"
					/><path
						fill="#EA4335"
						d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.19-5.6c-2.01 1.35-4.59 2.15-8.7 2.15-6.44 0-11.87-4.49-13.33-10.55l-7.98 6.2C6.73 42.18 14.82 48 24 48z"
					/><path fill="none" d="M0 0h48v48H0z" /></g
				></svg
			>
			Sign in with Google
		</button>
		<div class="text-xs text-center text-gray-500">easiest for phone</div>
	</div>

	<!-- Divider -->
	<div class="flex items-center">
		<div class="flex-1 border-t border-gray-300"></div>
		<span class="px-3 text-sm text-gray-500">or</span>
		<div class="flex-1 border-t border-gray-300"></div>
	</div>

	<!-- Email Magic Link Button/Form -->
	{#if $showEmailForm}
		<div class="space-y-3">
			<input
				type="email"
				placeholder="Enter your email"
				bind:value={$email}
				class="input input-bordered w-full"
				disabled={$sending}
			/>
			<button
				class="btn w-full border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
				on:click={sendMagicLink}
				disabled={$sending}
			>
				{#if $sending}
					<span class="loading loading-spinner loading-sm"></span>
					Sending...
				{:else}
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					Send Magic Link
				{/if}
			</button>
			<button
				class="btn btn-ghost w-full text-gray-600"
				on:click={toggleEmailForm}
			>
				Cancel
			</button>
		</div>
	{:else}
		<div class="space-y-1">
			<button
				class="btn w-full border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
				on:click={toggleEmailForm}
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
				Email Magic Link
			</button>
			<div class="text-xs text-center text-gray-500">easiest for TV</div>
		</div>
	{/if}

	<!-- Message Display -->
	{#if $message}
		<div class="text-sm text-center {$message.includes('Error') ? 'text-red-600' : 'text-green-600'}">
			{$message}
		</div>
	{/if}
</div> 