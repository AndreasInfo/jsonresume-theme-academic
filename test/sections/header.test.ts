import { describe, it, expect } from 'vitest';
import { renderHeader } from '../../src/sections/header';

describe('renderHeader', () => {
  it('returns empty string for undefined basics', () => {
    expect(renderHeader(undefined)).toBe('');
  });

  it('renders name and label', () => {
    const html = renderHeader({ name: 'John Doe', label: 'Engineer' });
    expect(html).toContain('John Doe');
    expect(html).toContain('Engineer');
    expect(html).toContain('class="name"');
    expect(html).toContain('class="label"');
  });

  it('renders location with region name', () => {
    const html = renderHeader({
      name: 'Jane',
      location: { city: 'London', region: 'GB' },
    });
    expect(html).toContain('London, United Kingdom');
    expect(html).toContain('fa-location-dot');
  });

  it('renders phone with icon', () => {
    const html = renderHeader({ name: 'Test', phone: '+1 555-0100' });
    expect(html).toContain('+1 555-0100');
    expect(html).toContain('fa-square-phone');
  });

  it('renders email with icon', () => {
    const html = renderHeader({ name: 'Test', email: 'test@example.com' });
    expect(html).toContain('test@example.com');
    expect(html).toContain('fa-envelope');
  });

  it('renders URL without protocol', () => {
    const html = renderHeader({ name: 'Test', url: 'https://example.com/portfolio' });
    expect(html).toContain('example.com/portfolio');
    expect(html).not.toContain('https://');
    expect(html).toContain('fa-globe');
  });

  it('renders profile icons', () => {
    const html = renderHeader({
      name: 'Test',
      profiles: [
        { network: 'LinkedIn', username: 'johndoe' },
        { network: 'GitHub', username: 'johndoe' },
        { network: 'Twitter', username: 'johndoe' },
      ],
    });
    expect(html).toContain('fa-linkedin-in');
    expect(html).toContain('fa-github');
    expect(html).toContain('fa-x-twitter');
  });

  it('escapes HTML in name', () => {
    const html = renderHeader({ name: '<script>alert("xss")</script>' });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('renders header-rule separator', () => {
    const html = renderHeader({ name: 'Test' });
    expect(html).toContain('class="header-rule"');
  });
});
