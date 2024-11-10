import type { TutorialEntry } from '~/content/config';

/** Get a full list of pages for the tutorial in the current language, falling back to English if not available. */
export function getTutorialPages(allPages: TutorialEntry[], lang: string) {
	return [];
}

/** Turn a flat list of tutorial pages into a hierarchical array of units and lessons. */
export function getTutorialUnits(tutorialPages: TutorialEntry[]) {
	return tutorialPages.reduce(
		(units, page) => {
			if (page.data.unitTitle) {
				units.push({
					title: page.data.unitTitle,
					lessons: [page],
				});
			} else {
				units.at(-1)?.lessons.push(page);
			}
			return units;
		},
		[] as { title: string; lessons: typeof tutorialPages }[]
	);
}
