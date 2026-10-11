# Teach Printmaking

Teach Printmaking is a curated, searchable lesson-plan platform for printmaking educators.

This repository is the shared working source for development. The project is intentionally moving away from WordPress toward a purpose-built CMS and search application deployed on Cloudflare.

## Core project decisions

- No public user accounts or memberships.
- Teachers submit original lessons, variations, corrections, and classroom feedback through forms.
- All public contributions are moderated before publication.
- The site should help teachers find viable lessons based on classroom constraints such as:
  - number of students
  - student age range
  - experience level
  - available time
  - materials and tools
  - printing surface
  - available space
- Lesson variations remain linked to an original lesson while also being independently searchable.
- Teachers can submit adaptations of existing lessons so the database expands over time.
- Contributors receive attribution for their work.
- The site should distinguish exact matches from lessons that could work with specific adaptations.
- Printed lesson plans should use a dedicated print stylesheet.
- Moderation should include anti-spam, text/content filtering, file validation, and private review of uploads before publication.

## Proposed stack

- Astro for the front end and CMS interface
- Cloudflare Workers for application logic
- Cloudflare D1 for structured data
- Cloudflare R2 for media and uploaded assets
- Cloudflare Turnstile for bot protection
- GitHub for source control
- Cloudflare Access for the private moderation/admin area

## Project documents

- [PROJECT_SPEC.md](PROJECT_SPEC.md) — functional requirements and editorial workflow
- [DATA_MODEL.md](DATA_MODEL.md) — proposed content and database structure
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) — recommended build sequence and acceptance criteria

## Working rule for AI collaborators

Read all four project files before proposing implementation work. Discuss architecture changes before making broad structural changes. Preserve the distinction between confirmed project requirements and technical recommendations.
