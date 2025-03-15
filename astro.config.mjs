// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://anuragbanerjee.com",

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});