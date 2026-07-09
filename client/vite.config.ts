import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { writeFileSync } from "fs";

// Ensures _redirects lands in dist for Cloudflare Pages SPA routing
const cfRedirects = {
    name: "cf-redirects",
    closeBundle() {
        writeFileSync("dist/_redirects", "/* /index.html 200\n");
    },
};

export default defineConfig({
    plugins: [react(), tailwindcss(), cfRedirects],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
        },
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
    },
});
