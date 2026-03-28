import type { ResumeSkill } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { has } from '../utils/text.js';
import { sectionTitle } from './shared.js';

export function renderSkills(skills: readonly ResumeSkill[] | undefined, heading: string): string {
  if (!has(skills)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${skills
        .map(
          (s) => `
      <div class="skill-entry">
        <span class="skill-name">${esc(s.name)}:</span> ${esc((s.keywords || []).join(', '))}
      </div>`,
        )
        .join('')}
    </div>`;
}
