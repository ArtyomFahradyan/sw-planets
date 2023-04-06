import { defineConfig, Plugin } from "vite";
import { fileURLToPath } from "url";
import fs from "fs";
import module from "module";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path";

const require = module.createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactVirtualized(), react(), eslint()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "./build",
  },
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
});

// this is because react-virtulized have an issue for bpfrpt_proptype_WindowScroller https://github.com/bvaughn/react-virtualized/issues/1632
const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;
export function reactVirtualized(): Plugin {
  return {
    name: "flat:react-virtualized",
    // Note: we cannot use the `transform` hook here
    //       because libraries are pre-bundled in vite directly,
    //       plugins aren't able to hack that step currently.
    //       so instead we manually edit the file in node_modules.
    //       all we need is to find the timing before pre-bundling.
    configResolved() {
      const file = require
        .resolve("react-virtualized")
        .replace(
          path.join("dist", "commonjs", "index.js"),
          path.join("dist", "es", "WindowScroller", "utils", "onScroll.js")
        );
      const code = fs.readFileSync(file, "utf-8");
      const modified = code.replace(WRONG_CODE, "");
      fs.writeFileSync(file, modified);
    },
  };
}
