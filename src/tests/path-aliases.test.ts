/**
 * Test file to verify path aliases are working correctly
 */

import { describe, it, expect } from 'vitest';
import { ROUTES } from '@/shared/constants/routes';
import { COLORS } from '@/shared/constants/theme';
import { formatDate } from '@/shared/utils/formatters';

describe('Path Aliases', () => {
  it('should resolve @/shared/constants/routes', () => {
    expect(ROUTES.HOME).toBe('/');
    expect(ROUTES.MOVIES).toBe('/movies');
    expect(ROUTES.SEARCH).toBe('/search');
  });

  it('should resolve @/shared/constants/theme', () => {
    expect(COLORS.BG_PRIMARY).toBe('#0a0a0a');
    expect(COLORS.TEXT_PRIMARY).toBe('#ffffff');
    expect(COLORS.ACCENT_RED).toBe('#e50914');
  });

  it('should resolve @/shared/utils/formatters', () => {
    const testDate = new Date('2023-01-15');
    const formatted = formatDate(testDate);
    expect(typeof formatted).toBe('string');
    expect(formatted).toContain('January');
    expect(formatted).toContain('2023');
  });
});
