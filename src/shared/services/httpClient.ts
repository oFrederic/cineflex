import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
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
  maxRetryDelay: 30000, // 30 seconds max delay
  retryStatusCodes: [408, 429, 500, 502, 503, 504],
  jitterFactor: 0.1, // Add randomness to prevent thundering herd
} as const;

/**
 * Request timeout configuration
 */
const TIMEOUT_CONFIG = {
  default: 10000, // 10 seconds
  upload: 30000, // 30 seconds for uploads
  download: 60000, // 60 seconds for downloads
} as const;

/**
 * Create Axios instance with default configuration
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: TMDB_API_URL,
    timeout: TIMEOUT_CONFIG.default,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'CineFlex/1.0.0',
    },
    params: {
      api_key: TMDB_API_KEY,
    },
    // Enable automatic JSON parsing
    transformResponse: [
      data => {
        try {
          return JSON.parse(data);
        } catch {
          return data;
        }
      },
    ],
  });

  return instance;
};

/**
 * HTTP Client class with interceptors and error handling
 */
/**
 * Request metrics for monitoring
 */
interface RequestMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastRequestTime: number;
}

class HttpClient {
  private client: AxiosInstance;
  private retryCount = 0;
  private metrics: RequestMetrics = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    lastRequestTime: 0,
  };

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
      (config: InternalAxiosRequestConfig) => {
        // Add request timestamp for timing
        const requestConfig = config as InternalAxiosRequestConfig & {
          _startTime?: number;
        };
        requestConfig._startTime = Date.now();

        // Add request ID for tracking
        const requestId = Math.random().toString(36).substring(7);
        requestConfig.headers.set('X-Request-ID', requestId);

        // Log request in development
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log(
            `🚀 API Request [${requestId}]: ${config.method?.toUpperCase()} ${config.url}`
          );
        }

        return requestConfig;
      },
      (error: AxiosError) => {
        // eslint-disable-next-line no-console
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        const requestConfig = response.config as InternalAxiosRequestConfig & {
          _startTime?: number;
        };
        const requestId = response.config.headers?.get(
          'X-Request-ID'
        ) as string;
        const duration = requestConfig._startTime
          ? Date.now() - requestConfig._startTime
          : 0;

        // Update metrics
        this.updateMetrics(duration, true);

        // Log response in development
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log(
            `✅ API Response [${requestId}]: ${response.status} ${response.config.url} (${duration}ms)`
          );
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
          _startTime?: number;
        };
        const requestId = originalRequest.headers?.get(
          'X-Request-ID'
        ) as string;
        const duration = originalRequest._startTime
          ? Date.now() - originalRequest._startTime
          : 0;

        // Log error with request ID and duration
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.error(
            `❌ API Error [${requestId}]: ${error.response?.status || 'NETWORK'} ${originalRequest.url} (${duration}ms)`
          );
        }

        // Handle retry logic
        if (this.shouldRetry(error) && !originalRequest._retry) {
          return this.retryRequest(originalRequest);
        }

        // Update metrics for failed request
        this.updateMetrics(duration, false);

        // Handle specific error cases
        const apiError = this.handleError(error);
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
   * Retry failed request with exponential backoff and jitter
   */
  private async retryRequest(
    config: AxiosRequestConfig & { _retry?: boolean }
  ): Promise<AxiosResponse> {
    this.retryCount++;
    config._retry = true;

    // Exponential backoff with jitter
    const baseDelay =
      RETRY_CONFIG.retryDelay * Math.pow(2, this.retryCount - 1);
    const jitter = baseDelay * RETRY_CONFIG.jitterFactor * Math.random();
    const delay = Math.min(baseDelay + jitter, RETRY_CONFIG.maxRetryDelay);

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(
        `🔄 Retrying request (${this.retryCount}/${RETRY_CONFIG.maxRetries}) in ${Math.round(delay)}ms`
      );
    }

    await new Promise(resolve => setTimeout(resolve, delay));

    return this.client.request(config);
  }

  /**
   * Handle and transform errors with enhanced context
   */
  private handleError(error: AxiosError): ApiError {
    const status = error.response?.status || 0;
    const data = error.response?.data as any;
    const url = error.config?.url || 'unknown';
    const method = error.config?.method?.toUpperCase() || 'unknown';

    // Timeout error
    if (error.code === 'ECONNABORTED') {
      return new ApiError(
        `Request timeout for ${method} ${url}`,
        408,
        'TIMEOUT_ERROR'
      );
    }

    // Network error
    if (!error.response && error.request) {
      return new ApiError(
        `${ERROR_MESSAGES.NETWORK_ERROR} (${method} ${url})`,
        0,
        'NETWORK_ERROR',
        true
      );
    }

    // API error with status code
    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        return new ApiError(
          `${ERROR_MESSAGES.UNAUTHORIZED} (${method} ${url})`,
          status,
          'UNAUTHORIZED'
        );
      case HTTP_STATUS.FORBIDDEN:
        return new ApiError(
          `Access forbidden for ${method} ${url}`,
          status,
          'FORBIDDEN'
        );
      case HTTP_STATUS.NOT_FOUND:
        return new ApiError(
          `${ERROR_MESSAGES.NOT_FOUND} (${method} ${url})`,
          status,
          'NOT_FOUND'
        );
      case HTTP_STATUS.TOO_MANY_REQUESTS: {
        const retryAfter = error.response?.headers?.['retry-after'];
        const message = retryAfter
          ? `${ERROR_MESSAGES.RATE_LIMITED} Retry after ${retryAfter} seconds.`
          : ERROR_MESSAGES.RATE_LIMITED;
        return new ApiError(message, status, 'RATE_LIMITED');
      }
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return new ApiError(
          `${ERROR_MESSAGES.API_ERROR} (${method} ${url})`,
          status,
          'INTERNAL_SERVER_ERROR'
        );
      default: {
        const message =
          data?.status_message || data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
        return new ApiError(
          `${message} (${method} ${url})`,
          status,
          data?.status_code
        );
      }
    }
  }

  /**
   * Update request metrics
   */
  private updateMetrics(responseTime: number, isSuccess: boolean): void {
    this.metrics.totalRequests++;
    this.metrics.lastRequestTime = Date.now();

    if (isSuccess) {
      this.metrics.successfulRequests++;
    } else {
      this.metrics.failedRequests++;
    }

    // Update average response time using exponential moving average
    if (this.metrics.averageResponseTime === 0) {
      this.metrics.averageResponseTime = responseTime;
    } else {
      this.metrics.averageResponseTime =
        this.metrics.averageResponseTime * 0.9 + responseTime * 0.1;
    }
  }

  /**
   * Get current metrics
   */
  public getMetrics(): RequestMetrics {
    return { ...this.metrics };
  }

  /**
   * Reset metrics
   */
  public resetMetrics(): void {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      lastRequestTime: 0,
    };
  }

  /**
   * Check API health
   */
  public async healthCheck(): Promise<boolean> {
    try {
      await this.get('/configuration');
      return true;
    } catch {
      return false;
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
