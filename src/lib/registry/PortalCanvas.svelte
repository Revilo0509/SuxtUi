<script lang="ts" module>
	import type { Snippet } from "svelte";
	import { SvelteMap } from "svelte/reactivity";

	const snippets = new SvelteMap<string, Set<Snippet>>();

	export function addSnippet(name: string, snippet: Snippet) {
		if (!snippets.has(name)) snippets.set(name, new Set());
		snippets.get(name)!.add(snippet);
	}

	export function deleteSnippet(name: string, snippet: Snippet) {
		snippets.get(name)?.delete(snippet);
	}

	export function getSnippets(name: string): Snippet[] {
		return Array.from(snippets.get(name) ?? []);
	}
</script>

<script lang="ts">
	const { id }: { id: string } = $props();
	let snippets = $derived(getSnippets(id));
</script>

{#each snippets as snippet (snippet.name)}
	{@render snippet()}
{/each}
