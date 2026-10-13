import { getCollection, type CollectionEntry } from 'astro:content';
import { families, techniques, type TechniqueId } from '../data/vocab';
import { timeline } from '../data/timeline';

export type FamilyId = keyof typeof families;
export type FamilyEntry = CollectionEntry<'families'>;
export type ProcessEntry = CollectionEntry<'processes'>;

export const familyIds = Object.keys(families) as FamilyId[];

export const familyUrl = (family: string) => `/types/${family}/`;
export const processUrl = (id: string) => `/types/${id}/`;

/** The family a process belongs to, read from its folder. */
export const processFamily = (p: ProcessEntry) => p.id.split('/')[0] as FamilyId;
export const processSlug = (p: ProcessEntry) => p.id.split('/')[1];

export const settingLabels = {
  classroom: 'An ordinary classroom',
  'art-room': 'An art room with a sink',
  studio: 'A ventilated print studio',
} as const;

export const pressLabels = {
  none: 'Not needed',
  optional: 'Optional',
  needed: 'Needed, though a homemade one can work',
} as const;

let cache: { families: FamilyEntry[]; processes: ProcessEntry[] } | undefined;

/**
 * Families and processes, with every link checked. A broken link fails the
 * build, the same way lesson links do.
 */
export async function allTypes() {
  if (cache) return cache;
  const fams = (await getCollection('families')).sort((a, b) => a.data.order - b.data.order);
  const procs = (await getCollection('processes')).sort((a, b) => a.data.order - b.data.order);
  const problems: string[] = [];
  const procIds = new Set(procs.map((p) => p.id));
  const timelineIds = new Set(timeline.map((t) => t.id));

  for (const f of familyIds) if (!fams.some((e) => e.id === f)) problems.push(`missing family file for "${f}"`);
  for (const f of fams) {
    if (!(f.id in families)) problems.push(`family file "${f.id}" is not a family in vocab.ts`);
    for (const t of f.data.timeline) if (!timelineIds.has(t)) problems.push(`${f.id}: unknown timeline entry "${t}"`);
  }

  const claimed = new Map<TechniqueId, string>();
  for (const p of procs) {
    const fam = processFamily(p);
    if (!(fam in families)) problems.push(`${p.id}: folder "${fam}" is not a family`);
    for (const t of p.data.timeline) if (!timelineIds.has(t)) problems.push(`${p.id}: unknown timeline entry "${t}"`);
    for (const r of p.data.related) if (!procIds.has(r)) problems.push(`${p.id}: related process "${r}" does not exist`);
    for (const t of p.data.techniques) {
      if (techniques[t].family !== fam) problems.push(`${p.id}: technique "${t}" belongs to ${techniques[t].family}`);
      if (claimed.has(t)) problems.push(`${p.id}: technique "${t}" is already listed by ${claimed.get(t)}`);
      claimed.set(t, p.id);
    }
  }
  for (const t of Object.keys(techniques) as TechniqueId[])
    if (!claimed.has(t)) problems.push(`technique "${t}" is not listed by any process page`);

  if (problems.length) throw new Error('Type page problems:\n' + problems.join('\n'));
  cache = { families: fams, processes: procs };
  return cache;
}

/** The process page a lesson technique belongs to. */
export async function processForTechnique(t: TechniqueId) {
  const { processes } = await allTypes();
  return processes.find((p) => p.data.techniques.includes(t));
}
