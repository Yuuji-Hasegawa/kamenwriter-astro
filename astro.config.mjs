import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from './src/utils/reading-time.mjs';
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  integrations: [react(), mdx(), compress({
    css: true,
    html: true,
    img: true,
    js: true,
    svg: true
  }), sitemap(), partytown({config: {
        forward: ['dataLayer.push'],
      }})],
  trailingSlash: "always",
  build: {
    inlineStylesheets: 'always'
  },
  prefetch: true,
  site: 'https://kamenwriter.com'
});