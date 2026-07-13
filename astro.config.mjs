import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from './src/utils/reading-time.mjs';
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import partytown from "@astrojs/partytown";
import remarkExternalLinks from 'remark-external-links';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
	vite: {
    build: {
      rollupOptions: {
				output: {
					assetFileNames: (assetInfo) => {
						let extType = assetInfo.name.split('.').at(1);
						if (/png|jpe?g|gif|svg|webp|avif|tiff|bmp|ico/i.test(extType)) {
							extType = "images";
						} else if (/woff2?|ttf|eot/i.test(extType)) {
							extType = "fonts";
						} else {
							extType = "js";
						}
						return `${extType}/[name]-[hash][extname]`;
					},
          entryFileNames: 'js/[name]-[hash].mjs',
          chunkFileNames: 'js/[name]-[hash].mjs',
        },
      },
    },
  },
	site: 'https://www.kamenwriter.com',
	markdown: {
		processor: unified({
			remarkPlugins: [
				remarkReadingTime,
				[remarkExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
			]
		})
  },
	integrations: [
		react(),
		mdx(),
		sitemap(),
		partytown({
			config: {
        forward: ['dataLayer.push'],
			}
		}),
		compress({
			CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true,
		})
	],
  trailingSlash: "always",
  build: {
    inlineStylesheets: 'always'
  },
  prefetch: true,
});
