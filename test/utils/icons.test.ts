import { describe, it, expect } from 'vitest';
import { profileIcon } from '../../src/utils/icons';

describe('profileIcon', () => {
  it('returns link icon for null/undefined', () => {
    expect(profileIcon(null)).toContain('fa-link');
    expect(profileIcon(undefined)).toContain('fa-link');
  });

  it('returns LinkedIn icon', () => {
    expect(profileIcon('LinkedIn')).toContain('fa-linkedin-in');
    expect(profileIcon('linkedin')).toContain('fa-linkedin-in');
  });

  it('returns GitHub icon', () => {
    expect(profileIcon('GitHub')).toContain('fa-github');
    expect(profileIcon('github')).toContain('fa-github');
  });

  it('returns Twitter/X icon', () => {
    expect(profileIcon('Twitter')).toContain('fa-x-twitter');
    expect(profileIcon('twitter')).toContain('fa-x-twitter');
    expect(profileIcon('X')).toContain('fa-x-twitter');
    expect(profileIcon('x')).toContain('fa-x-twitter');
  });

  it('returns Stack Overflow icon', () => {
    expect(profileIcon('StackOverflow')).toContain('fa-stack-overflow');
    expect(profileIcon('stackoverflow')).toContain('fa-stack-overflow');
  });

  it('returns link icon for unknown networks', () => {
    expect(profileIcon('Mastodon')).toContain('fa-link');
    expect(profileIcon('Instagram')).toContain('fa-link');
  });
});
