import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // optional, or set other names like 'components': path.resolve(...)
    },
  },
  server: {
    port: parseInt(process.env.PORT || "3000", 10),
  }
});
