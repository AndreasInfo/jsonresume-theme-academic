export { render } from './render.js';
export type { ResumeSchema } from './types/resume.js';

/** PDF rendering options for Puppeteer/Gotenberg. */
export const pdfRenderOptions = {
  mediaType: 'print' as const,
  format: 'A4' as const,
  margin: {
    top: '12mm',
    right: '14mm',
    bottom: '12mm',
    left: '14mm',
  },
};
