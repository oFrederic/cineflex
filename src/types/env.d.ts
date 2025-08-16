/// <reference types="vite/client" />

interface ImportMetaEnv {
  // TMDB API Configuration
  readonly VITE_TMDB_API_KEY: string;
  readonly VITE_TMDB_API_URL?: string;
  readonly VITE_TMDB_IMAGE_BASE_URL?: string;

  // Application Configuration
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_APP_DESCRIPTION?: string;
  readonly VITE_APP_URL?: string;

  // Development Configuration
  readonly VITE_DEBUG_MODE?: string;
  readonly VITE_USE_MOCK_DATA?: string;
  readonly VITE_DEV_PORT?: string;

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly VITE_ENABLE_PWA?: string;
  readonly VITE_ENABLE_OFFLINE_MODE?: string;

  // Analytics Configuration
  readonly VITE_GA_TRACKING_ID?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;

  // Social Media Configuration
  readonly VITE_TWITTER_HANDLE?: string;
  readonly VITE_SOCIAL_IMAGE_URL?: string;

  // Performance Configuration
  readonly VITE_ENABLE_PERFORMANCE_MONITORING?: string;
  readonly VITE_API_CACHE_DURATION?: string;

  // Security Configuration
  readonly VITE_CSP_NONCE?: string;

  // Testing Configuration
  readonly VITE_TEST_MODE?: string;
  readonly VITE_TEST_API_KEY?: string;

  // Deployment Configuration
  readonly VITE_NODE_ENV?: string;
  readonly VITE_BUILD_TIME?: string;
  readonly VITE_GIT_COMMIT_HASH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
