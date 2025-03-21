import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()], // Removed Replit-specific plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensure this matches your project structure
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    outDir: "dist", // Vercel serves from `dist/`
    emptyOutDir: true,
  },
});