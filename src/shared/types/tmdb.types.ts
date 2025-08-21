/**
 * TMDB API TypeScript Interfaces
 * Complete type definitions for The Movie Database API responses
 */

// ============================================================================
// BASE TYPES
// ============================================================================

/**
 * Base interface for all TMDB API responses
 */
export interface TMDBResponse<T> {
  page?: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * Base interface for TMDB entities with common properties
 */
export interface TMDBEntity {
  id: number;
  name?: string;
  title?: string;
}

// ============================================================================
// MOVIE TYPES
// ============================================================================

/**
 * Basic movie information (used in lists, search results)
 */
export interface Movie extends TMDBEntity {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * Detailed movie information (used in movie details page)
 */
export interface MovieDetails extends Movie {
  belongs_to_collection: MovieCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: MovieStatus;
  tagline: string | null;
  video: boolean;
}

/**
 * Movie collection information
 */
export interface MovieCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

/**
 * Movie status types
 */
export type MovieStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';

/**
 * Movie response for paginated lists
 */
export interface MovieResponse extends TMDBResponse<Movie> {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// ============================================================================
// GENRE TYPES
// ============================================================================

/**
 * Movie genre information
 */
export interface Genre {
  id: number;
  name: string;
}

/**
 * Genre response
 */
export interface GenreResponse {
  genres: Genre[];
}

// ============================================================================
// CAST & CREW TYPES
// ============================================================================

/**
 * Cast member information
 */
export interface CastMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

/**
 * Crew member information
 */
export interface CrewMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

/**
 * Movie credits (cast and crew)
 */
export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

/**
 * Search response for movies
 */
export interface SearchResponse extends TMDBResponse<Movie> {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Multi-search response (movies, TV shows, people)
 */
export interface MultiSearchResponse extends TMDBResponse<SearchResult> {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

/**
 * Union type for multi-search results
 */
export type SearchResult = Movie | TVShow | Person;

/**
 * TV Show interface (for multi-search)
 */
export interface TVShow extends TMDBEntity {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  media_type: 'tv';
}

/**
 * Person interface (for multi-search)
 */
export interface Person extends TMDBEntity {
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: (Movie | TVShow)[];
  media_type: 'person';
}

// ============================================================================
// VIDEO TYPES
// ============================================================================

/**
 * Video information (trailers, clips, etc.)
 */
export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: VideoType;
}

/**
 * Video types
 */
export type VideoType =
  | 'Trailer'
  | 'Teaser'
  | 'Clip'
  | 'Featurette'
  | 'Behind the Scenes'
  | 'Bloopers';

/**
 * Video response
 */
export interface VideoResponse {
  id: number;
  results: Video[];
}

// ============================================================================
// PRODUCTION TYPES
// ============================================================================

/**
 * Production company information
 */
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

/**
 * Production country information
 */
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

/**
 * Spoken language information
 */
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// ============================================================================
// DISCOVER TYPES
// ============================================================================

/**
 * Discover movie parameters
 */
export interface DiscoverMovieParams {
  with_genres?: string;
  primary_release_year?: number;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  sort_by?: DiscoverSortBy;
  page?: number;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  region?: string;
}

/**
 * Discover sort options
 */
export type DiscoverSortBy =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc';

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

/**
 * TMDB configuration information
 */
export interface TMDBConfiguration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Movie category for API endpoints
 */
export type MovieCategory =
  | 'popular'
  | 'top_rated'
  | 'now_playing'
  | 'upcoming'
  | 'trending';

/**
 * Media type for multi-search
 */
export type MediaType = 'movie' | 'tv' | 'person';

/**
 * Image size options
 */
export type ImageSize =
  | 'w45'
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original'
  | 'h632'
  | 'w300'
  | 'w1280';

/**
 * Language code (ISO 639-1)
 */
export type LanguageCode =
  | 'en-US'
  | 'en-GB'
  | 'es-ES'
  | 'fr-FR'
  | 'de-DE'
  | 'it-IT'
  | 'pt-BR'
  | 'ru-RU'
  | 'ja-JP'
  | 'ko-KR'
  | 'zh-CN';

/**
 * Region code (ISO 3166-1)
 */
export type RegionCode =
  | 'US'
  | 'GB'
  | 'CA'
  | 'AU'
  | 'DE'
  | 'FR'
  | 'ES'
  | 'IT'
  | 'JP'
  | 'KR'
  | 'CN'
  | 'BR'
  | 'RU'
  | 'IN';
