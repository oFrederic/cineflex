/**
 * API constants and configuration
 */

// TMDB API Configuration
export const TMDB_API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  API_VERSION: '3',
} as const;

// TMDB API Endpoints
export const TMDB_ENDPOINTS = {
  // Movies
  MOVIES: {
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    NOW_PLAYING: '/movie/now_playing',
    UPCOMING: '/movie/upcoming',
    DETAILS: (id: number) => `/movie/${id}`,
    CREDITS: (id: number) => `/movie/${id}/credits`,
    VIDEOS: (id: number) => `/movie/${id}/videos`,
    SIMILAR: (id: number) => `/movie/${id}/similar`,
    RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
    IMAGES: (id: number) => `/movie/${id}/images`,
    REVIEWS: (id: number) => `/movie/${id}/reviews`,
  },

  // Search
  SEARCH: {
    MOVIES: '/search/movie',
    MULTI: '/search/multi',
  },

  // Genres
  GENRES: {
    MOVIE_LIST: '/genre/movie/list',
  },

  // Discover
  DISCOVER: {
    MOVIES: '/discover/movie',
  },

  // Configuration
  CONFIG: {
    IMAGES: '/configuration',
  },
} as const;

// Image sizes for TMDB
export const TMDB_IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
  PROFILE: {
    SMALL: 'w45',
    MEDIUM: 'w185',
    LARGE: 'h632',
    ORIGINAL: 'original',
  },
  LOGO: {
    SMALL: 'w45',
    MEDIUM: 'w92',
    LARGE: 'w154',
    ORIGINAL: 'original',
  },
} as const;

// API Response Limits
export const API_LIMITS = {
  MAX_PAGE_SIZE: 20,
  DEFAULT_PAGE_SIZE: 20,
  MAX_SEARCH_RESULTS: 1000,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'API error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'Unauthorized access.',
  RATE_LIMITED: 'Too many requests. Please try again later.',
  VALIDATION_ERROR: 'Invalid input data.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
} as const;
