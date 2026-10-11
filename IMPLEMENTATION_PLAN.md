# Teach Printmaking — Implementation Plan

This plan assumes a small initial audience, a single moderator, no public memberships, and an emphasis on getting the lesson model and search behavior right before adding complexity.

## Phase 1 — Foundation

### Goals

- establish the repository structure
- scaffold the application
- connect Cloudflare deployment
- define environment configuration
- create the initial D1 schema
- create R2 storage strategy

### Recommended stack

- Astro
- TypeScript
- Cloudflare Workers
- Cloudflare D1
- Cloudflare R2
- Cloudflare Turnstile
- Cloudflare Access for private admin routes

### Acceptance criteria

- application builds locally
- application deploys to Cloudflare
- D1 is connected in development and production
- a private admin route can be protected
- repository contains documented environment setup

## Phase 2 — Core lesson CMS

### Goals

Build the minimum editorial interface required to create and maintain real lesson data.

### Features

- create lesson
- edit lesson
- publish / unpublish lesson
- create technique families and techniques
- assign searchable metadata
- manage materials, tools, surfaces, space requirements, class-size ranges, duration, and experience level
- create variation linked to a parent lesson
- upload media
- preview lesson page

### Acceptance criteria

An editor can create a complete lesson without editing the database manually.

## Phase 3 — Public lesson pages and print output

### Goals

Create useful public lesson pages before building advanced search.

### Features

- lesson index
- individual lesson page
- variation display
- contributor attribution
- responsive image handling
- video embeds
- print stylesheet
- print button

### Acceptance criteria

A published lesson is readable on desktop and mobile and produces a clean browser print / PDF output.

## Phase 4 — Constraint search

### Goals

Build the principal user experience: finding lessons that fit classroom conditions.

### Initial search inputs

- student count
- age range
- experience level
- available minutes
- materials available
- tools / equipment available
- printing surface
- space constraints

### Results

Return two groups:

1. strong / exact matches
2. possible adaptations

Every adaptable result should explain the adaptation required.

### Acceptance criteria

Given a controlled test dataset, search results are deterministic and explainable. A lesson requiring a press does not appear as an exact match when the teacher says no press is available.

## Phase 5 — Public submission workflow

### Goals

Allow teachers to contribute without accounts.

### Forms

- submit a new lesson
- submit a variation from an existing lesson
- suggest a correction
- submit classroom feedback

### Protection

- Turnstile
- rate limiting
- server-side validation
- upload type and size restrictions
- sanitization
- private media staging

### Acceptance criteria

All public submissions enter a private moderation queue and cannot become public without editor approval.

## Phase 6 — Moderation dashboard

### Features

- pending submission list
- submission detail
- preview uploaded media
- approve / reject
- convert approved submission into lesson or variation
- preserve original submission
- manage feedback and corrections
- flag / delete abusive content

### Acceptance criteria

The moderator can process every public submission type without needing direct database access.

## Phase 7 — Feedback and quality signals

### Features

- "Did you use this lesson?" feedback
- classroom outcome categories
- optional written comment
- variation submission prompt
- approved aggregate usage information

### Search behavior

Feedback may be used as a secondary ranking / quality signal only after suitability constraints are evaluated.

## Phase 8 — Expand taxonomy and content coverage

Once the software model is stable, grow the database systematically across printmaking processes.

Recommended editorial work:

- comprehensive technique inventory
- material synonyms and substitutions
- safe classroom alternatives
- press / no-press variants
- age adaptations
- timing adaptations
- space / cleanup adaptations

The long-term search quality will depend heavily on this controlled vocabulary.

## First prototype dataset

Before attempting comprehensive coverage, create approximately 6–10 deliberately varied lessons that exercise the model.

The prototype should include lessons with contrasting requirements, for example:

- very young students
- middle-school beginner lesson
- advanced relief lesson
- no-press monotype
- lesson requiring a press
- 30–45 minute lesson
- multi-session lesson
- limited-space lesson

Create several variations of the same parent lesson so inheritance and search behavior can be tested.

## Testing priorities

### Search tests

Test combinations such as:

- 5 students, 45 minutes, tempera, paper, classroom tables
- 30 students, 50 minutes, no press
- high-school advanced students with carving tools
- elementary class with no sharp tools
- limited-space classroom with minimal cleanup time

### Safety tests

- malicious HTML in text fields
- executable file renamed as an image
- oversized upload
- repeated automated submissions
- inappropriate text submission
- unapproved media URL exposure

### Print tests

- letter paper
- grayscale printer
- multi-page lesson
- lessons containing several process images

## Repository conventions

Recommended project documentation:

- `README.md`
- `PROJECT_SPEC.md`
- `DATA_MODEL.md`
- `IMPLEMENTATION_PLAN.md`
- `docs/` for future architecture decisions
- migrations stored in version control

Use small, reviewable commits. Discuss major changes to the content model before migrations that would make existing lesson data difficult to preserve.

## First coding milestone

The first coding milestone should produce:

1. Astro / Cloudflare scaffold;
2. D1 schema and initial migration;
3. seed taxonomy;
4. a minimal admin-only lesson editor;
5. one public lesson page;
6. print CSS;
7. several seed lessons sufficient to test the model.

Do not start with recommendation algorithms, AI-generated adaptations, teacher accounts, or elaborate design-system work. Those can be layered on after the structured lesson model works.

## Guidance for Claude or another coding assistant

Before changing the architecture:

1. Read `README.md`, `PROJECT_SPEC.md`, `DATA_MODEL.md`, and this file.
2. Identify any assumptions required for the next milestone.
3. Present proposed structural changes before implementing them.
4. Keep the public no-account submission requirement intact unless the project owner explicitly changes it.
5. Do not auto-publish community submissions.
6. Preserve contributor attribution and parent/variation relationships.
