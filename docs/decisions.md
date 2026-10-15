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

## 2026-10-12: The printed word, design teachers, the four types, and the home page

- The site serves design teachers as well as printmaking and art teachers. Typography is a strand through everything: type as a print technology, and the impact of the printed word.
- The history timeline has its own category for the printed word, alongside the four families and a category for paper, ink, and presses.
- The site now uses exactly four families: relief, intaglio, planographic, and stencil. Monotype and monoprint sit under planographic because they print from a flat surface. Collagraph is filed by how it is inked; the current demo is relief-inked. This was a default chosen to match Libby's sketch and can be revisited.
- The home page follows Libby's sketch of October 12: the title and a short introduction, a row of the four types, a "Why?" row of six reasons, then "Plan a lesson here" with the lesson finder.
- The six "Why?" reasons are drafted from Libby's own notes and are hers to rewrite.

## 2026-10-12: Welcome first, results on their own page, and the parts of a print

- The home page is a welcome. It keeps the lesson form, but results appear on a separate Find page (/find/), which reads the form from the address bar or from what the home page saved.
- Five pages explain the parts every print shares: substrate, plate or stencil, ink or paint, edition, and press or means of transfer. They link to lessons and timeline entries and are written as Markdown files in src/content/parts so they can be edited like lessons.
- Pacific barkcloth traditions are in the timeline: Fijian leaf stencils on masi, Tongan ngatu rubbed over kupesi, and Tahitian bamboo stamps.

## 2026-10-12: A first real visual direction

- Type: Libre Caslon (after William Caslon’s types, which set the look of early American printing) for headings and reading text, and Archivo, a grotesque in the spirit of nineteenth-century wood type, for the interface. Fonts are bundled with the site rather than loaded from Google.
- Color: printing inks on printmaking paper. Prussian blue leads; a warm relief red and an ochre are used sparingly; black ink carries the text.
- The home page title prints in two colors slightly out of register, the one decorative flourish on the site.
- The lesson form reads as a sentence a teacher fills in, with materials and tools as grouped chips underneath.
- The four types on the home page list the processes people actually know them by.
- All of this is a starting point for Libby to shape.

## 2026-10-12: Any source can inform a lesson, with citation

- We are not limited to openly licensed material. Any book, article, handout, video, or museum essay can inform a lesson, as long as we write the lesson in our own words and cite the source.
- Techniques, procedures, facts, and historical information belong to no one, so learning them from a copyrighted source and teaching them in our own words is fine. Citing is good practice and gives credit where it is due.
- Citing does not grant permission to reproduce. A source's wording, photographs, diagrams, worksheets, and distinctive project designs still need an open license or the creator's permission. Short quotations used to discuss a source are the narrow exception.
- In lesson files, use `relation: based-on` when a source shaped the lesson and `relation: reference` for further reading. Use `adapted-from` only when we have the right to adapt the source itself.
- This opens up the intaglio gap: safer intaglio methods described in copyrighted manuals can be taught in our own words with credit to their originators.

## 2026-10-12: The library and the Books page

- Books and papers we draw on live in src/data/library.ts and appear on a public Books page (/sources/). Lessons point to them with `library:` in their sources, and the Books page lists which lessons draw on each.
- The book files themselves are never committed to this repository. They stay private.
- Where a source gives outdated safety advice, the library entry carries a safety note (Kafka recommends carbon tetrachloride; DeSherlia's leaf prints use a candle flame).

## 2026-10-12: Libby's design direction, round one

- No imposed page width. Pages run full width with side gutters only, unless Libby asks for a narrower column.
- No heavy black rules across the page, including under the header.
- The home title is plain type with no effects.
- The six "Why?" reasons sit in one row of six columns, stepping down to three, two, and one on smaller screens.
- The lesson form is a conventional labeled form. Usability and the look and feel are Libby's to lead once the content is underway.

## 2026-10-13: Types of printmaking, with a page for each process

- The site has a Types section (/types/) with a page for each of the four families and a page for each process within them, 19 in all. Libby chose this layout over a single page per family.
- Each family and process page covers how it works and its history; ages, safety, and setting; and plates, presses, and inks. Libby chose not to add a further-reading list to these pages. Named methods are still credited in the text (for example, Glen Alps for the collagraph, Mary Dalton for lithino, Friedhard Kiekeben for Edinburgh Etch).
- The pages are Markdown files: src/content/families/<family>.md and src/content/processes/<family>/<process>.md. Each process lists the lesson techniques that belong to it, so its lessons appear automatically. The build fails if a technique belongs to no process page, belongs to two, or belongs to a process in another family.
- Every process page gives the youngest grade band where it can reasonably start, whether a press is needed, and the setting it needs (an ordinary classroom, an art room with a sink, or a ventilated studio). These are editorial judgments drawn from the library books and current safety practice, and they are Libby's to revise.
- The home page's four type cards now open the family pages instead of the lessons list. A "Types" link is in the main navigation, and lesson pages link their family and process.
- Safety on these pages follows current practice, not the older books. Where a book recommends something now considered unsafe, the page says so rather than repeating the method.
- New lessons drawn from the October 13 books are deferred to a later round, after Libby has reviewed these pages.

## 2026-10-13: Cards instead of long lists, and sources on process pages

- Libby asked for gridded cards in place of long lists. Lessons (the lessons index, process pages, and parts pages), books (the Books page), timeline entries, and related processes now appear as cards in a responsive grid. Lesson cards show the technique, ages, summary, and any variations.
- Libby is gathering web sources for every process. Each process page can now list its sources in its frontmatter: a web page or video by title, author, and url, or a library book by id. They appear at the foot of the page as "Sources for this page," with a note on what we took from each. This credits what a page draws on; it is not the further-reading list Libby chose not to add.
- YouTube videos listed as sources are embedded from youtube-nocookie.com, with the title and creator on the card and a link to the original.
- None of the gel plate sources Libby sent state a license, so the gel plate page describes the method in our own words and credits all five. Recipes vary widely; the page explains the common pattern and credits named recipes (Linda Germain, Suzanne McNeill) without copying any one set of proportions.
- The four remaining library books (Fick and Grabowski, Hughes and Vernon-Morris, Walker, Medley) have now been read in full, and their findings are folded into the process pages with credit.

## 2026-10-13: Citing as on the Liturgy Companion, and red flags before launch

- Pages cite their sources the way the Liturgy Companion does. A short citation in small, soft sans type follows the claim it supports, such as "Walker, ch. 1" or "Herringe." The full entry appears under Sources at the foot of the page, with the chapter or section used.
- In page Markdown, a short citation is written as `<cite>Walker, ch. 1</cite>`. In frontmatter, each source can carry `where` (the chapter, section, or pages used) and `note` (what we took from it).
- Libby is happy to credit people generously. Credit freely; reserve originator language ("developed," "invented") for people who actually introduced a method.
- The site won't go public until every permission is in hand. Anything that needs permission or checking is marked in red: the claim itself is wrapped in `<span class="flag">`, and the reason is listed under `checks:` in the page's frontmatter, which shows a red "Before this goes public" box at the top of the page. A book's rights question goes in `check` on its library entry.
- /checks/ gathers every flag on the site in one place. It isn't linked from the menu.
- Content keeps being updated as Libby sends new sources.

## 2026-10-13: Pictures on the family and process pages

- Family and process pages show a Pictures section of image cards: the picture, its title, maker, date, and medium, a line on what it shows teachers, and its source and license. Each picture links to its record at the source.
- Pictures live in src/data/images.json, one entry per image, keyed to a page id ("relief" or "relief/woodcut"). Images are served from the source (the Art Institute of Chicago's image server for the first batch), the same way the timeline does it.
- The first sweep added 102 public-domain (CC0) images from the Art Institute of Chicago, each confirmed against its own museum record. The Met, Wikimedia Commons, and the Library of Congress could not be reached in that sweep, so process photos (tools, presses, people printing) and the modern processes (linocut, collagraph, gel plate, Risograph) are still missing.
- Libby wants the sweep to go well beyond museums, to the wider public domain: Wikimedia Commons, the Library of Congress, Flickr Commons, Internet Archive book scans, the NYPL's public-domain collections, Openverse, and openly licensed photo sites.
- An image entry with `check` shows in red and appears on /checks/. Six are flagged, mostly to confirm the subject suits children before launch.

## 2026-10-13: A Teaching section, four more books, and pictures beyond museums

- The site has a Teaching section (/teaching/) with its own menu link. Libby chose a section of its own over notes scattered through lessons. It has three groups of pages, shown as cards: running a print class; what printmaking teaches (art and design basics, type and the printed word, across the curriculum, habits of mind); and reaching every learner (starting from the learner, blind and low vision learners, learners with intellectual disabilities, and sensory and attention needs).
- Teaching pages are Markdown files in src/content/teaching. Each can list lessons and processes that fit it, and sources and checks the same way process pages do.
- The learner pages draw on organizations of and for disabled people (the National Federation of the Blind, the American Printing House for the Blind, BANA, the Autistic Self Advocacy Network, the National Autistic Society), occupational therapy and special education sources, and studios for artists with disabilities. On language, the pages say to use the words each learner uses for themselves.
- Where no published source was found, the pages say so and offer our own suggestion: registering prints by touch, and rotating print-shop jobs as structure.
- A page on physical and motor access was not requested this round. Hand and grip changes are covered briefly on "Starting from the learner."
- Four more books are in the library: Martin's Encyclopedia of Printmaking Techniques (1993), Heller's Printmaking Today (1958), Logan's Make Ink (2018), and Hodge's Art and Design Teacher's Handbook (2010). Heller may be public domain if its copyright wasn't renewed, which is flagged. Logan is cited without page numbers because our copy is an ebook conversion.
- Parts pages can now list sources, and the ink page has a section on finding and making ink, with Logan's safety cautions.
- Pictures: the workspace can't reach Wikimedia Commons, Flickr, or Openverse, so this sweep used Pexels, Unsplash, and the Library of Congress through the web-reading tool. It added 125 photographs of the work itself: hands carving and inking, presses, type cases, screens, school print shops, the Bureau of Engraving and Printing, mimeographs, and braille printing. They now show before the museum prints on each page. They were chosen from each source's own record; nobody has looked at the images themselves yet, so they need a visual check before launch.
- Collagraph, drypoint, aquatint, mezzotint, gel plate, and lithography without a stone still have no process photographs. Teacher photos are the best way to fill them.

## 2026-10-13: Copyright renewals for Kafka and Heller

- Kafka's *Linoleum Block Printing* is in copyright. Kafka renewed the 1955 registration (A191236) on October 3, 1983, as renewal RE0000178775, found in the Copyright Office online catalog. It stays cited, not adapted.
- Heller's *Printmaking Today* (1958, registration A336302) is probably public domain in the US. The same catalog shows no renewal for it. It shows only a 1984 transfer of the 1972 second edition from CBS College Publishing to Heller and a 2001 bulk assignment of many publisher titles, neither of which is a renewal. The Stanford Copyright Renewal Database blocked automated searches, so one manual search there is still needed before its text is adapted. The 1972 edition and the book's illustrations are protected regardless.

## 2026-10-14: Pictures pulled from the family, process, and teaching pages

- Libby asked for the Pictures sections to come off. The 227 pictures sat apart from the text instead of illustrating what each page says, and they had been chosen from catalog records without anyone seeing them. The image cards, src/data/images.json, and the picture flags on /checks/ are removed. The list is still in the git history (commit 8b43875) if any entry is wanted later.
- The timeline images on the History page are untouched; each one illustrates its own entry.
- Pictures can come back later only where an image is placed beside the specific passage it shows, and after someone has looked at it.

## 2026-10-14: Three more books, and checking the Fick and Grabowski citations

- Three more books are in the library: the 2009 first edition of Grabowski and Fick's Printmaking: A Complete Guide to Materials & Processes (Pearson Prentice Hall), Practical Printmaking (1983) by Nicholas Hacking, Francis Tinsley, and Silvie Turner, and Kim Major-George's Collagraph: A Journey Through Texture (2011). All three are in copyright and are cited, not reproduced.
- The site already cited the 2015 second edition of Grabowski and Fick by chapter. The first edition has the same nine chapters, so every existing citation was checked against it. Where the first edition supports a claim, the page now cites it by page ("Grabowski and Fick 2009, p. 222"). Where it doesn't, the claim stays cited to the 2015 edition and is flagged in red until someone confirms it in that edition. Where the first edition disagrees (the reason not to warm lino in an oven, the mesh count for water-based screen ink, how long curled lino takes to flatten, and the drypoint print count), the page now follows the source we can check.
- One citation is contradicted outright: the collagraph page recommended setting coins and keys into the plate, and Grabowski and Fick say coins and keys are too sharp and thick for the press. Both views are now on the page, flagged for Libby to choose.
- Practical Printmaking's section authors are cited by name and year (Hacking 1983, Tinsley 1983, Turner 1983), since each wrote their own section.
- Major-George's book adds most to the collagraph page: peeling mount board, her inking and wiping order, Brenda Hartill's rubs as she teaches them, mono collagraph, blind embossing, and the story of Dawn's Dobber, which also appears on "Starting from the learner."
- New sections: registration systems on the press page, mixing color on the ink page, the BAT and artist's proof conventions on the edition page, and paper weight, laid and wove paper, and printing on fabric on the substrate page.

## 2026-10-15: A book listed but not used

- Gill Thompson's Exploring Printmaking (Herbert Press, 2025) is in the library as a recommended book only. Its copyright page reserves it from use in the training, development, or operation of AI tools and from text and data mining, so Libby chose to cite it without drawing on its contents. Only the title page, copyright page, and table of contents were looked at, and the library note is written from those.
- Any later use of the book should come from Libby's own notes in her own words, or from permission from Bloomsbury.
