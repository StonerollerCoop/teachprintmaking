import { getCollection, type CollectionEntry } from 'astro:content';
import type { LessonMeta } from './match';

export type LessonEntry = CollectionEntry<'lessons'>;

let cache: LessonEntry[] | undefined;

/**
 * All lessons, with parent and variation links checked. A broken link fails
 * the build, so a typo in a slug can never reach the site.
 */
export async function allLessons(): Promise<LessonEntry[]> {
  if (cache) return cache;
  const entries = (await getCollection('lessons')).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const ids = new Set(entries.map((e) => e.id));
  const problems: string[] = [];
  for (const e of entries) {
    if (e.data.parent && !ids.has(e.data.parent)) problems.push(`${e.id}: parent "${e.data.parent}" does not exist`);
    if (e.data.parent === e.id) problems.push(`${e.id}: a lesson cannot be its own parent`);
    for (const a of e.data.adaptations)
      if (a.variation && !ids.has(a.variation)) problems.push(`${e.id}: adaptation points to missing variation "${a.variation}"`);
  }
  if (problems.length) throw new Error('Lesson link problems:\n' + problems.join('\n'));
  cache = entries;
  return entries;
}

export function toMeta(e: LessonEntry): LessonMeta {
  const d = e.data;
  return {
    slug: e.id,
    title: d.title,
    summary: d.summary,
    technique: d.technique,
    parent: d.parent,
    demo: d.demo,
    ages: d.ages,
    experience: d.experience,
    students: d.students,
    time: d.time,
    materials: d.materials,
    tools: d.tools,
    surfaces: d.surfaces,
    space: d.space,
    adaptations: d.adaptations,
  };
}

export function variationsOf(entries: LessonEntry[], id: string) {
  return entries.filter((e) => e.data.parent === id);
}

export const lessonUrl = (slug: string) => `/lessons/${slug}/`;
