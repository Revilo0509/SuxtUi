<script lang="ts">
	import App from "$lib/registry/App.svelte";
	import "../app.css";

	let { children } = $props();
</script>

<App>
	{#snippet header()}
		wads
	{/snippet}

	{#snippet footer()}
		wdas
	{/snippet}

	{@render children()}
</App>
