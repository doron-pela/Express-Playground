import {build} from "esbuild";

await build({
  entryPoints: ["src/app.ts"],
  outfile: "dist/app.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  sourcemap: true,
  packages: "external",
});