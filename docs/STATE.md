# 🗃️ State Management Guide

This document covers state management patterns, Zustand stores, TanStack Query usage, and best practices for the CineFlex application.

---

## 🏗️ State Management Architecture

### State Categories

| Category         | Technology      | Purpose                            | Example                    |
| ---------------- | --------------- | ---------------------------------- | -------------------------- |
| **Server State** | TanStack Query  | API data, caching, synchronization | Movie data, search results |
| **Client State** | Zustand         | UI state, user preferences         | Theme, watchlist, filters  |
| **Form State**   | React Hook Form | Form data, validation              | Search forms, filters      |
| **URL State**    | React Router    | Navigation, query params           | Current page, search query |

### State Flow Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Action   │───▶│  Zustand Store  │───▶│   UI Update     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  TanStack Query │◀───│   API Request   │◀───│  Data Fetching  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🐻 Zustand Stores

### Store Structure

```typescript
// src/shared/stores/index.ts
export { useAppStore } from './appStore';
export { useUserStore } from './userStore';
export { useWatchlistStore } from './watchlistStore';
export { useSearchStore } from './searchStore';
export { useThemeStore } from './themeStore';
```

### App Store

**Location:** `src/shared/stores/appStore.ts`

**Purpose:** Global application state and configuration.

```typescript
interface AppState {
  // Loading states
  isLoading: boolean;
  loadingStates: Record<string, boolean>;

  // Error states
  error: string | null;
  errors: Record<string, string>;

  // UI states
  sidebarOpen: boolean;
  modalOpen: boolean;
  currentModal: string | null;

  // Actions
  setLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setModalOpen: (open: boolean, modal?: string) => void;
  clearErrors: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  isLoading: false,
  loadingStates: {},
  error: null,
  errors: {},
  sidebarOpen: false,
  modalOpen: false,
  currentModal: null,

  // Actions
  setLoading: (key, loading) =>
    set(state => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: loading,
      },
      isLoading: Object.values({
        ...state.loadingStates,
        [key]: loading,
      }).some(Boolean),
    })),

  setError: (key, error) =>
    set(state => ({
      errors: {
        ...state.errors,
        [key]: error || undefined,
      },
      error: error || Object.values(state.errors).find(Boolean) || null,
    })),

  setSidebarOpen: open => set({ sidebarOpen: open }),

  setModalOpen: (open, modal) =>
    set({ modalOpen: open, currentModal: open ? modal || null : null }),

  clearErrors: () => set({ error: null, errors: {} }),
}));
```

### User Store

**Location:** `src/shared/stores/userStore.ts`

**Purpose:** User preferences and settings.

```typescript
interface UserState {
  // User preferences
  theme: 'dark' | 'light' | 'system';
  language: string;
  region: string;

  // UI preferences
  autoPlayTrailers: boolean;
  showAdultContent: boolean;
  compactMode: boolean;

  // Actions
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  setLanguage: (language: string) => void;
  setRegion: (region: string) => void;
  setAutoPlayTrailers: (autoPlay: boolean) => void;
  setShowAdultContent: (show: boolean) => void;
  setCompactMode: (compact: boolean) => void;
  resetPreferences: () => void;
}

const defaultPreferences = {
  theme: 'dark' as const,
  language: 'en-US',
  region: 'US',
  autoPlayTrailers: false,
  showAdultContent: false,
  compactMode: false,
};

export const useUserStore = create<UserState>(set => ({
  // Load from localStorage on initialization
  ...defaultPreferences,

  setTheme: theme => {
    set({ theme });
    localStorage.setItem('cineflex-theme', theme);
  },

  setLanguage: language => {
    set({ language });
    localStorage.setItem('cineflex-language', language);
  },

  setRegion: region => {
    set({ region });
    localStorage.setItem('cineflex-region', region);
  },

  setAutoPlayTrailers: autoPlayTrailers => {
    set({ autoPlayTrailers });
    localStorage.setItem('cineflex-autoPlayTrailers', String(autoPlayTrailers));
  },

  setShowAdultContent: showAdultContent => {
    set({ showAdultContent });
    localStorage.setItem('cineflex-showAdultContent', String(showAdultContent));
  },

  setCompactMode: compactMode => {
    set({ compactMode });
    localStorage.setItem('cineflex-compactMode', String(compactMode));
  },

  resetPreferences: () => {
    set(defaultPreferences);
    localStorage.removeItem('cineflex-theme');
    localStorage.removeItem('cineflex-language');
    localStorage.removeItem('cineflex-region');
    localStorage.removeItem('cineflex-autoPlayTrailers');
    localStorage.removeItem('cineflex-showAdultContent');
    localStorage.removeItem('cineflex-compactMode');
  },
}));
```

### Watchlist Store

**Location:** `src/shared/stores/watchlistStore.ts`

**Purpose:** User's movie watchlist management.

```typescript
interface WatchlistState {
  // Watchlist data
  movies: Movie[];
  tvShows: TVShow[];

  // Watchlist metadata
  lastUpdated: Date | null;
  totalCount: number;

  // Actions
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: number) => void;
  addTVShow: (show: TVShow) => void;
  removeTVShow: (showId: number) => void;
  clearWatchlist: () => void;
  isInWatchlist: (id: number, type: 'movie' | 'tv') => boolean;
  getWatchlistCount: (type: 'movie' | 'tv') => number;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  movies: [],
  tvShows: [],
  lastUpdated: null,
  totalCount: 0,

  addMovie: movie =>
    set(state => {
      const exists = state.movies.some(m => m.id === movie.id);
      if (exists) return state;

      const newMovies = [...state.movies, movie];
      const newTotalCount = newMovies.length + state.tvShows.length;

      // Persist to localStorage
      localStorage.setItem(
        'cineflex-watchlist-movies',
        JSON.stringify(newMovies)
      );
      localStorage.setItem(
        'cineflex-watchlist-lastUpdated',
        new Date().toISOString()
      );

      return {
        movies: newMovies,
        totalCount: newTotalCount,
        lastUpdated: new Date(),
      };
    }),

  removeMovie: movieId =>
    set(state => {
      const newMovies = state.movies.filter(m => m.id !== movieId);
      const newTotalCount = newMovies.length + state.tvShows.length;

      localStorage.setItem(
        'cineflex-watchlist-movies',
        JSON.stringify(newMovies)
      );
      localStorage.setItem(
        'cineflex-watchlist-lastUpdated',
        new Date().toISOString()
      );

      return {
        movies: newMovies,
        totalCount: newTotalCount,
        lastUpdated: new Date(),
      };
    }),

  addTVShow: show =>
    set(state => {
      const exists = state.tvShows.some(s => s.id === show.id);
      if (exists) return state;

      const newTVShows = [...state.tvShows, show];
      const newTotalCount = state.movies.length + newTVShows.length;

      localStorage.setItem(
        'cineflex-watchlist-tvshows',
        JSON.stringify(newTVShows)
      );
      localStorage.setItem(
        'cineflex-watchlist-lastUpdated',
        new Date().toISOString()
      );

      return {
        tvShows: newTVShows,
        totalCount: newTotalCount,
        lastUpdated: new Date(),
      };
    }),

  removeTVShow: showId =>
    set(state => {
      const newTVShows = state.tvShows.filter(s => s.id !== showId);
      const newTotalCount = state.movies.length + newTVShows.length;

      localStorage.setItem(
        'cineflex-watchlist-tvshows',
        JSON.stringify(newTVShows)
      );
      localStorage.setItem(
        'cineflex-watchlist-lastUpdated',
        new Date().toISOString()
      );

      return {
        tvShows: newTVShows,
        totalCount: newTotalCount,
        lastUpdated: new Date(),
      };
    }),

  clearWatchlist: () => {
    localStorage.removeItem('cineflex-watchlist-movies');
    localStorage.removeItem('cineflex-watchlist-tvshows');
    localStorage.removeItem('cineflex-watchlist-lastUpdated');

    set({
      movies: [],
      tvShows: [],
      totalCount: 0,
      lastUpdated: null,
    });
  },

  isInWatchlist: (id, type) => {
    const state = get();
    return type === 'movie'
      ? state.movies.some(m => m.id === id)
      : state.tvShows.some(s => s.id === id);
  },

  getWatchlistCount: type => {
    const state = get();
    return type === 'movie' ? state.movies.length : state.tvShows.length;
  },
}));
```

### Search Store

**Location:** `src/shared/stores/searchStore.ts`

**Purpose:** Search state and history management.

```typescript
interface SearchState {
  // Search state
  query: string;
  filters: SearchFilters;
  sortBy: SortOption;

  // Search history
  searchHistory: string[];
  recentSearches: string[];

  // Actions
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSortBy: (sortBy: SortOption) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
}

interface SearchFilters {
  genres: number[];
  year: number | null;
  rating: number | null;
  language: string;
  includeAdult: boolean;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  filters: {
    genres: [],
    year: null,
    rating: null,
    language: 'en-US',
    includeAdult: false,
  },
  sortBy: 'popularity.desc',
  searchHistory: [],
  recentSearches: [],

  setQuery: query => set({ query }),

  setFilters: newFilters =>
    set(state => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setSortBy: sortBy => set({ sortBy }),

  addToHistory: query =>
    set(state => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return state;

      const newHistory = [
        trimmedQuery,
        ...state.searchHistory.filter(q => q !== trimmedQuery),
      ].slice(0, 10); // Keep only last 10 searches

      const newRecentSearches = newHistory.slice(0, 5); // Keep only last 5 for suggestions

      localStorage.setItem(
        'cineflex-search-history',
        JSON.stringify(newHistory)
      );

      return {
        searchHistory: newHistory,
        recentSearches: newRecentSearches,
      };
    }),

  clearHistory: () => {
    localStorage.removeItem('cineflex-search-history');
    set({ searchHistory: [], recentSearches: [] });
  },

  removeFromHistory: query =>
    set(state => {
      const newHistory = state.searchHistory.filter(q => q !== query);
      const newRecentSearches = newHistory.slice(0, 5);

      localStorage.setItem(
        'cineflex-search-history',
        JSON.stringify(newHistory)
      );

      return {
        searchHistory: newHistory,
        recentSearches: newRecentSearches,
      };
    }),
}));
```

---

## 🔄 TanStack Query Integration

### Query Client Setup

```typescript
// src/shared/services/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### Movie Queries

```typescript
// src/features/movies/hooks/useMovies.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieApi } from '../services/movieApi';

// Get movies by category
export const useMovies = (category: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => movieApi.getMovies(category, page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get movies with infinite scroll
export const useInfiniteMovies = (category: string) => {
  return useInfiniteQuery({
    queryKey: ['movies', category, 'infinite'],
    queryFn: ({ pageParam = 1 }) => movieApi.getMovies(category, pageParam),
    getNextPageParam: lastPage => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Get movie details
export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieApi.getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get movie credits
export const useMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => movieApi.getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000,
  });
};

// Get movie videos
export const useMovieVideos = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => movieApi.getMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000,
  });
};

// Get similar movies
export const useSimilarMovies = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId, 'similar'],
    queryFn: () => movieApi.getSimilarMovies(movieId),
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000,
  });
};
```

### Search Queries

```typescript
// src/features/search/hooks/useSearch.ts
import { useQuery } from '@tanstack/react-query';
import { searchApi } from '../services/searchApi';

export const useSearch = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchApi.searchMovies(query, page),
    enabled: !!query && query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useMultiSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', 'multi', query],
    queryFn: () => searchApi.multiSearch(query),
    enabled: !!query && query.length >= 2,
    staleTime: 2 * 60 * 1000,
  });
};
```

### Genre Queries

```typescript
// src/features/movies/hooks/useGenres.ts
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../services/movieApi';

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => movieApi.getGenres(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
```

---

## 🎯 State Management Patterns

### Combining Zustand and TanStack Query

```typescript
// src/features/movies/hooks/useMovieWithWatchlist.ts
import { useMovieDetails } from './useMovies';
import { useWatchlistStore } from '@/shared/stores/watchlistStore';

export const useMovieWithWatchlist = (movieId: number) => {
  const movieQuery = useMovieDetails(movieId);
  const { isInWatchlist, addMovie, removeMovie } = useWatchlistStore();

  const movie = movieQuery.data;
  const isInUserWatchlist = movie ? isInWatchlist(movie.id, 'movie') : false;

  const toggleWatchlist = () => {
    if (!movie) return;

    if (isInUserWatchlist) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  };

  return {
    ...movieQuery,
    movie,
    isInWatchlist: isInUserWatchlist,
    toggleWatchlist,
  };
};
```

### Optimistic Updates

```typescript
// src/features/watchlist/hooks/useWatchlistActions.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWatchlistStore } from '@/shared/stores/watchlistStore';

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();
  const { addMovie } = useWatchlistStore();

  return useMutation({
    mutationFn: (movie: Movie) => {
      // Simulate API call
      return Promise.resolve(movie);
    },
    onMutate: async movie => {
      // Optimistically update the UI
      addMovie(movie);

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['watchlist'] });

      // Snapshot the previous value
      const previousWatchlist = queryClient.getQueryData(['watchlist']);

      return { previousWatchlist };
    },
    onError: (err, movie, context) => {
      // Rollback on error
      if (context?.previousWatchlist) {
        queryClient.setQueryData(['watchlist'], context.previousWatchlist);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });
};
```

### State Synchronization

```typescript
// src/shared/hooks/useSyncState.ts
import { useEffect } from 'react';
import { useUserStore } from '@/shared/stores/userStore';

export const useSyncTheme = () => {
  const { theme } = useUserStore();

  useEffect(() => {
    // Sync theme with system preference
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.setAttribute(
          'data-theme',
          e.matches ? 'dark' : 'light'
        );
      };

      mediaQuery.addEventListener('change', handleChange);
      document.documentElement.setAttribute(
        'data-theme',
        mediaQuery.matches ? 'dark' : 'light'
      );

      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);
};
```

---

## 🧪 Testing State Management

### Testing Zustand Stores

```typescript
// src/shared/stores/__tests__/watchlistStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useWatchlistStore } from '../watchlistStore';

describe('Watchlist Store', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should add movie to watchlist', () => {
    const { result } = renderHook(() => useWatchlistStore());
    const mockMovie = { id: 1, title: 'Test Movie' };

    act(() => {
      result.current.addMovie(mockMovie);
    });

    expect(result.current.movies).toHaveLength(1);
    expect(result.current.movies[0]).toEqual(mockMovie);
    expect(result.current.isInWatchlist(1, 'movie')).toBe(true);
  });

  it('should not add duplicate movies', () => {
    const { result } = renderHook(() => useWatchlistStore());
    const mockMovie = { id: 1, title: 'Test Movie' };

    act(() => {
      result.current.addMovie(mockMovie);
      result.current.addMovie(mockMovie);
    });

    expect(result.current.movies).toHaveLength(1);
  });

  it('should remove movie from watchlist', () => {
    const { result } = renderHook(() => useWatchlistStore());
    const mockMovie = { id: 1, title: 'Test Movie' };

    act(() => {
      result.current.addMovie(mockMovie);
      result.current.removeMovie(1);
    });

    expect(result.current.movies).toHaveLength(0);
    expect(result.current.isInWatchlist(1, 'movie')).toBe(false);
  });
});
```

### Testing TanStack Query

```typescript
// src/features/movies/__tests__/useMovies.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMovies } from '../hooks/useMovies';
import { movieApi } from '../services/movieApi';

// Mock the API
vi.mock('../services/movieApi');

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
  it('should fetch movies successfully', async () => {
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
  });
});
```

---

## 📱 Persistence Strategies

### LocalStorage Persistence

```typescript
// src/shared/utils/persistence.ts
export const persistStore = <T>(
  key: string,
  store: T,
  selector: (state: T) => any
) => {
  // Load initial state from localStorage
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed;
    } catch (error) {
      console.warn(`Failed to parse ${key} from localStorage:`, error);
    }
  }

  // Subscribe to store changes
  store.subscribe(state => {
    const dataToPersist = selector(state);
    localStorage.setItem(key, JSON.stringify(dataToPersist));
  });

  return undefined;
};
```

### Zustand with Persistence

```typescript
// src/shared/stores/userStore.ts
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist<UserState>(
    set => ({
      // ... store implementation
    }),
    {
      name: 'cineflex-user-store',
      partialize: state => ({
        theme: state.theme,
        language: state.language,
        region: state.region,
        autoPlayTrailers: state.autoPlayTrailers,
        showAdultContent: state.showAdultContent,
        compactMode: state.compactMode,
      }),
    }
  )
);
```

---

## 🚨 Error Handling

### Global Error Handling

```typescript
// src/shared/hooks/useGlobalError.ts
import { useAppStore } from '@/shared/stores/appStore';

export const useGlobalError = () => {
  const { setError, clearErrors } = useAppStore();

  const handleError = (error: any, context: string) => {
    console.error(`Error in ${context}:`, error);

    const errorMessage =
      error?.response?.data?.status_message ||
      error?.message ||
      'An unexpected error occurred';

    setError(context, errorMessage);

    // Auto-clear errors after 5 seconds
    setTimeout(() => {
      clearErrors();
    }, 5000);
  };

  return { handleError };
};
```

### Query Error Handling

```typescript
// src/features/movies/hooks/useMovies.ts
export const useMovies = (category: string, page: number = 1) => {
  const { handleError } = useGlobalError();

  return useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => movieApi.getMovies(category, page),
    onError: error => {
      handleError(error, `movies-${category}`);
    },
  });
};
```

---

## 📚 Additional Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [State Management Patterns](https://kentcdodds.com/blog/application-state-management-with-react)

---

## 🔄 Migration Guide

### From Redux to Zustand

If migrating from Redux:

1. **Replace Redux store** with Zustand store
2. **Update selectors** to use Zustand hooks
3. **Replace dispatch** with direct store actions
4. **Update middleware** to use Zustand middleware

### From SWR to TanStack Query

If migrating from SWR:

1. **Replace useSWR** with useQuery
2. **Update cache keys** to match TanStack Query format
3. **Replace SWRConfig** with QueryClient
4. **Update error handling** to use TanStack Query patterns
