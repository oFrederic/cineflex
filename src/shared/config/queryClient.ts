import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query Client Configuration
 * Optimized for TMDB API integration with caching and error handling
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: How long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Cache time: How long data stays in cache after being unused
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },

      // Retry delay with exponential backoff
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus (good for keeping data fresh)
      refetchOnWindowFocus: true,

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Refetch on mount
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations on failure
      retry: 1,

      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
});

/**
 * Query Keys for TMDB API
 * Organized by feature and type for better cache management
 */
export const TMDB_QUERY_KEYS = {
  // Movie lists
  movies: {
    popular: ['movies', 'popular'] as const,
    trending: ['movies', 'trending'] as const,
    topRated: ['movies', 'topRated'] as const,
    nowPlaying: ['movies', 'nowPlaying'] as const,
    upcoming: ['movies', 'upcoming'] as const,
  },

  // Individual movie data
  movie: {
    details: (id: number) => ['movie', 'details', id] as const,
    credits: (id: number) => ['movie', 'credits', id] as const,
    videos: (id: number) => ['movie', 'videos', id] as const,
    recommendations: (id: number) => ['movie', 'recommendations', id] as const,
    similar: (id: number) => ['movie', 'similar', id] as const,
  },

  // Search
  search: {
    movies: (query: string) => ['search', 'movies', query] as const,
    multi: (query: string) => ['search', 'multi', query] as const,
  },

  // Discovery
  discover: {
    movies: (params: Record<string, any>) =>
      ['discover', 'movies', params] as const,
  },

  // Genres
  genres: {
    movieList: ['genres', 'movieList'] as const,
  },

  // Configuration
  config: {
    images: ['config', 'images'] as const,
  },
} as const;

/**
 * Prefetch functions for common queries
 * Useful for preloading data before navigation
 */
export const prefetchQueries = {
  // Prefetch popular movies
  popularMovies: async () => {
    await queryClient.prefetchQuery({
      queryKey: TMDB_QUERY_KEYS.movies.popular,
      queryFn: async () => {
        const { TMDBApiService } = await import('@/shared/services');
        return TMDBApiService.getPopularMovies();
      },
    });
  },

  // Prefetch movie details
  movieDetails: async (movieId: number) => {
    await queryClient.prefetchQuery({
      queryKey: TMDB_QUERY_KEYS.movie.details(movieId),
      queryFn: async () => {
        const { TMDBApiService } = await import('@/shared/services');
        return TMDBApiService.getMovieDetails(movieId);
      },
    });
  },

  // Prefetch movie credits
  movieCredits: async (movieId: number) => {
    await queryClient.prefetchQuery({
      queryKey: TMDB_QUERY_KEYS.movie.credits(movieId),
      queryFn: async () => {
        const { TMDBApiService } = await import('@/shared/services');
        return TMDBApiService.getMovieCredits(movieId);
      },
    });
  },
} as const;
