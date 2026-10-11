# Teach Printmaking — Project Specification

## Purpose

Teach Printmaking is a curated resource that helps teachers find printmaking lesson plans that actually fit their classroom conditions. The core problem is practical fit: teachers often know their class size, age range, available time, materials, surfaces, equipment, and space, and need lessons that can work under those constraints.

The project should grow through moderated community contribution. Teachers can submit original lessons, classroom-tested variations, corrections, and feedback. All public content is editorially reviewed before publication.

## Primary user flow

A teacher enters classroom constraints such as:

- number of students
- age range
- student experience level
- available time
- materials and tools available
- printing surface available
- available working space

The system returns:

1. lesson plans that fit all or nearly all constraints;
2. lesson plans that could work with a clearly stated adaptation;
3. related variations that have been classroom-tested or editorially developed.

Search should prioritize technical and pedagogical suitability over popularity.

## Lesson structure

Each lesson should support:

- title
- short summary
- learning objectives
- printmaking process / technique
- age suitability
- experience level
- class size suitability
- total duration
- session structure where relevant
- materials required
- optional or substitutable materials
- tools / equipment
- printing surfaces
- space requirements
- preparation requirements
- cleanup requirements
- safety notes
- step-by-step instructions
- images
- video embeds or references
- assessment / reflection ideas
- extensions
- adaptations
- contributor attribution
- editorial notes
- print-friendly output

## Techniques and hierarchy

The content model should distinguish at least these levels:

- technique family
- specific technique
- lesson
- variation

Example:

- Relief printing
  - Linocut
    - Botanical linocut lesson
      - classroom-safe soft-cut variation
      - 45-minute variation
      - no-press variation

Variations should be linked to a parent lesson while remaining independently searchable.

## Search and matching

Search should use structured metadata rather than relying only on text search.

Important searchable dimensions include:

- student count
- age range
- experience level
- duration
- number of sessions
- material availability
- required tools
- equipment constraints
- printing surface
- space type
- mess / cleanup level
- press required / optional / not required
- drying time
- safety considerations

The result page should distinguish:

### Exact or strong matches
Lessons whose requirements are compatible with the teacher's stated conditions.

### Possible adaptations
Lessons that can work if one or more changes are made. The site should explicitly say what must change, for example:

- use tempera instead of block-printing ink;
- divide the class into stations;
- use hand pressure or a barren because no press is available;
- split the activity across two sessions.

The system should never imply that a substitution is safe or technically sound unless that adaptation exists in the database or has been editorially approved.

## Public submissions

No public membership system is required.

Teachers should be able to submit:

1. a new original lesson;
2. a variation of an existing lesson;
3. a correction or suggested edit;
4. classroom feedback after using a lesson.

Submission forms should allow optional contributor information such as:

- name
- school / organization
- short bio
- website or portfolio link
- email for follow-up, kept private unless explicit permission is given
- preferred public attribution

All submissions enter moderation and remain unpublished until approved.

## Attribution

Every published lesson or variation should clearly display authorship / contribution credit.

The system should preserve:

- original submitter information;
- editorially revised content;
- parent lesson relationships;
- contributor attribution on derivative variations.

A contributor should be able to choose whether their school or organization is displayed publicly.

## Teacher feedback

Each lesson should include a lightweight post-use feedback form.

Suggested fields:

- Did you use this lesson?
- How well did it work?
- Did you make adjustments?
- What would you change?
- Would you like to submit your adaptation as a variation?

Feedback options might include:

- worked very well
- worked with adjustments
- encountered problems

Published aggregate feedback can later help users compare otherwise suitable lessons.

Popularity should not override fit in search ranking.

## Moderation

The site owner is the primary editor / moderator.

A private moderation dashboard should support:

- pending submissions
- pending variations
- corrections
- feedback
- flagged content

Possible actions:

- edit
- approve
- reject
- link to parent lesson
- merge suggested changes into a lesson
- dismiss
- delete

The system should preserve the original submission separately from the edited public version.

## Security and abuse prevention

Public submission endpoints should include:

- Cloudflare Turnstile or equivalent bot protection
- server-side validation
- strict file-type allowlists
- upload size limits
- rate limiting
- output sanitization
- rejection of executable files
- storage of uploads in private review state before publication
- text filtering for spam, profanity, sexual content, and common abuse patterns
- image moderation strategy for inappropriate uploads

Automated filters should assist moderation rather than publish submissions automatically.

## Media

Lesson plans may include:

- step photographs
- finished examples
- process diagrams
- video embeds / links
- downloadable support materials

Teacher-uploaded media should remain private until the associated submission is approved.

## Print output

Every published lesson should have a dedicated print view using print CSS.

Print output should omit navigation, feedback forms, unrelated suggestions, and interface controls while retaining useful lesson information, contributor credit, and any instructional images intended for printing.

A browser print-to-PDF workflow is acceptable for the first release; a generated PDF service is optional later.

## Admin / CMS requirements

The CMS should be purpose-built around lesson metadata rather than mimic a general blogging CMS.

The private editorial interface should allow the moderator to:

- create and edit lessons
- create and edit variations
- manage taxonomies / vocabularies
- upload and manage media
- review public submissions
- assign metadata
- preview search compatibility
- publish / unpublish content
- maintain contributor attribution

## Out of scope for the initial build

- public teacher accounts
- social profiles
- private messaging
- forums
- badges / gamification
- monetization
- automatic public posting of submissions

## Editorial principle

The long-term value of the project comes from comprehensive printmaking coverage and technically trustworthy classroom adaptations. The database should be designed to become richer through variations and actual teacher experience rather than accumulating duplicated lesson pages.
