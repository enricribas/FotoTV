<script>
	import '../app.css';
	import TVModeToggle from '$lib/components/TVModeToggle.svelte';

	let { children } = $props();
</script>

{@render children()}

<!-- Development TV Mode Toggle -->
<TVModeToggle />
