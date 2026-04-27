<script lang="ts">
	import SnippetGuard from "$lib/registry/ui/SnippetGuard/SnippetGuard.svelte";
	import type { Snippet } from "svelte";

	interface props {
		header?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	}

	const { header, children, footer }: props = $props();
</script>

<div class="flex flex-col">
	<SnippetGuard snippet={header} class="flex-1" />
	<SnippetGuard snippet={children} />
	<SnippetGuard snippet={footer} />
</div>
