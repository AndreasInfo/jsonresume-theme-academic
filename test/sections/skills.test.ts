import { describe, it, expect } from 'vitest';
import { renderSkills } from '../../src/sections/skills';

describe('renderSkills', () => {
  it('returns empty for undefined/empty skills', () => {
    expect(renderSkills(undefined, 'Skills')).toBe('');
    expect(renderSkills([], 'Skills')).toBe('');
  });

  it('renders skill name and keywords', () => {
    const html = renderSkills(
      [{ name: 'Languages', keywords: ['TypeScript', 'Python', 'Go'] }],
      'Core Skills',
    );
    expect(html).toContain('Languages');
    expect(html).toContain('TypeScript, Python, Go');
    expect(html).toContain('Core Skills');
  });

  it('handles skills with no keywords', () => {
    const html = renderSkills(
      [{ name: 'Other' }],
      'Skills',
    );
    expect(html).toContain('Other');
  });
});
