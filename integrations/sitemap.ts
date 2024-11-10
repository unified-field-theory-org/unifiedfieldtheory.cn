import AstroSitemap from '@astrojs/sitemap';
import type { AstroIntegration } from 'astro';
import { normalizeLangTag } from '../src/i18n/bcp-normalize.ts';
import languages from '../src/i18n/languages';

const langTags = Object.keys(languages);

/** Get a preconfigured instance of the `@astrojs/sitemap` integration. */
export function sitemap(): AstroIntegration {
	return AstroSitemap({
		i18n: {
			defaultLocale: 'en',
			locales: Object.fromEntries(langTags.map((lang) => [lang, normalizeLangTag(lang)])),
		},
	});
}
