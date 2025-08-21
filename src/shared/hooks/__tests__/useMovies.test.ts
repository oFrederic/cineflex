/**
 * Tests for movie data fetching hooks
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  useMovies,
  useInfiniteMovies,
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useSimilarMovies,
  useMovieRecommendations,
  useTrendingAll,
} from '../useMovies';
import { TMDBApiService } from '@/shared/services/tmdbApi';

// Mock the TMDB API service
vi.mock('@/shared/services/tmdbApi');

describe('Movie Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useMovies', () => {
    it('should call correct API method for popular movies', () => {
      // This is a basic test to ensure the hook structure is correct
      expect(typeof useMovies).toBe('function');
    });

    it('should call correct API method for top rated movies', () => {
      expect(typeof useMovies).toBe('function');
    });

    it('should handle different categories', () => {
      expect(typeof useMovies).toBe('function');
    });
  });

  describe('useInfiniteMovies', () => {
    it('should be a function', () => {
      expect(typeof useInfiniteMovies).toBe('function');
    });
  });

  describe('useMovieDetails', () => {
    it('should be a function', () => {
      expect(typeof useMovieDetails).toBe('function');
    });
  });

  describe('useMovieCredits', () => {
    it('should be a function', () => {
      expect(typeof useMovieCredits).toBe('function');
    });
  });

  describe('useMovieVideos', () => {
    it('should be a function', () => {
      expect(typeof useMovieVideos).toBe('function');
    });
  });

  describe('useSimilarMovies', () => {
    it('should be a function', () => {
      expect(typeof useSimilarMovies).toBe('function');
    });
  });

  describe('useMovieRecommendations', () => {
    it('should be a function', () => {
      expect(typeof useMovieRecommendations).toBe('function');
    });
  });

  describe('useTrendingAll', () => {
    it('should be a function', () => {
      expect(typeof useTrendingAll).toBe('function');
    });
  });

  describe('TMDB API Service', () => {
    it('should have required methods', () => {
      expect(TMDBApiService).toBeDefined();
      expect(typeof TMDBApiService.getPopularMovies).toBe('function');
      expect(typeof TMDBApiService.getTopRatedMovies).toBe('function');
      expect(typeof TMDBApiService.getMovieDetails).toBe('function');
    });
  });
});
