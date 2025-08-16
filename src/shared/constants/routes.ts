/**
 * Application routes configuration
 */

// Route paths
export const ROUTES = {
  // Public routes
  HOME: '/',
  MOVIES: '/movies',
  MOVIE_DETAILS: '/movies/:id',
  SEARCH: '/search',
  WATCHLIST: '/watchlist',

  // User routes
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',

  // Error routes
  NOT_FOUND: '/404',
  ERROR: '/error',
} as const;

// Route names for navigation
export const ROUTE_NAMES = {
  HOME: 'Home',
  MOVIES: 'Movies',
  SEARCH: 'Search',
  WATCHLIST: 'Watchlist',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  LOGIN: 'Login',
  REGISTER: 'Register',
} as const;

// Navigation menu items
export const NAVIGATION_ITEMS = [
  {
    id: 'home',
    label: ROUTE_NAMES.HOME,
    path: ROUTES.HOME,
    icon: 'home',
  },
  {
    id: 'movies',
    label: ROUTE_NAMES.MOVIES,
    path: ROUTES.MOVIES,
    icon: 'movie',
  },
  {
    id: 'search',
    label: ROUTE_NAMES.SEARCH,
    path: ROUTES.SEARCH,
    icon: 'search',
  },
  {
    id: 'watchlist',
    label: ROUTE_NAMES.WATCHLIST,
    path: ROUTES.WATCHLIST,
    icon: 'bookmark',
  },
] as const;

// Route metadata
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'CineFlex - Discover Amazing Movies',
    description:
      'Browse and discover the latest movies, TV shows, and trending content.',
    keywords: ['movies', 'tv shows', 'streaming', 'discover'],
  },
  [ROUTES.MOVIES]: {
    title: 'Movies - CineFlex',
    description: 'Explore popular, top-rated, and upcoming movies.',
    keywords: ['movies', 'popular', 'top rated', 'upcoming'],
  },
  [ROUTES.SEARCH]: {
    title: 'Search Movies - CineFlex',
    description: 'Search for movies, TV shows, and actors.',
    keywords: ['search', 'movies', 'tv shows', 'actors'],
  },
  [ROUTES.WATCHLIST]: {
    title: 'My Watchlist - CineFlex',
    description: 'Your personal collection of movies and TV shows to watch.',
    keywords: ['watchlist', 'my movies', 'personal collection'],
  },
  [ROUTES.PROFILE]: {
    title: 'Profile - CineFlex',
    description: 'Manage your profile and preferences.',
    keywords: ['profile', 'settings', 'preferences'],
  },
} as const;

// Route guards
export const ROUTE_GUARDS = {
  [ROUTES.WATCHLIST]: {
    requiresAuth: false, // Uses localStorage for now
  },
  [ROUTES.PROFILE]: {
    requiresAuth: false, // Will be true when auth is implemented
  },
  [ROUTES.SETTINGS]: {
    requiresAuth: false, // Will be true when auth is implemented
  },
} as const;

// Route transitions
export const ROUTE_TRANSITIONS = {
  DEFAULT: {
    duration: 300,
    easing: 'ease-in-out',
  },
  FAST: {
    duration: 150,
    easing: 'ease-out',
  },
  SLOW: {
    duration: 500,
    easing: 'ease-in-out',
  },
} as const;
