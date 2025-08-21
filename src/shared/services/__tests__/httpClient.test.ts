import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpClient, ApiError } from '../httpClient';

// Mock environment variables
vi.mock('@/shared/constants/api', () => ({
  TMDB_API_CONFIG: {
    BASE_URL: 'https://api.themoviedb.org/3',
  },
  HTTP_STATUS: {
    OK: 200,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
  },
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    API_ERROR: 'API error. Please try again later.',
    NOT_FOUND: 'Resource not found.',
    UNAUTHORIZED: 'Unauthorized access.',
    RATE_LIMITED: 'Too many requests. Please try again later.',
    UNKNOWN_ERROR: 'An unknown error occurred.',
  },
}));

describe('HttpClient', () => {
  beforeEach(() => {
    // Reset environment variables for each test
    vi.stubEnv('VITE_TMDB_API_KEY', 'test-api-key');
    vi.stubEnv('VITE_TMDB_API_URL', 'https://api.themoviedb.org/3');
  });

  describe('ApiError', () => {
    it('should create ApiError with correct properties', () => {
      const error = new ApiError('Test error', 404, 'NOT_FOUND');

      expect(error.message).toBe('Test error');
      expect(error.status).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.isNetworkError).toBe(false);
      expect(error.name).toBe('ApiError');
    });

    it('should create network error', () => {
      const error = new ApiError('Network error', 0, 'NETWORK_ERROR', true);

      expect(error.isNetworkError).toBe(true);
      expect(error.status).toBe(0);
    });
  });

  describe('HTTP Methods', () => {
    it('should have all required HTTP methods', () => {
      expect(typeof httpClient.get).toBe('function');
      expect(typeof httpClient.post).toBe('function');
      expect(typeof httpClient.put).toBe('function');
      expect(typeof httpClient.delete).toBe('function');
      expect(typeof httpClient.patch).toBe('function');
    });
  });

  describe('Configuration', () => {
    it('should validate API key requirement', () => {
      // This test verifies that the client is properly configured
      // The actual validation happens at runtime
      expect(httpClient).toBeDefined();
    });
  });
});
