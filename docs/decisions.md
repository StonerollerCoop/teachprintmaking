# Decisions log

Short records of choices made while building, so they can be revisited deliberately.

## 2026-10-11: Prototype stores lessons as files

Lessons live as Markdown files in `src/content/lessons/`, one per lesson or variation, with searchable details in the frontmatter at the top of each file. The site is fully static for now. Search runs in the browser against every lesson at once, which is instant at this size.

The admin editor is not decided yet. Two paths remain open: a form-based editor that writes these same files to GitHub, or moving lessons into a Cloudflare D1 database with a custom admin screen. Either way, D1 and R2 will still hold public submissions, uploads, and feedback, since those need a private moderation queue.

## 2026-10-11: Variations are lessons with a parent

A variation is a full lesson file with a `parent` field naming the original lesson. Search treats lessons and variations the same way. Lesson pages link both directions, and a variation's page credits the original lesson's authors.

Tradeoff: changing a parent does not update its variations automatically. When the admin editor exists, it should flag a parent's variations for review whenever the parent changes.

## 2026-10-11: Adaptations are structured and must be approved

Each lesson lists its adaptations with a machine-readable trigger (for example, "no printing press" or "up to 32 students") and the change in plain language, optionally pointing to a variation. Search only offers an adaptation when its trigger covers the teacher's situation and `approved` is true. Search never invents a substitution.

## 2026-10-11: Time is per session plus number of sessions

Teachers enter minutes per session and number of sessions separately. Lessons store the minimum minutes per session, the number of sessions, and whether work dries overnight.

## 2026-10-11: Everyday supplies are assumed

Materials marked `assumed` in `src/data/vocab.ts` (copy paper, pencils, glue, and similar) are never asked about, which keeps the search form short. Anything else must be ticked to count as available. Leaving a whole section blank means it is not used to filter.

## 2026-10-11: Lesson ages should line up with the search form's grade bands

The search form asks for a grade band (for example, grades 9 to 12, which starts at age 14). A lesson only fits a band if it covers the whole band, so a lesson marked "15 and up" would never appear for a high school class. Set lesson age floors to band starts (4, 5, 8, 11, 14, 18) unless there's a real reason not to.

## Open questions before public submissions

- What license contributors grant when they submit a lesson.
- How uploads handle photos of identifiable students.
