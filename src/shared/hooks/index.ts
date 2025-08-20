/**
 * Custom hooks index
 * Export all custom hooks for easy importing
 */

// Local Storage hooks
export {
  useLocalStorage,
  useLocalStorageArray,
  useLocalStorageBoolean,
  useLocalStorageNumber,
  useLocalStorageObject,
  useLocalStorageString,
} from './useLocalStorage';

// Debounce hooks
export {
  useDebounce,
  useDebouncedCallback,
  useResizeDebounce,
  useScrollDebounce,
  useSearchDebounce,
} from './useDebounce';

// Media Query hooks
export {
  useBreakpoint,
  useHighDPI,
  useIs2XLargeAndUp,
  useIs2XL,
  useIsBelow2XL,
  useIsBelowLG,
  useIsBelowMD,
  useIsBelowSM,
  useIsBelowXL,
  useIsBelowXS,
  useIsDesktop,
  useIsExtraLarge,
  useIsExtraLargeAndUp,
  useIsLandscape,
  useIsLargeAndUp,
  useIsLargeDesktop,
  useIsLG,
  useIsMediumAndUp,
  useIsMobile,
  useIsMD,
  useIsPortrait,
  useIsSmallAndUp,
  useIsSM,
  useIsTablet,
  useIsXL,
  useIsXS,
  useIsXSAndUp,
  useMediaQuery,
  usePrefersDarkMode,
  usePrefersLightMode,
  usePrefersReducedMotion,
  useResponsiveValue,
  useSupportsFlexbox,
  useSupportsGrid,
  useSupportsHover,
  useSupportsTouch,
} from './useMediaQuery';
