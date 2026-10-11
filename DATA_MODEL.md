# Teach Printmaking — Proposed Data Model

This document separates core project requirements from one recommended relational implementation. The schema should remain flexible enough to support search, variations, moderation, and attribution without duplicating entire lessons unnecessarily.

## Core entities

### lessons

Represents a canonical lesson plan.

Suggested fields:

- `id`
- `slug`
- `title`
- `summary`
- `learning_objectives`
- `instructions`
- `assessment_notes`
- `extensions`
- `prep_notes`
- `cleanup_notes`
- `safety_notes`
- `status` — draft, review, published, archived
- `created_at`
- `updated_at`
- `published_at`

### lesson_variations

Represents an approved adaptation of an existing lesson.

Suggested fields:

- `id`
- `parent_lesson_id`
- `slug`
- `title`
- `summary`
- `variation_notes`
- `instructions_override`
- `status`
- `created_at`
- `updated_at`
- `published_at`

A variation should inherit unspecified properties from its parent lesson while being able to override searchable constraints and instructional content.

### technique_families

Examples:

- relief
- intaglio
- planographic
- stencil / screen
- monotype / monoprint
- collagraph
- transfer processes
- experimental / hybrid

### techniques

Examples:

- linocut
- woodcut
- foam relief
- drypoint
- collagraph
- trace monotype
- gelatin plate monoprinting
- screenprint

Each technique belongs to a technique family.

## Search dimensions

Structured search should use normalized vocabularies where possible.

### age_ranges

Examples:

- early childhood
- elementary
- middle school
- high school
- adult

Exact numeric minimum / maximum ages may also be stored where useful.

### experience_levels

Examples:

- first experience
- beginner
- intermediate
- advanced

### class_size_rules

Recommended implementation:

- `min_students`
- `max_students`
- optional classroom-management notes

### duration

Recommended fields:

- `min_minutes`
- `max_minutes`
- `session_count`
- `drying_time_minutes` where relevant

### materials

Maintain a normalized materials table rather than storing only free text.

Examples:

- tempera
- acrylic paint
- water-based block ink
- oil-based relief ink
- watercolor
- newsprint
- copy paper
- construction paper
- cardstock
- fabric
- foam sheets
- linoleum
- cardboard

### lesson_materials

Join table fields could include:

- `lesson_id` or variation relationship
- `material_id`
- `requirement_type` — required, optional, substitute
- `quantity_notes`
- `substitution_notes`

### tools

Examples:

- brayer
- barren
- bench hook
- carving tools
- scissors
- craft knife
- printing press
- screen
- squeegee

### spaces

Examples:

- standard classroom
- art room
- sink access required
- outdoor
- limited-table-space

Additional booleans / fields may be more useful for matching:

- `sink_required`
- `press_required`
- `ventilation_required`
- `outdoor_ok`
- `mess_level`

### printing_surfaces

Examples:

- paper
- fabric
- cardboard
- wood
- found paper

## Lesson taxonomy joins

Recommended many-to-many relations:

- `lesson_techniques`
- `lesson_age_ranges`
- `lesson_experience_levels`
- `lesson_materials`
- `lesson_tools`
- `lesson_spaces`
- `lesson_surfaces`

The same pattern can be applied to variations, or variations can store overrides against the parent metadata.

## Contributors and attribution

### contributors

Suggested fields:

- `id`
- `display_name`
- `organization`
- `bio`
- `website_url`
- `public_email` — usually null
- `created_at`

### lesson_contributors

Suggested fields:

- `lesson_id`
- `contributor_id`
- `credit_role` — author, adaptation, photography, editor, collaborator
- `credit_text`
- `sort_order`

Use a corresponding relation for variations if needed.

## Public submissions

### submissions

Store the original public submission intact.

Suggested fields:

- `id`
- `submission_type` — new_lesson, variation, correction, feedback
- `target_lesson_id`
- `target_variation_id`
- `submitter_name`
- `submitter_email_private`
- `organization`
- `website_url`
- `preferred_credit`
- `payload_json`
- `status` — pending, approved, rejected, spam, flagged
- `moderation_notes`
- `created_at`
- `reviewed_at`

Using an original payload record preserves what the teacher actually sent even when the public lesson is subsequently edited.

### submission_uploads

Suggested fields:

- `id`
- `submission_id`
- `r2_object_key`
- `original_filename`
- `mime_type`
- `size_bytes`
- `moderation_status`
- `public_asset_key` after approval, if separated from private storage

## Feedback

### lesson_feedback

Suggested fields:

- `id`
- `lesson_id`
- `variation_id`
- `outcome` — worked_well, worked_with_adjustments, problems
- `comments`
- `has_variation_to_submit`
- `moderation_status`
- `created_at`

Only approved feedback contributes to public aggregate data.

## Corrections

### lesson_corrections

Suggested fields:

- `id`
- `lesson_id`
- `variation_id`
- `submission_id`
- `suggestion`
- `resolution` — pending, applied, dismissed
- `editor_notes`
- `resolved_at`

## Media

### media_assets

Suggested fields:

- `id`
- `r2_object_key`
- `asset_type`
- `alt_text`
- `caption`
- `credit`
- `moderation_status`
- `created_at`

### lesson_media

Suggested fields:

- `lesson_id`
- `media_asset_id`
- `role` — hero, process, finished_example, diagram, printable
- `sort_order`

## Moderation log

### moderation_actions

Suggested fields:

- `id`
- `submission_id`
- `action`
- `notes`
- `created_at`

The moderator is initially a single administrator, so a public user-account model is unnecessary.

## Matching model

The first implementation should use deterministic matching.

### Hard constraints

A lesson should be excluded from exact matches when it requires something the teacher explicitly lacks, for example:

- press required and no press available;
- minimum time exceeds available time;
- material marked strictly required is unavailable;
- age restriction makes the lesson unsuitable.

### Soft constraints

A lesson may appear under possible adaptations where an approved substitution / variation exists, for example:

- substitute tempera for another medium;
- hand-burnish instead of using a press;
- divide the class into stations;
- split into multiple sessions.

### Ranking

Initial ranking should emphasize:

1. number of hard constraints satisfied;
2. number of preferred conditions matched;
3. minimal adaptations required;
4. editorial confidence / completeness;
5. approved classroom feedback as a secondary signal.

Popularity alone should never determine suitability.

## Search response shape

A useful API response could return:

```json
{
  "exact_matches": [],
  "adaptable_matches": [
    {
      "lesson": {},
      "adaptations_required": []
    }
  ]
}
```

This gives the interface enough information to explain why a lesson is being suggested.

## Important implementation principle

Do not encode every instructional sentence into relational fields. Use structured fields for things the application must search, compare, validate, or reuse. Keep narrative teaching content in rich text / Markdown fields.
