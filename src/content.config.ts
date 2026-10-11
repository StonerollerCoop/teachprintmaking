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
    })
    .refine((d) => d.ages.min <= d.ages.max, { message: 'ages.min must not exceed ages.max' })
    .refine((d) => d.students.min <= d.students.max, { message: 'students.min must not exceed students.max' })
    .refine((d) => !(d.time.dryingOvernight && d.time.sessions < 2), {
      message: 'A lesson that dries overnight needs at least 2 sessions',
    }),
});

export const collections = { lessons };
