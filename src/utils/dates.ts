import { MONTHS, COUNTRY_NAMES } from '../constants.js';

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const parts = String(dateStr).split('-');
  if (parts.length === 1) return parts[0];
  const year = parts[0];
  const month = MONTHS[parseInt(parts[1], 10) - 1] || '';
  return `${month} ${year}`;
}

export function dateRange(start: string | null | undefined, end: string | null | undefined): string {
  const s = formatDate(start);
  const e = end ? formatDate(end) : '';
  if (!s) return '';
  if (!e) return s;
  return `${s} to ${e}`;
}

export function regionName(code: string | null | undefined): string {
  if (!code) return '';
  return COUNTRY_NAMES[code.toUpperCase()] || code;
}
