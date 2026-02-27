import { describe, it, expect } from 'vitest';
import { formatDate, dateRange, regionName } from '../../src/utils/dates';

describe('formatDate', () => {
  it('returns empty string for falsy input', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
  });

  it('returns year-only for single-part dates', () => {
    expect(formatDate('2024')).toBe('2024');
  });

  it('formats YYYY-MM to "Month Year"', () => {
    expect(formatDate('2024-01')).toBe('January 2024');
    expect(formatDate('2024-06')).toBe('June 2024');
    expect(formatDate('2024-12')).toBe('December 2024');
  });

  it('handles YYYY-MM-DD (ignores day)', () => {
    expect(formatDate('2024-03-15')).toBe('March 2024');
  });

  it('handles invalid month gracefully', () => {
    expect(formatDate('2024-13')).toBe(' 2024');
    expect(formatDate('2024-00')).toBe(' 2024');
  });
});

describe('dateRange', () => {
  it('returns empty string when no start', () => {
    expect(dateRange('', '2024-06')).toBe('');
    expect(dateRange(null, '2024-06')).toBe('');
  });

  it('returns start only when no end', () => {
    expect(dateRange('2024-01', '')).toBe('January 2024');
    expect(dateRange('2024-01', null)).toBe('January 2024');
  });

  it('formats full range', () => {
    expect(dateRange('2020-03', '2024-06')).toBe('March 2020 to June 2024');
  });
});

describe('regionName', () => {
  it('returns empty string for falsy input', () => {
    expect(regionName('')).toBe('');
    expect(regionName(null)).toBe('');
    expect(regionName(undefined)).toBe('');
  });

  it('maps known country codes', () => {
    expect(regionName('US')).toBe('United States');
    expect(regionName('GB')).toBe('United Kingdom');
    expect(regionName('DE')).toBe('Germany');
  });

  it('is case-insensitive', () => {
    expect(regionName('us')).toBe('United States');
  });

  it('returns original code for unknown countries', () => {
    expect(regionName('ZZ')).toBe('ZZ');
  });
});
