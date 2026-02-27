import type { ResumeCertificate } from '../types/resume.js';
import { has, richText } from '../utils/text.js';
import { sectionTitle } from './shared.js';

export function renderCertificates(
  certificates: readonly ResumeCertificate[] | undefined,
  heading: string,
): string {
  if (!has(certificates)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${certificates
        .map(
          (c) => `
      <div class="bullet-item">${richText(c.name)}</div>`,
        )
        .join('')}
    </div>`;
}
