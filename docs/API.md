# 📡 API Documentation

## TMDB API Integration Guide

This document covers the integration with The Movie Database (TMDB) API, including endpoints, error handling, and best practices.

---

## 🔑 API Configuration

### Environment Variables

```env
# Required
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Optional (with defaults)
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Getting Your API Key

1. Visit [The Movie Database](https://www.themoviedb.org/settings/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

---

## 🏗️ API Architecture

### HTTP Client Setup

```typescript
// src/shared/services/httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

// Request interceptor for logging
httpClient.interceptors.request.use(
  config => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for error handling
httpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

### Error Handling

```typescript
// src/shared/types/api.types.ts
export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.status_message || 'API Error',
      code: error.response.data?.status_code,
    };
  }

  return {
    status: 0,
    message: error.message || 'Network Error',
  };
};
```

---

## 📡 Available Endpoints

### Movies

#### Get Popular Movies

```typescript
GET / movie / popular;
```

**Parameters:**

- `page` (optional): Page number (default: 1)
- `language` (optional): ISO 639-1 language code (default: en-US)

**Response:**

```typescript
interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

#### Get Top Rated Movies

```typescript
GET / movie / top_rated;
```

#### Get Now Playing Movies

```typescript
GET / movie / now_playing;
```

#### Get Upcoming Movies

```typescript
GET / movie / upcoming;
```

#### Get Movie Details

```typescript
GET / movie / { movie_id };
```

**Response:**

```typescript
interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  // ... more fields
}
```

#### Get Movie Credits

```typescript
GET / movie / { movie_id } / credits;
```

**Response:**

```typescript
interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  order: number;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string;
}
```

#### Get Movie Videos

```typescript
GET / movie / { movie_id } / videos;
```

**Response:**

```typescript
interface MovieVideos {
  id: number;
  results: Video[];
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}
```

#### Get Similar Movies

```typescript
GET / movie / { movie_id } / similar;
```

#### Get Movie Recommendations

```typescript
GET / movie / { movie_id } / recommendations;
```

### Search

#### Search Movies

```typescript
GET / search / movie;
```

**Parameters:**

- `query` (required): Search query
- `page` (optional): Page number
- `language` (optional): ISO 639-1 language code
- `include_adult` (optional): Include adult content (default: false)

**Response:**

```typescript
interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

#### Multi Search

```typescript
GET / search / multi;
```

Searches across movies, TV shows, and people.

### Genres

#### Get Movie Genres

```typescript
GET / genre / movie / list;
```

**Response:**

```typescript
interface GenresResponse {
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}
```

### Discover

#### Discover Movies

```typescript
GET / discover / movie;
```

**Parameters:**

- `with_genres` (optional): Comma-separated genre IDs
- `primary_release_year` (optional): Year filter
- `vote_average.gte` (optional): Minimum rating
- `sort_by` (optional): Sort criteria (popularity.desc, vote_average.desc, etc.)
- `page` (optional): Page number

---

## 🖼️ Image URLs

### Base URL

```
https://image.tmdb.org/t/p/{size}/{file_path}
```

### Available Sizes

#### Posters

- `w92` - Small poster (92px wide)
- `w154` - Medium poster (154px wide)
- `w185` - Large poster (185px wide)
- `w342` - Extra large poster (342px wide)
- `w500` - Huge poster (500px wide)
- `w780` - Very huge poster (780px wide)
- `original` - Original size

#### Backdrops

- `w300` - Small backdrop (300px wide)
- `w780` - Medium backdrop (780px wide)
- `w1280` - Large backdrop (1280px wide)
- `original` - Original size

#### Profile Images

- `w45` - Small profile (45px wide)
- `w185` - Medium profile (185px wide)
- `h632` - Large profile (632px high)
- `original` - Original size

### Usage Example

```typescript
const getImageUrl = (path: string, size: string = 'w500') => {
  if (!path) return null;
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Usage
const posterUrl = getImageUrl(movie.poster_path, 'w500');
const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280');
```

---

## 🔄 Data Fetching Patterns

### Using TanStack Query

```typescript
// src/features/movies/hooks/useMovies.ts
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../services/movieApi';

export const useMovies = (category: string = 'popular') => {
  return useQuery({
    queryKey: ['movies', category],
    queryFn: () => movieApi.getMovies(category),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieApi.getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMovieSearch = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => movieApi.searchMovies(query, page),
    enabled: !!query && query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
```

### API Service Implementation

```typescript
// src/features/movies/services/movieApi.ts
import { httpClient } from '@/shared/services/httpClient';
import {
  PopularMoviesResponse,
  MovieDetails,
  MovieCredits,
  SearchResponse,
} from '../types/movie.types';

export const movieApi = {
  // Get movies by category
  getMovies: async (category: string, page: number = 1) => {
    const response = await httpClient.get<PopularMoviesResponse>(
      `/movie/${category}?page=${page}`
    );
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId: number) => {
    const response = await httpClient.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  },

  // Get movie credits
  getMovieCredits: async (movieId: number) => {
    const response = await httpClient.get<MovieCredits>(
      `/movie/${movieId}/credits`
    );
    return response.data;
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1) => {
    const response = await httpClient.get<SearchResponse>(
      `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    );
    return response.data;
  },

  // Get genres
  getGenres: async () => {
    const response = await httpClient.get('/genre/movie/list');
    return response.data;
  },
};
```

---

## ⚡ Performance Considerations

### Caching Strategy

- **Popular/Trending Movies**: 5 minutes stale time
- **Movie Details**: 10 minutes stale time
- **Search Results**: 2 minutes stale time
- **Genres**: 1 hour stale time

### Rate Limiting

TMDB API has rate limits:

- **Read requests**: 1000 requests per day
- **Write requests**: 100 requests per day

**Best Practices:**

- Implement request caching
- Use appropriate stale times
- Implement exponential backoff for retries
- Monitor API usage

### Image Optimization

- Use appropriate image sizes for different contexts
- Implement lazy loading for images
- Use WebP format when available
- Implement progressive image loading

---

## 🚨 Error Handling

### Common Error Codes

| Code | Message           | Description         |
| ---- | ----------------- | ------------------- |
| 401  | Unauthorized      | Invalid API key     |
| 404  | Not Found         | Resource not found  |
| 422  | Validation Error  | Invalid parameters  |
| 429  | Too Many Requests | Rate limit exceeded |

### Error Handling Implementation

```typescript
// src/shared/hooks/useApiError.ts
import { useQuery } from '@tanstack/react-query';

export const useApiError = (error: any) => {
  if (!error) return null;

  const status = error.response?.status;

  switch (status) {
    case 401:
      return 'Invalid API key. Please check your configuration.';
    case 404:
      return 'The requested resource was not found.';
    case 422:
      return 'Invalid request parameters.';
    case 429:
      return 'Too many requests. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};
```

---

## 🧪 Testing

### Mock API Responses

```typescript
// src/tests/mocks/apiMocks.ts
export const mockMovies = [
  {
    id: 1,
    title: 'Test Movie',
    overview: 'A test movie for testing purposes',
    poster_path: '/test-poster.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5,
  },
  // ... more mock movies
];

export const mockApiResponse = {
  page: 1,
  results: mockMovies,
  total_pages: 1,
  total_results: mockMovies.length,
};
```

### API Testing

```typescript
// src/features/movies/__tests__/movieApi.test.ts
import { describe, it, expect, vi } from 'vitest';
import { movieApi } from '../services/movieApi';
import { mockApiResponse } from '@/tests/mocks/apiMocks';

// Mock the HTTP client
vi.mock('@/shared/services/httpClient', () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

describe('movieApi', () => {
  it('should fetch popular movies', async () => {
    const mockGet = vi.mocked(httpClient.get);
    mockGet.mockResolvedValue({ data: mockApiResponse });

    const result = await movieApi.getMovies('popular');

    expect(result).toEqual(mockApiResponse);
    expect(mockGet).toHaveBeenCalledWith('/movie/popular?page=1');
  });
});
```

---

## 📚 Additional Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TMDB API Status](https://status.themoviedb.org/)
- [TMDB API Forum](https://www.themoviedb.org/talk/category/5047951f760ee3318900009a)

---

## 🔄 API Versioning

This documentation is based on **TMDB API v3**. Always check the [official documentation](https://developers.themoviedb.org/3) for the latest changes and updates.
