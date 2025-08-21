/**
 * Services index
 * Export all services for easy importing
 */

export { httpClient, ApiError } from './httpClient';
export type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from './httpClient';

// TMDB API Service
export {
  TMDBApiService,
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  TMDB_ENDPOINTS,
  DEFAULT_PARAMS,
} from './tmdbApi';
