import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import metaTextmateGrammar from "./schemas/meta.textmate.json";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import { remarkWikiLink } from '@portaljs/remark-wiki-link';
import mdx from "@astrojs/mdx";
const pageUrlPathPrefix = "docs/";


// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), mdx({
		remarkPlugins: [[remarkWikiLink, {
      pathFormat: "obsidian-absolute",
      wikiLinkResolver: slug => {
        pageUrlPathPrefix + slug;
      }
    }]],
    shikiConfig: {
      langs: [metaTextmateGrammar, "js", "python", "asm", "cpp", "c", "lisp", "json"]
    }
	})],
  site: "https://meta-lang.com",
  output: "server",
  markdown: {
    remarkPlugins: [[remarkWikiLink, {
      pathFormat: "obsidian-absolute",
      wikiLinkResolver: slug => {
        pageUrlPathPrefix + slug;
      }
    }]],
    shikiConfig: {
      langs: [metaTextmateGrammar, "js", "python", "asm", "cpp", "c", "lisp", "json"]
    }
  },
  base: "/",
  compressHTML: true,
  trailingSlash: "never",
  adapter: node({
    mode: "middleware"
  })
});