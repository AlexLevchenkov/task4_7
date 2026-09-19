import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  base: "",
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
      {
        find: "assets",
        replacement: fileURLToPath(
          new URL("./src/assets", import.meta.url)
        ),
      },
      {
        find: "store",
        replacement: fileURLToPath(
          new URL("./src/store", import.meta.url)
        ),
      },
      {
        find: "hooks",
        replacement: fileURLToPath(
          new URL("./src/hooks", import.meta.url)
        ),
      },
      {
        find: "api",
        replacement: fileURLToPath(
          new URL("./src/api", import.meta.url)
        ),
      },
    ],
  },
});
