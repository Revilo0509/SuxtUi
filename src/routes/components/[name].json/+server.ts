import { json, error } from "@sveltejs/kit";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { buildRegistryItem } from "$lib/registry.js";

export function GET({ params }) {
  const name = params.name.toLowerCase();

  const dir = path.resolve("src/lib/components");
  const entries = readdirSync(dir);

  const match = entries.find((entry) => {
    const full = path.join(dir, entry);
    const isDir = statSync(full).isDirectory();

    return isDir
      ? entry.toLowerCase() === name
      : entry.replace(/\.[^.]+$/, "").toLowerCase() === name;
  });

  if (!match) {
    throw error(404, `Registry item "${name}" not found`);
  }

  const full = path.join(dir, match);
  const isDir = statSync(full).isDirectory();

  const item = buildRegistryItem(name, match, isDir);

  return json(item);
}