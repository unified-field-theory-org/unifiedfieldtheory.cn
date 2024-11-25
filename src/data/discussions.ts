// src/data/discussions.ts

// 定义链接映射的类型
type LinkMap = {
	[key: string]: string;
};

// 导出链接映射对象
export const forumLinks: LinkMap = {
	'/': 'https://forum.unifiedfieldtheory.cn',
	'/main-works/unified-field-theory/section-0':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000125',
	'/main-works/unified-field-theory/section-1':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000129',
	'/main-works/unified-field-theory/section-2':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000130',
	'/main-works/unified-field-theory/section-3':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000131',
	'/main-works/unified-field-theory/section-4':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000132',
	'/main-works/unified-field-theory/section-5':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000133',
	'/main-works/unified-field-theory/section-6':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000134',
	'/main-works/unified-field-theory/section-7':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000135',
	'/main-works/unified-field-theory/section-8':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000136',
	'/main-works/unified-field-theory/section-9':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000137',
	'/main-works/unified-field-theory/section-10':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000138',
	'/main-works/unified-field-theory/section-11':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000139',
	'/main-works/unified-field-theory/section-12':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000140',
	'/main-works/unified-field-theory/section-13':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000141',
	'/main-works/unified-field-theory/section-14':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000142',
	'/main-works/unified-field-theory/section-15':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000143',
	'/main-works/unified-field-theory/section-16':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000144',
	'/main-works/unified-field-theory/section-17':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000145',
	'/main-works/unified-field-theory/section-18':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000146',
	'/main-works/unified-field-theory/section-19':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000147',
	'/main-works/unified-field-theory/section-20':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000148',
	'/main-works/unified-field-theory/section-21':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000149',
	'/main-works/unified-field-theory/section-22':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000150',
	'/main-works/unified-field-theory/section-23':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000151',
	'/main-works/unified-field-theory/section-24':
		'https://forum.unifiedfieldtheory.cn/questions/10010000000000154',
} as const; // 使用 as const 使值变为只读

// 可选：导出一个获取链接的工具函数
export function getForumLink(currentPath: string): string {
	const normalizedPath = currentPath.replace(/^\/+|\/+$/g, '');
	return (
		Object.entries(forumLinks).find(([key]) => normalizedPath.endsWith(key))?.[1] || forumLinks['/']
	);
}
