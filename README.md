# 🎬 CineFlex - Modern Movie Discovery App

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)

_A modern, performant movie discovery application built with React, TypeScript, and Vite_

[🚀 Live Demo](#) | [📖 Documentation](./docs/) | [🎨 Design System](./docs/DESIGN.md) | [🗺️ Roadmap](./docs/ROADMAP.md)

</div>

---

## 📋 Table of Contents

1. [🎯 Project Overview](#-project-overview)
2. [✨ Features](#-features)
3. [🏗️ Architecture](#️-architecture)
4. [🚀 Getting Started](#-getting-started)
5. [📂 Project Structure](#-project-structure)
6. [📚 Documentation](#-documentation)
7. [🔧 Development](#-development)
8. [📱 API Integration](#-api-integration)
9. [⚡ Performance](#-performance)
10. [🧪 Testing](#-testing)
11. [🚢 Deployment](#-deployment)
12. [🤝 Contributing](#-contributing)
13. [📄 License](#-license)

---

## 🎯 Project Overview

**CineFlex** is a modern movie discovery application built with React 18, TypeScript, and Vite. Browse, search, and explore movies from The Movie Database (TMDB) with a fast, responsive interface inspired by modern streaming platforms.

### 🎯 Perfect For

- **Learning modern React** development patterns
- **Building a portfolio** project
- **Showcasing frontend skills** to employers
- **Practicing TypeScript** and modern tooling

---

## ✨ Features

### 🎬 Core Features

- **Movie Discovery**: Browse trending, popular, and top-rated movies
- **Advanced Search**: Real-time search with filters and smart suggestions
- **Movie Details**: Comprehensive information including cast, crew, reviews
- **Responsive Grid**: Adaptive layouts optimized for all screen sizes
- **Infinite Scroll**: Smooth pagination with virtualized lists
- **Watchlist Management**: Personal movie collection with localStorage
- **Theme Support**: Dark/Light theme with system preference detection

### 🔍 Advanced Features

- **Smart Filtering**: Genre, year, rating, and language filters
- **Sort Options**: Multiple sorting criteria (popularity, rating, release date)
- **Movie Trailers**: Integrated video player for trailers and clips
- **Similar Movies**: AI-powered recommendation engine
- **Search History**: Recent searches with quick access
- **Offline Support**: Service worker caching for core functionality

### 🎨 UI/UX Features

- **Modern Interface**: Clean, minimalist design with smooth animations
- **Loading States**: Skeleton screens and progressive loading
- **Error Boundaries**: Graceful error handling with recovery options
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **PWA Support**: Installable app with offline capabilities

---

## 🏗️ Architecture

### 🏛️ Technical Stack

| Layer                | Technology        | Purpose                                       |
| -------------------- | ----------------- | --------------------------------------------- |
| **Build Tool**       | Vite 5.0+         | Lightning-fast development and building       |
| **Framework**        | React 18+         | Modern UI library with concurrent features    |
| **Language**         | TypeScript 5.0+   | Type safety and enhanced developer experience |
| **Styling**          | CSS Modules       | Scoped, maintainable styling approach         |
| **State Management** | Zustand           | Lightweight, intuitive state management       |
| **Data Fetching**    | TanStack Query    | Powerful server state management              |
| **Routing**          | React Router 6+   | Declarative routing with data loading         |
| **Testing**          | Vitest + RTL      | Fast, modern testing framework                |
| **Linting**          | ESLint + Prettier | Code quality and consistency                  |

### 🎯 Key Design Principles

1. **Component-First Architecture**: Reusable, composable components
2. **Feature-Based Organization**: Domain-driven folder structure
3. **Performance by Design**: Code splitting and optimization built-in
4. **Type-Safe Development**: Comprehensive TypeScript coverage
5. **Accessibility First**: WCAG compliance from the ground up
6. **Mobile-First Responsive**: Progressive enhancement approach

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js**: 18.0+ (LTS recommended)
- **npm**: 9.0+ or **yarn**: 3.0+
- **TMDB API Key**: [Get your free key](https://www.themoviedb.org/settings/api)

### ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/cineflex.git
cd cineflex

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your TMDB API key to .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### 🔑 Environment Setup

#### **Required Setup**

1. **Copy the example environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Get your TMDB API key:**
   - Visit [The Movie Database](https://www.themoviedb.org/settings/api)
   - Sign up for a free account
   - Generate an API key
   - Copy the API key to your `.env` file

3. **Update your `.env` file:**

   ```env
   # TMDB API Configuration (REQUIRED)
   VITE_TMDB_API_KEY=your_actual_api_key_here

   # Optional: Override defaults if needed
   VITE_TMDB_API_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

#### **Environment Variables Reference**

| Variable                   | Required | Default                        | Description                  |
| -------------------------- | -------- | ------------------------------ | ---------------------------- |
| `VITE_TMDB_API_KEY`        | ✅ Yes   | -                              | Your TMDB API key            |
| `VITE_TMDB_API_URL`        | ❌ No    | `https://api.themoviedb.org/3` | TMDB API base URL            |
| `VITE_TMDB_IMAGE_BASE_URL` | ❌ No    | `https://image.tmdb.org/t/p`   | TMDB image base URL          |
| `VITE_APP_NAME`            | ❌ No    | `CineFlex`                     | Application name             |
| `VITE_DEBUG_MODE`          | ❌ No    | `false`                        | Enable debug mode            |
| `VITE_USE_MOCK_DATA`       | ❌ No    | `false`                        | Use mock data instead of API |

#### **Environment File Types**

- **`.env`** - Local development (gitignored)
- **`.env.local`** - Local overrides (gitignored)
- **`.env.development`** - Development-specific settings
- **`.env.production`** - Production-specific settings
- **`.env.example`** - Template file (committed to git)

#### **TypeScript Support**

Environment variables are fully typed with TypeScript. Import them from the utils:

```typescript
import { tmdbConfig, appConfig, validateEnvironment } from '@/utils/env';

// Validate environment on app startup
validateEnvironment();

// Use typed environment variables
const apiKey = tmdbConfig.apiKey;
const appName = appConfig.name;
```

---

## 📂 Project Structure

Our project follows a feature-based architecture with clear separation of concerns:

```
src/
├── 📁 components/              # Reusable UI components
│   ├── 📁 ui/                  # Basic UI primitives
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── ...
│   ├── 📁 layout/              # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── ...
│   └── 📁 common/              # Shared components
│       ├── Loading/
│       ├── ErrorBoundary/
│       └── ...
│
├── 📁 features/                # Feature-based modules
│   ├── 📁 movies/
│   │   ├── 📁 components/
│   │   │   ├── MovieCard/
│   │   │   ├── MovieGrid/
│   │   │   └── MovieDetails/
│   │   ├── 📁 hooks/
│   │   │   ├── useMovies.ts
│   │   │   ├── useMovieDetails.ts
│   │   │   └── useMovieSearch.ts
│   │   ├── 📁 services/
│   │   │   └── movieApi.ts
│   │   ├── 📁 types/
│   │   │   └── movie.types.ts
│   │   └── 📁 utils/
│   │       └── movieUtils.ts
│   ├── 📁 search/
│   ├── 📁 watchlist/
│   └── 📁 user/
│
├── 📁 shared/                  # Shared utilities and configurations
│   ├── 📁 hooks/               # Global custom hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useInfiniteScroll.ts
│   ├── 📁 services/            # API and external services
│   │   ├── api.ts
│   │   ├── httpClient.ts
│   │   └── cache.ts
│   ├── 📁 stores/              # Global state management
│   │   ├── appStore.ts
│   │   ├── themeStore.ts
│   │   └── userStore.ts
│   ├── 📁 types/               # Global TypeScript definitions
│   │   ├── api.types.ts
│   │   ├── common.types.ts
│   │   └── index.ts
│   ├── 📁 utils/               # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   ├── 📁 constants/           # Application constants
│   │   ├── api.ts
│   │   ├── routes.ts
│   │   └── theme.ts
│   └── 📁 config/              # Configuration files
│       ├── env.ts
│       └── app.ts
│
├── 📁 pages/                   # Page-level components
│   ├── HomePage/
│   ├── MoviesPage/
│   ├── MovieDetailsPage/
│   ├── SearchPage/
│   └── WatchlistPage/
│
├── 📁 styles/                  # Global styles and themes
│   ├── globals.css
│   ├── variables.css
│   ├── themes.css
│   └── reset.css
│
├── 📁 assets/                  # Static assets
│   ├── 📁 images/
│   ├── 📁 icons/
│   └── 📁 fonts/
│
├── 📁 tests/                   # Test utilities and setup
│   ├── setup.ts
│   ├── mocks/
│   └── utils/
│
├── App.tsx                     # Root application component
├── main.tsx                    # Application entry point
└── vite-env.d.ts              # Vite type definitions
```

### 📁 Folder Conventions

- **Components**: Pascal case (e.g., `MovieCard/`)
- **Files**: Camel case for TypeScript, kebab-case for CSS
- **Styles**: Co-located with components using CSS Modules
- **Tests**: Adjacent to components with `.test.tsx` suffix
- **Types**: Grouped by feature with `.types.ts` suffix

---

## 📚 Documentation

This project includes comprehensive documentation to help you understand, develop, and contribute to CineFlex:

### 📖 **Available Documentation**

| Document                                       | Purpose              | Description                                                                          |
| ---------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------ |
| **[🎨 DESIGN.md](./docs/DESIGN.md)**           | Design System        | Complete design system with colors, typography, components, and implementation guide |
| **[🗺️ ROADMAP.md](./docs/ROADMAP.md)**         | Development Plan     | 12-week development roadmap with detailed phases, milestones, and learning resources |
| **[📡 API.md](./docs/API.md)**                 | API Integration      | TMDB API integration guide, endpoints, patterns, and best practices                  |
| **[🌍 ENVIRONMENT.md](./docs/ENVIRONMENT.md)** | Environment Setup    | Environment configuration, setup procedures, and troubleshooting                     |
| **[🧩 COMPONENTS.md](./docs/COMPONENTS.md)**   | Component Library    | Component usage, props, patterns, and accessibility guidelines                       |
| **[🗃️ STATE.md](./docs/STATE.md)**             | State Management     | Zustand stores, TanStack Query patterns, and state management strategies             |
| **[🧪 TESTING.md](./docs/TESTING.md)**         | Testing Strategy     | Testing patterns, component testing, and quality assurance                           |
| **[⚡ PERFORMANCE.md](./docs/PERFORMANCE.md)** | Performance Guide    | Optimization techniques, bundle analysis, and monitoring tools                       |
| **[🔄 WORKFLOW.md](./docs/WORKFLOW.md)**       | Development Workflow | Git workflow, code review process, and deployment pipeline                           |

### 🎨 **Design System Documentation**

> **📖 Complete Design Documentation: [docs/DESIGN.md](./docs/DESIGN.md)**

For all design-related decisions, implementation details, and visual guidelines, refer to our comprehensive design system guide:

#### 🎯 **What's in DESIGN.md:**

- **🌈 Complete Color System** - Netflix-inspired dark theme with exact CSS variables
- **📝 Typography Hierarchy** - Inter font with 4pt-grid based type scale
- **📏 4-Point Spacing System** - Modern, scalable spacing with usage guidelines
- **🧩 Component Design** - Ready-to-use CSS for movie cards, buttons, search, etc.
- **📱 Responsive Framework** - Mobile-first breakpoints and grid systems
- **🎭 Visual Effects** - Shadows, animations, loading states
- **🎨 Implementation Guide** - Copy-paste CSS and component examples

#### 🚀 **Quick Start:**

1. **Copy the design system CSS** from DESIGN.md
2. **Follow the 4pt spacing rules** - use only values divisible by 4
3. **Use the provided color variables** - never hardcode colors
4. **Reference component examples** - all components are pre-designed

**💡 Design Philosophy**: Dark-first, content-centric, Netflix-inspired aesthetic with modern 2025 UI trends.

### 🗺️ **Development Roadmap**

> **📖 Complete Development Plan: [docs/ROADMAP.md](./docs/ROADMAP.md)**

The roadmap provides a comprehensive 12-week development journey with detailed phases, milestones, and learning resources:

#### 🎯 **What's in ROADMAP.md:**

- **📅 12-Week Timeline** - Detailed development phases and milestones
- **🏗️ Phase-by-Phase Guide** - Step-by-step development instructions
- **📊 Success Metrics** - Performance targets and quality standards
- **⚠️ Risk Management** - Potential challenges and mitigation strategies
- **📚 Learning Resources** - Essential reading, tutorials, and tools
- **🎯 Milestones** - Clear deliverables for each development phase

#### 🚀 **Quick Start:**

1. **Review the roadmap** to understand the development journey
2. **Follow the phases** in order for best results
3. **Reference learning resources** when you need help
4. **Track your progress** against the milestones

**💡 Development Philosophy**: Structured, incremental development with clear goals and measurable outcomes.

### 📚 **Complete Documentation Suite**

All documentation follows consistent formatting and includes practical examples. Each guide provides:

- **🎯 Clear Purpose** - What the document covers and when to use it
- **📝 Practical Examples** - Code snippets and implementation patterns
- **🔧 Best Practices** - Recommended approaches and conventions
- **🚨 Troubleshooting** - Common issues and solutions
- **📚 Additional Resources** - Links to external documentation and tools

---

## 🔧 Development

### 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking

# Testing
npm run test             # Run tests
npm run test:coverage    # Generate coverage report
```

### 🎯 Development Guidelines

#### Component Development

```typescript
// ✅ Good: Well-structured component with TypeScript
interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist: (movieId: number) => void;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onAddToWatchlist,
  className
}) => {
  return (
    <article className={`${styles.card} ${className}`}>
      <img
        src={movie.poster_path}
        alt={movie.title}
        loading="lazy"
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.overview}>{movie.overview}</p>
        <button
          onClick={() => onAddToWatchlist(movie.id)}
          className={styles.button}
        >
          Add to Watchlist
        </button>
      </div>
    </article>
  );
};
```

#### Hook Development

```typescript
// ✅ Good: Custom hook with proper typing and error handling
export const useMovies = (category: MovieCategory = 'popular') => {
  return useQuery({
    queryKey: ['movies', category],
    queryFn: () => movieApi.getMovies(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
```

---

## 📱 API Integration

### 🌐 TMDB API Integration

The application uses **The Movie Database (TMDB)** API for all movie data:

#### 🔌 API Features

- **Type-safe requests** with TypeScript interfaces
- **Automatic caching** with TanStack Query
- **Error handling** with user-friendly fallbacks
- **Rate limiting** respect for API limits

#### 🔧 API Service Example

```typescript
// Custom hook for fetching movies
export const useMovies = (category: string) => {
  return useQuery({
    queryKey: ['movies', category],
    queryFn: () => fetchMovies(category),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// API service function
const fetchMovies = async (category: string) => {
  const response = await fetch(
    `${VITE_TMDB_API_URL}/movie/${category}?api_key=${VITE_TMDB_API_KEY}`
  );
  return response.json();
};
```

#### 📡 Available Endpoints

- **Popular Movies**: Trending and popular content
- **Movie Details**: Complete information including cast
- **Search**: Real-time movie search
- **Genres**: Movie categories and filtering

---

## ⚡ Performance

### 🚀 Performance Features

The application includes several performance optimizations:

#### 🎯 Built-in Optimizations

- **Code Splitting**: Automatic route-based splitting with Vite
- **Image Optimization**: Lazy loading and responsive images
- **Caching**: Smart API response caching with TanStack Query
- **Minification**: Automatic bundling and compression
- **Modern Format**: ES modules and modern JavaScript

#### 📊 Performance Targets

- **Lighthouse Score**: 90+ on all metrics
- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 3s

#### 🔧 Key Implementations

```typescript
// Lazy loading pages
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));

// Optimized image loading
<img loading="lazy" src={posterUrl} alt={movie.title} />

// Memoized expensive components
const MemoizedMovieCard = React.memo(MovieCard);
```

---

## 🧪 Testing

### 🧪 Testing Strategy

The application uses **Vitest** and **React Testing Library** for fast, reliable testing:

#### 🛠️ Testing Stack

- **Vitest**: Modern testing framework
- **React Testing Library**: Component testing
- **TypeScript**: Type-safe test development

#### 🎯 Test Coverage

- **Components**: User interactions and rendering
- **Hooks**: Data fetching and state management
- **Utilities**: Helper functions and formatters

#### 📝 Running Tests

```bash
npm run test              # Run all tests
npm run test:coverage     # Generate coverage report
```

#### Example Component Test

```typescript
import { render } from '@testing-library/react';
import { MovieCard } from './MovieCard';

test('renders movie information', () => {
  const movie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test overview'
  };

  const { getByText } = render(<MovieCard movie={movie} />);
  expect(getByText('Test Movie')).toBeInTheDocument();
});
```

---

## 🚢 Deployment

### 🌐 Deployment with Netlify

The application is optimized for **Netlify deployment** with zero-configuration setup:

#### 🚀 Why Netlify?

- **Zero-config deployment** from Git repositories
- **Automatic HTTPS** with custom domain support
- **Deploy previews** for every pull request
- **Global CDN** with intelligent caching
- **Built-in CI/CD** pipeline
- **Environment variable management**

### 🚀 Quick Netlify Deployment Guide

#### Option 1: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/cineflex)

#### Option 2: Manual Setup

1. **Push your code** to GitHub
2. **Visit** [netlify.com](https://app.netlify.com) and sign in
3. **Click "New site from Git"**
4. **Select your repository**
5. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`
6. **Add environment variables** in Site Settings > Environment Variables:
   ```bash
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_TMDB_API_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```
7. **Deploy!** Your site will be live in minutes

#### Automatic Deployment

- **Push to main branch** → Automatic production deployment
- **Create pull request** → Automatic deploy preview
- **Push to other branches** → Branch deploy (optional)

### 🔒 Environment Variables

**Required for Netlify deployment:**

```bash
# TMDB API (Required)
VITE_TMDB_API_KEY=your_tmdb_api_key

# Optional Configuration
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
VITE_APP_NAME=CineFlex
```

**Where to set them:**

- **Netlify Dashboard**: Site Settings > Environment Variables
- **Local Development**: Create `.env` file in project root

---

## 🤝 Contributing

We welcome contributions to CineFlex! Please follow these guidelines:

### 📝 Development Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### 📋 Contribution Guidelines

#### Code Standards

- **TypeScript**: All new code must be written in TypeScript
- **Testing**: Minimum 80% test coverage for new features
- **Documentation**: Update README and JSDoc comments
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Performance**: Consider performance impact of changes

#### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add movie trailer functionality
fix: resolve search pagination bug
docs: update API documentation
style: improve mobile responsiveness
test: add integration tests for watchlist
refactor: optimize movie grid performance
```

### 🐛 Bug Reports

When reporting bugs, please include:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Console errors

### 💡 Feature Requests

For new features, please describe:

- Use case and motivation
- Proposed solution
- Alternative approaches considered
- Implementation complexity

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- **TMDB** for providing the comprehensive movie database API
- **React Team** for the amazing React library and ecosystem
- **Vite Team** for the incredible build tool
- **Open Source Community** for the fantastic libraries and tools

---

<div align="center">

### 🌟 Show Your Support

If this project helped you, please consider giving it a ⭐ on GitHub!

**Made with ❤️ by [Your Name]**

[🔝 Back to Top](#-cineflex---modern-movie-discovery-app)

</div>
