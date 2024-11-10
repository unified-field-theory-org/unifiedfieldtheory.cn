import crypto from 'crypto';
import glob from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';

/** Generate Short Url for slugs. */
class ShortUrlGenerator {
	constructor() {
		this.hashLength = 12; // Increased from 7 to 8 for more uniqueness
		this.usedHashes = new Set();
	}

	async run() {
		const slugs = await this.collectSlugs();
		const redirects = await this.generateHashes(slugs);
		await this.writeRedirectsFile(redirects);
	}

	async collectSlugs() {
		const paths = new Set();
		(await glob('./src/content/docs/**/*.{md,mdx}'))
			.filter((file) => !file.endsWith('404.mdx'))
			.map((file) => {
				const replacePath = file.replace('./src/content/docs/', '').match(/^([^/]+)\/(.+)$/);
				if (replacePath) {
					const [path, lang, slug] = replacePath;
					return [path, lang, slug];
				} else {
					return [];
				}
			})
			.forEach(([path, lang, slug]) => {
				if (path) {
					path = this.removeMarkdownExtension(path);
					if (!paths.has(path)) {
						paths.add(`/${path}`);
					}
				}
			});
		return paths;
	}

	async generateHashes(slugs) {
		const redirects = {};
		for (const slug of slugs) {
			let hash = this.generateUniqueHash(slug);
			redirects[`/${hash}`] = slug;
		}
		return redirects;
	}

	generateUniqueHash(slug, attempt = 0) {
		const input = attempt === 0 ? slug : `${slug}-${attempt}`;
		const hash = this.hashSlug(input, this.hashLength);

		if (this.usedHashes.has(hash)) {
			return this.generateUniqueHash(slug, attempt + 1);
		}

		this.usedHashes.add(hash);
		return hash;
	}

	removeMarkdownExtension(filename) {
		return filename.replace(/\.mdx?$/, '');
	}

	/**
	 * Convert long strings to unique strings using SHA-256 hash
	 * @param {string} longString - input string
	 * @param {number} length - desired length of the output hash
	 * @returns {string} unique string with characters A-Z, a-z, 0-9
	 */
	hashSlug(longString, length) {
		const hash = crypto.createHash('sha256');
		hash.update(longString);
		const hexHash = hash.digest('hex');
		const base62Hash = this.hexToBase62(hexHash);
		return base62Hash.slice(0, length);
	}

	/**
	 * Convert hexadecimal string to base62 (A-Z, a-z, 0-9)
	 * @param {string} hex - hexadecimal input string
	 * @returns {string} base62 string
	 */
	hexToBase62(hex) {
		const base62Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let decimal = BigInt(`0x${hex}`);
		let result = '';
		while (decimal > 0n) {
			result = base62Chars[Number(decimal % 62n)] + result;
			decimal /= 62n;
		}
		return result || '0';
	}

	/**
	 * Write redirects to JSON file
	 * @param {Object} redirects - The redirects object
	 */
	async writeRedirectsFile(redirects) {
		const filePath = path.resolve('public/redirects.json');
		const jsonContent = JSON.stringify(redirects, null, 2);
		await fs.writeFile(filePath, jsonContent, 'utf8');
	}
}

const generator = new ShortUrlGenerator();
generator.run();
