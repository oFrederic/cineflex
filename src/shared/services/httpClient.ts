import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  TMDB_API_CONFIG,
  HTTP_STATUS,
  ERROR_MESSAGES,
} from '@/shared/constants/api';

/**
 * HTTP Client Service for TMDB API
 * Handles all API requests with proper error handling, retry logic, and interceptors
 */

// Environment variables
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_API_URL =
  import.meta.env.VITE_TMDB_API_URL || TMDB_API_CONFIG.BASE_URL;

// Validate required environment variables
if (!TMDB_API_KEY) {
  // eslint-disable-next-line no-console
  console.error(
    'VITE_TMDB_API_KEY is required. Please add it to your .env file.'
  );
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  public status: number;
  public code?: string;
  public isNetworkError: boolean;

  constructor(
    message: string,
    status: number,
    code?: string,
    isNetworkError = false
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.isNetworkError = isNetworkError;
  }
}

/**
 * Retry configuration
 */
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryStatusCodes: [408, 429, 500, 502, 503, 504],
} as const;

/**
 * Create Axios instance with default configuration
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: TMDB_API_URL,
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    params: {
      api_key: TMDB_API_KEY,
    },
  });

  return instance;
};

/**
 * HTTP Client class with interceptors and error handling
 */
class HttpClient {
  private client: AxiosInstance;
  private retryCount = 0;

  constructor() {
    this.client = createAxiosInstance();
    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        // Log request in development
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log(
            `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
          );
        }

        return config;
      },
      error => {
        // eslint-disable-next-line no-console
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log(
            `✅ API Response: ${response.status} ${response.config.url}`
          );
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle retry logic
        if (this.shouldRetry(error) && !originalRequest._retry) {
          return this.retryRequest(originalRequest);
        }

        // Handle specific error cases
        const apiError = this.handleError(error);
        // eslint-disable-next-line no-console
        console.error('❌ API Error:', apiError);

        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Determine if request should be retried
   */
  private shouldRetry(error: AxiosError): boolean {
    const status = error.response?.status;
    const isRetryableStatus = status
      ? RETRY_CONFIG.retryStatusCodes.includes(
          status as 408 | 429 | 500 | 502 | 503 | 504
        )
      : false;
    const isNetworkError = !error.response && error.request;

    return (
      (isRetryableStatus || isNetworkError) &&
      this.retryCount < RETRY_CONFIG.maxRetries
    );
  }

  /**
   * Retry failed request
   */
  private async retryRequest(
    config: AxiosRequestConfig & { _retry?: boolean }
  ): Promise<AxiosResponse> {
    this.retryCount++;
    config._retry = true;

    // Exponential backoff delay
    const delay = RETRY_CONFIG.retryDelay * Math.pow(2, this.retryCount - 1);

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(
        `🔄 Retrying request (${this.retryCount}/${RETRY_CONFIG.maxRetries}) in ${delay}ms`
      );
    }

    await new Promise(resolve => setTimeout(resolve, delay));

    return this.client.request(config);
  }

  /**
   * Handle and transform errors
   */
  private handleError(error: AxiosError): ApiError {
    const status = error.response?.status || 0;
    const data = error.response?.data as any;

    // Network error
    if (!error.response && error.request) {
      return new ApiError(
        ERROR_MESSAGES.NETWORK_ERROR,
        0,
        'NETWORK_ERROR',
        true
      );
    }

    // API error with status code
    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        return new ApiError(
          ERROR_MESSAGES.UNAUTHORIZED,
          status,
          'UNAUTHORIZED'
        );
      case HTTP_STATUS.FORBIDDEN:
        return new ApiError(ERROR_MESSAGES.UNAUTHORIZED, status, 'FORBIDDEN');
      case HTTP_STATUS.NOT_FOUND:
        return new ApiError(ERROR_MESSAGES.NOT_FOUND, status, 'NOT_FOUND');
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        return new ApiError(
          ERROR_MESSAGES.RATE_LIMITED,
          status,
          'RATE_LIMITED'
        );
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return new ApiError(
          ERROR_MESSAGES.API_ERROR,
          status,
          'INTERNAL_SERVER_ERROR'
        );
      default: {
        const message =
          data?.status_message || data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
        return new ApiError(message, status, data?.status_code);
      }
    }
  }

  /**
   * Reset retry count
   */
  private resetRetryCount(): void {
    this.retryCount = 0;
  }

  /**
   * Generic GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    this.resetRetryCount();
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    this.resetRetryCount();
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    this.resetRetryCount();
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    this.resetRetryCount();
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * Generic PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    this.resetRetryCount();
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

// Export singleton instance
export const httpClient = new HttpClient();

// Export types for external use
export type { AxiosRequestConfig, AxiosResponse, AxiosError };
