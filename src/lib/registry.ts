import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname } from "node:path";

type RegistryFileType =
  | "registry:component"
  | "registry:ui"
  | "registry:hook"
  | "registry:lib"
  | "registry:page"
  | "registry:file";

type RegistryItemType =
  | "registry:block"
  | "registry:component"
  | "registry:ui"
  | "registry:hook"
  | "registry:lib"
  | "registry:page"
  | "registry:file";

interface RegistryFile {
  path: string;
  type: RegistryFileType;
  content: string;
  target?: string;
}

interface RegistryItem {
  $schema: string;
  name: string;
  title: string;
  type: RegistryItemType;
  description: string;
  files: RegistryFile[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
}

/** Derive a file's registry type from its name and extension. */
function inferFileType(filename: string): RegistryFileType {
  const ext = extname(filename);
  const base = filename.replace(/\.[^.]+$/, "");

  if (ext === ".svelte") return "registry:component";
  if (base.startsWith("use-")) return "registry:hook";
  if (base === "index" || ext === ".ts" || ext === ".js") return "registry:lib";
  return "registry:file";
}

/** Derive a kebab-case title from a component name. */
function toTitle(name: string): string {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Read all files for a component entry (file or directory). */
function collectFiles(name: string, entry: string, isDir: boolean): RegistryFile[] {
  if (isDir) {
    return readdirSync(`src/lib/components/${entry}`)
      .filter((f) => statSync(`src/lib/components/${entry}/${f}`).isFile())
      .map((filename) => ({
        path: `src/lib/components/${entry}/${filename}`,
        type: inferFileType(filename),
        content: readFileSync(`src/lib/components/${entry}/${filename}`, "utf-8"),
      }));
  }

  return [
    {
      path: `src/lib/components/${entry}`,
      type: inferFileType(entry),
      content: readFileSync(`src/lib/components/${entry}`, "utf-8"),
    },
  ];
}

export function buildRegistryItem(
  name: string,
  entry: string,
  isDir: boolean
): RegistryItem {
  const files = collectFiles(name, entry, isDir);

  // A block if it has multiple files, a plain component if single
  const type: RegistryItemType =
    files.length > 1 ? "registry:block" : "registry:component";

  return {
    $schema: "https://shadcn-svelte.com/schema/registry-item.json",
    name,
    title: toTitle(name),
    type,
    description: "",
    files,
  };
}