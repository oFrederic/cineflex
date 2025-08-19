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
  useHighDPI,
  useIs2XLargeAndUp,
  useIsDesktop,
  useIsExtraLarge,
  useIsExtraLargeAndUp,
  useIsLandscape,
  useIsLargeAndUp,
  useIsLargeDesktop,
  useIsMediumAndUp,
  useIsMobile,
  useIsPortrait,
  useIsSmallAndUp,
  useIsTablet,
  useMediaQuery,
  usePrefersDarkMode,
  usePrefersLightMode,
  usePrefersReducedMotion,
  useSupportsFlexbox,
  useSupportsGrid,
  useSupportsHover,
  useSupportsTouch,
} from './useMediaQuery';
