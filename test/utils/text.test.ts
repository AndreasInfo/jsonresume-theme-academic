import { describe, it, expect } from 'vitest';
import { richText, stripHtml, has } from '../../src/utils/text';

describe('richText', () => {
  it('returns empty string for null/undefined', () => {
    expect(richText(null)).toBe('');
    expect(richText(undefined)).toBe('');
  });

  it('escapes plain text', () => {
    expect(richText('Hello World')).toBe('Hello World');
  });

  it('strips unknown HTML tags from HTML-like input', () => {
    // <World> looks like an HTML tag to the isHtml check, so it goes through sanitize
    const result = richText('Hello <World>');
    expect(result).not.toContain('<World>');
    expect(result).toContain('Hello');
  });

  it('sanitizes HTML input (inline mode by default)', () => {
    const result = richText('<p>Hello</p>');
    expect(result).not.toContain('<p>');
    expect(result).toContain('Hello');
  });

  it('preserves block tags in block mode', () => {
    const result = richText('<p>Hello</p>', { block: true });
    expect(result).toContain('<p>');
  });

  it('decodes entities in non-HTML text', () => {
    expect(richText('AT&amp;T')).toBe('AT&amp;T');
  });

  it('preserves inline formatting in HTML', () => {
    const result = richText('<b>bold</b> and <i>italic</i>');
    expect(result).toContain('<b>bold</b>');
    expect(result).toContain('<i>italic</i>');
  });
});

describe('stripHtml', () => {
  it('returns empty string for null/undefined', () => {
    expect(stripHtml(null)).toBe('');
    expect(stripHtml(undefined)).toBe('');
    expect(stripHtml('')).toBe('');
  });

  it('strips all HTML tags', () => {
    expect(stripHtml('<b>bold</b>')).toBe('bold');
  });

  it('converts br tags to spaces', () => {
    expect(stripHtml('hello<br>world')).toBe('hello world');
    expect(stripHtml('hello<br/>world')).toBe('hello world');
  });

  it('converts block tags to spaces', () => {
    expect(stripHtml('<p>one</p><p>two</p>')).toBe('one two');
  });

  it('decodes entities', () => {
    expect(stripHtml('AT&amp;T')).toBe('AT&T');
  });

  it('collapses whitespace', () => {
    expect(stripHtml('hello   <br>   world')).toBe('hello world');
  });
});

describe('has', () => {
  it('returns false for null/undefined/empty', () => {
    expect(has(null)).toBe(false);
    expect(has(undefined)).toBe(false);
    expect(has([])).toBe(false);
  });

  it('returns true for non-empty arrays', () => {
    expect(has([1])).toBe(true);
    expect(has(['a', 'b'])).toBe(true);
  });

  it('returns false for non-array values', () => {
    expect(has('hello' as unknown as string[])).toBe(false);
  });
});
