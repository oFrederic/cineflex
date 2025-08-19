/**
 * Custom hook for media queries
 * Provides responsive design capabilities with React
 */

import { BREAKPOINTS } from '@/shared/constants/theme';
import { useEffect, useState } from 'react';

/**
 * Hook for media query matching
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/**
 * Hook for checking if screen is mobile
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.MD})`);
}

/**
 * Hook for checking if screen is tablet
 */
export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.MD}) and (max-width: ${BREAKPOINTS.LG})`
  );
}

/**
 * Hook for checking if screen is desktop
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.LG})`);
}

/**
 * Hook for checking if screen is large desktop
 */
export function useIsLargeDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.XL})`);
}

/**
 * Hook for checking if screen is extra large
 */
export function useIsExtraLarge(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.XXL})`);
}

/**
 * Hook for checking if screen is small or larger
 */
export function useIsSmallAndUp(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.SM})`);
}

/**
 * Hook for checking if screen is medium or larger
 */
export function useIsMediumAndUp(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);
}

/**
 * Hook for checking if screen is large or larger
 */
export function useIsLargeAndUp(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.LG})`);
}

/**
 * Hook for checking if screen is extra large or larger
 */
export function useIsExtraLargeAndUp(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.XL})`);
}

/**
 * Hook for checking if screen is 2XL or larger
 */
export function useIs2XLargeAndUp(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.XXL})`);
}

/**
 * Hook for checking if screen is portrait orientation
 */
export function useIsPortrait(): boolean {
  return useMediaQuery('(orientation: portrait)');
}

/**
 * Hook for checking if screen is landscape orientation
 */
export function useIsLandscape(): boolean {
  return useMediaQuery('(orientation: landscape)');
}

/**
 * Hook for checking if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Hook for checking if user prefers dark color scheme
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

/**
 * Hook for checking if user prefers light color scheme
 */
export function usePrefersLightMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: light)');
}

/**
 * Hook for checking if device supports hover
 */
export function useSupportsHover(): boolean {
  return useMediaQuery('(hover: hover)');
}

/**
 * Hook for checking if device supports touch
 */
export function useSupportsTouch(): boolean {
  return useMediaQuery('(pointer: coarse)');
}

/**
 * Hook for checking if device has high DPI display
 */
export function useHighDPI(): boolean {
  return useMediaQuery(
    '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
  );
}

/**
 * Hook for checking if device supports grid layout
 */
export function useSupportsGrid(): boolean {
  return useMediaQuery('@supports (display: grid)');
}

/**
 * Hook for checking if device supports flexbox
 */
export function useSupportsFlexbox(): boolean {
  return useMediaQuery('@supports (display: flex)');
}
