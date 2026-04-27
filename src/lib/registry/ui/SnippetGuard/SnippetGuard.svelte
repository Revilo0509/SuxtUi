<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface props extends HTMLAttributes<HTMLDivElement> {
		snippet?: Snippet;
	}

	const { snippet, ...rest }: props = $props();
</script>

<div {...rest}>
	{#if snippet}
		{@render snippet()}
	{/if}
</div>
