/**
 * Movie data fetching hooks using TanStack Query
 * Provides hooks for fetching movies by category, details, and search
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { TMDBApiService } from '@/shared/services/tmdbApi';
import type {
  MovieCategory,
  LanguageCode,
  RegionCode,
  MovieResponse,
} from '@/shared/types';

// ============================================================================
// USE MOVIES HOOK
// ============================================================================

/**
 * Hook for fetching movies by category
 * @param category - Movie category (popular, top_rated, now_playing, upcoming, trending)
 * @param page - Page number (default: 1)
 * @param language - Language code (default: 'en-US')
 * @param region - Region code (default: 'US')
 * @returns Query result with movies data
 */
export const useMovies = (
  category: MovieCategory = 'popular',
  page: number = 1,
  language: LanguageCode = 'en-US',
  region: RegionCode = 'US'
) => {
  return useQuery({
    queryKey: ['movies', category, page, language, region],
    queryFn: () => {
      switch (category) {
        case 'popular':
          return TMDBApiService.getPopularMovies(page, language, region);
        case 'top_rated':
          return TMDBApiService.getTopRatedMovies(page, language, region);
        case 'now_playing':
          return TMDBApiService.getNowPlayingMovies(page, language, region);
        case 'upcoming':
          return TMDBApiService.getUpcomingMovies(page, language, region);
        case 'trending':
          return TMDBApiService.getTrendingMovies(page, language, region);
        default:
          return TMDBApiService.getPopularMovies(page, language, region);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// ============================================================================
// USE INFINITE MOVIES HOOK
// ============================================================================

/**
 * Hook for infinite scroll movies by category
 * @param category - Movie category
 * @param language - Language code (default: 'en-US')
 * @param region - Region code (default: 'US')
 * @returns Infinite query result with paginated movies data
 */
export const useInfiniteMovies = (
  category: MovieCategory = 'popular',
  language: LanguageCode = 'en-US',
  region: RegionCode = 'US'
) => {
  return useInfiniteQuery<MovieResponse>({
    queryKey: ['movies', category, 'infinite', language, region],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      const page = pageParam as number;
      switch (category) {
        case 'popular':
          return TMDBApiService.getPopularMovies(page, language, region);
        case 'top_rated':
          return TMDBApiService.getTopRatedMovies(page, language, region);
        case 'now_playing':
          return TMDBApiService.getNowPlayingMovies(page, language, region);
        case 'upcoming':
          return TMDBApiService.getUpcomingMovies(page, language, region);
        case 'trending':
          return TMDBApiService.getTrendingMovies(page, language, region);
        default:
          return TMDBApiService.getPopularMovies(page, language, region);
      }
    },
    getNextPageParam: lastPage => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    getPreviousPageParam: firstPage => {
      return firstPage.page > 1 ? firstPage.page - 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// ============================================================================
// USE MOVIE DETAILS HOOK
// ============================================================================

/**
 * Hook for fetching movie details by ID
 * @param movieId - Movie ID
 * @param language - Language code (default: 'en-US')
 * @returns Query result with movie details
 */
export const useMovieDetails = (
  movieId: number,
  language: LanguageCode = 'en-US'
) => {
  return useQuery({
    queryKey: ['movie', movieId, language],
    queryFn: () => TMDBApiService.getMovieDetails(movieId, language),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// ============================================================================
// USE MOVIE CREDITS HOOK
// ============================================================================

/**
 * Hook for fetching movie credits by ID
 * @param movieId - Movie ID
 * @param language - Language code (default: 'en-US')
 * @returns Query result with movie credits
 */
export const useMovieCredits = (
  movieId: number,
  language: LanguageCode = 'en-US'
) => {
  return useQuery({
    queryKey: ['movie', movieId, 'credits', language],
    queryFn: () => TMDBApiService.getMovieCredits(movieId, language),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// ============================================================================
// USE MOVIE VIDEOS HOOK
// ============================================================================

/**
 * Hook for fetching movie videos by ID
 * @param movieId - Movie ID
 * @param language - Language code (default: 'en-US')
 * @returns Query result with movie videos
 */
export const useMovieVideos = (
  movieId: number,
  language: LanguageCode = 'en-US'
) => {
  return useQuery({
    queryKey: ['movie', movieId, 'videos', language],
    queryFn: () => TMDBApiService.getMovieVideos(movieId, language),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// ============================================================================
// USE SIMILAR MOVIES HOOK
// ============================================================================

/**
 * Hook for fetching similar movies by ID
 * @param movieId - Movie ID
 * @param page - Page number (default: 1)
 * @param language - Language code (default: 'en-US')
 * @returns Query result with similar movies
 */
export const useSimilarMovies = (
  movieId: number,
  page: number = 1,
  language: LanguageCode = 'en-US'
) => {
  return useQuery({
    queryKey: ['movie', movieId, 'similar', page, language],
    queryFn: () => TMDBApiService.getSimilarMovies(movieId, page, language),
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// ============================================================================
// USE MOVIE RECOMMENDATIONS HOOK
// ============================================================================

/**
 * Hook for fetching movie recommendations by ID
 * @param movieId - Movie ID
 * @param page - Page number (default: 1)
 * @param language - Language code (default: 'en-US')
 * @returns Query result with movie recommendations
 */
export const useMovieRecommendations = (
  movieId: number,
  page: number = 1,
  language: LanguageCode = 'en-US'
) => {
  return useQuery({
    queryKey: ['movie', movieId, 'recommendations', page, language],
    queryFn: () =>
      TMDBApiService.getMovieRecommendations(movieId, page, language),
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook for fetching trending all content (movies, TV shows, people)
 * @param page - Page number (default: 1)
 * @param language - Language code (default: 'en-US')
 * @returns Query result with trending content
 */
export const useTrendingAll = (
  page: number = 1,
  language: LanguageCode = 'en-US'
) => {
  return useQuery({
    queryKey: ['trending', 'all', page, language],
    queryFn: () => TMDBApiService.getTrendingAll(page, language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
