import { esc } from '../utils/escape.js';

export function sectionTitle(title: string): string {
  return `<h2 class="section-title">${esc(title)}</h2>`;
}
