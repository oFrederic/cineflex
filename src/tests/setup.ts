/**
 * Test setup file for Vitest and React Testing Library
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables
vi.mock('@/utils/env', () => ({
  tmdbConfig: {
    apiKey: 'test-api-key',
    apiUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p',
  },
  appConfig: {
    name: 'CineFlex',
    version: '0.0.0',
    description: 'Test Description',
    url: 'http://localhost:5173',
  },
  isDevelopment: true,
  isProduction: false,
  isDebugMode: true,
  useMockData: false,
  validateEnvironment: vi.fn(),
}));

// Mock Intersection Observer
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
} as Storage;
Object.defineProperty(global, 'localStorage', {
  configurable: true,
  value: localStorageMock,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
} as Storage;
Object.defineProperty(global, 'sessionStorage', {
  configurable: true,
  value: sessionStorageMock,
});

// Mock fetch
global.fetch = vi.fn();

// Mock console methods in tests
// eslint-disable-next-line no-console
const originalError = console.error;
// eslint-disable-next-line no-console
const originalWarn = console.warn;

let errorSpy: ReturnType<typeof vi.spyOn>;
let warnSpy: ReturnType<typeof vi.spyOn>;

beforeAll(() => {
  errorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation((...args: Parameters<typeof console.error>) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Warning: ReactDOM.render is no longer supported')
      ) {
        return;
      }
      originalError(...args);
    });

  warnSpy = vi
    .spyOn(console, 'warn')
    .mockImplementation((...args: Parameters<typeof console.warn>) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Warning: componentWillReceiveProps has been renamed')
      ) {
        return;
      }
      originalWarn(...args);
    });
});

afterAll(() => {
  errorSpy.mockRestore();
  warnSpy.mockRestore();
});

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});
