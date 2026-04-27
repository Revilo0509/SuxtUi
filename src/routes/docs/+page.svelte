<script lang="ts">
  import { onMount } from "svelte";

  let items = $state<Array<{ name: string; title: string; description: string; type: string }>>([]);
  let loading = $state(true);
  let error = $state("");

  onMount(async () => {
    try {
      const res = await fetch("/registry.json");
      const data = await res.json();
      items = data.items || [];
    } catch (e) {
      error = "Failed to load registry";
    } finally {
      loading = false;
    }
  });
</script>

<h1 class="text-2xl font-bold mb-4">SuxtUi Registry</h1>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p class="text-red-500">{error}</p>
{:else}
  <ul class="space-y-2">
    {#each items as item}
      <li class="border p-2 rounded">
        <strong>{item.title}</strong>
        <p class="text-sm text-gray-600">{item.type}</p>
        {#if item.description}
          <p class="text-sm">{item.description}</p>
        {/if}
      </li>
    {/each}
  </ul>
{/if}