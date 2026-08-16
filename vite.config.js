import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const rootFiles = ["CNAME", "robots.txt", "sitemap.xml", "manifest.webmanifest"];
const socialFiles = ["assets/brand/ajay-portrait-og.jpg"];

export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"]
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        projects: resolve(import.meta.dirname, "projects.html"),
        notFound: resolve(import.meta.dirname, "404.html")
      }
    }
  },
  plugins: [
    {
      name: "copy-static-root-files",
      closeBundle() {
        mkdirSync(resolve(import.meta.dirname, "dist"), { recursive: true });
        rootFiles.forEach((file) => {
          copyFileSync(resolve(import.meta.dirname, file), resolve(import.meta.dirname, "dist", file));
        });
        socialFiles.forEach((file) => {
          const output = resolve(import.meta.dirname, "dist", file);
          mkdirSync(resolve(output, ".."), { recursive: true });
          copyFileSync(resolve(import.meta.dirname, file), output);
        });
      }
    }
  ]
});
