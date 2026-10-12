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

## 2026-10-12: Direction from Libby on organization and the opening page

- Lessons are organized under the four families of printmaking: relief, intaglio, planographic, and stencil.
- Alongside the families, the site celebrates everything around the process: all the things that can serve as a press, all the ways to make or find ink, and all the ways to make a plate.
- The opening page is about the joy of printmaking. Libby's notes: printmaking is wonderful for teaching beginners through collaboration with materials, type, graphic space, composition, and color play. The print stands between the hand and the paper, which takes away the pressure drawing can carry. It also makes students pay attention to conditions such as how humid the air is that day and what paper they are using, which makes them more aware and more playful.
- Libby will send interface notes before the opening page is redesigned.
- Images: public domain and openly licensed photos are fine for now, from museum open access collections, Wikimedia Commons, Flickr, and Pexels, with attribution. Teacher photos should replace them over time.
- Video: YouTube videos may be embedded with full credit to the creator.

Open question: the current vocabulary has separate families for monotype, collagraph, transfer, and experimental work. These need to be placed within the four families or kept as cross-family techniques.

## 2026-10-12: Mission, money, and contributor credit

- The site is noncommercial. Its only income will be donations toward server costs. Its purpose is to promote printmaking in all its forms for all ages while building a searchable database of lessons.
- Because the site is noncommercial, sources under NonCommercial licenses (CC BY-NC, CC BY-NC-SA) may be used, with attribution.
- We never take anyone's lesson. When contemporary lessons turn up that aren't openly licensed, they go on an outreach list so Libby can ask the creator for permission to feature them.
- The outreach list holds names and contact details, so it must stay private and out of this repository, which is public.
- The submission form must ask how contributors want to be credited and where the material came from (their own original work, or adapted from a named source). Libby's own original lessons must carry her credit.
- Open sources may also be used as reference for illustrations drawn for the site, such as process diagrams. Illustrations should not copy a protected work.

## 2026-10-12: Site license, Libby's credit, and common practice

- Everything the site publishes is under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0), including Libby's own lessons. Contributors agree to it when they submit.
- Libby's own original work is credited as "Libby Clarke."
- Common practice needs no credit. When many teachers describe a lesson the same way (foam plate printing, potato prints, a basic gel plate pull), it's shared knowledge, and we write it up in our own words without tracing it to anyone. Techniques and procedures aren't owned. What is owned is a particular person's expression: their wording, photos, handouts, or a distinctive project of their own design. We never copy those, and when a lesson is clearly someone's own, it gets credit or goes on the outreach list.
- The outreach list lives in a private Claude artifact, not in this repository.
