import { readFileSync } from "node:fs";

export function GET({ params }) {
  const file = readFileSync(
    `src/lib/components/${params.name}.svelte`,
    "utf-8"
  );

  return new Response(file, {
    headers: {
      "content-type": "text/plain"
    }
  });
}