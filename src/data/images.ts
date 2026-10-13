/**
 * Openly licensed and public-domain pictures shown on the family and process
 * pages. Each entry names its page ("relief" for a family page,
 * "relief/woodcut" for a process page), where the image is served from, and
 * the credit and license to print beside it.
 *
 * Every image here was checked against its source's own record before it was
 * added. An entry with `check` still needs a human look before launch and is
 * shown in red.
 */
import raw from './images.json';

export interface SiteImage {
  page: string;
  src: string;
  link: string;
  title: string;
  creator: string;
  date: string;
  medium: string;
  license: string;
  source: string;
  alt: string;
  /** What the picture shows teachers about the process. */
  why: string;
  check?: string;
}

export const images = raw as SiteImage[];

export const imagesFor = (page: string) => images.filter((i) => i.page === page);
