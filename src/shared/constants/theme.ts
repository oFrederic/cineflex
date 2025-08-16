/**
 * Theme constants based on DESIGN.md specifications
 */

// Color System
export const COLORS = {
  // Background Colors
  BG_PRIMARY: '#0a0a0a',
  BG_SECONDARY: '#141414',
  BG_TERTIARY: '#1e1e1e',
  BG_MODAL: '#252525',

  // Surface Colors
  SURFACE_HOVER: '#2a2a2a',
  SURFACE_PRESSED: '#333333',
  SURFACE_BORDER: '#404040',

  // Text Colors
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#b3b3b3',
  TEXT_TERTIARY: '#8c8c8c',
  TEXT_DISABLED: '#555555',

  // Accent Colors
  ACCENT_RED: '#e50914',
  ACCENT_RED_HOVER: '#f40612',
  ACCENT_RED_PRESSED: '#c50813',

  // Status Colors
  SUCCESS: '#46d369',
  WARNING: '#ffb800',
  ERROR: '#ff4757',
  INFO: '#3742fa',
} as const;

// Typography
export const TYPOGRAPHY = {
  // Font Families
  FONT_PRIMARY:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  FONT_DISPLAY: "'Poppins', 'Inter', sans-serif",
  FONT_MONO: "'JetBrains Mono', 'Fira Code', monospace",

  // Font Sizes (4pt grid)
  TEXT_XS: '12px',
  TEXT_SM: '14px',
  TEXT_BASE: '16px',
  TEXT_LG: '18px',
  TEXT_XL: '20px',
  TEXT_2XL: '24px',
  TEXT_3XL: '32px',
  TEXT_4XL: '40px',
  TEXT_5XL: '48px',
  TEXT_6XL: '64px',

  // Line Heights
  LEADING_TIGHT: '1.2',
  LEADING_NORMAL: '1.5',
  LEADING_RELAXED: '1.75',

  // Font Weights
  FONT_LIGHT: '300',
  FONT_NORMAL: '400',
  FONT_MEDIUM: '500',
  FONT_SEMIBOLD: '600',
  FONT_BOLD: '700',
} as const;

// Spacing (4pt grid)
export const SPACING = {
  SPACE_1: '4px',
  SPACE_2: '8px',
  SPACE_3: '12px',
  SPACE_4: '16px',
  SPACE_5: '20px',
  SPACE_6: '24px',
  SPACE_8: '32px',
  SPACE_10: '40px',
  SPACE_12: '48px',
  SPACE_16: '64px',
  SPACE_20: '80px',
  SPACE_24: '96px',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  XS: '475px',
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px',
} as const;

// Container widths
export const CONTAINERS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px',
  CONTENT_WIDTH: '1200px',
  READING_WIDTH: '680px',
} as const;

// Shadows
export const SHADOWS = {
  XS: '0 1px 2px rgba(0, 0, 0, 0.1)',
  SM: '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12)',
  MD: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  LG: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  XL: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  XXL: '0 25px 50px rgba(0, 0, 0, 0.25)',
  RED: '0 10px 15px rgba(229, 9, 20, 0.2), 0 4px 6px rgba(229, 9, 20, 0.1)',
} as const;

// Border Radius
export const BORDER_RADIUS = {
  NONE: '0',
  SM: '4px',
  MD: '8px',
  LG: '12px',
  XL: '16px',
  FULL: '50%',
} as const;

// Transitions
export const TRANSITIONS = {
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASE_BACK: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Common durations
  FAST: '150ms',
  NORMAL: '300ms',
  SLOW: '500ms',
} as const;

// Z-Index
export const Z_INDEX = {
  DROPDOWN: '1000',
  STICKY: '1020',
  FIXED: '1030',
  MODAL_BACKDROP: '1040',
  MODAL: '1050',
  POPOVER: '1060',
  TOOLTIP: '1070',
} as const;

// Gradients
export const GRADIENTS = {
  HERO: 'linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%)',
  CARD: 'linear-gradient(135deg, #141414 0%, #1e1e1e 100%)',
  ACCENT: 'linear-gradient(135deg, #e50914 0%, #f40612 100%)',
} as const;
