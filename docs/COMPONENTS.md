# 🧩 Component Library Documentation

This document covers all available components in the CineFlex application, including their props, usage examples, and best practices.

---

## 📋 Component Overview

### Component Categories

| Category    | Description                   | Location                     |
| ----------- | ----------------------------- | ---------------------------- |
| **Layout**  | Page structure and navigation | `src/components/layout/`     |
| **UI**      | Reusable UI primitives        | `src/components/ui/`         |
| **Common**  | Shared components             | `src/components/common/`     |
| **Feature** | Feature-specific components   | `src/features/*/components/` |

---

## 🏗️ Layout Components

### Navigation

**Location:** `src/components/layout/Navigation/`

**Description:** Main navigation bar with routing and active state detection.

**Props:**

```typescript
// No props - uses internal routing logic
```

**Usage:**

```tsx
import Navigation from '@/components/layout/Navigation';

function App() {
  return (
    <div className='app'>
      <Navigation />
      {/* Other content */}
    </div>
  );
}
```

**Features:**

- ✅ Active route highlighting
- ✅ Responsive design
- ✅ Netflix-inspired styling
- ✅ CSS Modules implementation
- ✅ Hover effects and transitions

**CSS Classes:**

```css
.nav - Main navigation container
.container - Navigation content wrapper
.link - Navigation link styling
.active - Active link state
```

---

## 🎨 UI Components

### Button

**Location:** `src/components/ui/Button/`

**Description:** Reusable button component with multiple variants and states.

**Props:**

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

**Usage:**

```tsx
import Button from '@/components/ui/Button';

// Primary button
<Button variant="primary" onClick={handleClick}>
  Watch Now
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Add to Watchlist
</Button>

// Loading state
<Button loading disabled>
  Loading...
</Button>
```

**Variants:**

- `primary` - Netflix red, main CTA
- `secondary` - Gray background
- `outline` - Bordered style
- `ghost` - Transparent background

**Sizes:**

- `sm` - Small (32px height)
- `md` - Medium (40px height)
- `lg` - Large (48px height)

### Input

**Location:** `src/components/ui/Input/`

**Description:** Form input component with validation states.

**Props:**

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
```

**Usage:**

```tsx
import Input from '@/components/ui/Input';

<Input
  type='search'
  placeholder='Search movies...'
  value={searchQuery}
  onChange={setSearchQuery}
  error={searchError}
/>;
```

### Modal

**Location:** `src/components/ui/Modal/`

**Description:** Modal dialog component for overlays and popups.

**Props:**

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}
```

**Usage:**

```tsx
import Modal from '@/components/ui/Modal';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title='Movie Details'
  size='lg'
>
  <MovieDetailsContent movie={selectedMovie} />
</Modal>;
```

### Loading

**Location:** `src/components/ui/Loading/`

**Description:** Loading indicators and skeleton components.

**Components:**

- `Spinner` - Circular loading indicator
- `Skeleton` - Content placeholder
- `SkeletonText` - Text placeholder
- `SkeletonCard` - Card placeholder

**Usage:**

```tsx
import { Spinner, Skeleton, SkeletonCard } from '@/components/ui/Loading';

// Spinner
<Spinner size="md" />

// Skeleton
<Skeleton className="w-full h-32" />

// Skeleton card
<SkeletonCard />

// Skeleton text
<SkeletonText lines={3} />
```

---

## 🎬 Feature Components

### MovieCard

**Location:** `src/features/movies/components/MovieCard/`

**Description:** Movie card component for displaying movie information.

**Props:**

```typescript
interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist?: (movie: Movie) => void;
  onRemoveFromWatchlist?: (movieId: number) => void;
  isInWatchlist?: boolean;
  className?: string;
}
```

**Usage:**

```tsx
import MovieCard from '@/features/movies/components/MovieCard';

<MovieCard
  movie={movie}
  onAddToWatchlist={addToWatchlist}
  isInWatchlist={isInWatchlist}
/>;
```

**Features:**

- ✅ Movie poster display
- ✅ Title and metadata
- ✅ Rating display
- ✅ Watchlist integration
- ✅ Hover effects
- ✅ Responsive design

### MovieGrid

**Location:** `src/features/movies/components/MovieGrid/`

**Description:** Responsive grid layout for displaying movie cards.

**Props:**

```typescript
interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}
```

**Usage:**

```tsx
import MovieGrid from '@/features/movies/components/MovieGrid';

<MovieGrid
  movies={movies}
  loading={isLoading}
  error={error}
  onLoadMore={loadMoreMovies}
  hasMore={hasMorePages}
/>;
```

**Features:**

- ✅ Responsive grid (2→6 columns)
- ✅ Infinite scroll support
- ✅ Loading states
- ✅ Error handling
- ✅ 4pt grid spacing

### SearchBox

**Location:** `src/features/search/components/SearchBox/`

**Description:** Search input with debouncing and suggestions.

**Props:**

```typescript
interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  loading?: boolean;
  className?: string;
}
```

**Usage:**

```tsx
import SearchBox from '@/features/search/components/SearchBox';

<SearchBox
  value={searchQuery}
  onChange={setSearchQuery}
  onSearch={handleSearch}
  suggestions={searchSuggestions}
  loading={isSearching}
/>;
```

---

## 🎨 Design System Integration

### Using Design System Classes

All components use the design system CSS variables and utility classes:

```tsx
// Using design system colors
<div className="bg-secondary text-primary">
  Content
</div>

// Using design system spacing
<div className="p-6 mb-4">
  Content
</div>

// Using design system typography
<h1 className="heading-1">Title</h1>
<p className="body-large">Description</p>
```

### CSS Modules Pattern

Components use CSS Modules for scoped styling:

```tsx
// Component file
import styles from './Component.module.css';

export const Component = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  );
};
```

```css
/* Component.module.css */
.container {
  background: var(--bg-secondary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}

.title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}
```

---

## ♿ Accessibility Guidelines

### ARIA Labels

All interactive components include proper ARIA labels:

```tsx
<Button aria-label='Add movie to watchlist' onClick={addToWatchlist}>
  <HeartIcon />
</Button>
```

### Keyboard Navigation

Components support keyboard navigation:

```tsx
// Modal with keyboard support
<Modal isOpen={isOpen} onClose={onClose} closeOnEscape={true}>
  {/* Modal content */}
</Modal>
```

### Focus Management

Proper focus management for modals and overlays:

```tsx
// Focus trap for modal
useEffect(() => {
  if (isOpen) {
    // Trap focus within modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    // Focus management logic
  }
}, [isOpen]);
```

---

## 🧪 Testing Components

### Component Testing Pattern

```tsx
// src/components/ui/Button/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    render(<Button variant='primary'>Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');
  });
});
```

### Testing with Design System

```tsx
// Test design system integration
it('uses design system colors', () => {
  render(<Button variant='primary'>Button</Button>);
  const button = screen.getByRole('button');

  expect(button).toHaveStyle({
    backgroundColor: 'var(--accent-red)',
    color: 'var(--text-primary)',
  });
});
```

---

## 📱 Responsive Design

### Mobile-First Approach

All components follow mobile-first responsive design:

```css
/* Base styles (mobile) */
.component {
  padding: var(--space-4);
  font-size: var(--text-base);
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: var(--space-6);
    font-size: var(--text-lg);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: var(--space-8);
    font-size: var(--text-xl);
  }
}
```

### Breakpoint System

Using design system breakpoints:

```tsx
// Responsive grid
<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
  {movies.map(movie => (
    <MovieCard key={movie.id} movie={movie} />
  ))}
</div>
```

---

## 🎯 Best Practices

### Component Composition

Prefer composition over inheritance:

```tsx
// Good: Composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Avoid: Inheritance
<CardWithTitleAndButton title="Title" buttonText="Action" />
```

### Props Interface

Always define clear prop interfaces:

```tsx
interface ComponentProps {
  // Required props
  title: string;
  onAction: () => void;

  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;

  // HTML attributes
  className?: string;
  'aria-label'?: string;
}
```

### Error Boundaries

Wrap components in error boundaries:

```tsx
// src/components/common/ErrorBoundary/index.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

### Performance Optimization

Use React.memo for expensive components:

```tsx
import { memo } from 'react';

export const MovieCard = memo<MovieCardProps>(({ movie, ...props }) => {
  return <div className='movie-card'>{/* Component content */}</div>;
});

MovieCard.displayName = 'MovieCard';
```

---

## 🔄 Component Lifecycle

### Component States

Components should handle these states:

1. **Loading** - Initial data fetching
2. **Empty** - No data available
3. **Error** - Something went wrong
4. **Success** - Data loaded successfully

```tsx
const MovieList = ({ movies, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!movies?.length) return <EmptyState />;

  return <MovieGrid movies={movies} />;
};
```

### State Management

Use appropriate state management for components:

- **Local state** - Component-specific data
- **Context** - Shared data across components
- **Zustand** - Global application state
- **TanStack Query** - Server state

---

## 📚 Additional Resources

- [React Component Patterns](https://reactpatterns.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Design System Best Practices](https://www.designsystems.com/)

---

## 🔄 Component Updates

### Versioning

Components follow semantic versioning:

- **Major** - Breaking changes
- **Minor** - New features
- **Patch** - Bug fixes

### Migration Guide

When components are updated, migration guides will be provided in the component documentation.

### Deprecation Policy

Components will be deprecated with:

1. **Warning** - Component marked as deprecated
2. **Migration period** - Time to migrate to new component
3. **Removal** - Component removed from library
