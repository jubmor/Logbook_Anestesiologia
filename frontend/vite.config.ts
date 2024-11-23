import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgr()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__mocks__/setupMocks.tsx",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      exclude: ["node_modules", "test/**/*"],
      reportsDirectory: "./coverage"
    }
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
  },
  optimizeDeps: {
    exclude: ["chunk-ABLLX5HL.js"]
  }
});
