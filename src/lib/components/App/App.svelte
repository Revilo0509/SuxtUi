<script lang="ts">
	import type { Snippet } from "svelte";

    interface props {
        header: Snippet
        children: Snippet
        footer: Snippet
    }

    const { header, children, footer }: props = $props();
</script>
