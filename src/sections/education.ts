import type { ResumeEducationEntry } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { formatDate, dateRange } from '../utils/dates.js';
import { has } from '../utils/text.js';
import { sectionTitle } from './shared.js';

function renderEducationEntry(
  entry: ResumeEducationEntry,
  months: Readonly<Record<string, string>>
): string {
  const degree = [entry.studyType, entry.area].filter(Boolean).join(' ');

  const yearDisplay = entry.startDate
    ? dateRange(entry.startDate, entry.endDate, months)
    : formatDate(entry.endDate, months);

  const title = [
    degree ? `<span class="edu-degree">${esc(degree)}</span>` : '',
    entry.institution ? `<span class="edu-institution">${esc(entry.institution)}</span>` : '',
  ].filter(Boolean).join(' @ ');

  return `
    <div class="edu-entry">
      <div class="edu-header">
        <div class="edu-title">${title}</div>
        <div class="edu-year">${esc(yearDisplay)}</div>
      </div>
    </div>`;
}

export function renderEducation(
  education: readonly ResumeEducationEntry[] | undefined,
  heading: string,
  months: Readonly<Record<string, string>>
): string {
  if (!has(education)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${education.map(entry => renderEducationEntry(entry, months)).join('')}
    </div>`;
}
