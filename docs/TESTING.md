# 🧪 Testing Guide

This document covers testing strategies, patterns, and best practices for the CineFlex application.

---

## 🎯 Testing Strategy

### Testing Pyramid

```
        /\
       /  \     E2E Tests (Few)
      /____\    Integration Tests (Some)
     /      \   Unit Tests (Many)
    /________\
```

### Test Categories

| Category              | Tools       | Purpose                         | Coverage |
| --------------------- | ----------- | ------------------------------- | -------- |
| **Unit Tests**        | Vitest, RTL | Individual functions/components | 80%+     |
| **Integration Tests** | Vitest, RTL | Component interactions          | 60%+     |
| **E2E Tests**         | Playwright  | User workflows                  | 40%+     |
| **Visual Tests**      | Chromatic   | UI consistency                  | 30%+     |

### Testing Principles

1. **Test behavior, not implementation**
2. **Write tests that fail when behavior changes**
3. **Keep tests simple and readable**
4. **Test edge cases and error states**
5. **Use meaningful test descriptions**

---

## 🛠️ Testing Setup

### Test Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
```

### Test Setup

```typescript
// src/tests/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = vi.fn();

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Suppress console warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
```

### Test Utilities

```typescript
// src/tests/utils/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement } from 'react';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
  withRouter?: boolean;
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { queryClient = createTestQueryClient(), withRouter = true, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const content = (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    return withRouter ? <BrowserRouter>{content}</BrowserRouter> : content;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { customRender as render };
```

---

## 🧩 Component Testing

### Basic Component Test

```typescript
// src/components/ui/Button/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@/tests/utils/test-utils';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="primary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--loading');
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
```

### Component with Props Testing

```typescript
// src/features/movies/components/MovieCard/__tests__/MovieCard.test.tsx
import { render, screen, fireEvent } from '@/tests/utils/test-utils';
import { MovieCard } from '../MovieCard';
import { mockMovie } from '@/tests/mocks/movieMocks';

describe('MovieCard', () => {
  const defaultProps = {
    movie: mockMovie,
    onAddToWatchlist: vi.fn(),
    onRemoveFromWatchlist: vi.fn(),
    isInWatchlist: false,
  };

  it('renders movie information correctly', () => {
    render(<MovieCard {...defaultProps} />);

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockMovie.title} poster`)).toBeInTheDocument();
  });

  it('calls onAddToWatchlist when add button is clicked', () => {
    render(<MovieCard {...defaultProps} />);

    fireEvent.click(screen.getByLabelText(/add to watchlist/i));
    expect(defaultProps.onAddToWatchlist).toHaveBeenCalledWith(mockMovie);
  });

  it('calls onRemoveFromWatchlist when remove button is clicked', () => {
    render(<MovieCard {...defaultProps} isInWatchlist={true} />);

    fireEvent.click(screen.getByLabelText(/remove from watchlist/i));
    expect(defaultProps.onRemoveFromWatchlist).toHaveBeenCalledWith(mockMovie.id);
  });

  it('shows correct watchlist button based on isInWatchlist prop', () => {
    const { rerender } = render(<MovieCard {...defaultProps} />);

    expect(screen.getByLabelText(/add to watchlist/i)).toBeInTheDocument();

    rerender(<MovieCard {...defaultProps} isInWatchlist={true} />);
    expect(screen.getByLabelText(/remove from watchlist/i)).toBeInTheDocument();
  });

  it('displays rating correctly', () => {
    render(<MovieCard {...defaultProps} />);

    expect(screen.getByText(`${mockMovie.vote_average}/10`)).toBeInTheDocument();
  });

  it('handles missing poster gracefully', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard {...defaultProps} movie={movieWithoutPoster} />);

    expect(screen.getByAltText(`${mockMovie.title} poster`)).toHaveAttribute('src', '/placeholder-poster.jpg');
  });
});
```

### Form Component Testing

```typescript
// src/features/search/components/SearchBox/__tests__/SearchBox.test.tsx
import { render, screen, fireEvent, waitFor } from '@/tests/utils/test-utils';
import { SearchBox } from '../SearchBox';

describe('SearchBox', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    onSearch: vi.fn(),
    placeholder: 'Search movies...',
  };

  it('renders search input', () => {
    render(<SearchBox {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<SearchBox {...defaultProps} />);

    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith('test query');
  });

  it('debounces search calls', async () => {
    vi.useFakeTimers();
    render(<SearchBox {...defaultProps} />);

    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(defaultProps.onSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    await waitFor(() => {
      expect(defaultProps.onSearch).toHaveBeenCalledWith('test');
    });

    vi.useRealTimers();
  });

  it('shows suggestions when provided', () => {
    const suggestions = ['action movies', 'adventure movies', 'comedy movies'];
    render(<SearchBox {...defaultProps} suggestions={suggestions} />);

    suggestions.forEach(suggestion => {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    render(<SearchBox {...defaultProps} loading={true} />);
    expect(screen.getByTestId('search-loading')).toBeInTheDocument();
  });
});
```

---

## 🎣 Hook Testing

### Custom Hook Testing

```typescript
// src/features/movies/hooks/__tests__/useMovies.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMovies } from '../useMovies';
import { movieApi } from '../../services/movieApi';

// Mock the API
vi.mock('../../services/movieApi');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches movies successfully', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ];

    vi.mocked(movieApi.getMovies).mockResolvedValue({
      page: 1,
      results: mockMovies,
      total_pages: 1,
      total_results: 2,
    });

    const { result } = renderHook(() => useMovies('popular'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.results).toEqual(mockMovies);
    expect(movieApi.getMovies).toHaveBeenCalledWith('popular', 1);
  });

  it('handles API errors', async () => {
    const error = new Error('API Error');
    vi.mocked(movieApi.getMovies).mockRejectedValue(error);

    const { result } = renderHook(() => useMovies('popular'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
  });

  it('returns loading state initially', () => {
    vi.mocked(movieApi.getMovies).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useMovies('popular'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});
```

### Hook with State Testing

```typescript
// src/shared/hooks/__tests__/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('returns initial value when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('returns stored value when it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('stored-value');
  });

  it('updates stored value when setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    );
  });

  it('handles JSON parsing errors gracefully', () => {
    localStorage.setItem('test-key', 'invalid-json');

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
  });
});
```

---

## 🔄 Integration Testing

### Component Integration Tests

```typescript
// src/features/movies/__tests__/MovieGrid.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@/tests/utils/test-utils';
import { MovieGrid } from '../components/MovieGrid';
import { useMovies } from '../hooks/useMovies';
import { mockMovies } from '@/tests/mocks/movieMocks';

// Mock the hook
vi.mock('../hooks/useMovies');

describe('MovieGrid Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders movies and handles watchlist interactions', async () => {
    vi.mocked(useMovies).mockReturnValue({
      data: {
        page: 1,
        results: mockMovies,
        total_pages: 1,
        total_results: 2,
      },
      isLoading: false,
      isError: false,
      error: null,
    });

    const onAddToWatchlist = vi.fn();
    const onRemoveFromWatchlist = vi.fn();

    render(
      <MovieGrid
        movies={mockMovies}
        onAddToWatchlist={onAddToWatchlist}
        onRemoveFromWatchlist={onRemoveFromWatchlist}
      />
    );

    // Check if movies are rendered
    expect(screen.getByText(mockMovies[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockMovies[1].title)).toBeInTheDocument();

    // Test watchlist interaction
    const addButton = screen.getAllByLabelText(/add to watchlist/i)[0];
    fireEvent.click(addButton);

    expect(onAddToWatchlist).toHaveBeenCalledWith(mockMovies[0]);
  });

  it('handles loading state', () => {
    vi.mocked(useMovies).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<MovieGrid movies={[]} />);

    expect(screen.getByTestId('movie-grid-loading')).toBeInTheDocument();
  });

  it('handles error state', () => {
    vi.mocked(useMovies).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch movies'),
    });

    render(<MovieGrid movies={[]} />);

    expect(screen.getByText(/failed to fetch movies/i)).toBeInTheDocument();
  });
});
```

---

## 🧪 API Testing

### API Service Testing

```typescript
// src/features/movies/services/__tests__/movieApi.test.ts
import { movieApi } from '../movieApi';
import { httpClient } from '@/shared/services/httpClient';

// Mock the HTTP client
vi.mock('@/shared/services/httpClient');

describe('movieApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMovies', () => {
    it('fetches movies successfully', async () => {
      const mockResponse = {
        page: 1,
        results: [{ id: 1, title: 'Test Movie' }],
        total_pages: 1,
        total_results: 1,
      };

      vi.mocked(httpClient.get).mockResolvedValue({ data: mockResponse });

      const result = await movieApi.getMovies('popular', 1);

      expect(result).toEqual(mockResponse);
      expect(httpClient.get).toHaveBeenCalledWith('/movie/popular?page=1');
    });

    it('handles API errors', async () => {
      const error = new Error('API Error');
      vi.mocked(httpClient.get).mockRejectedValue(error);

      await expect(movieApi.getMovies('popular')).rejects.toThrow('API Error');
    });
  });

  describe('getMovieDetails', () => {
    it('fetches movie details successfully', async () => {
      const mockMovie = {
        id: 1,
        title: 'Test Movie',
        overview: 'Test overview',
      };
      vi.mocked(httpClient.get).mockResolvedValue({ data: mockMovie });

      const result = await movieApi.getMovieDetails(1);

      expect(result).toEqual(mockMovie);
      expect(httpClient.get).toHaveBeenCalledWith('/movie/1');
    });
  });
});
```

---

## 🎭 Mock Data

### Mock Data Structure

```typescript
// src/tests/mocks/movieMocks.ts
export const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview.',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100.0,
  genre_ids: [28, 12],
  adult: false,
  video: false,
  original_language: 'en',
  original_title: 'Test Movie',
};

export const mockMovies = [
  mockMovie,
  {
    ...mockMovie,
    id: 2,
    title: 'Test Movie 2',
    release_date: '2023-02-01',
  },
  {
    ...mockMovie,
    id: 3,
    title: 'Test Movie 3',
    release_date: '2023-03-01',
  },
];

export const mockApiResponse = {
  page: 1,
  results: mockMovies,
  total_pages: 1,
  total_results: mockMovies.length,
};

export const mockGenre = {
  id: 28,
  name: 'Action',
};

export const mockGenres = [
  mockGenre,
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
];
```

### Mock Functions

```typescript
// src/tests/mocks/functionMocks.ts
export const mockNavigate = vi.fn();
export const mockUseNavigate = () => mockNavigate;

export const mockUseParams = (params: Record<string, string>) => () => params;

export const mockUseSearchParams = (searchParams: URLSearchParams) => () => [
  searchParams,
  vi.fn(),
];

export const mockIntersectionObserver = {
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
};

export const mockResizeObserver = {
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
};
```

---

## 📊 Test Coverage

### Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.ts',
        'src/main.tsx',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

### Coverage Scripts

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch",
    "test:run": "vitest run"
  }
}
```

---

## 🚨 Error Testing

### Error Boundary Testing

```typescript
// src/components/common/ErrorBoundary/__tests__/ErrorBoundary.test.tsx
import { render, screen } from '@/tests/utils/test-utils';
import { ErrorBoundary } from '../ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for this test
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders fallback when error occurs', () => {
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('renders default error message when no fallback provided', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
```

### Async Error Testing

```typescript
// src/features/movies/hooks/__tests__/useMovies.test.ts
it('handles network errors gracefully', async () => {
  const networkError = new Error('Network Error');
  vi.mocked(movieApi.getMovies).mockRejectedValue(networkError);

  const { result } = renderHook(() => useMovies('popular'), {
    wrapper: createWrapper(),
  });

  await waitFor(() => {
    expect(result.current.isError).toBe(true);
  });

  expect(result.current.error).toBe(networkError);
  expect(result.current.data).toBeUndefined();
});
```

---

## 🎨 Visual Testing

### Component Snapshot Testing

```typescript
// src/components/ui/Button/__tests__/Button.snapshot.test.tsx
import { render } from '@/tests/utils/test-utils';
import { Button } from '../Button';

describe('Button Snapshot', () => {
  it('matches snapshot for primary variant', () => {
    const { container } = render(<Button variant="primary">Primary Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for secondary variant', () => {
    const { container } = render(<Button variant="secondary">Secondary Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for loading state', () => {
    const { container } = render(<Button loading>Loading Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

---

## 📱 E2E Testing

### Playwright Setup

```typescript
// tests/e2e/movies.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Movies Page', () => {
  test('should display movies and allow navigation', async ({ page }) => {
    await page.goto('/movies');

    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]');

    // Check if movies are displayed
    const movieCards = await page.locator('[data-testid="movie-card"]').count();
    expect(movieCards).toBeGreaterThan(0);

    // Click on first movie
    await page.locator('[data-testid="movie-card"]').first().click();

    // Should navigate to movie details
    await expect(page).toHaveURL(/\/movie\/\d+/);
  });

  test('should handle search functionality', async ({ page }) => {
    await page.goto('/search');

    // Type in search box
    await page.fill('[data-testid="search-input"]', 'Avengers');

    // Wait for search results
    await page.waitForSelector('[data-testid="search-results"]');

    // Check if results contain search term
    const results = await page
      .locator('[data-testid="search-results"]')
      .textContent();
    expect(results?.toLowerCase()).toContain('avengers');
  });
});
```

---

## 🚀 Performance Testing

### Component Performance Testing

```typescript
// src/components/ui/Button/__tests__/Button.performance.test.tsx
import { render } from '@/tests/utils/test-utils';
import { Button } from '../Button';

describe('Button Performance', () => {
  it('renders quickly with many props', () => {
    const startTime = performance.now();

    render(
      <Button
        variant="primary"
        size="lg"
        disabled={false}
        loading={false}
        onClick={() => {}}
        className="custom-class"
        data-testid="test-button"
      >
        Performance Test Button
      </Button>
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render in less than 10ms
    expect(renderTime).toBeLessThan(10);
  });
});
```

---

## 📚 Best Practices

### Test Organization

1. **Group related tests** using `describe` blocks
2. **Use descriptive test names** that explain the behavior
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Keep tests independent** and isolated
5. **Use meaningful assertions** with clear error messages

### Test Data Management

1. **Use factory functions** for creating test data
2. **Keep mocks close to tests** that use them
3. **Use realistic test data** that matches production
4. **Clean up test data** after each test

### Performance Considerations

1. **Mock expensive operations** like API calls
2. **Use shallow rendering** when testing isolated components
3. **Avoid testing implementation details**
4. **Use test IDs** for reliable element selection

---

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Playwright Documentation](https://playwright.dev/)

---

## 🔄 Continuous Integration

### GitHub Actions Test Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```
