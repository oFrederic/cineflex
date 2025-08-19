/**
 * General application constants
 * Centralized constants used across the application
 */

// Application Information
export const APP_CONSTANTS = {
  NAME: 'CineFlex',
  VERSION: '0.0.0',
  DESCRIPTION: 'Modern Movie Discovery App',
  AUTHOR: 'CineFlex Team',
  REPOSITORY: 'https://github.com/yourusername/cineflex',
  WEBSITE: 'https://cineflex.com',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'cineflex-theme',
  WATCHLIST: 'cineflex-watchlist',
  SEARCH_HISTORY: 'cineflex-search-history',
  USER_PREFERENCES: 'cineflex-user-preferences',
  AUTH_TOKEN: 'cineflex-auth-token',
  LAST_VISITED: 'cineflex-last-visited',
  FOOTER_EXPANDED: 'cineflex-footer-expanded',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'API error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'Unauthorized access.',
  FORBIDDEN: 'Access forbidden.',
  RATE_LIMITED: 'Too many requests. Please try again later.',
  VALIDATION_ERROR: 'Invalid input data.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  LOADING_ERROR: 'Failed to load data. Please refresh the page.',
  SAVE_ERROR: 'Failed to save data. Please try again.',
  DELETE_ERROR: 'Failed to delete item. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Data saved successfully.',
  DELETED: 'Item deleted successfully.',
  UPDATED: 'Data updated successfully.',
  CREATED: 'Item created successfully.',
  LOGGED_IN: 'Successfully logged in.',
  LOGGED_OUT: 'Successfully logged out.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
  LOADING: 'Loading...',
  SAVING: 'Saving...',
  DELETING: 'Deleting...',
  UPDATING: 'Updating...',
  CREATING: 'Creating...',
  SEARCHING: 'Searching...',
  FETCHING: 'Fetching data...',
  PROCESSING: 'Processing...',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
} as const;

// Search
export const SEARCH = {
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
  DEBOUNCE_DELAY: 300,
  MAX_HISTORY_ITEMS: 10,
  MAX_SUGGESTIONS: 5,
} as const;

// Movie Categories
export const MOVIE_CATEGORIES = {
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  NOW_PLAYING: 'now_playing',
  UPCOMING: 'upcoming',
  TRENDING: 'trending',
} as const;

// Sort Options
export const SORT_OPTIONS = {
  POPULARITY_DESC: 'popularity.desc',
  POPULARITY_ASC: 'popularity.asc',
  RELEASE_DATE_DESC: 'release_date.desc',
  RELEASE_DATE_ASC: 'release_date.asc',
  VOTE_AVERAGE_DESC: 'vote_average.desc',
  VOTE_AVERAGE_ASC: 'vote_average.asc',
  TITLE_ASC: 'title.asc',
  TITLE_DESC: 'title.desc',
} as const;

// Filter Options
export const FILTER_OPTIONS = {
  GENRES: 'genres',
  YEAR: 'year',
  RATING: 'rating',
  LANGUAGE: 'language',
  RUNTIME: 'runtime',
  ADULT: 'adult',
} as const;

// Languages
export const LANGUAGES = {
  ENGLISH: 'en-US',
  SPANISH: 'es-ES',
  FRENCH: 'fr-FR',
  GERMAN: 'de-DE',
  ITALIAN: 'it-IT',
  PORTUGUESE: 'pt-BR',
  RUSSIAN: 'ru-RU',
  JAPANESE: 'ja-JP',
  KOREAN: 'ko-KR',
  CHINESE: 'zh-CN',
} as const;

// Regions
export const REGIONS = {
  US: 'US',
  CA: 'CA',
  GB: 'GB',
  DE: 'DE',
  FR: 'FR',
  ES: 'ES',
  IT: 'IT',
  JP: 'JP',
  KR: 'KR',
  CN: 'CN',
} as const;

// Time Constants
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

// Cache Durations
export const CACHE_DURATION = {
  SHORT: 5 * TIME.MINUTE, // 5 minutes
  MEDIUM: 30 * TIME.MINUTE, // 30 minutes
  LONG: 2 * TIME.HOUR, // 2 hours
  VERY_LONG: 24 * TIME.HOUR, // 24 hours
  PERMANENT: Infinity, // Never expire
} as const;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Z-Index Values
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  NOTIFICATION: 1080,
} as const;

// File Types
export const FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg'],
  AUDIO: ['audio/mp3', 'audio/wav', 'audio/ogg'],
  DOCUMENT: ['application/pdf', 'text/plain', 'application/msword'],
} as const;

// File Size Limits
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  AUDIO: 10 * 1024 * 1024, // 10MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
} as const;

// Social Media
export const SOCIAL_MEDIA = {
  TWITTER: 'https://twitter.com/cineflex',
  FACEBOOK: 'https://facebook.com/cineflex',
  INSTAGRAM: 'https://instagram.com/cineflex',
  YOUTUBE: 'https://youtube.com/cineflex',
  GITHUB: 'https://github.com/yourusername/cineflex',
  LINKEDIN: 'https://linkedin.com/company/cineflex',
} as const;

// External Services
export const EXTERNAL_SERVICES = {
  TMDB: 'https://www.themoviedb.org',
  IMDB: 'https://www.imdb.com',
  ROTTEN_TOMATOES: 'https://www.rottentomatoes.com',
  METACRITIC: 'https://www.metacritic.com',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: true,
  ENABLE_PWA: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_SOCIAL_SHARING: true,
  ENABLE_DARK_MODE: true,
  ENABLE_ACCESSIBILITY: true,
} as const;

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100, // First Input Delay (ms)
  CLS: 0.1, // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 600, // Time to First Byte (ms)
} as const;

// Accessibility
export const ACCESSIBILITY = {
  MIN_CONTRAST_RATIO: 4.5,
  FOCUS_INDICATOR_WIDTH: '2px',
  FOCUS_INDICATOR_STYLE: 'solid',
  FOCUS_INDICATOR_COLOR: '#e50914',
  SKIP_LINK_TEXT: 'Skip to main content',
} as const;
