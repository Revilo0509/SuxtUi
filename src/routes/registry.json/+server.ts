import { json } from "@sveltejs/kit";
import { readdirSync } from "node:fs";

const components = readdirSync("src/lib/components").map((name) => ({
  name,
  path: `/components/${name}`
}));

export function GET() {
  return json({ components });
}