import { describe, it, expect, beforeEach } from 'vitest';
import { queryClient, TMDB_QUERY_KEYS } from '../queryClient';

describe('QueryClient Configuration', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('should have correct default options', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries?.staleTime).toBe(5 * 60 * 1000); // 5 minutes
    expect(defaultOptions.queries?.gcTime).toBe(10 * 60 * 1000); // 10 minutes
    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(true);
    expect(defaultOptions.queries?.refetchOnReconnect).toBe(true);
    expect(defaultOptions.queries?.refetchOnMount).toBe(true);
  });

  it('should have correct retry configuration', () => {
    const defaultOptions = queryClient.getDefaultOptions();
    const retryFn = defaultOptions.queries?.retry;

    expect(typeof retryFn).toBe('function');

    if (typeof retryFn === 'function') {
      // Test 4xx errors (should not retry)
      expect(retryFn(1, { status: 400 } as any)).toBe(false);
      expect(retryFn(1, { status: 404 } as any)).toBe(false);
      expect(retryFn(1, { status: 429 } as any)).toBe(false);

      // Test 5xx errors (should retry)
      expect(retryFn(1, { status: 500 } as any)).toBe(true);
      expect(retryFn(1, { status: 502 } as any)).toBe(true);

      // Test network errors (should retry)
      expect(retryFn(1, {} as any)).toBe(true);

      // Test retry limit
      expect(retryFn(3, { status: 500 } as any)).toBe(false);
      expect(retryFn(4, { status: 500 } as any)).toBe(false);
    }
  });

  it('should have correct query keys structure', () => {
    expect(TMDB_QUERY_KEYS.movies.popular).toEqual(['movies', 'popular']);
    expect(TMDB_QUERY_KEYS.movies.trending).toEqual(['movies', 'trending']);
    expect(TMDB_QUERY_KEYS.movies.topRated).toEqual(['movies', 'topRated']);

    expect(TMDB_QUERY_KEYS.movie.details(123)).toEqual([
      'movie',
      'details',
      123,
    ]);
    expect(TMDB_QUERY_KEYS.movie.credits(456)).toEqual([
      'movie',
      'credits',
      456,
    ]);
    expect(TMDB_QUERY_KEYS.movie.videos(789)).toEqual(['movie', 'videos', 789]);

    expect(TMDB_QUERY_KEYS.search.movies('avengers')).toEqual([
      'search',
      'movies',
      'avengers',
    ]);
    expect(TMDB_QUERY_KEYS.search.multi('batman')).toEqual([
      'search',
      'multi',
      'batman',
    ]);

    expect(TMDB_QUERY_KEYS.genres.movieList).toEqual(['genres', 'movieList']);
    expect(TMDB_QUERY_KEYS.config.images).toEqual(['config', 'images']);
  });

  it('should have discover query keys with params', () => {
    const params = { with_genres: '28', 'vote_average.gte': 7.0 };
    expect(TMDB_QUERY_KEYS.discover.movies(params)).toEqual([
      'discover',
      'movies',
      params,
    ]);
  });
});
