import { richText } from '../utils/text.js';
import { sectionTitle } from './shared.js';

export function renderSummary(summary: string | undefined, heading: string): string {
  if (!summary) return '';
  const html = richText(summary, { block: true });
  if (!html) return '';
  return `
    ${sectionTitle(heading)}
    <div class="summary">${html}</div>`;
}
