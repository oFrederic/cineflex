/**
 * Environment variable utilities for CineFlex
 * Provides type-safe access to environment variables with validation
 */

// Required environment variables
const requiredEnvVars = {
  TMDB_API_KEY: import.meta.env.VITE_TMDB_API_KEY,
} as const;

// Optional environment variables with defaults
const optionalEnvVars = {
  TMDB_API_URL:
    import.meta.env.VITE_TMDB_API_URL || 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL:
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'CineFlex',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '0.0.0',
  APP_DESCRIPTION:
    import.meta.env.VITE_APP_DESCRIPTION || 'Modern Movie Discovery App',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  DEV_PORT: import.meta.env.VITE_DEV_PORT || '5173',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_PWA: import.meta.env.VITE_ENABLE_PWA === 'true',
  ENABLE_OFFLINE_MODE: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || '',
  PLAUSIBLE_DOMAIN: import.meta.env.VITE_PLAUSIBLE_DOMAIN || '',
  TWITTER_HANDLE: import.meta.env.VITE_TWITTER_HANDLE || '@cineflex',
  SOCIAL_IMAGE_URL: import.meta.env.VITE_SOCIAL_IMAGE_URL || '',
  ENABLE_PERFORMANCE_MONITORING:
    import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
  API_CACHE_DURATION: parseInt(
    import.meta.env.VITE_API_CACHE_DURATION || '300',
    10
  ),
  CSP_NONCE: import.meta.env.VITE_CSP_NONCE || '',
  TEST_MODE: import.meta.env.VITE_TEST_MODE === 'true',
  TEST_API_KEY: import.meta.env.VITE_TEST_API_KEY || '',
  NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',
  BUILD_TIME: import.meta.env.VITE_BUILD_TIME || '',
  GIT_COMMIT_HASH: import.meta.env.VITE_GIT_COMMIT_HASH || '',
} as const;

/**
 * Validate required environment variables
 * @throws Error if any required environment variables are missing
 */
export function validateEnvironment(): void {
  const missingVars: string[] = [];

  // Check required environment variables
  if (
    !requiredEnvVars.TMDB_API_KEY ||
    requiredEnvVars.TMDB_API_KEY === 'your_tmdb_api_key_here'
  ) {
    missingVars.push('VITE_TMDB_API_KEY');
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set.'
    );
  }
}

/**
 * Get environment configuration object
 * @returns Environment configuration with all variables
 */
export function getEnvironmentConfig() {
  return {
    ...requiredEnvVars,
    ...optionalEnvVars,
  } as const;
}

/**
 * Check if we're in development mode
 */
export const isDevelopment = optionalEnvVars.NODE_ENV === 'development';

/**
 * Check if we're in production mode
 */
export const isProduction = optionalEnvVars.NODE_ENV === 'production';

/**
 * Check if debug mode is enabled
 */
export const isDebugMode = optionalEnvVars.DEBUG_MODE;

/**
 * Check if mock data should be used
 */
export const useMockData = optionalEnvVars.USE_MOCK_DATA;

/**
 * Get TMDB API configuration
 */
export const tmdbConfig = {
  apiKey: requiredEnvVars.TMDB_API_KEY,
  apiUrl: optionalEnvVars.TMDB_API_URL,
  imageBaseUrl: optionalEnvVars.TMDB_IMAGE_BASE_URL,
} as const;

/**
 * Get application configuration
 */
export const appConfig = {
  name: optionalEnvVars.APP_NAME,
  version: optionalEnvVars.APP_VERSION,
  description: optionalEnvVars.APP_DESCRIPTION,
  url: optionalEnvVars.APP_URL,
} as const;

/**
 * Get feature flags
 */
export const featureFlags = {
  analytics: optionalEnvVars.ENABLE_ANALYTICS,
  pwa: optionalEnvVars.ENABLE_PWA,
  offlineMode: optionalEnvVars.ENABLE_OFFLINE_MODE,
  performanceMonitoring: optionalEnvVars.ENABLE_PERFORMANCE_MONITORING,
} as const;

/**
 * Get analytics configuration
 */
export const analyticsConfig = {
  gaTrackingId: optionalEnvVars.GA_TRACKING_ID,
  plausibleDomain: optionalEnvVars.PLAUSIBLE_DOMAIN,
} as const;

/**
 * Get social media configuration
 */
export const socialConfig = {
  twitterHandle: optionalEnvVars.TWITTER_HANDLE,
  socialImageUrl: optionalEnvVars.SOCIAL_IMAGE_URL,
} as const;

/**
 * Get performance configuration
 */
export const performanceConfig = {
  apiCacheDuration: optionalEnvVars.API_CACHE_DURATION,
} as const;

// Export individual variables for convenience
export const {
  TMDB_API_KEY,
  TMDB_API_URL,
  TMDB_IMAGE_BASE_URL,
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  APP_URL,
  DEBUG_MODE,
  USE_MOCK_DATA,
  DEV_PORT,
  ENABLE_ANALYTICS,
  ENABLE_PWA,
  ENABLE_OFFLINE_MODE,
  GA_TRACKING_ID,
  PLAUSIBLE_DOMAIN,
  TWITTER_HANDLE,
  SOCIAL_IMAGE_URL,
  ENABLE_PERFORMANCE_MONITORING,
  API_CACHE_DURATION,
  CSP_NONCE,
  TEST_MODE,
  TEST_API_KEY,
  NODE_ENV,
  BUILD_TIME,
  GIT_COMMIT_HASH,
} = { ...requiredEnvVars, ...optionalEnvVars };
