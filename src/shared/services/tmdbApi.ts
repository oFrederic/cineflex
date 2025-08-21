/**
 * TMDB API Service
 * Service methods for interacting with The Movie Database API
 */

import { httpClient } from './httpClient';
import type {
  MovieResponse,
  MovieDetails,
  MovieCredits,
  VideoResponse,
  DiscoverMovieParams,
  LanguageCode,
  RegionCode,
} from '../types';

// ============================================================================
// API ENDPOINTS
// ============================================================================

const TMDB_ENDPOINTS = {
  // Movie endpoints
  MOVIE: {
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    NOW_PLAYING: '/movie/now_playing',
    UPCOMING: '/movie/upcoming',
    DETAILS: (id: number) => `/movie/${id}`,
    CREDITS: (id: number) => `/movie/${id}/credits`,
    VIDEOS: (id: number) => `/movie/${id}/videos`,
    RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
    SIMILAR: (id: number) => `/movie/${id}/similar`,
  },
  // Trending endpoints
  TRENDING: {
    ALL: '/trending/all/day',
    MOVIES: '/trending/movie/day',
    TV: '/trending/tv/day',
    PEOPLE: '/trending/person/day',
  },
  // Search endpoints
  SEARCH: {
    MOVIE: '/search/movie',
    MULTI: '/search/multi',
  },
  // Discover endpoints
  DISCOVER: {
    MOVIE: '/discover/movie',
  },
  // Configuration
  CONFIGURATION: '/configuration',
  GENRES: '/genre/movie/list',
} as const;

// ============================================================================
// DEFAULT PARAMETERS
// ============================================================================

const DEFAULT_PARAMS = {
  language: 'en-US' as LanguageCode,
  region: 'US' as RegionCode,
  page: 1,
  include_adult: false,
  include_video: false,
} as const;

// ============================================================================
// API SERVICE CLASS
// ============================================================================

export class TMDBApiService {
  /**
   * Get popular movies
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @param region - Region code (default: 'US')
   * @returns Promise<MovieResponse>
   */
  static async getPopularMovies(
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language,
    region: RegionCode = DEFAULT_PARAMS.region
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.MOVIE.POPULAR, {
      params: {
        page,
        language,
        region,
        include_adult: DEFAULT_PARAMS.include_adult,
        include_video: DEFAULT_PARAMS.include_video,
      },
    });
  }

  /**
   * Get trending movies
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @param region - Region code (default: 'US')
   * @returns Promise<MovieResponse>
   */
  static async getTrendingMovies(
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language,
    region: RegionCode = DEFAULT_PARAMS.region
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.TRENDING.MOVIES, {
      params: {
        page,
        language,
        region,
        include_adult: DEFAULT_PARAMS.include_adult,
        include_video: DEFAULT_PARAMS.include_video,
      },
    });
  }

  /**
   * Get top rated movies
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @param region - Region code (default: 'US')
   * @returns Promise<MovieResponse>
   */
  static async getTopRatedMovies(
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language,
    region: RegionCode = DEFAULT_PARAMS.region
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.MOVIE.TOP_RATED, {
      params: {
        page,
        language,
        region,
        include_adult: DEFAULT_PARAMS.include_adult,
        include_video: DEFAULT_PARAMS.include_video,
      },
    });
  }

  /**
   * Get now playing movies
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @param region - Region code (default: 'US')
   * @returns Promise<MovieResponse>
   */
  static async getNowPlayingMovies(
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language,
    region: RegionCode = DEFAULT_PARAMS.region
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.MOVIE.NOW_PLAYING, {
      params: {
        page,
        language,
        region,
        include_adult: DEFAULT_PARAMS.include_adult,
        include_video: DEFAULT_PARAMS.include_video,
      },
    });
  }

  /**
   * Get upcoming movies
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @param region - Region code (default: 'US')
   * @returns Promise<MovieResponse>
   */
  static async getUpcomingMovies(
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language,
    region: RegionCode = DEFAULT_PARAMS.region
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.MOVIE.UPCOMING, {
      params: {
        page,
        language,
        region,
        include_adult: DEFAULT_PARAMS.include_adult,
        include_video: DEFAULT_PARAMS.include_video,
      },
    });
  }

  /**
   * Get movie details by ID
   * @param id - Movie ID
   * @param language - Language code (default: 'en-US')
   * @returns Promise<MovieDetails>
   */
  static async getMovieDetails(
    id: number,
    language: LanguageCode = DEFAULT_PARAMS.language
  ): Promise<MovieDetails> {
    return httpClient.get<MovieDetails>(TMDB_ENDPOINTS.MOVIE.DETAILS(id), {
      params: {
        language,
        append_to_response: 'videos,credits,images,recommendations,similar',
      },
    });
  }

  /**
   * Get movie credits by ID
   * @param id - Movie ID
   * @param language - Language code (default: 'en-US')
   * @returns Promise<MovieCredits>
   */
  static async getMovieCredits(
    id: number,
    language: LanguageCode = DEFAULT_PARAMS.language
  ): Promise<MovieCredits> {
    return httpClient.get<MovieCredits>(TMDB_ENDPOINTS.MOVIE.CREDITS(id), {
      params: {
        language,
      },
    });
  }

  /**
   * Get movie videos by ID
   * @param id - Movie ID
   * @param language - Language code (default: 'en-US')
   * @returns Promise<VideoResponse>
   */
  static async getMovieVideos(
    id: number,
    language: LanguageCode = DEFAULT_PARAMS.language
  ): Promise<VideoResponse> {
    return httpClient.get<VideoResponse>(TMDB_ENDPOINTS.MOVIE.VIDEOS(id), {
      params: {
        language,
      },
    });
  }

  /**
   * Get movie recommendations by ID
   * @param id - Movie ID
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @returns Promise<MovieResponse>
   */
  static async getMovieRecommendations(
    id: number,
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(
      TMDB_ENDPOINTS.MOVIE.RECOMMENDATIONS(id),
      {
        params: {
          page,
          language,
          include_adult: DEFAULT_PARAMS.include_adult,
          include_video: DEFAULT_PARAMS.include_video,
        },
      }
    );
  }

  /**
   * Get similar movies by ID
   * @param id - Movie ID
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @returns Promise<MovieResponse>
   */
  static async getSimilarMovies(
    id: number,
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.MOVIE.SIMILAR(id), {
      params: {
        page,
        language,
        include_adult: DEFAULT_PARAMS.include_adult,
        include_video: DEFAULT_PARAMS.include_video,
      },
    });
  }

  /**
   * Search movies
   * @param query - Search query
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @param includeAdult - Include adult content (default: false)
   * @returns Promise<MovieResponse>
   */
  static async searchMovies(
    query: string,
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language,
    includeAdult: boolean = DEFAULT_PARAMS.include_adult
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.SEARCH.MOVIE, {
      params: {
        query,
        page,
        language,
        include_adult: includeAdult,
      },
    });
  }

  /**
   * Discover movies with filters
   * @param params - Discover parameters
   * @returns Promise<MovieResponse>
   */
  static async discoverMovies(
    params: DiscoverMovieParams
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.DISCOVER.MOVIE, {
      params: {
        ...DEFAULT_PARAMS,
        ...params,
      },
    });
  }

  /**
   * Get trending all (movies, TV shows, people)
   * @param page - Page number (default: 1)
   * @param language - Language code (default: 'en-US')
   * @returns Promise<MovieResponse>
   */
  static async getTrendingAll(
    page: number = DEFAULT_PARAMS.page,
    language: LanguageCode = DEFAULT_PARAMS.language
  ): Promise<MovieResponse> {
    return httpClient.get<MovieResponse>(TMDB_ENDPOINTS.TRENDING.ALL, {
      params: {
        page,
        language,
        include_adult: DEFAULT_PARAMS.include_adult,
        include_video: DEFAULT_PARAMS.include_video,
      },
    });
  }
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Get popular movies (convenience function)
 */
export const getPopularMovies = TMDBApiService.getPopularMovies;

/**
 * Get trending movies (convenience function)
 */
export const getTrendingMovies = TMDBApiService.getTrendingMovies;

/**
 * Get top rated movies (convenience function)
 */
export const getTopRatedMovies = TMDBApiService.getTopRatedMovies;

/**
 * Get movie details (convenience function)
 */
export const getMovieDetails = TMDBApiService.getMovieDetails;

/**
 * Get movie credits (convenience function)
 */
export const getMovieCredits = TMDBApiService.getMovieCredits;

/**
 * Get movie videos (convenience function)
 */
export const getMovieVideos = TMDBApiService.getMovieVideos;

// ============================================================================
// EXPORTS
// ============================================================================

export { TMDB_ENDPOINTS, DEFAULT_PARAMS };
export default TMDBApiService;
