import type { ResumeBasics } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { regionName } from '../utils/dates.js';
import { profileIcon } from '../utils/icons.js';
import { has } from '../utils/text.js';

interface ContactLine {
  readonly icon: string;
  readonly text: string;
}

export function renderHeader(basics: ResumeBasics | undefined): string {
  if (!basics) return '';

  const location = basics.location
    ? [basics.location.city, regionName(basics.location.region)].filter(Boolean).join(', ')
    : '';

  const lines: ContactLine[] = [];
  if (location)
    lines.push({ icon: '<i class="fa-solid fa-location-dot"></i>', text: location });
  if (basics.phone)
    lines.push({ icon: '<i class="fa-solid fa-square-phone"></i>', text: basics.phone });
  if (basics.email)
    lines.push({ icon: '<i class="fa-solid fa-envelope"></i>', text: basics.email });
  if (basics.url) {
    const display = basics.url.replace(/^https?:\/\//, '');
    lines.push({ icon: '<i class="fa-solid fa-globe"></i>', text: display });
  }
  if (has(basics.profiles)) {
    for (const p of basics.profiles) {
      lines.push({ icon: profileIcon(p.network), text: p.username || p.url || '' });
    }
  }

  return `
    <header class="header">
      <div class="header-left">
        <h1 class="name">${esc(basics.name)}</h1>
        <div class="label">${esc(basics.label)}</div>
      </div>
      <div class="contact-info">
        ${lines.map((l) => `<div class="contact-line">${esc(l.text)} ${l.icon}</div>`).join('\n        ')}
      </div>
    </header>
    <hr class="header-rule" />`;
}
