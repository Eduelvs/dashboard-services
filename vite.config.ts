import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/docker-registry": {
        target: "https://registry-1.docker.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/docker-registry/, "/v2/"),
      },
    },
  },
});