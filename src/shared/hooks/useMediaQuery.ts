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
 * Hook for checking if screen is XS (475px) or larger
 */
export function useIsXSAndUp(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
}

/**
 * Hook for checking if screen is exactly XS (475px-639px)
 */
export function useIsXS(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.XS}) and (max-width: ${BREAKPOINTS.SM})`
  );
}

/**
 * Hook for checking if screen is exactly SM (640px-767px)
 */
export function useIsSM(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.SM}) and (max-width: ${BREAKPOINTS.MD})`
  );
}

/**
 * Hook for checking if screen is exactly MD (768px-1023px)
 */
export function useIsMD(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.MD}) and (max-width: ${BREAKPOINTS.LG})`
  );
}

/**
 * Hook for checking if screen is exactly LG (1024px-1279px)
 */
export function useIsLG(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.LG}) and (max-width: ${BREAKPOINTS.XL})`
  );
}

/**
 * Hook for checking if screen is exactly XL (1280px-1535px)
 */
export function useIsXL(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.XL}) and (max-width: ${BREAKPOINTS.XXL})`
  );
}

/**
 * Hook for checking if screen is exactly 2XL (1536px+)
 */
export function useIs2XL(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.XXL})`);
}

/**
 * Hook for checking if screen is below XS (< 475px)
 */
export function useIsBelowXS(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.XS})`);
}

/**
 * Hook for checking if screen is below SM (< 640px)
 */
export function useIsBelowSM(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);
}

/**
 * Hook for checking if screen is below MD (< 768px)
 */
export function useIsBelowMD(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.MD})`);
}

/**
 * Hook for checking if screen is below LG (< 1024px)
 */
export function useIsBelowLG(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.LG})`);
}

/**
 * Hook for checking if screen is below XL (< 1280px)
 */
export function useIsBelowXL(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.XL})`);
}

/**
 * Hook for checking if screen is below 2XL (< 1536px)
 */
export function useIsBelow2XL(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.XXL})`);
}

/**
 * Hook that returns the current breakpoint as a string
 */
export function useBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  const isXS = useIsXS();
  const isSM = useIsSM();
  const isMD = useIsMD();
  const isLG = useIsLG();
  const isXL = useIsXL();
  const is2XL = useIs2XL();
  const isBelowXS = useIsBelowXS();

  if (isBelowXS) return 'xs';
  if (isXS) return 'xs';
  if (isSM) return 'sm';
  if (isMD) return 'md';
  if (isLG) return 'lg';
  if (isXL) return 'xl';
  if (is2XL) return '2xl';

  return 'xs'; // fallback
}

/**
 * Hook that returns responsive values based on breakpoint
 */
export function useResponsiveValue<T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  default?: T;
}): T | undefined {
  const breakpoint = useBreakpoint();

  return values[breakpoint] ?? values.default;
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
