# ⚡ Performance Guide

This document covers performance optimization techniques, bundle analysis, lazy loading strategies, and monitoring tools for the CineFlex application.

---

## 🎯 Performance Goals

### Core Web Vitals Targets

| Metric   | Target  | Description              |
| -------- | ------- | ------------------------ |
| **LCP**  | < 2.5s  | Largest Contentful Paint |
| **FID**  | < 100ms | First Input Delay        |
| **CLS**  | < 0.1   | Cumulative Layout Shift  |
| **FCP**  | < 1.8s  | First Contentful Paint   |
| **TTFB** | < 600ms | Time to First Byte       |

### Application Performance Targets

| Metric            | Target  | Description                  |
| ----------------- | ------- | ---------------------------- |
| **Bundle Size**   | < 500KB | Initial JavaScript bundle    |
| **Image Loading** | < 2s    | Time to load critical images |
| **API Response**  | < 200ms | Average API response time    |
| **Navigation**    | < 100ms | Client-side navigation       |
| **Search**        | < 300ms | Search results loading       |

---

## 📦 Bundle Optimization

### Code Splitting Strategy

```typescript
// src/App.tsx - Route-based code splitting
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const MoviesPage = lazy(() => import('@/pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('@/pages/MovieDetailsPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const WatchlistPage = lazy(() => import('@/pages/WatchlistPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </Suspense>
  );
}
```

### Component-Level Code Splitting

```typescript
// src/features/movies/components/MovieGrid/index.tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const MovieCard = lazy(() => import('../MovieCard'));
const MovieFilters = lazy(() => import('../MovieFilters'));

export const MovieGrid = ({ movies, loading }) => {
  if (loading) return <MovieGridSkeleton />;

  return (
    <div className="movie-grid">
      <Suspense fallback={<div>Loading filters...</div>}>
        <MovieFilters />
      </Suspense>

      <div className="movies-container">
        {movies.map(movie => (
          <Suspense key={movie.id} fallback={<MovieCardSkeleton />}>
            <MovieCard movie={movie} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};
```

### Dynamic Imports for Heavy Libraries

```typescript
// src/shared/utils/imageOptimization.ts
export const optimizeImage = async (url: string, options: ImageOptions) => {
  // Dynamically import heavy image processing library
  const { default: sharp } = await import('sharp');

  // Process image
  return sharp(url)
    .resize(options.width, options.height)
    .webp({ quality: options.quality })
    .toBuffer();
};
```

### Tree Shaking Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['zustand'],

          // Feature chunks
          movies: [
            '@/features/movies',
            '@/features/movies/components',
            '@/features/movies/hooks',
          ],
          search: ['@/features/search', '@/features/search/components'],
        },
      },
    },
  },
});
```

---

## 🖼️ Image Optimization

### Responsive Images

```typescript
// src/shared/utils/imageUtils.ts
export const getImageUrl = (path: string, size: string = 'w500') => {
  if (!path) return '/placeholder-poster.jpg';
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getResponsiveImageSrc = (path: string) => {
  if (!path) return '/placeholder-poster.jpg';

  return {
    src: getImageUrl(path, 'w500'),
    srcSet: [
      `${getImageUrl(path, 'w185')} 185w`,
      `${getImageUrl(path, 'w342')} 342w`,
      `${getImageUrl(path, 'w500')} 500w`,
      `${getImageUrl(path, 'w780')} 780w`,
    ].join(', '),
    sizes: '(max-width: 768px) 185px, (max-width: 1024px) 342px, 500px',
  };
};
```

### Lazy Loading Images

```typescript
// src/components/ui/LazyImage/index.tsx
import { useState, useRef, useEffect } from 'react';
import { useInView } from '@/shared/hooks/useInView';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = '/placeholder-poster.jpg',
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);
  const imgRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(imgRef);

  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src, isLoaded]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${className || ''}`}
      loading="lazy"
    />
  );
};
```

### Image Preloading

```typescript
// src/shared/hooks/useImagePreloader.ts
import { useEffect } from 'react';

export const useImagePreloader = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach(url => {
      if (url) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }, [imageUrls]);
};

// Usage in MovieGrid
export const MovieGrid = ({ movies }) => {
  const imageUrls = movies.map(movie =>
    getImageUrl(movie.poster_path, 'w500')
  );

  useImagePreloader(imageUrls);

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
```

---

## 🔄 Data Fetching Optimization

### Query Optimization

```typescript
// src/features/movies/hooks/useMovies.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export const useMovies = (category: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => movieApi.getMovies(category, page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Infinite scroll with virtualization
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
    gcTime: 10 * 60 * 1000,
  });
};
```

### Request Deduplication

```typescript
// src/shared/services/httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  timeout: 10000,
});

// Request deduplication
const pendingRequests = new Map();

httpClient.interceptors.request.use(
  config => {
    const requestKey = `${config.method}:${config.url}:${JSON.stringify(config.params)}`;

    if (pendingRequests.has(requestKey)) {
      return Promise.reject(new Error('Duplicate request cancelled'));
    }

    pendingRequests.set(requestKey, true);
    config.metadata = { requestKey };

    return config;
  },
  error => Promise.reject(error)
);

httpClient.interceptors.response.use(
  response => {
    const requestKey = response.config.metadata?.requestKey;
    if (requestKey) {
      pendingRequests.delete(requestKey);
    }
    return response;
  },
  error => {
    const requestKey = error.config?.metadata?.requestKey;
    if (requestKey) {
      pendingRequests.delete(requestKey);
    }
    return Promise.reject(error);
  }
);
```

### Background Refetching

```typescript
// src/shared/hooks/useBackgroundSync.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useBackgroundSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Refetch stale queries when tab becomes visible
        queryClient.invalidateQueries({
          predicate: query =>
            query.state.dataUpdatedAt < Date.now() - 5 * 60 * 1000,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [queryClient]);
};
```

---

## 🎨 Rendering Optimization

### React.memo for Expensive Components

```typescript
// src/features/movies/components/MovieCard/index.tsx
import { memo } from 'react';

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist: (movie: Movie) => void;
  isInWatchlist: boolean;
}

export const MovieCard = memo<MovieCardProps>(({ movie, onAddToWatchlist, isInWatchlist }) => {
  return (
    <div className="movie-card">
      <LazyImage
        src={getImageUrl(movie.poster_path)}
        alt={`${movie.title} poster`}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">{movie.vote_average}/10</p>
        <button
          onClick={() => onAddToWatchlist(movie)}
          className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
        >
          {isInWatchlist ? 'Remove' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';
```

### Virtual Scrolling for Large Lists

```typescript
// src/features/movies/components/VirtualMovieGrid/index.tsx
import { FixedSizeGrid as Grid } from 'react-window';
import { useVirtualizer } from '@tanstack/react-virtual';

interface VirtualMovieGridProps {
  movies: Movie[];
  containerHeight: number;
  containerWidth: number;
}

export const VirtualMovieGrid: React.FC<VirtualMovieGridProps> = ({
  movies,
  containerHeight,
  containerWidth,
}) => {
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(movies.length / 6), // 6 columns
    getScrollElement: () => document.querySelector('.movie-grid-container'),
    estimateSize: () => 400, // Estimated row height
  });

  return (
    <div
      className="movie-grid-container"
      style={{
        height: containerHeight,
        width: containerWidth,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * 6;
          const endIndex = Math.min(startIndex + 6, movies.length);
          const rowMovies = movies.slice(startIndex, endIndex);

          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="movie-row">
                {rowMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

### Debounced Search

```typescript
// src/features/search/hooks/useDebouncedSearch.ts
import { useState, useEffect } from 'react';

export const useDebouncedSearch = (delay: number = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return [searchTerm, setSearchTerm, debouncedTerm] as const;
};

// Usage in SearchBox
export const SearchBox = () => {
  const [searchTerm, setSearchTerm, debouncedTerm] = useDebouncedSearch(300);
  const { data, isLoading } = useSearch(debouncedTerm);

  return (
    <div className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
      />
      {isLoading && <LoadingSpinner />}
      {data && <SearchResults results={data.results} />}
    </div>
  );
};
```

---

## 📊 Performance Monitoring

### Core Web Vitals Monitoring

```typescript
// src/shared/utils/performance.ts
export const measureCoreWebVitals = () => {
  // LCP
  new PerformanceObserver(entryList => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
        // Send to analytics
        sendToAnalytics('LCP', entry.startTime);
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // FID
  new PerformanceObserver(entryList => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.processingStart - entry.startTime);
        sendToAnalytics('FID', entry.processingStart - entry.startTime);
      }
    }
  }).observe({ entryTypes: ['first-input'] });

  // CLS
  let clsValue = 0;
  new PerformanceObserver(entryList => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'layout-shift') {
        clsValue += (entry as any).value;
      }
    }
    console.log('CLS:', clsValue);
    sendToAnalytics('CLS', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};
```

### Bundle Size Monitoring

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // ... other plugins
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

### API Performance Monitoring

```typescript
// src/shared/services/httpClient.ts
httpClient.interceptors.request.use(
  config => {
    config.metadata = { startTime: performance.now() };
    return config;
  },
  error => Promise.reject(error)
);

httpClient.interceptors.response.use(
  response => {
    const duration = performance.now() - response.config.metadata.startTime;
    console.log(
      `API Request: ${response.config.url} - ${duration.toFixed(2)}ms`
    );

    // Send to analytics if slow
    if (duration > 1000) {
      sendToAnalytics('slow-api-request', {
        url: response.config.url,
        duration,
        status: response.status,
      });
    }

    return response;
  },
  error => {
    const duration = performance.now() - error.config?.metadata?.startTime;
    console.error(`API Error: ${error.config?.url} - ${duration.toFixed(2)}ms`);

    sendToAnalytics('api-error', {
      url: error.config?.url,
      duration,
      status: error.response?.status,
      message: error.message,
    });

    return Promise.reject(error);
  }
);
```

---

## 🚀 Caching Strategies

### Service Worker Caching

```typescript
// public/sw.js
const CACHE_NAME = 'cineflex-v1';
const STATIC_CACHE = 'cineflex-static-v1';
const API_CACHE = 'cineflex-api-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  const { request } = event;

  // Cache API responses
  if (request.url.includes('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            return response;
          }

          return fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
  }

  // Cache static assets
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request);
      })
    );
  }
});
```

### Memory Caching

```typescript
// src/shared/utils/cache.ts
class MemoryCache {
  private cache = new Map<
    string,
    { data: any; timestamp: number; ttl: number }
  >();

  set(key: string, data: any, ttl: number = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }
}

export const memoryCache = new MemoryCache();
```

---

## 📱 Mobile Optimization

### Touch Optimization

```css
/* src/styles/mobile.css */
@media (max-width: 768px) {
  /* Increase touch targets */
  .movie-card {
    min-height: 200px;
    min-width: 150px;
  }

  .button {
    min-height: 44px;
    min-width: 44px;
  }

  /* Optimize scrolling */
  .movie-grid {
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }

  /* Reduce animations on mobile */
  .movie-card:hover {
    transform: none;
  }
}
```

### PWA Optimization

```json
// public/manifest.json
{
  "name": "CineFlex",
  "short_name": "CineFlex",
  "description": "Modern Movie Discovery App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f0f0f",
  "theme_color": "#e50914",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🔧 Performance Tools

### Bundle Analyzer

```bash
# Analyze bundle size
npm run build
npm run analyze

# Or use webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/stats.json
```

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/movies
            http://localhost:3000/search
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Performance Budget

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // ... chunk configuration
        },
      },
    },
  },
  plugins: [
    // Performance budget plugin
    {
      name: 'performance-budget',
      generateBundle(options, bundle) {
        const totalSize = Object.values(bundle).reduce((acc, chunk) => {
          if (chunk.type === 'chunk') {
            return acc + chunk.code.length;
          }
          return acc;
        }, 0);

        const maxSize = 500 * 1024; // 500KB
        if (totalSize > maxSize) {
          throw new Error(`Bundle size ${totalSize} exceeds budget ${maxSize}`);
        }
      },
    },
  ],
});
```

---

## 📚 Additional Resources

- [Web Performance Best Practices](https://web.dev/performance/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
- [Core Web Vitals](https://web.dev/vitals/)
- [Bundle Analysis Tools](https://github.com/webpack-contrib/webpack-bundle-analyzer)

---

## 🔄 Performance Checklist

### Development Checklist

- [ ] **Code Splitting** - Implement route-based and component-based splitting
- [ ] **Image Optimization** - Use lazy loading and responsive images
- [ ] **Bundle Analysis** - Monitor bundle size and optimize chunks
- [ ] **Caching** - Implement proper caching strategies
- [ ] **Debouncing** - Add debouncing for search and scroll events
- [ ] **Virtualization** - Use virtual scrolling for large lists
- [ ] **Memoization** - Apply React.memo to expensive components

### Production Checklist

- [ ] **Core Web Vitals** - Monitor and optimize LCP, FID, CLS
- [ ] **CDN** - Use CDN for static assets
- [ ] **Compression** - Enable gzip/brotli compression
- [ ] **Service Worker** - Implement caching and offline support
- [ ] **Performance Monitoring** - Set up real user monitoring
- [ ] **Error Tracking** - Monitor performance-related errors
- [ ] **A/B Testing** - Test performance optimizations
