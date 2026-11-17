import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.jackwinter.xyz",
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  vite: { plugins: [tailwindcss()] },
});
