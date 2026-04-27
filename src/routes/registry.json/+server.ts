import { json } from "@sveltejs/kit";
import { readdirSync, statSync } from "node:fs";
import { buildRegistryItem } from "$lib/registry.js";

const REGISTRY_NAME = "SuxtUi";
const REGISTRY_HOMEPAGE = "https://suxtui.revilo0509.net";

export function GET() {
  const entries = readdirSync("src/lib/components");

  const items = entries.map((entry) => {
    const isDir = statSync(`src/lib/components/${entry}`).isDirectory();
    const name = isDir ? entry : entry.replace(/\.[^.]+$/, "");
    const item = buildRegistryItem(name, entry, isDir);

    // Index only needs metadata, not file contents
    const { files, ...meta } = item;
    return {
      ...meta,
      files: files.map(({ content: _, ...f }) => f),
    };
  });

  return json({
    $schema: "https://shadcn-svelte.com/schema/registry.json",
    name: REGISTRY_NAME,
    homepage: REGISTRY_HOMEPAGE,
    items,
  });
}