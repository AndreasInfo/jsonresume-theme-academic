import { decodeEntities, esc } from './escape.js';
import { sanitizeHtml } from './sanitize.js';

/** Strip HTML tags → plain text (for fields parsed as data, not displayed). */
export function stripHtml(text: string | null | undefined): string {
  if (!text) return '';
  return decodeEntities(
    String(text)
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/?(p|div|li)[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const isHtml = (text: string): boolean => /<[a-z][\s\S]*>/i.test(text);
const hasEntities = (text: string): boolean => /&(?:amp|lt|gt|quot|#\d+|#x[0-9a-f]+);/i.test(text);

/**
 * Render user-provided rich text → safe HTML output.
 * block=true: preserve <p>, <ul>, <ol> etc.
 * block=false (default): inline mode — strip block tags, keep only inline formatting.
 */
export function richText(text: string | null | undefined, { block = false }: { block?: boolean } = {}): string {
  if (text == null) return '';
  const s = String(text);
  if (isHtml(s)) return sanitizeHtml(s, { inline: !block });
  if (hasEntities(s)) return esc(decodeEntities(s));
  return esc(s);
}

/** Check if an array is non-empty. */
export function has<T>(arr: readonly T[] | null | undefined): arr is readonly T[] & { length: number } {
  return Array.isArray(arr) && arr.length > 0;
}
