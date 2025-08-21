import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TMDBApiService } from '../tmdbApi';

// Mock the HTTP client
vi.mock('../httpClient', () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

import { httpClient } from '../httpClient';
const mockHttpClient = httpClient as any;

describe('TMDBApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getPopularMovies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 10,
        total_results: 200,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getPopularMovies();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/popular', {
        params: {
          page: 1,
          language: 'en-US',
          region: 'US',
          include_adult: false,
          include_video: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should accept custom parameters', async () => {
      const mockResponse = {
        page: 2,
        results: [],
        total_pages: 10,
        total_results: 200,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getPopularMovies(2, 'es-ES', 'ES');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/popular', {
        params: {
          page: 2,
          language: 'es-ES',
          region: 'ES',
          include_adult: false,
          include_video: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTrendingMovies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 5,
        total_results: 100,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getTrendingMovies();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/trending/movie/day', {
        params: {
          page: 1,
          language: 'en-US',
          region: 'US',
          include_adult: false,
          include_video: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTopRatedMovies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 8,
        total_results: 150,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getTopRatedMovies();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/top_rated', {
        params: {
          page: 1,
          language: 'en-US',
          region: 'US',
          include_adult: false,
          include_video: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNowPlayingMovies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 3,
        total_results: 50,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getNowPlayingMovies();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/now_playing', {
        params: {
          page: 1,
          language: 'en-US',
          region: 'US',
          include_adult: false,
          include_video: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUpcomingMovies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 4,
        total_results: 80,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getUpcomingMovies();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/upcoming', {
        params: {
          page: 1,
          language: 'en-US',
          region: 'US',
          include_adult: false,
          include_video: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMovieDetails', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        id: 123,
        title: 'Test Movie',
        overview: 'A test movie',
        adult: false,
        backdrop_path: '/backdrop.jpg',
        genre_ids: [28, 12],
        original_language: 'en',
        original_title: 'Test Movie',
        popularity: 100.5,
        poster_path: '/poster.jpg',
        release_date: '2023-01-01',
        video: false,
        vote_average: 8.5,
        vote_count: 1000,
        belongs_to_collection: null,
        budget: 1000000,
        genres: [{ id: 28, name: 'Action' }],
        homepage: 'https://example.com',
        imdb_id: 'tt1234567',
        production_companies: [],
        production_countries: [],
        revenue: 5000000,
        runtime: 120,
        spoken_languages: [],
        status: 'Released',
        tagline: 'A great movie',
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getMovieDetails(123);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/123', {
        params: {
          language: 'en-US',
          append_to_response: 'videos,credits,images,recommendations,similar',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should accept custom language parameter', async () => {
      const mockResponse = {
        id: 123,
        title: 'Película de Prueba',
        overview: 'Una película de prueba',
        adult: false,
        backdrop_path: '/backdrop.jpg',
        genre_ids: [28, 12],
        original_language: 'es',
        original_title: 'Película de Prueba',
        popularity: 100.5,
        poster_path: '/poster.jpg',
        release_date: '2023-01-01',
        video: false,
        vote_average: 8.5,
        vote_count: 1000,
        belongs_to_collection: null,
        budget: 1000000,
        genres: [{ id: 28, name: 'Acción' }],
        homepage: 'https://example.com',
        imdb_id: 'tt1234567',
        production_companies: [],
        production_countries: [],
        revenue: 5000000,
        runtime: 120,
        spoken_languages: [],
        status: 'Released',
        tagline: 'Una gran película',
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getMovieDetails(123, 'es-ES');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/123', {
        params: {
          language: 'es-ES',
          append_to_response: 'videos,credits,images,recommendations,similar',
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMovieCredits', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        id: 123,
        cast: [
          {
            adult: false,
            gender: 2,
            id: 1,
            known_for_department: 'Acting',
            name: 'John Doe',
            original_name: 'John Doe',
            popularity: 50.5,
            profile_path: '/profile.jpg',
            cast_id: 1,
            character: 'Hero',
            credit_id: 'credit123',
            order: 0,
          },
        ],
        crew: [
          {
            adult: false,
            gender: 2,
            id: 2,
            known_for_department: 'Production',
            name: 'Jane Smith',
            original_name: 'Jane Smith',
            popularity: 30.5,
            profile_path: '/profile.jpg',
            credit_id: 'credit456',
            department: 'Production',
            job: 'Producer',
          },
        ],
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getMovieCredits(123);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/123/credits', {
        params: {
          language: 'en-US',
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMovieVideos', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        id: 123,
        results: [
          {
            id: 'video123',
            iso_639_1: 'en',
            iso_3166_1: 'US',
            key: 'abc123',
            name: 'Official Trailer',
            official: true,
            published_at: '2023-01-01T00:00:00.000Z',
            site: 'YouTube',
            size: 1080,
            type: 'Trailer',
          },
        ],
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getMovieVideos(123);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/123/videos', {
        params: {
          language: 'en-US',
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMovieRecommendations', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 5,
        total_results: 100,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getMovieRecommendations(123);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/movie/123/recommendations',
        {
          params: {
            page: 1,
            language: 'en-US',
            include_adult: false,
            include_video: false,
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSimilarMovies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 3,
        total_results: 60,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getSimilarMovies(123);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/movie/123/similar', {
        params: {
          page: 1,
          language: 'en-US',
          include_adult: false,
          include_video: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('searchMovies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 2,
        total_results: 40,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.searchMovies('test query');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/search/movie', {
        params: {
          query: 'test query',
          page: 1,
          language: 'en-US',
          include_adult: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should accept custom parameters', async () => {
      const mockResponse = {
        page: 2,
        results: [],
        total_pages: 2,
        total_results: 40,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.searchMovies(
        'test query',
        2,
        'es-ES',
        true
      );

      expect(mockHttpClient.get).toHaveBeenCalledWith('/search/movie', {
        params: {
          query: 'test query',
          page: 2,
          language: 'es-ES',
          include_adult: true,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('discoverMovies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 10,
        total_results: 200,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const discoverParams = {
        with_genres: '28,12',
        primary_release_year: 2023,
        'vote_average.gte': 7.0,
        sort_by: 'popularity.desc' as const,
      };

      const result = await TMDBApiService.discoverMovies(discoverParams);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/discover/movie', {
        params: {
          language: 'en-US',
          region: 'US',
          page: 1,
          include_adult: false,
          include_video: false,
          ...discoverParams,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTrendingAll', () => {
    it('should call httpClient.get with correct parameters', async () => {
      const mockResponse = {
        page: 1,
        results: [],
        total_pages: 5,
        total_results: 100,
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await TMDBApiService.getTrendingAll();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/trending/all/day', {
        params: {
          page: 1,
          language: 'en-US',
          include_adult: false,
          include_video: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error Handling', () => {
    it('should propagate HTTP client errors', async () => {
      const error = new Error('Network error');
      mockHttpClient.get.mockRejectedValue(error);

      await expect(TMDBApiService.getPopularMovies()).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle API errors properly', async () => {
      const apiError = {
        response: {
          status: 404,
          data: { status_message: 'Movie not found' },
        },
      };
      mockHttpClient.get.mockRejectedValue(apiError);

      await expect(TMDBApiService.getMovieDetails(999999)).rejects.toEqual(
        apiError
      );
    });
  });

  describe('Type Safety', () => {
    it('should maintain type safety for responses', async () => {
      const mockMovieResponse = {
        page: 1,
        results: [
          {
            id: 123,
            adult: false,
            backdrop_path: '/backdrop.jpg',
            genre_ids: [28, 12],
            original_language: 'en',
            original_title: 'Test Movie',
            overview: 'A test movie',
            popularity: 100.5,
            poster_path: '/poster.jpg',
            release_date: '2023-01-01',
            title: 'Test Movie',
            video: false,
            vote_average: 8.5,
            vote_count: 1000,
          },
        ],
        total_pages: 10,
        total_results: 200,
      };

      mockHttpClient.get.mockResolvedValue(mockMovieResponse);

      const result = await TMDBApiService.getPopularMovies();

      // TypeScript should ensure this is properly typed
      expect(result.results[0].title).toBe('Test Movie');
      expect(result.results[0].vote_average).toBe(8.5);
      expect(Array.isArray(result.results[0].genre_ids)).toBe(true);
    });
  });
});
