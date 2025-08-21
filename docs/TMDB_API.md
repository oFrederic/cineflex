# TMDB API Service Documentation

## Overview

The TMDB API Service provides a comprehensive interface for interacting with The Movie Database (TMDB) API v3. It includes all essential movie-related endpoints with full TypeScript support, error handling, and retry logic.

## Features

- 🎬 **Complete TMDB API Coverage** - All essential movie endpoints
- 🔒 **Type Safety** - Full TypeScript integration with comprehensive interfaces
- ⚡ **Enhanced HTTP Client** - Built-in retry logic, error handling, and metrics
- 📊 **Request Tracking** - Automatic logging and performance monitoring
- 🌍 **Internationalization** - Support for multiple languages and regions
- 🔄 **Automatic Retries** - Network resilience with exponential backoff
- 📝 **Comprehensive Documentation** - JSDoc comments for all methods

## Quick Start

### Import the Service

```typescript
// Class-based approach
import { TMDBApiService } from '@/shared/services';

// Function-based approach (convenience functions)
import {
  getPopularMovies,
  getMovieDetails,
  getTrendingMovies,
} from '@/shared/services';
```

### Basic Usage

```typescript
// Get popular movies
const popularMovies = await TMDBApiService.getPopularMovies();

// Get movie details
const movieDetails = await TMDBApiService.getMovieDetails(123);

// Search movies
const searchResults = await TMDBApiService.searchMovies('Avengers');
```

## API Methods

### Core Movie Methods

#### `getPopularMovies(page?, language?, region?)`

Get popular movies with pagination support.

```typescript
// Basic usage
const movies = await TMDBApiService.getPopularMovies();

// With custom parameters
const movies = await TMDBApiService.getPopularMovies(2, 'es-ES', 'ES');
```

**Parameters:**

- `page` (number, optional): Page number (default: 1)
- `language` (LanguageCode, optional): Language code (default: 'en-US')
- `region` (RegionCode, optional): Region code (default: 'US')

**Returns:** `Promise<MovieResponse>`

#### `getTrendingMovies(page?, language?, region?)`

Get trending movies for the current day.

```typescript
const trendingMovies = await TMDBApiService.getTrendingMovies();
```

**Returns:** `Promise<MovieResponse>`

#### `getTopRatedMovies(page?, language?, region?)`

Get top-rated movies of all time.

```typescript
const topRatedMovies = await TMDBApiService.getTopRatedMovies();
```

**Returns:** `Promise<MovieResponse>`

#### `getMovieDetails(id, language?)`

Get detailed information about a specific movie.

```typescript
const movieDetails = await TMDBApiService.getMovieDetails(550); // Fight Club
```

**Parameters:**

- `id` (number, required): Movie ID
- `language` (LanguageCode, optional): Language code (default: 'en-US')

**Returns:** `Promise<MovieDetails>`

**Note:** Automatically appends additional data (videos, credits, images, recommendations, similar movies).

#### `getMovieCredits(id, language?)`

Get cast and crew information for a movie.

```typescript
const credits = await TMDBApiService.getMovieCredits(550);
console.log(credits.cast); // Array of cast members
console.log(credits.crew); // Array of crew members
```

**Returns:** `Promise<MovieCredits>`

#### `getMovieVideos(id, language?)`

Get videos (trailers, clips, etc.) for a movie.

```typescript
const videos = await TMDBApiService.getMovieVideos(550);
const trailers = videos.results.filter(video => video.type === 'Trailer');
```

**Returns:** `Promise<VideoResponse>`

### Additional Movie Methods

#### `getNowPlayingMovies(page?, language?, region?)`

Get movies currently playing in theaters.

#### `getUpcomingMovies(page?, language?, region?)`

Get upcoming movie releases.

#### `getMovieRecommendations(id, page?, language?)`

Get movie recommendations based on a specific movie.

#### `getSimilarMovies(id, page?, language?)`

Get movies similar to a specific movie.

### Search & Discovery

#### `searchMovies(query, page?, language?, includeAdult?)`

Search for movies by title.

```typescript
const results = await TMDBApiService.searchMovies('The Matrix');
```

**Parameters:**

- `query` (string, required): Search query
- `page` (number, optional): Page number (default: 1)
- `language` (LanguageCode, optional): Language code (default: 'en-US')
- `includeAdult` (boolean, optional): Include adult content (default: false)

#### `discoverMovies(params)`

Discover movies with advanced filtering options.

```typescript
const actionMovies = await TMDBApiService.discoverMovies({
  with_genres: '28', // Action genre
  primary_release_year: 2023,
  'vote_average.gte': 7.0,
  sort_by: 'popularity.desc',
});
```

**Parameters:**

- `params` (DiscoverMovieParams): Filter parameters

**Common filter options:**

- `with_genres`: Genre IDs (comma-separated)
- `primary_release_year`: Release year
- `vote_average.gte`: Minimum rating
- `sort_by`: Sort criteria

## Type Definitions

### Core Types

```typescript
// Basic movie information
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  // ... additional properties
}

// Detailed movie information
interface MovieDetails extends Movie {
  budget: number;
  revenue: number;
  runtime: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  // ... additional properties
}

// Paginated response
interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Language and Region Codes

```typescript
type LanguageCode = 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE' | /* ... */;
type RegionCode = 'US' | 'ES' | 'FR' | 'DE' | /* ... */;
```

## Error Handling

### Basic Error Handling

```typescript
try {
  const movies = await TMDBApiService.getPopularMovies();
  // Handle success
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message);
    console.error('Status:', error.status);
  } else {
    console.error('Network Error:', error.message);
  }
}
```

### Common Error Types

- **Network Errors** - Connection issues, timeouts
- **API Errors** - Invalid API key, rate limiting, not found
- **Validation Errors** - Invalid parameters

### Automatic Retry Logic

The service automatically retries failed requests with:

- **Exponential backoff** with jitter
- **Maximum 3 retries** for retryable errors
- **Smart retry conditions** (network errors, 5xx status codes)

## React Integration Examples

### Using with useState and useEffect

```typescript
import { useState, useEffect } from 'react';
import { TMDBApiService } from '@/shared/services';
import type { Movie } from '@/shared/types';

function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await TMDBApiService.getPopularMovies();
        setMovies(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}
```

### Custom Hook Example

```typescript
import { useState, useEffect } from 'react';
import { TMDBApiService } from '@/shared/services';
import type { MovieDetails } from '@/shared/types';

function useMovieDetails(movieId: number) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const movieDetails = await TMDBApiService.getMovieDetails(movieId);
        setMovie(movieDetails);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  return { movie, loading, error };
}

// Usage
function MovieDetailsPage({ movieId }: { movieId: number }) {
  const { movie, loading, error } = useMovieDetails(movieId);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}/10</p>
    </div>
  );
}
```

## Advanced Usage

### Pagination

```typescript
async function loadAllPopularMovies() {
  const allMovies: Movie[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await TMDBApiService.getPopularMovies(page);
    allMovies.push(...response.results);
    totalPages = response.total_pages;
    page++;
  } while (page <= totalPages && page <= 10); // Limit to first 10 pages

  return allMovies;
}
```

### Parallel Requests

```typescript
async function getMovieWithDetails(movieId: number) {
  const [details, credits, videos] = await Promise.all([
    TMDBApiService.getMovieDetails(movieId),
    TMDBApiService.getMovieCredits(movieId),
    TMDBApiService.getMovieVideos(movieId),
  ]);

  return { details, credits, videos };
}
```

### Search with Debouncing

```typescript
import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '@/shared/hooks';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function searchMovies() {
      if (debouncedQuery.trim()) {
        try {
          const response = await TMDBApiService.searchMovies(debouncedQuery);
          setMovies(response.results);
        } catch (error) {
          console.error('Search failed:', error);
          setMovies([]);
        }
      } else {
        setMovies([]);
      }
    }

    searchMovies();
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      {movies.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}
```

## Performance Considerations

### Caching Recommendations

For production applications, consider implementing caching:

```typescript
// Simple in-memory cache example
const movieCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getCachedMovieDetails(movieId: number) {
  const cacheKey = `movie-${movieId}`;
  const cached = movieCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const movieDetails = await TMDBApiService.getMovieDetails(movieId);
  movieCache.set(cacheKey, { data: movieDetails, timestamp: Date.now() });

  return movieDetails;
}
```

### Request Optimization

- Use `append_to_response` in `getMovieDetails()` to reduce API calls
- Implement proper loading states to improve UX
- Consider pagination for large result sets
- Use parallel requests when fetching independent data

## Environment Setup

### Required Environment Variables

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_API_URL=https://api.themoviedb.org/3
```

### API Key Setup

1. Create account at [TMDB](https://www.themoviedb.org/)
2. Generate API key in account settings
3. Add to your `.env` file
4. Restart development server

## Monitoring and Debugging

### Request Metrics

The service automatically tracks:

- Total requests made
- Successful requests
- Failed requests
- Average response time

```typescript
// Access metrics (useful for debugging)
const metrics = httpClient.getMetrics();
console.log('API Metrics:', metrics);
```

### Debug Logging

All requests are automatically logged with:

- Unique request IDs
- Request timing
- Response status
- Error details

Look for console logs with format:

```
🚀 API Request [abc123]: GET /movie/popular
✅ API Success [abc123]: GET /movie/popular (234ms)
❌ API Error [abc123]: GET /movie/popular (1234ms)
```

## Best Practices

### 1. Error Handling

- Always wrap API calls in try-catch blocks
- Provide meaningful error messages to users
- Implement proper loading states

### 2. Performance

- Use pagination for large datasets
- Implement caching for frequently accessed data
- Consider using React Query or SWR for advanced caching

### 3. Type Safety

- Always use TypeScript interfaces
- Leverage the provided type definitions
- Validate data when necessary

### 4. User Experience

- Implement proper loading states
- Show meaningful error messages
- Provide retry mechanisms for failed requests

## Troubleshooting

### Common Issues

**API Key Issues:**

```
❌ API Error: Invalid API key
```

- Check your `.env` file
- Ensure API key is valid
- Restart development server

**Rate Limiting:**

```
❌ API Error: Rate limit exceeded
```

- The service automatically retries with backoff
- Consider implementing request queuing
- Check your API usage limits

**Network Issues:**

```
❌ Network Error: Connection failed
```

- Check internet connection
- Verify TMDB API status
- The service will automatically retry

### Debug Mode

Enable detailed logging by setting:

```typescript
// In development
if (process.env.NODE_ENV === 'development') {
  // Additional debug logging is automatically enabled
}
```

## Contributing

When adding new methods to the TMDB API service:

1. **Add TypeScript interfaces** for new response types
2. **Include comprehensive JSDoc** documentation
3. **Write unit tests** for new methods
4. **Update this documentation** with usage examples
5. **Follow existing patterns** for consistency

## Related Documentation

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TypeScript Interfaces](./TYPES.md)
- [HTTP Client Documentation](./HTTP_CLIENT.md)
- [Error Handling Guide](./ERROR_HANDLING.md)

---

**Last Updated:** January 2025
**Version:** 1.0.0
**Maintainer:** Development Team
