// @ts-check
import { defineConfig } from 'astro/config';

// Static site for now. Lessons are Markdown files in src/content/lessons.
// A server adapter (and D1/R2) comes in when public submissions are built.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
});
