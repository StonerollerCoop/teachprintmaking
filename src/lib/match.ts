/**
 * Deterministic lesson matching.
 *
 * A lesson is compared against what the teacher told us. Every requirement
 * the teacher cannot meet becomes a "gap". If a lesson has no gaps, it is a
 * strong match. If every gap is covered by an approved adaptation written into
 * the lesson, it is a possible adaptation, and we show those adaptations. If
 * any gap is uncovered, the lesson does not fit, and we say why.
 *
 * The engine never invents a substitution. It can only offer adaptations an
 * editor has written and approved.
 *
 * Anything the teacher leaves blank is not checked.
 */

import {
  materials as materialVocab,
  tools as toolVocab,
  surfaces as surfaceVocab,
  experienceLevels,
  tableSpace as tableSpaceVocab,
  messLevels,
  type MaterialId,
  type ToolId,
  type SurfaceId,
  type ExperienceId,
  type MessId,
  type TableSpaceId,
} from '../data/vocab';

export type Trigger =
  | { type: 'missing-material'; item: MaterialId }
  | { type: 'missing-tool'; item: ToolId }
  | { type: 'more-students'; upTo: number }
  | { type: 'fewer-students'; downTo: number }
  | { type: 'shorter-sessions'; minMinutes: number }
  | { type: 'fewer-sessions'; minSessions: number }
  | { type: 'younger'; minAge: number }
  | { type: 'older'; maxAge: number }
  | { type: 'experience'; level: ExperienceId }
  | { type: 'no-sink' }
  | { type: 'less-space'; tableSpace: TableSpaceId }
  | { type: 'lower-mess'; mess: MessId }
  | { type: 'no-ventilation' };

export interface Adaptation {
  trigger: Trigger;
  change: string;
  /** Slug of a variation that already works this out, if one exists. */
  variation?: string;
  approved: boolean;
}

export interface LessonMeta {
  slug: string;
  title: string;
  summary: string;
  technique: string;
  parent?: string;
  demo: boolean;
  ages: { min: number; max: number };
  experience: ExperienceId[];
  students: { min: number; max: number };
  time: { minutesPerSession: number; sessions: number; dryingOvernight: boolean };
  materials: { required: MaterialId[]; optional: MaterialId[] };
  tools: { required: ToolId[]; optional: ToolId[] };
  surfaces: SurfaceId[];
  space: { sink: 'required' | 'helpful' | 'none'; tableSpace: TableSpaceId; mess: MessId; ventilation: boolean };
  adaptations: Adaptation[];
}

export interface Constraints {
  students?: number;
  ages?: { min: number; max: number };
  experience?: ExperienceId;
  minutesPerSession?: number;
  sessions?: number;
  /** Non-assumed materials on hand. Undefined or empty means "not answered". */
  materials?: MaterialId[];
  /** Tools on hand. Undefined or empty means "not answered". */
  tools?: ToolId[];
  surfaces?: SurfaceId[];
  sink?: boolean;
  tableSpace?: TableSpaceId;
  maxMess?: MessId;
  ventilation?: boolean;
  /** Rules out every tool marked sharp, whatever else is ticked. */
  noSharpTools?: boolean;
}

export interface Gap {
  /** Plain-language description of what doesn't fit. */
  reason: string;
  /** The approved adaptation that covers it, if any. */
  covered?: Adaptation;
}

export type Fit = 'strong' | 'adaptable' | 'none';

export interface MatchResult {
  lesson: LessonMeta;
  fit: Fit;
  gaps: Gap[];
  /** Approved adaptations needed, deduplicated, in the order they apply. */
  adaptations: Adaptation[];
  /** Optional materials and tools the teacher also has; used for ranking. */
  bonus: number;
}

const tableRank: Record<TableSpaceId, number> = { tight: 0, standard: 1, roomy: 2 };
const messRank: Record<MessId, number> = { low: 0, medium: 1, high: 2 };

function findAdaptation(lesson: LessonMeta, test: (t: Trigger) => boolean): Adaptation | undefined {
  return lesson.adaptations.find((a) => a.approved && test(a.trigger));
}

export function gapsFor(lesson: LessonMeta, c: Constraints): Gap[] {
  const gaps: Gap[] = [];
  const add = (reason: string, test: (t: Trigger) => boolean) =>
    gaps.push({ reason, covered: findAdaptation(lesson, test) });

  // Class size
  if (c.students !== undefined) {
    const n = c.students;
    if (n > lesson.students.max)
      add(`Written for up to ${lesson.students.max} students; you have ${n}.`, (t) => t.type === 'more-students' && t.upTo >= n);
    if (n < lesson.students.min)
      add(`Needs at least ${lesson.students.min} students; you have ${n}.`, (t) => t.type === 'fewer-students' && t.downTo <= n);
  }

  // Age
  if (c.ages) {
    const { min, max } = c.ages;
    if (min < lesson.ages.min)
      add(`Written for ages ${lesson.ages.min} and up.`, (t) => t.type === 'younger' && t.minAge <= min);
    if (max > lesson.ages.max)
      add(`Written for ages up to ${lesson.ages.max}.`, (t) => t.type === 'older' && t.maxAge >= max);
  }

  // Experience
  if (c.experience && !lesson.experience.includes(c.experience)) {
    const level = c.experience;
    add(
      `Written for ${lesson.experience.map((e) => experienceLevels[e].toLowerCase()).join(' or ')} students.`,
      (t) => t.type === 'experience' && t.level === level,
    );
  }

  // Time
  if (c.minutesPerSession !== undefined && c.minutesPerSession < lesson.time.minutesPerSession) {
    const m = c.minutesPerSession;
    add(
      `Needs ${lesson.time.minutesPerSession} minutes per session; you have ${m}.`,
      (t) => t.type === 'shorter-sessions' && t.minMinutes <= m,
    );
  }
  if (c.sessions !== undefined && c.sessions < lesson.time.sessions) {
    const s = c.sessions;
    const why = lesson.time.dryingOvernight ? ' (work has to dry between sessions)' : '';
    add(
      `Needs ${lesson.time.sessions} sessions${why}; you have ${s}.`,
      (t) => t.type === 'fewer-sessions' && t.minSessions <= s,
    );
  }

  // Materials (only checked if the teacher answered)
  if (c.materials && c.materials.length > 0) {
    const have = new Set<MaterialId>(c.materials);
    for (const m of lesson.materials.required) {
      if (materialVocab[m].assumed || have.has(m)) continue;
      add(`Needs ${materialVocab[m].label.toLowerCase()}.`, (t) => t.type === 'missing-material' && t.item === m);
    }
  }

  // Tools
  const answeredTools = c.tools && c.tools.length > 0;
  if (answeredTools || c.noSharpTools) {
    const have = new Set<ToolId>(answeredTools ? c.tools : (Object.keys(toolVocab) as ToolId[]));
    for (const t of lesson.tools.required) {
      const sharpBlocked = c.noSharpTools && toolVocab[t].sharp;
      if (have.has(t) && !sharpBlocked) continue;
      const label = toolVocab[t].label.toLowerCase();
      add(
        sharpBlocked ? `Uses ${label}, and you've ruled out sharp tools.` : `Needs ${label}.`,
        (tr) => tr.type === 'missing-tool' && tr.item === t,
      );
    }
  }

  // Printing surface: the lesson works on any one of its listed surfaces.
  if (c.surfaces && c.surfaces.length > 0) {
    const have = new Set<SurfaceId>(c.surfaces);
    if (!lesson.surfaces.some((s) => have.has(s)))
      add(`Prints on ${lesson.surfaces.map((s) => surfaceVocab[s].toLowerCase()).join(' or ')}.`, () => false);
  }

  // Space
  if (c.sink === false && lesson.space.sink === 'required')
    add('Needs a sink.', (t) => t.type === 'no-sink');
  if (c.tableSpace && tableRank[c.tableSpace] < tableRank[lesson.space.tableSpace]) {
    const ts = c.tableSpace;
    add(
      `Needs ${tableSpaceVocab[lesson.space.tableSpace].split(' (')[0].toLowerCase()} table space.`,
      (t) => t.type === 'less-space' && tableRank[t.tableSpace] <= tableRank[ts],
    );
  }
  if (c.maxMess && messRank[lesson.space.mess] > messRank[c.maxMess]) {
    const mm = c.maxMess;
    add(
      `Mess level is ${messLevels[lesson.space.mess].toLowerCase()}.`,
      (t) => t.type === 'lower-mess' && messRank[t.mess] <= messRank[mm],
    );
  }
  if (c.ventilation === false && lesson.space.ventilation)
    add('Needs good ventilation.', (t) => t.type === 'no-ventilation');

  return gaps;
}

export function matchLesson(lesson: LessonMeta, c: Constraints): MatchResult {
  const gaps = gapsFor(lesson, c);
  const fit: Fit = gaps.length === 0 ? 'strong' : gaps.every((g) => g.covered) ? 'adaptable' : 'none';
  const adaptations: Adaptation[] = [];
  if (fit === 'adaptable') for (const g of gaps) if (g.covered && !adaptations.includes(g.covered)) adaptations.push(g.covered);

  const haveM = new Set(c.materials ?? []);
  const haveT = new Set(c.tools ?? []);
  const bonus =
    lesson.materials.optional.filter((m) => haveM.has(m)).length + lesson.tools.optional.filter((t) => haveT.has(t)).length;

  return { lesson, fit, gaps, adaptations, bonus };
}

export function search(lessons: LessonMeta[], c: Constraints) {
  const results = lessons.map((l) => matchLesson(l, c));
  const byTitle = (a: MatchResult, b: MatchResult) => a.lesson.title.localeCompare(b.lesson.title);
  return {
    strong: results.filter((r) => r.fit === 'strong').sort((a, b) => b.bonus - a.bonus || byTitle(a, b)),
    adaptable: results
      .filter((r) => r.fit === 'adaptable')
      .sort((a, b) => a.adaptations.length - b.adaptations.length || b.bonus - a.bonus || byTitle(a, b)),
    none: results.filter((r) => r.fit === 'none').sort(byTitle),
  };
}
