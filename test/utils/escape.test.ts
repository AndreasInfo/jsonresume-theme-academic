import { describe, it, expect } from 'vitest';
import { esc, decodeEntities } from '../../src/utils/escape';

describe('esc', () => {
  it('returns empty string for null/undefined', () => {
    expect(esc(null)).toBe('');
    expect(esc(undefined)).toBe('');
  });

  it('escapes ampersands', () => {
    expect(esc('AT&T')).toBe('AT&amp;T');
  });

  it('escapes angle brackets', () => {
    expect(esc('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes double quotes', () => {
    expect(esc('say "hello"')).toBe('say &quot;hello&quot;');
  });

  it('escapes single quotes', () => {
    expect(esc("it's")).toBe('it&#39;s');
  });

  it('handles combined special characters', () => {
    expect(esc('<a href="test">&')).toBe('&lt;a href=&quot;test&quot;&gt;&amp;');
  });

  it('passes through safe strings unchanged', () => {
    expect(esc('Hello World')).toBe('Hello World');
  });
});

describe('decodeEntities', () => {
  it('decodes numeric entities', () => {
    expect(decodeEntities('&#65;')).toBe('A');
  });

  it('decodes hex entities', () => {
    expect(decodeEntities('&#x41;')).toBe('A');
  });

  it('decodes named entities', () => {
    expect(decodeEntities('&amp;')).toBe('&');
    expect(decodeEntities('&lt;')).toBe('<');
    expect(decodeEntities('&gt;')).toBe('>');
    expect(decodeEntities('&quot;')).toBe('"');
    expect(decodeEntities('&#39;')).toBe("'");
    expect(decodeEntities('&apos;')).toBe("'");
  });

  it('decodes special characters', () => {
    expect(decodeEntities('&nbsp;')).toBe(' ');
    expect(decodeEntities('&mdash;')).toBe('\u2014');
    expect(decodeEntities('&ndash;')).toBe('\u2013');
    expect(decodeEntities('&hellip;')).toBe('\u2026');
  });

  it('handles multiple entities in one string', () => {
    expect(decodeEntities('&lt;b&gt;')).toBe('<b>');
  });
});
