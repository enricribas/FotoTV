<script lang="ts">
	import { auth, googleProvider } from '$lib/firebase';
	import { signInWithPopup } from 'firebase/auth';

	function login() {
		signInWithPopup(auth, googleProvider).catch(console.error);
	}
</script>

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