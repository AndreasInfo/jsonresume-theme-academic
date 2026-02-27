import type { ResumeProject } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { has, richText } from '../utils/text.js';
import { sectionTitle } from './shared.js';

export function renderProjects(
  projects: readonly ResumeProject[] | undefined,
  heading: string,
): string {
  if (!has(projects)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${projects
        .map((p) => {
          const desc = richText(p.description);
          return `
      <div class="bullet-item">
        <span class="project-name">${esc(p.name)}:</span> ${desc}
      </div>`;
        })
        .join('')}
    </div>`;
}
