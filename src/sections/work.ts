import type { ResumeWorkEntry } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { dateRange } from '../utils/dates.js';
import { has, richText, stripHtml } from '../utils/text.js';
import { sectionTitle } from './shared.js';

/** Check whether summary uses structured Tech-stack / Client format. */
function isStructuredMeta(text: string): boolean {
  return /Tech-stack:\s/i.test(text) || /Client:\s/i.test(text);
}

/** Extract tech-stack and client from a structured work summary string. */
function parseWorkMeta(summary: string | undefined): { techStack: string; client: string } {
  if (!summary) return { techStack: '', client: '' };
  const text = stripHtml(summary).replace(/\n/g, ' ').trim();
  if (!isStructuredMeta(text)) return { techStack: '', client: '' };

  const clientMatch = text.match(/Client:\s*(.+)$/i);
  const client = clientMatch ? clientMatch[1].trim() : '';

  const techPart = clientMatch ? text.slice(0, clientMatch.index).trim() : text;
  const techMatch = techPart.match(/Tech-stack:\s*(.+)/i);
  const techStack = techMatch ? techMatch[1].trim() : '';

  return { techStack, client };
}

function renderWorkEntry(entry: ResumeWorkEntry): string {
  const { techStack, client } = parseWorkMeta(entry.summary);
  const duration = dateRange(entry.startDate, entry.endDate);
  const plainSummary = entry.summary ? stripHtml(entry.summary).replace(/\n/g, ' ').trim() : '';
  const isNarrative = plainSummary && !isStructuredMeta(plainSummary);

  return `
    <div class="work-entry">
      <div class="work-header">
        <div class="work-title">${esc(entry.name)} - ${esc(entry.position)}</div>
        <div class="work-duration">${duration ? `Duration: ${esc(duration)}` : ''}</div>
      </div>
      ${
        techStack || client
          ? `
      <div class="work-meta">
        <div class="work-tech">${techStack ? `Tech-stack: ${esc(techStack)}` : ''}</div>
        <div class="work-client">${client ? `Client: ${esc(client)}` : ''}</div>
      </div>`
          : ''
      }
      ${isNarrative ? `<p class="work-summary">${richText(entry.summary, { block: false })}</p>` : ''}
      ${
        has(entry.highlights)
          ? `
      <ul class="work-highlights">
        ${entry.highlights.map((h) => `<li>${richText(h)}</li>`).join('\n        ')}
      </ul>`
          : ''
      }
    </div>`;
}

export function renderWork(work: readonly ResumeWorkEntry[] | undefined, heading: string): string {
  if (!has(work)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${work.map(renderWorkEntry).join('')}
    </div>`;
}
