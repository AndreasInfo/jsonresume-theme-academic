import { describe, it, expect } from 'vitest';
import { renderWork } from '../../src/sections/work';

describe('renderWork', () => {
  it('returns empty for undefined/empty work', () => {
    expect(renderWork(undefined, 'Experience')).toBe('');
    expect(renderWork([], 'Experience')).toBe('');
  });

  it('renders section title', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev' }],
      'Experience',
    );
    expect(html).toContain('Experience');
    expect(html).toContain('class="section-title"');
  });

  it('renders work entry with name and position', () => {
    const html = renderWork(
      [{ name: 'Acme Corp', position: 'Senior Developer' }],
      'Experience',
    );
    expect(html).toContain('Acme Corp');
    expect(html).toContain('Senior Developer');
  });

  it('renders date range', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev', startDate: '2020-01', endDate: '2023-06' }],
      'Experience',
    );
    expect(html).toContain('Duration: January 2020 to June 2023');
  });

  it('parses tech-stack from summary', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev', summary: 'Tech-stack: React, Node.js' }],
      'Experience',
    );
    expect(html).toContain('Tech-stack: React, Node.js');
  });

  it('parses client from summary', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev', summary: 'Tech-stack: React\nClient: BigCorp' }],
      'Experience',
    );
    expect(html).toContain('Client: BigCorp');
  });

  it('renders highlights as list items', () => {
    const html = renderWork(
      [{
        name: 'Acme',
        position: 'Dev',
        highlights: ['Built API', 'Led team of 5'],
      }],
      'Experience',
    );
    expect(html).toContain('<li>Built API</li>');
    expect(html).toContain('<li>Led team of 5</li>');
  });

  it('sanitizes HTML in highlights', () => {
    const html = renderWork(
      [{
        name: 'Acme',
        position: 'Dev',
        highlights: ['<b>Important</b> achievement'],
      }],
      'Experience',
    );
    expect(html).toContain('<b>Important</b>');
  });
});
