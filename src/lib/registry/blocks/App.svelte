<script lang="ts">
	import SnippetGuard from "$lib/registry/ui/SnippetGuard.svelte";
	import type { Snippet } from "svelte";

	interface props {
		header?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	}

	const { header, children, footer }: props = $props();
</script>

<div class="flex h-screen w-screen flex-col">
	<SnippetGuard snippet={header} class="shrink-0" />
	<SnippetGuard snippet={children} class="flex-1 overflow-auto" />
	<SnippetGuard snippet={footer} class="shrink-0" />
</div>
