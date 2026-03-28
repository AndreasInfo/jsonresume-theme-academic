import type { ResumeVolunteerEntry } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { dateRange } from '../utils/dates.js';
import { has, richText } from '../utils/text.js';
import { sectionTitle } from './shared.js';

function renderVolunteerEntry(
  entry: ResumeVolunteerEntry,
  months: Readonly<Record<string, string>>
): string {
  const duration = dateRange(entry.startDate, entry.endDate, months);

  const title = [
    entry.position ? `<span class="volunteer-position">${esc(entry.position)}</span>` : '',
    entry.organization ? `<span class="volunteer-org">${esc(entry.organization)}</span>` : '',
  ].filter(Boolean).join(' @ ');

  return `
    <div class="volunteer-entry">
      <div class="volunteer-header">
        <div class="volunteer-title">${title}</div>
        <div class="volunteer-duration">${duration ? `${esc(duration)}` : ''}</div>
      </div>
      ${entry.summary ? `<p class="volunteer-summary">${richText(entry.summary)}</p>` : ''}
      ${
        has(entry.highlights)
          ? `
      <ul class="volunteer-highlights">
        ${entry.highlights.map((h) => `<li>${richText(h)}</li>`).join('\n        ')}
      </ul>`
          : ''
      }
    </div>`;
}

export function renderVolunteer(
  volunteer: readonly ResumeVolunteerEntry[] | undefined,
  heading: string,
  months: Readonly<Record<string, string>>
): string {
  if (!has(volunteer)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${volunteer.map(entry => renderVolunteerEntry(entry, months)).join('')}
    </div>`;
}
