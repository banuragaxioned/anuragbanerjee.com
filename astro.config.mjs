// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://anuragbanerjee.com",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [tailwind(), sitemap(), react()],
});
