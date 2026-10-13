import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  materials,
  tools,
  surfaces,
  experienceLevels,
  messLevels,
  tableSpace,
  techniques,
  ageBands,
  keys,
} from './data/vocab';

const material = z.enum(keys(materials));
const tool = z.enum(keys(tools));
const experience = z.enum(keys(experienceLevels));
const mess = z.enum(keys(messLevels));
const table = z.enum(keys(tableSpace));

const trigger = z.discriminatedUnion('type', [
  z.object({ type: z.literal('missing-material'), item: material }),
  z.object({ type: z.literal('missing-tool'), item: tool }),
  z.object({ type: z.literal('more-students'), upTo: z.number().int().positive() }),
  z.object({ type: z.literal('fewer-students'), downTo: z.number().int().positive() }),
  z.object({ type: z.literal('shorter-sessions'), minMinutes: z.number().int().positive() }),
  z.object({ type: z.literal('fewer-sessions'), minSessions: z.number().int().positive() }),
  z.object({ type: z.literal('younger'), minAge: z.number().int().positive() }),
  z.object({ type: z.literal('older'), maxAge: z.number().int().positive() }),
  z.object({ type: z.literal('experience'), level: experience }),
  z.object({ type: z.literal('no-sink') }),
  z.object({ type: z.literal('less-space'), tableSpace: table }),
  z.object({ type: z.literal('lower-mess'), mess }),
  z.object({ type: z.literal('no-ventilation') }),
]);

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      /** True for placeholder content written to test the site. */
      demo: z.boolean().default(false),
      /** Slug of the parent lesson. Present only on variations. */
      parent: z.string().optional(),
      technique: z.enum(keys(techniques)),
      objectives: z.array(z.string()).default([]),
      ages: z.object({ min: z.number().int(), max: z.number().int() }),
      experience: z.array(experience).min(1),
      students: z.object({ min: z.number().int().positive(), max: z.number().int().positive() }),
      time: z.object({
        minutesPerSession: z.number().int().positive(),
        sessions: z.number().int().positive().default(1),
        dryingOvernight: z.boolean().default(false),
      }),
      materials: z.object({ required: z.array(material), optional: z.array(material).default([]) }),
      tools: z.object({ required: z.array(tool), optional: z.array(tool).default([]) }),
      surfaces: z.array(z.enum(keys(surfaces))).min(1),
      space: z.object({
        sink: z.enum(['required', 'helpful', 'none']),
        tableSpace: table,
        mess,
        ventilation: z.boolean().default(false),
      }),
      safety: z.array(z.string()).default([]),
      adaptations: z
        .array(
          z.object({
            trigger,
            change: z.string(),
            variation: z.string().optional(),
            approved: z.boolean().default(true),
          }),
        )
        .default([]),
      credits: z
        .array(z.object({ name: z.string(), role: z.string(), organization: z.string().optional() }))
        .default([]),
      /**
       * Where the lesson came from. Leave empty for original work or for
       * common practice that belongs to no one in particular.
       */
      sources: z
        .array(
          z.object({
            relation: z.enum(['adapted-from', 'based-on', 'reference']),
            title: z.string(),
            author: z.string(),
            url: z.url().optional(),
            license: z.string(),
            licenseUrl: z.url().optional(),
            /** Id of the source in src/data/library.ts, when it's a book or paper we keep. */
            library: z.string().optional(),
          }),
        )
        .default([]),
    })
    .refine((d) => d.ages.min <= d.ages.max, { message: 'ages.min must not exceed ages.max' })
    .refine((d) => d.students.min <= d.students.max, { message: 'students.min must not exceed students.max' })
    .refine((d) => !(d.time.dryingOvernight && d.time.sessions < 2), {
      message: 'A lesson that dries overnight needs at least 2 sessions',
    }),
});

const parts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/parts' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    tagline: z.string(),
    /** Timeline entry ids that illustrate this part. */
    timeline: z.array(z.string()).default([]),
    /** Lesson slugs that explore this part. */
    lessons: z.array(z.string()).default([]),
  }),
});

/**
 * The four families of printmaking. One file per family, named for its id in
 * vocab.ts (relief.md, intaglio.md, and so on).
 */
/**
 * What a family or process page draws on, credited at the foot of the page
 * the way the Liturgy Companion does it. A web page or video needs a title,
 * author, and url; a book in the library needs only its id. `where` names the
 * chapter, section, or pages used. A YouTube id embeds the video.
 */
const pageSource = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  url: z.url().optional(),
  library: z.string().optional(),
  youtube: z.string().optional(),
  where: z.string().optional(),
  note: z.string().optional(),
});

/**
 * Anything on the page that needs permission or checking before the site goes
 * public. Shown in red on the page and gathered on the private Checks page.
 */
const checks = z.array(z.string()).default([]);

const families = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/families' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    tagline: z.string(),
    timeline: z.array(z.string()).default([]),
    sources: z.array(pageSource).default([]),
    checks,
  }),
});

/**
 * Processes within each family. Files live in a folder named for their family
 * (src/content/processes/relief/linocut.md), so the id is "relief/linocut".
 */
const processes = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/processes' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    tagline: z.string(),
    /** Youngest grade band the process can reasonably start at, in some form. */
    youngest: z.enum(keys(ageBands)),
    /** How the youngest students meet it, in a short phrase. */
    youngestNote: z.string(),
    press: z.enum(['none', 'optional', 'needed']),
    setting: z.enum(['classroom', 'art-room', 'studio']),
    /** Lesson techniques that belong to this process, so its lessons list themselves. */
    techniques: z.array(z.enum(keys(techniques))).default([]),
    timeline: z.array(z.string()).default([]),
    /** Ids of closely related processes, in any family ("intaglio/drypoint"). */
    related: z.array(z.string()).default([]),
    sources: z.array(pageSource).default([]),
    checks,
  }),
});

export const collections = { lessons, parts, families, processes };
