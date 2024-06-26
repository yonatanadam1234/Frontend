import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: [{ find: "@crema", replacement: "/src/@crema" }],
  },
  define: {
    "process.env": {},
  },
  plugins: [react()],
});
