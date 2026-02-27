/** Tags allowed through sanitization — safe inline/block formatting. */
const BLOCK_TAGS = new Set(['p', 'ul', 'ol', 'li', 'blockquote']);
const INLINE_TAGS = new Set([
  'br', 'b', 'strong', 'i', 'em', 'u', 's', 'mark', 'a', 'sub', 'sup', 'code',
]);
const ALLOWED_TAGS = new Set([...BLOCK_TAGS, ...INLINE_TAGS]);

/** URL schemes safe for <a href>. Everything else (javascript:, data:, vbscript:) is stripped. */
const SAFE_URL_SCHEMES = /^(?:https?|mailto|tel):/i;
const RELATIVE_URL = /^[#/?.]/;

function isSafeUrl(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;
  return SAFE_URL_SCHEMES.test(trimmed) || RELATIVE_URL.test(trimmed);
}

interface SanitizeOptions {
  readonly inline?: boolean;
}

/**
 * Sanitize HTML — keep allowed formatting tags, strip everything else.
 * Attributes are stripped from all tags except <a href> (safe schemes only) and <mark class>.
 * If inline=true, block tags (p, ul, ol, li, blockquote) are also stripped.
 */
export function sanitizeHtml(html: string | null | undefined, { inline = false }: SanitizeOptions = {}): string {
  if (!html) return '';
  const allowed = inline ? INLINE_TAGS : ALLOWED_TAGS;

  return String(html)
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>/gi, (_, href: string) => {
      if (!isSafeUrl(href)) return '';
      return `<a href="${href.replace(/"/g, '&quot;')}" target="_blank" rel="noopener">`;
    })
    .replace(/<mark\s+[^>]*class="([^"]*)"[^>]*>/gi, (_, cls: string) =>
      `<mark class="${cls.replace(/"/g, '&quot;')}">`,
    )
    .replace(/<(\/?)([a-z][a-z0-9]*)\s*[^>]*?(\/?)>/gi, (match, slash: string, tag: string, selfClose: string) => {
      const lower = tag.toLowerCase();
      if (lower === 'a' && !slash && match.includes('href=')) return match;
      if (lower === 'mark' && !slash && match.includes('class=')) return match;
      if (allowed.has(lower)) return `<${slash}${lower}${selfClose}>`;
      if (inline && BLOCK_TAGS.has(lower)) return slash ? ' ' : '';
      return '';
    })
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
