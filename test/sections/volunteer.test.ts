import { describe, it, expect } from 'vitest';
import { renderVolunteer } from '../../src/sections/volunteer';
import { MONTHS } from '../../src/constants';

describe('renderVolunteer', () => {
  it('returns empty for undefined/empty volunteer', () => {
    expect(renderVolunteer(undefined, 'Volunteering', MONTHS)).toBe('');
    expect(renderVolunteer([], 'Volunteering', MONTHS)).toBe('');
  });

  it('renders section title', () => {
    const html = renderVolunteer(
      [{ organization: 'Red Cross', summary: 'Helped people' }],
      'Leadership & Volunteering',
      MONTHS,
    );
    expect(html).toContain('Leadership &amp; Volunteering');
    expect(html).toContain('class="section-title"');
  });

  it('renders position @ organization', () => {
    const html = renderVolunteer(
      [{ organization: 'Code.org', position: 'Mentor', summary: 'Mentored students' }],
      'Volunteering',
      MONTHS,
    );
    expect(html).toMatch(/Mentor.*@.*Code\.org/);
  });

  it('renders organization without position', () => {
    const html = renderVolunteer(
      [{ organization: 'Red Cross', summary: 'Donated time' }],
      'Volunteering',
      MONTHS,
    );
    expect(html).toContain('Red Cross');
  });

  it('renders date range', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', startDate: '2020', endDate: '2024', summary: 'Work' }],
      'Volunteering',
      MONTHS,
    );
    expect(html).toContain('2020 - 2024');
  });

  it('renders start date only when no end date', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', startDate: '2020', summary: 'Work' }],
      'Volunteering',
      MONTHS,
    );
    expect(html).toContain('2020');
  });

  it('renders without dates when none provided', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', summary: 'Work' }],
      'Volunteering',
      MONTHS,
    );
    expect(html).not.toContain('(');
  });

  it('renders rich text summary', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', summary: '<b>Important</b> work' }],
      'Volunteering',
      MONTHS,
    );
    expect(html).toContain('<b>Important</b>');
  });
});
