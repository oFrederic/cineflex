import { describe, it, expect } from 'vitest';
import type {
  Movie,
  MovieDetails,
  MovieResponse,
  Genre,
  CastMember,
  CrewMember,
  SearchResponse,
  VideoResponse,
  MovieCredits,
  TMDBConfiguration,
  MovieCategory,
  VideoType,
  MovieStatus,
  DiscoverSortBy,
  MediaType,
  ImageSize,
  LanguageCode,
  RegionCode,
} from '../tmdb.types';

describe('TMDB Types', () => {
  describe('Movie Interface', () => {
    it('should have correct Movie interface structure', () => {
      const movie: Movie = {
        id: 1,
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
      };

      expect(movie.id).toBe(1);
      expect(movie.title).toBe('Test Movie');
      expect(movie.genre_ids).toEqual([28, 12]);
      expect(typeof movie.vote_average).toBe('number');
    });

    it('should handle null poster and backdrop paths', () => {
      const movie: Movie = {
        id: 1,
        adult: false,
        backdrop_path: null,
        genre_ids: [],
        original_language: 'en',
        original_title: 'Test Movie',
        overview: 'A test movie',
        popularity: 100.5,
        poster_path: null,
        release_date: '2023-01-01',
        title: 'Test Movie',
        video: false,
        vote_average: 8.5,
        vote_count: 1000,
      };

      expect(movie.poster_path).toBeNull();
      expect(movie.backdrop_path).toBeNull();
    });
  });

  describe('MovieDetails Interface', () => {
    it('should extend Movie with additional properties', () => {
      const movieDetails: MovieDetails = {
        id: 1,
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

      expect(movieDetails.budget).toBe(1000000);
      expect(movieDetails.runtime).toBe(120);
      expect(movieDetails.status).toBe('Released');
    });
  });

  describe('MovieResponse Interface', () => {
    it('should have pagination structure', () => {
      const movieResponse: MovieResponse = {
        page: 1,
        results: [],
        total_pages: 10,
        total_results: 200,
      };

      expect(movieResponse.page).toBe(1);
      expect(movieResponse.total_pages).toBe(10);
      expect(Array.isArray(movieResponse.results)).toBe(true);
    });
  });

  describe('Genre Interface', () => {
    it('should have correct genre structure', () => {
      const genre: Genre = {
        id: 28,
        name: 'Action',
      };

      expect(genre.id).toBe(28);
      expect(genre.name).toBe('Action');
    });
  });

  describe('CastMember Interface', () => {
    it('should have correct cast member structure', () => {
      const castMember: CastMember = {
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
      };

      expect(castMember.name).toBe('John Doe');
      expect(castMember.character).toBe('Hero');
      expect(castMember.order).toBe(0);
    });
  });

  describe('CrewMember Interface', () => {
    it('should have correct crew member structure', () => {
      const crewMember: CrewMember = {
        adult: false,
        gender: 2,
        id: 1,
        known_for_department: 'Production',
        name: 'Jane Smith',
        original_name: 'Jane Smith',
        popularity: 30.5,
        profile_path: '/profile.jpg',
        credit_id: 'credit456',
        department: 'Production',
        job: 'Producer',
      };

      expect(crewMember.name).toBe('Jane Smith');
      expect(crewMember.department).toBe('Production');
      expect(crewMember.job).toBe('Producer');
    });
  });

  describe('MovieCredits Interface', () => {
    it('should have cast and crew arrays', () => {
      const credits: MovieCredits = {
        id: 1,
        cast: [],
        crew: [],
      };

      expect(credits.id).toBe(1);
      expect(Array.isArray(credits.cast)).toBe(true);
      expect(Array.isArray(credits.crew)).toBe(true);
    });
  });

  describe('SearchResponse Interface', () => {
    it('should extend TMDBResponse with movies', () => {
      const searchResponse: SearchResponse = {
        page: 1,
        results: [],
        total_pages: 5,
        total_results: 100,
      };

      expect(searchResponse.page).toBe(1);
      expect(searchResponse.total_results).toBe(100);
    });
  });

  describe('VideoResponse Interface', () => {
    it('should have video results', () => {
      const videoResponse: VideoResponse = {
        id: 1,
        results: [],
      };

      expect(videoResponse.id).toBe(1);
      expect(Array.isArray(videoResponse.results)).toBe(true);
    });
  });

  describe('TMDBConfiguration Interface', () => {
    it('should have image configuration', () => {
      const config: TMDBConfiguration = {
        images: {
          base_url: 'https://image.tmdb.org/t/p/',
          secure_base_url: 'https://image.tmdb.org/t/p/',
          backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
          logo_sizes: [
            'w45',
            'w92',
            'w154',
            'w185',
            'w300',
            'w500',
            'original',
          ],
          poster_sizes: [
            'w92',
            'w154',
            'w185',
            'w342',
            'w500',
            'w780',
            'original',
          ],
          profile_sizes: ['w45', 'w185', 'h632', 'original'],
          still_sizes: ['w92', 'w185', 'w300', 'original'],
        },
        change_keys: ['adult', 'air_date', 'also_known_as'],
      };

      expect(config.images.base_url).toBe('https://image.tmdb.org/t/p/');
      expect(Array.isArray(config.images.poster_sizes)).toBe(true);
    });
  });

  describe('Type Unions', () => {
    it('should validate MovieCategory types', () => {
      const categories: MovieCategory[] = [
        'popular',
        'top_rated',
        'now_playing',
        'upcoming',
        'trending',
      ];

      expect(categories).toHaveLength(5);
      expect(categories).toContain('popular');
    });

    it('should validate VideoType types', () => {
      const videoTypes: VideoType[] = [
        'Trailer',
        'Teaser',
        'Clip',
        'Featurette',
        'Behind the Scenes',
        'Bloopers',
      ];

      expect(videoTypes).toHaveLength(6);
      expect(videoTypes).toContain('Trailer');
    });

    it('should validate MovieStatus types', () => {
      const statuses: MovieStatus[] = [
        'Rumored',
        'Planned',
        'In Production',
        'Post Production',
        'Released',
        'Canceled',
      ];

      expect(statuses).toHaveLength(6);
      expect(statuses).toContain('Released');
    });

    it('should validate MediaType types', () => {
      const mediaTypes: MediaType[] = ['movie', 'tv', 'person'];

      expect(mediaTypes).toHaveLength(3);
      expect(mediaTypes).toContain('movie');
    });

    it('should validate ImageSize types', () => {
      const imageSizes: ImageSize[] = [
        'w45',
        'w92',
        'w154',
        'w185',
        'w342',
        'w500',
        'w780',
        'original',
        'h632',
        'w300',
        'w1280',
      ];

      expect(imageSizes).toHaveLength(11);
      expect(imageSizes).toContain('w500');
    });

    it('should validate LanguageCode types', () => {
      const languageCodes: LanguageCode[] = [
        'en-US',
        'en-GB',
        'es-ES',
        'fr-FR',
        'de-DE',
        'it-IT',
        'pt-BR',
        'ru-RU',
        'ja-JP',
        'ko-KR',
        'zh-CN',
      ];

      expect(languageCodes).toHaveLength(11);
      expect(languageCodes).toContain('en-US');
    });

    it('should validate RegionCode types', () => {
      const regionCodes: RegionCode[] = [
        'US',
        'GB',
        'CA',
        'AU',
        'DE',
        'FR',
        'ES',
        'IT',
        'JP',
        'KR',
        'CN',
        'BR',
        'RU',
        'IN',
      ];

      expect(regionCodes).toHaveLength(14);
      expect(regionCodes).toContain('US');
    });
  });

  describe('DiscoverSortBy Type', () => {
    it('should validate sort options', () => {
      const sortOptions: DiscoverSortBy[] = [
        'popularity.asc',
        'popularity.desc',
        'release_date.asc',
        'release_date.desc',
        'revenue.asc',
        'revenue.desc',
        'primary_release_date.asc',
        'primary_release_date.desc',
        'original_title.asc',
        'original_title.desc',
        'vote_average.asc',
        'vote_average.desc',
        'vote_count.asc',
        'vote_count.desc',
      ];

      expect(sortOptions).toHaveLength(14);
      expect(sortOptions).toContain('popularity.desc');
    });
  });
});
