import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Get the directory name in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host:true,
    port:90,
    proxy: {
      "/api": {
        target: "http://localhost:8000", // FastAPI backend URL
        changeOrigin: true,             // Changes the origin header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove `/api` prefix before forwarding
      },
    },
  },
});
