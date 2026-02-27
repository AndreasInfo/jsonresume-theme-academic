import { richText } from '../utils/text.js';

export function renderSummary(summary: string | undefined): string {
  if (!summary) return '';
  const html = richText(summary, { block: true });
  if (!html) return '';
  return `<div class="summary">${html}</div>`;
}
