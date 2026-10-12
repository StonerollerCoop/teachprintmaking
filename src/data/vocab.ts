/**
 * Controlled vocabularies. Lessons may only use ids listed here, so the
 * search form and the lesson files always agree on names.
 *
 * `assumed: true` marks everyday supplies most classrooms already have.
 * The search form does not ask about them, which keeps it short.
 */

/**
 * The four families of printmaking. Each technique sits in the family that
 * matches how it is inked and printed. Monotype and monoprint are printed
 * from a flat surface, so they sit with planographic. A collagraph inked on
 * its raised surface is relief; one wiped like an etching plate is intaglio.
 */
export const families = {
  relief: 'Relief',
  intaglio: 'Intaglio',
  planographic: 'Planographic',
  stencil: 'Stencil',
} as const;

export const familyBlurbs: Record<keyof typeof families, string> = {
  relief: 'Ink sits on the raised surface. Everything cut or pressed away stays the color of the paper.',
  intaglio: 'Ink sits down in lines scratched or etched into a plate, and pressure pulls it out onto damp paper.',
  planographic: 'Ink sits on a flat surface, as in lithography and monotype. Nothing is cut at all.',
  stencil: 'Ink passes through openings in a stencil or screen. Whatever blocks it stays blank.',
};

/** The processes people actually know each family by, for the home page. */
export const familyProcesses: Record<keyof typeof families, string[]> = {
  relief: ['Woodcut', 'Linocut', 'Wood engraving', 'Letterpress', 'Foam and potato prints', 'Rubber stamps', 'Collagraph'],
  intaglio: ['Etching', 'Drypoint', 'Engraving', 'Aquatint', 'Mezzotint', 'Juice-box drypoint'],
  planographic: ['Lithography', 'Monotype', 'Monoprint', 'Gel plate printing', 'Offset printing'],
  stencil: ['Screenprinting', 'Silkscreen', 'Paper and leaf stencils', 'Pochoir', 'Risograph', 'Spray stencils'],
};

export const techniques = {
  linocut: { label: 'Linocut', family: 'relief' },
  'soft-cut': { label: 'Soft-cut block relief', family: 'relief' },
  woodcut: { label: 'Woodcut', family: 'relief' },
  'foam-relief': { label: 'Foam relief', family: 'relief' },
  'reduction-relief': { label: 'Reduction relief', family: 'relief' },
  'stamp-print': { label: 'Stamp and roller printing', family: 'relief' },
  'nature-print': { label: 'Nature printing', family: 'relief' },
  drypoint: { label: 'Drypoint', family: 'intaglio' },
  collagraph: { label: 'Collagraph (relief-inked)', family: 'relief' },
  'trace-monotype': { label: 'Trace monotype', family: 'planographic' },
  'gel-plate-monoprint': { label: 'Gel plate monoprint', family: 'planographic' },
  monoprint: { label: 'Monoprint', family: 'planographic' },
  'stencil-print': { label: 'Stencil printing', family: 'stencil' },
  screenprint: { label: 'Screenprint', family: 'stencil' },
} as const;

export const materials = {
  // Assumed: not asked about in search.
  'copy-paper': { label: 'Copy paper or newsprint', assumed: true },
  pencils: { label: 'Pencils', assumed: true },
  'scrap-paper': { label: 'Scrap paper for proofs', assumed: true },
  'paper-towels': { label: 'Paper towels or rags', assumed: true },
  glue: { label: 'White glue', assumed: true },
  'masking-tape': { label: 'Masking tape', assumed: true },
  // Asked about.
  tempera: { label: 'Tempera paint', assumed: false },
  acrylic: { label: 'Acrylic paint', assumed: false },
  'water-block-ink': { label: 'Water-based block printing ink', assumed: false },
  'oil-block-ink': { label: 'Oil-based relief ink', assumed: false },
  'intaglio-ink': { label: 'Water-washable intaglio ink', assumed: false },
  'fabric-ink': { label: 'Fabric screen printing ink', assumed: false },
  'print-paper': { label: 'Printmaking paper (heavier, absorbent)', assumed: false },
  cardstock: { label: 'Cardstock or construction paper', assumed: false },
  linoleum: { label: 'Linoleum blocks', assumed: false },
  'soft-cut-block': { label: 'Soft-cut printing blocks', assumed: false },
  'foam-sheets': { label: 'Foam printing sheets or clean foam trays', assumed: false },
  'gel-plate': { label: 'Gel printing plate', assumed: false },
  'acetate-plate': { label: 'Rigid acetate or plexiglass plates', assumed: false },
  cardboard: { label: 'Chipboard or cereal-box cardboard', assumed: false },
  'texture-scraps': { label: 'Texture scraps (fabric, lace, leaves, mesh)', assumed: false },
  'leaves': { label: 'Fresh, flat leaves', assumed: false },
  sponges: { label: 'Sponges or foam daubers', assumed: false },
  'blank-totes': { label: 'Blank cotton tote bags or fabric', assumed: false },
  'tissue-paper': { label: 'Colored tissue paper', assumed: false },
  'cotton-swabs': { label: 'Cotton swabs', assumed: false },
  produce: { label: 'Fruits and vegetables to cut and print', assumed: false },
  'found-objects': { label: 'Found objects (corks, spools, bottle caps, blocks)', assumed: false },
  string: { label: 'String or yarn', assumed: false },
  tubes: { label: 'Cardboard tubes or clean tin cans', assumed: false },
  fish: { label: 'A whole fish, fresh or thawed', assumed: false },
  'gelatin-glycerin': { label: 'Unflavored gelatin and glycerin', assumed: false },
  watercolor: { label: 'Watercolor paints, crayons, or pencils', assumed: false },
  'gum-arabic': { label: 'Gum arabic', assumed: false },
} as const;

export const tools = {
  brayer: { label: 'Brayers (rollers)', sharp: false },
  'inking-slab': { label: 'Inking slabs or trays', sharp: false },
  barren: { label: 'Barren or wooden spoon', sharp: false },
  press: { label: 'Printing press', sharp: false },
  'carving-tools': { label: 'Carving gouges', sharp: true },
  'bench-hook': { label: 'Bench hooks', sharp: false },
  scissors: { label: 'Scissors', sharp: false },
  'craft-knife': { label: 'Craft knives', sharp: true },
  'etching-needle': { label: 'Etching needles or scribes', sharp: true },
  'screen-squeegee': { label: 'Screens and squeegees', sharp: false },
  'registration-jig': { label: 'Registration jig or pins', sharp: false },
  'drying-rack': { label: 'Drying rack or line', sharp: false },
  'soaking-tray': { label: 'Tray for soaking paper', sharp: false },
  brushes: { label: 'Paintbrushes', sharp: false },
  pans: { label: 'Baking pans or trays to use as molds', sharp: false },
  kettle: { label: 'Kettle or microwave for boiling water', sharp: false },
} as const;

export const surfaces = {
  paper: 'Paper',
  fabric: 'Fabric',
  cardboard: 'Cardboard',
  wood: 'Wood',
} as const;

export const experienceLevels = {
  first: 'First experience',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const;

export const messLevels = { low: 'Low', medium: 'Medium', high: 'High' } as const;

export const tableSpace = {
  tight: 'Tight (desks only, little spare surface)',
  standard: 'Standard classroom tables',
  roomy: 'Roomy (art room or studio)',
} as const;

/** Age bands offered in the search form, mapped to ages in years. */
export const ageBands = {
  prek: { label: 'Pre-K', min: 4, max: 5 },
  k2: { label: 'Grades K to 2', min: 5, max: 8 },
  g35: { label: 'Grades 3 to 5', min: 8, max: 11 },
  g68: { label: 'Grades 6 to 8', min: 11, max: 14 },
  g912: { label: 'Grades 9 to 12', min: 14, max: 18 },
  adult: { label: 'College and adult', min: 18, max: 99 },
} as const;

type Keys<T> = [keyof T & string, ...(keyof T & string)[]];
export const keys = <T extends object>(o: T) => Object.keys(o) as Keys<T>;

export type MaterialId = keyof typeof materials;
export type ToolId = keyof typeof tools;
export type SurfaceId = keyof typeof surfaces;
export type ExperienceId = keyof typeof experienceLevels;
export type MessId = keyof typeof messLevels;
export type TableSpaceId = keyof typeof tableSpace;
export type TechniqueId = keyof typeof techniques;
