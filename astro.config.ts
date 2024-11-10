import starlight from '@astrojs/starlight';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { defineConfig, sharpImageService } from 'astro/config';
import { makeLocalesConfig } from './config/locales';
import { makeSidebar } from './config/sidebar';

import vercel from '@astrojs/vercel/serverless';
import rehypeSlug from 'rehype-slug';
import remarkSmartypants from 'remark-smartypants';

import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { sitemap } from './integrations/sitemap';
import { rehypeAutolink } from './plugins/rehype-autolink';
import { rehypeTasklistEnhancer } from './plugins/rehype-tasklist-enhancer';
import { remarkFallbackLang } from './plugins/remark-fallback-lang';

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	adapter: vercel(),
	site: 'https://unifiedfieldtheory.cn',
	integrations: [
		starlight({
			title: '统一场论',
			customCss: ['./src/styles/custom.css', './src/styles/landing.css'],
			expressiveCode: {
				plugins: [pluginCollapsibleSections()],
			},
			components: {
				EditLink: './src/components/starlight/EditLink.astro',
				Head: './src/components/starlight/Head.astro',
				Hero: './src/components/starlight/Hero.astro',
				MarkdownContent: './src/components/starlight/MarkdownContent.astro',
				MobileTableOfContents: './src/components/starlight/MobileTableOfContents.astro',
				TableOfContents: './src/components/starlight/TableOfContents.astro',
				PageSidebar: './src/components/starlight/PageSidebar.astro',
				Pagination: './src/components/starlight/Pagination.astro',
				Footer: './src/components/starlight/Footer.astro',
				SiteTitle: './src/components/starlight/SiteTitle.astro',
				Search: './src/components/starlight/Search.astro',
				Sidebar: './src/components/starlight/Sidebar.astro',
				MobileMenuFooter: './src/components/starlight/MobileMenuFooter.astro',
				PageTitle: './src/components/starlight/PageTitle.astro',
			},
			editLink: {
				baseUrl: 'https://github.com/unified-field-theory-org/unifiedfieldtheory.cn/edit/main',
			},
			defaultLocale: 'en',
			locales: makeLocalesConfig(),
			sidebar: makeSidebar(),
			social: {
				github: 'https://github.com/unified-field-theory-org/unifiedfieldtheory.cn',
				slack: 'https://unifiedfieldtheorycn.slack.com',
				discord: 'https://discord.gg/W3JYMwBBWb',
			},
			pagefind: false,
			head: [
				// Add ICO favicon fallback for Safari.
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.ico',
						sizes: '32x32',
					},
				},
			],
		}),
		sitemap(),
	],
	markdown: {
		// Override with our own config
		smartypants: false,
		remarkPlugins: [
			[remarkSmartypants, { dashes: false }],
			// Add our custom plugin that marks links to fallback language pages
			remarkFallbackLang(),
			remarkMath,
		],
		rehypePlugins: [
			rehypeSlug,
			// This adds links to headings
			...rehypeAutolink(),
			// Tweak GFM task list syntax
			rehypeTasklistEnhancer(),
			rehypeKatex,
		],
	},
	image: {
		domains: ['avatars.githubusercontent.com'],
		service: sharpImageService(),
	},
});
