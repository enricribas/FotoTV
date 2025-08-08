<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { AuthService } from '$lib/auth';

	let { children } = $props();

	onMount(async () => {
		try {
			await AuthService.initialize();
			console.log('Auth service initialized');
		} catch (error) {
			console.error('Failed to initialize auth service:', error);
		}
	});
</script>

version: final
{@render children()}
