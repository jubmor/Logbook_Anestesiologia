import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest-setup.js"
  },
  build: {
    chunkSizeWarningLimit: 1600
  },
  server: {
    port: 4001
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
