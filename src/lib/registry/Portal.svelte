<script lang="ts">
	import { onDestroy, type Snippet } from "svelte";
	import { addSnippet, deleteSnippet } from "$lib/registry/PortalCanvas.svelte";

	interface props {
		to: string;
		children: Snippet;
	}

	const { to, children }: props = $props();

	$effect(() => {
		addSnippet(to, children);
	});

	onDestroy(() => {
		deleteSnippet(to, children);
	});
</script>
