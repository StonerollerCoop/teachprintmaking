/**
 * Books, papers, and other sources the site draws on. Lessons cite a source by
 * its id (sources[].library in a lesson file), and the Books page lists them.
 *
 * We learn techniques from these sources and write lessons in our own words.
 * We never reproduce their text, photographs, or diagrams; see docs/decisions.md.
 */

export type Use = 'lessons' | 'history' | 'safety' | 'reference';

export interface LibraryEntry {
  id: string;
  authors: string;
  title: string;
  publisher: string;
  year: string;
  isbn?: string;
  url?: string;
  /** What a teacher would use it for, in a sentence or two. */
  note: string;
  families: ('relief' | 'intaglio' | 'planographic' | 'stencil' | 'all')[];
  level: string;
  rights: string;
  caution?: string;
  /** Something to confirm before launch, such as rights status. Shown on the Checks page. */
  check?: string;
}

export const library: LibraryEntry[] = [
  {
    id: 'fick-grabowski',
    authors: 'Bill Fick and Beth Grabowski',
    title: 'Printmaking: A Complete Guide to Materials & Processes',
    publisher: 'Laurence King Publishing',
    year: '2015 (second edition)',
    isbn: '978-1-78067-194-9',
    note: 'The most complete studio reference here, covering every family plus digital and hybrid work, with strong sections on safer materials, registration, and editioning.',
    families: ['all'],
    level: 'High school, college, and adult',
    rights: 'In copyright; cited, not reproduced',
  },
  {
    id: 'hughes-vernon-morris',
    authors: 'Ann d’Arcy Hughes and Hebe Vernon-Morris',
    title: 'Printmaking: Traditional and Contemporary Techniques',
    publisher: 'RotoVision',
    year: '2008',
    isbn: '978-2-940361-53-3',
    note: 'An image-led survey of intaglio, relief, lithography, screenprinting, and monotype, organized around how working artists made particular prints.',
    families: ['all'],
    level: 'College and adult',
    rights: 'In copyright; cited, not reproduced',
  },
  {
    id: 'walker-woodcut',
    authors: 'George A. Walker',
    title: 'The Woodcut Artist’s Handbook: Techniques and Tools for Relief Printmaking',
    publisher: 'Firefly Books',
    year: '2005',
    isbn: '1-55407-045-7',
    note: 'A thorough guide to wood, tools, cutting, papers, inks, hand printing, and editioning for woodcut and wood engraving.',
    families: ['relief'],
    level: 'High school, college, and adult',
    rights: 'In copyright; cited, not reproduced',
  },
  {
    id: 'medley-anything',
    authors: 'Christine Medley',
    title: 'Printmaking: How to Print Anything on Everything',
    publisher: 'Dover Publications',
    year: '2020',
    isbn: '978-0-486-83719-2',
    note: 'Friendly, project-based printing at home and in workshops: produce and found objects, eraser stamps, homemade gel plates, simple screenprinting, and printing on gifts and fabric.',
    families: ['relief', 'planographic', 'stencil'],
    level: 'All ages with adult help',
    rights: 'In copyright; cited, not reproduced',
  },
  {
    id: 'kafka-linoleum',
    authors: 'Francis J. Kafka',
    title: 'Linoleum Block Printing',
    publisher: 'McKnight & McKnight (1955); Dover Publications (1972)',
    year: '1955',
    isbn: '0-486-20308-5',
    note: 'A classroom-minded linocut course with graded projects: monograms, greeting cards, letterheads, multicolor printing, printing on fabric, and alphabets.',
    families: ['relief'],
    level: 'Middle school through adult',
    rights: 'Copyright 1955; treat as in copyright, cited not reproduced',
    check: 'Kafka may be in the public domain in the US if the 1955 copyright was not renewed in 1982 or 1983. Search the Copyright Office renewal records under Kafka before treating it as free to adapt.',
    caution: 'Some cleaning advice is out of date. It recommends carbon tetrachloride and gasoline, which should never be used. Clean water-based ink with water and oil-based ink with vegetable oil and soap.',
  },
  {
    id: 'desherlia-1967',
    authors: 'Jayne L. DeSherlia',
    title: 'A Brief History of Printmaking with Emphasis on Processes that Can Be Taught Without the Use of a Printing Press',
    publisher: 'Eastern Illinois University, Plan B Papers 609',
    year: '1967',
    url: 'https://thekeep.eiu.edu/plan_b/609',
    note: 'A teacher’s master’s paper gathering press-free printing methods for elementary classrooms: potato, gadget, fingertip, string, roller, fish, texture, paper, and fruit and vegetable prints.',
    families: ['relief', 'stencil'],
    level: 'Elementary',
    rights: 'Free to read online; cited, not reproduced',
    caution: 'Its leaf-printing method uses a candle flame to soot the leaf. Skip that step with children; ink the leaf with a brayer instead.',
  },
  {
    id: 'fletcher-woodblock',
    authors: 'F. Morley Fletcher',
    title: 'Wood-Block Printing',
    publisher: 'John Hogg, London',
    year: '1916',
    url: 'https://www.gutenberg.org/ebooks/20195',
    note: 'The Japanese method of color woodblock printing with watercolor and rice paste, written for Western artists and teachers.',
    families: ['relief'],
    level: 'High school, college, and adult',
    rights: 'Public domain',
  },
  {
    id: 'tokuno-koehler',
    authors: 'T. Tokuno and S. R. Koehler',
    title: 'Japanese Wood-Cutting and Wood-Cut Printing',
    publisher: 'Government Printing Office, Washington',
    year: '1894',
    url: 'https://library.si.edu/digital-library/book/japanesewoodcut00toku',
    note: 'A Japanese master printer’s own account of tools and process, published by the Smithsonian.',
    families: ['relief'],
    level: 'Reference',
    rights: 'Public domain (CC0)',
  },
  {
    id: 'dow-composition',
    authors: 'Arthur Wesley Dow',
    title: 'Composition',
    publisher: 'J. M. Bowles, Boston',
    year: '1899',
    url: 'https://www.gutenberg.org/ebooks/45410',
    note: 'A classic course in design built on line, dark and light, and color, with exercises drawn from Japanese woodblock prints. Useful for teaching composition through printmaking.',
    families: ['relief'],
    level: 'Teachers',
    rights: 'Public domain',
  },
  {
    id: 'adams-nontoxic',
    authors: 'Donna Adams',
    title: 'The Beginners Compendium of Non-Toxic Intaglio Printmaking',
    publisher: 'Nontoxicprint',
    year: '2021',
    note: 'Step-by-step safer intaglio: photopolymer film (the Intaglio-Type methods introduced by Keith Howard) and metal salt etching (including Friedhard Kiekeben’s Edinburgh Etch) with acrylic resists.',
    families: ['intaglio'],
    level: 'College and adult',
    rights: 'In copyright; cited, not reproduced',
  },
  {
    id: 'ash-soft-ground',
    authors: 'Lori Jean Ash',
    title: 'A Student Guide to the Use of Soft Grounds in Intaglio Printmaking',
    publisher: 'Colorado State University (MFA concentration paper)',
    year: '1984',
    note: 'History and studio method for soft ground etching, including texture and tone.',
    families: ['intaglio'],
    level: 'College and adult',
    rights: 'In copyright; cited, not reproduced',
    caution: 'Uses traditional asphaltum grounds, solvents, and acid. Pair it with a safer acrylic ground method.',
  },
  {
    id: 'stijnman-paper',
    authors: 'Ad Stijnman',
    title: 'Intaglio printing: a chronology concerning the provenance, the qualities, the colours and the formats of papers used up to 1850',
    publisher: 'Papier Restaurierung, vol. 1, supplement',
    year: '2000',
    note: 'Which papers plate printers chose and why, from about 1430 to 1850.',
    families: ['intaglio'],
    level: 'Reference',
    rights: 'In copyright; cited, not reproduced',
  },
  {
    id: 'dalton-expressive',
    authors: 'Mary Dalton',
    title: 'Expressive Printmaking: A Creative Guide',
    publisher: 'The Crowood Press',
    year: '2022',
    isbn: '978-0-7198-4104-0',
    note: 'Playful, solvent-free printmaking with household materials: found-texture stamping, monoprint on plastic, juice-box and card drypoint, chine collé, mokulito, and lithino, the author’s method for printing sanded lino like a lithograph.',
    families: ['all'],
    level: 'Adult beginners through practising artists; many methods adapt to school',
    rights: 'In copyright; cited, not reproduced',
  },
  {
    id: 'ross-romano-intaglio',
    authors: 'John Ross and Clare Romano',
    title: 'The Complete Intaglio Print',
    publisher: 'The Free Press',
    year: '1974',
    note: 'Every metal-plate intaglio method of its day, plus color intaglio and the cardboard and gesso collagraph.',
    families: ['intaglio'],
    level: 'College and adult',
    rights: 'In copyright; cited, not reproduced',
    caution: 'Some materials it recommends are no longer considered safe, including asbestos drying boards, chloroform and ether grounds, and dichromate etches. Use present-day safer etching methods instead.',
  },
  {
    id: 'ross-romano-printmaker',
    authors: 'John Ross, Clare Romano, and Tim Ross',
    title: 'The Complete Printmaker: Techniques, Traditions, Innovations',
    publisher: 'The Free Press',
    year: '1990 (revised edition)',
    isbn: '0-02-927372-2',
    note: 'A survey of every family, with chapters on monotype, papermaking, book arts, health hazards, and printmaking in schools with suggested starting ages.',
    families: ['all'],
    level: 'High school, college, and adult; one chapter on children',
    rights: 'In copyright; cited, not reproduced',
    caution: 'Some methods are out of date, including caustic-soda lino etching, lacquer-thinner transfers, and lead sheet reliefs. Its health chapter is a good starting point but predates current safer intaglio methods.',
  },
  {
    id: 'tamarind-1971',
    authors: 'Garo Z. Antreasian with Clinton Adams',
    title: 'The Tamarind Book of Lithography: Art & Techniques',
    publisher: 'Tamarind Lithography Workshop and Harry N. Abrams',
    year: '1971',
    isbn: '0-8109-0496-9',
    note: 'The classic manual for training master lithographic printers. Its chapters on paper, color registration, and ink are useful well beyond lithography.',
    families: ['planographic'],
    level: 'College and professional',
    rights: 'In copyright; cited, not reproduced',
    caution: 'Its chemistry predates modern safety practice. It uses gasoline, benzine, phenol, dichromate compounds, and lead pigments, none of which should be used today.',
  },
  {
    id: 'tamarind-2008',
    authors: 'Marjorie Devon with Bill Lagattuta and Rodney Hamon',
    title: 'Tamarind Techniques for Fine Art Lithography',
    publisher: 'Harry N. Abrams',
    year: '2008',
    isbn: '978-0-8109-7242-1',
    note: 'The current Tamarind manual: stone, aluminum, polyester, and waterless lithography, with a thorough health and safety chapter and safer alternatives to traditional solvents.',
    families: ['planographic'],
    level: 'High school (polyester plates) through professional',
    rights: 'In copyright; cited, not reproduced',
  },
];

export const libraryById = new Map(library.map((e) => [e.id, e]));
