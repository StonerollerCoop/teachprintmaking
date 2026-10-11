/**
 * Search tests run against the real demo lessons, exactly as the built site
 * sees them (read from the JSON embedded in dist/index.html). Run with
 * `npm test`, which builds first.
 */
import { readFileSync, existsSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import { search, type Constraints, type LessonMeta } from '../src/lib/match';
import { ageBands } from '../src/data/vocab';

const html = existsSync('dist/index.html') ? readFileSync('dist/index.html', 'utf8') : '';
const json = html.match(/<script type="application\/json" id="lesson-data">([\s\S]*?)<\/script>/)?.[1];
if (!json) throw new Error('Build the site first (npm test does this for you).');
const lessons: LessonMeta[] = JSON.parse(json);

const run = (c: Constraints) => {
  const r = search(lessons, c);
  return {
    strong: r.strong.map((x) => x.lesson.slug),
    adaptable: r.adaptable.map((x) => x.lesson.slug),
    none: r.none.map((x) => x.lesson.slug),
    raw: r,
  };
};

describe('lesson data', () => {
  it('loads all demo lessons', () => {
    expect(lessons.length).toBeGreaterThanOrEqual(10);
  });
});

describe('search', () => {
  it('returns everything as a strong match when nothing is filled in', () => {
    const r = run({});
    expect(r.strong.length).toBe(lessons.length);
  });

  it('never offers a press-required lesson as a strong match when there is no press', () => {
    const r = run({ students: 30, minutesPerSession: 50, tools: ['brayer', 'inking-slab', 'barren', 'carving-tools', 'bench-hook'] });
    for (const slug of r.strong) {
      const l = lessons.find((x) => x.slug === slug)!;
      expect(l.tools.required).not.toContain('press');
    }
    // Drypoint has no approved no-press adaptation, so it doesn't fit at all.
    expect(r.none).toContain('drypoint-portraits');
    // The botanical linocut is offered with the hand-burnishing change and points to its variation.
    expect(r.adaptable).toContain('botanical-linocut');
    const bot = r.raw.adaptable.find((x) => x.lesson.slug === 'botanical-linocut')!;
    expect(bot.adaptations.some((a) => a.variation === 'botanical-linocut-no-press')).toBe(true);
    // The no-press variation is itself a strong match.
    expect(r.strong).toContain('botanical-linocut-no-press');
  });

  it('5 students, 45 minutes, tempera, paper, classroom tables', () => {
    const r = run({
      students: 5,
      minutesPerSession: 45,
      sessions: 1,
      materials: ['tempera', 'cardstock', 'sponges', 'foam-sheets'],
      tools: ['brayer', 'inking-slab', 'scissors'],
      surfaces: ['paper'],
      tableSpace: 'standard',
    });
    expect(r.strong).toContain('sponge-stencil-prints');
    // Foam relief normally uses block ink, but tempera is an approved substitute.
    expect(r.adaptable).toContain('foam-relief-prints');
    // Multi-session lessons don't fit a single session.
    expect(r.none).toContain('cardboard-collagraph');
  });

  it('elementary class with no sharp tools excludes carving lessons', () => {
    const r = run({ ages: { ...ageBands.g35 }, noSharpTools: true });
    expect(r.none).toContain('botanical-linocut-soft-cut');
    expect(r.none).toContain('reduction-linocut-three-colors');
    expect(r.strong).toContain('foam-relief-prints');
    const soft = r.raw.none.find((x) => x.lesson.slug === 'botanical-linocut-soft-cut')!;
    expect(soft.gaps.some((g) => /sharp tools/.test(g.reason))).toBe(true);
  });

  it('high-school advanced students with carving tools find the reduction linocut', () => {
    const r = run({
      ages: { ...ageBands.g912 },
      experience: 'advanced',
      tools: ['carving-tools', 'bench-hook', 'brayer', 'inking-slab', 'registration-jig', 'drying-rack', 'press'],
    });
    expect(r.strong).toContain('reduction-linocut-three-colors');
    expect(r.none).not.toContain('reduction-linocut-three-colors');
  });

  it('limited space with minimal cleanup favors the desk-based monotype', () => {
    const r = run({ tableSpace: 'tight', maxMess: 'low', sink: false });
    expect(r.strong).toEqual(['trace-monotype-at-desks']);
  });

  it('an adaptation only applies within its stated limit', () => {
    // Foam relief has an approved large-class adaptation up to 35 students.
    expect(run({ students: 33 }).adaptable).toContain('foam-relief-prints');
    expect(run({ students: 40 }).none).toContain('foam-relief-prints');
  });

  it('unapproved adaptations are never offered', () => {
    const fake: LessonMeta = {
      ...lessons.find((l) => l.slug === 'drypoint-portraits')!,
      slug: 'fake',
      adaptations: [
        { trigger: { type: 'missing-tool', item: 'press' }, change: 'Hand burnish.', approved: false },
      ],
    };
    const r = search([fake], { tools: ['etching-needle', 'soaking-tray', 'inking-slab'] });
    expect(r.adaptable).toHaveLength(0);
    expect(r.none).toHaveLength(1);
  });

  it('is deterministic', () => {
    const c: Constraints = { students: 24, minutesPerSession: 45, sessions: 2 };
    expect(run(c).strong).toEqual(run(c).strong);
    expect(run(c).adaptable).toEqual(run(c).adaptable);
  });
});
