# Adding or editing a lesson

Each lesson is one Markdown file in `src/content/lessons/`. The file name becomes the web address, so `botanical-linocut.md` appears at `/lessons/botanical-linocut/`.

The easiest way to start is to copy an existing demo lesson and change it. On GitHub you can open any lesson file, copy its contents, and use **Add file → Create new file** in the same folder.

## The top section (frontmatter)

Everything between the two `---` lines is structured information the search uses. Allowed values for materials, tools, techniques, surfaces, and so on are listed in `src/data/vocab.ts`. A misspelled value stops the site from building, and the error message names the file and field, so mistakes can't slip through.

| Field | What it means |
| --- | --- |
| `title`, `summary` | Shown on lesson cards and the lesson page. |
| `demo` | `true` for placeholder content. Remove it or set it to `false` for real lessons. |
| `parent` | Only on variations: the file name (without `.md`) of the original lesson. |
| `technique` | One technique id from the vocabulary. |
| `ages` | Youngest and oldest age the lesson suits. Use `max: 99` for "and up". |
| `experience` | Any of `first`, `beginner`, `intermediate`, `advanced`. |
| `students` | Smallest and largest class the lesson works for as written. |
| `time` | `minutesPerSession`, `sessions`, and `dryingOvernight`. |
| `materials`, `tools` | `required` and `optional` lists. A press goes under tools. |
| `surfaces` | What it can print on. Any one of them is enough. |
| `space` | `sink` (`required`, `helpful`, `none`), `tableSpace`, `mess`, `ventilation`. |
| `safety` | Short safety notes, shown before the steps. |
| `adaptations` | Approved changes for when a classroom can't meet a requirement. |
| `credits` | Name, role, and optional organization for each contributor. |
| `sources` | Where the lesson came from: `relation` (`adapted-from`, `based-on`, or `reference`), `title`, `author`, `url`, `license`, and `licenseUrl`. Leave it out for original work or common practice that belongs to no one in particular. |

Every published lesson is shared under CC BY-NC-SA 4.0, which the site footer states. The `sources` entries record the terms of whatever we adapted from.

## Adaptation triggers

| Trigger | Covers |
| --- | --- |
| `{ type: missing-material, item: tempera }` | Teacher lacks that required material. |
| `{ type: missing-tool, item: press }` | Teacher lacks that required tool, or has ruled out sharp tools. |
| `{ type: more-students, upTo: 32 }` | Class is larger than the lesson's max, up to this number. |
| `{ type: fewer-students, downTo: 4 }` | Class is smaller than the lesson's min, down to this number. |
| `{ type: shorter-sessions, minMinutes: 40 }` | Sessions are shorter, down to this many minutes. |
| `{ type: fewer-sessions, minSessions: 1 }` | Fewer sessions, down to this many. |
| `{ type: younger, minAge: 8 }` | Students younger than the lesson's minimum, down to this age. |
| `{ type: older, maxAge: 18 }` | Students older than the lesson's maximum, up to this age. |
| `{ type: experience, level: advanced }` | A different experience level. |
| `{ type: no-sink }`, `{ type: no-ventilation }` | Room lacks a sink or ventilation. |
| `{ type: less-space, tableSpace: tight }` | Less table space, down to this level. |
| `{ type: lower-mess, mess: low }` | Teacher needs less mess, down to this level. |

Add `variation: some-file-name` to point teachers at a variation that already works the change out. Add `approved: false` to keep a drafted adaptation out of search until you've checked it.

## The body

Below the frontmatter, write the lesson in ordinary Markdown with `##` headings such as Preparation, Steps, Cleanup, Assessment and reflection, and Extensions.
