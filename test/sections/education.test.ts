import { describe, it, expect } from 'vitest';
import { renderEducation } from '../../src/sections/education';
import { MONTHS } from '../../src/constants';

describe('renderEducation', () => {
  it('returns empty for undefined/empty education', () => {
    expect(renderEducation(undefined, 'Education', MONTHS)).toBe('');
    expect(renderEducation([], 'Education', MONTHS)).toBe('');
  });

  it('renders degree from studyType and area', () => {
    const html = renderEducation(
      [{ studyType: 'B.S.', area: 'Computer Science' }],
      'Education',
      MONTHS,
    );
    expect(html).toContain('B.S. Computer Science');
  });

  it('renders end date only when no start date', () => {
    const html = renderEducation(
      [{ institution: 'MIT', endDate: '2024-05' }],
      'Education',
      MONTHS,
    );
    expect(html).toContain('May 2024');
  });

  it('renders date range when start and end date provided', () => {
    const html = renderEducation(
      [{ institution: 'MIT', startDate: '2020-09', endDate: '2024-05' }],
      'Education',
      MONTHS,
    );
    expect(html).toContain('September 2020 - May 2024');
  });

  it('renders institution', () => {
    const html = renderEducation(
      [{ institution: 'Stanford' }],
      'Education',
      MONTHS,
    );
    expect(html).toContain('Stanford');
  });

  it('renders degree @ institution', () => {
    const html = renderEducation(
      [{ studyType: 'B.S.', area: 'Computer Science', institution: 'MIT' }],
      'Education',
      MONTHS,
    );
    expect(html).toMatch(/B\.S\. Computer Science.*@.*MIT/);
  });
});
