import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds one self-contained HTML file (all JS/CSS inlined, no service worker)
// for a zero-setup shareable demo — `npm run build:single` → dist-single/.
// The normal build (vite.config.ts) is unaffected.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: { "virtual:pwa-register": "/src/pwa-stub.ts" },
  },
  build: {
    outDir: "dist-single",
    emptyOutDir: true,
    // Inline every asset (incl. woff2 fonts) as data URIs so the single HTML is
    // fully self-contained — needed for the zero-host shareable demo link.
    assetsInlineLimit: 100_000_000,
  },
});
