# 🌍 Environment Setup Guide

This document covers environment configuration, setup procedures, and troubleshooting for the CineFlex application.

---

## 🔧 Environment Variables

### Required Variables

| Variable            | Description                                    | Example                   |
| ------------------- | ---------------------------------------------- | ------------------------- |
| `VITE_TMDB_API_KEY` | Your TMDB API key (required for all API calls) | `eyJhbGciOiJIUzI1NiJ9...` |

### Optional Variables

| Variable                             | Description                       | Default Value                  |
| ------------------------------------ | --------------------------------- | ------------------------------ |
| `VITE_TMDB_API_URL`                  | TMDB API base URL                 | `https://api.themoviedb.org/3` |
| `VITE_TMDB_IMAGE_BASE_URL`           | TMDB image base URL               | `https://image.tmdb.org/t/p`   |
| `VITE_APP_NAME`                      | Application name                  | `CineFlex`                     |
| `VITE_APP_VERSION`                   | Application version               | `0.0.0`                        |
| `VITE_APP_DESCRIPTION`               | Application description           | `Modern Movie Discovery App`   |
| `VITE_APP_URL`                       | Application URL                   | `http://localhost:5173`        |
| `VITE_DEBUG_MODE`                    | Enable debug mode                 | `false`                        |
| `VITE_USE_MOCK_DATA`                 | Use mock data instead of API      | `false`                        |
| `VITE_DEV_PORT`                      | Development server port           | `5173`                         |
| `VITE_ENABLE_ANALYTICS`              | Enable analytics                  | `false`                        |
| `VITE_ENABLE_PWA`                    | Enable PWA features               | `false`                        |
| `VITE_ENABLE_OFFLINE_MODE`           | Enable offline support            | `false`                        |
| `VITE_GA_TRACKING_ID`                | Google Analytics tracking ID      | ``                             |
| `VITE_PLAUSIBLE_DOMAIN`              | Plausible Analytics domain        | ``                             |
| `VITE_TWITTER_HANDLE`                | Twitter handle for social sharing | `@cineflex`                    |
| `VITE_SOCIAL_IMAGE_URL`              | Social media image URL            | ``                             |
| `VITE_ENABLE_PERFORMANCE_MONITORING` | Enable performance monitoring     | `false`                        |
| `VITE_API_CACHE_DURATION`            | API cache duration in seconds     | `300`                          |
| `VITE_CSP_NONCE`                     | Content Security Policy nonce     | ``                             |
| `VITE_TEST_MODE`                     | Enable test mode                  | `false`                        |
| `VITE_TEST_API_KEY`                  | Test API key for testing          | ``                             |
| `VITE_NODE_ENV`                      | Node environment                  | `development`                  |
| `VITE_BUILD_TIME`                    | Build timestamp                   | ``                             |
| `VITE_GIT_COMMIT_HASH`               | Git commit hash                   | ``                             |

---

## 🚀 Setup Instructions

### 1. Get TMDB API Key

1. Visit [The Movie Database](https://www.themoviedb.org/settings/api)
2. Sign up for a free account
3. Navigate to "API" section
4. Generate a new API key
5. Copy the API key

### 2. Create Environment Files

#### Development Environment (`.env`)

```env
# TMDB API Configuration (REQUIRED)
VITE_TMDB_API_KEY=your_actual_api_key_here

# Optional: Override defaults if needed
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Application Configuration
VITE_APP_NAME=CineFlex
VITE_APP_VERSION=0.0.0
VITE_APP_DESCRIPTION=Modern Movie Discovery App
VITE_APP_URL=http://localhost:5173

# Development Settings
VITE_DEBUG_MODE=true
VITE_USE_MOCK_DATA=false
VITE_DEV_PORT=5173

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=false
VITE_ENABLE_OFFLINE_MODE=false
VITE_ENABLE_PERFORMANCE_MONITORING=false

# Analytics (Optional)
VITE_GA_TRACKING_ID=
VITE_PLAUSIBLE_DOMAIN=

# Social Media
VITE_TWITTER_HANDLE=@cineflex
VITE_SOCIAL_IMAGE_URL=

# Performance
VITE_API_CACHE_DURATION=300

# Security
VITE_CSP_NONCE=

# Testing
VITE_TEST_MODE=false
VITE_TEST_API_KEY=

# Build Information
VITE_NODE_ENV=development
VITE_BUILD_TIME=
VITE_GIT_COMMIT_HASH=
```

#### Production Environment (`.env.production`)

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=your_production_api_key_here

# Application Configuration
VITE_APP_NAME=CineFlex
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Modern Movie Discovery App
VITE_APP_URL=https://your-domain.com

# Production Settings
VITE_DEBUG_MODE=false
VITE_USE_MOCK_DATA=false

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=true
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_PERFORMANCE_MONITORING=true

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_PLAUSIBLE_DOMAIN=your-domain.com

# Social Media
VITE_TWITTER_HANDLE=@cineflex
VITE_SOCIAL_IMAGE_URL=https://your-domain.com/og-image.jpg

# Performance
VITE_API_CACHE_DURATION=600

# Security
VITE_CSP_NONCE=your-csp-nonce

# Build Information
VITE_NODE_ENV=production
VITE_BUILD_TIME=2024-01-01T00:00:00Z
VITE_GIT_COMMIT_HASH=abc123def456
```

#### Example Environment (`.env.example`)

```env
# TMDB API Configuration (REQUIRED)
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Optional: Override defaults if needed
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Application Configuration
VITE_APP_NAME=CineFlex
VITE_APP_VERSION=0.0.0
VITE_APP_DESCRIPTION=Modern Movie Discovery App
VITE_APP_URL=http://localhost:5173

# Development Settings
VITE_DEBUG_MODE=false
VITE_USE_MOCK_DATA=false
VITE_DEV_PORT=5173

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=false
VITE_ENABLE_OFFLINE_MODE=false
VITE_ENABLE_PERFORMANCE_MONITORING=false

# Analytics (Optional)
VITE_GA_TRACKING_ID=
VITE_PLAUSIBLE_DOMAIN=

# Social Media
VITE_TWITTER_HANDLE=@cineflex
VITE_SOCIAL_IMAGE_URL=

# Performance
VITE_API_CACHE_DURATION=300

# Security
VITE_CSP_NONCE=

# Testing
VITE_TEST_MODE=false
VITE_TEST_API_KEY=

# Build Information
VITE_NODE_ENV=development
VITE_BUILD_TIME=
VITE_GIT_COMMIT_HASH=
```

---

## 🔍 Environment Validation

### Automatic Validation

The application automatically validates required environment variables on startup:

```typescript
// src/utils/env.ts
export function validateEnvironment(): void {
  const missingVars: string[] = [];

  // Check required environment variables
  if (
    !requiredEnvVars.TMDB_API_KEY ||
    requiredEnvVars.TMDB_API_KEY === 'your_tmdb_api_key_here'
  ) {
    missingVars.push('VITE_TMDB_API_KEY');
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set.'
    );
  }
}
```

### Manual Validation

You can manually validate your environment setup:

```bash
# Check if environment variables are loaded
npm run validate-env

# Or run the validation in your code
import { validateEnvironment } from '@/utils/env';

try {
  validateEnvironment();
  console.log('✅ Environment validation passed');
} catch (error) {
  console.error('❌ Environment validation failed:', error.message);
}
```

---

## 🛠️ Environment Utilities

### Type-Safe Environment Access

```typescript
// src/utils/env.ts
export const tmdbConfig = {
  apiKey: requiredEnvVars.TMDB_API_KEY,
  apiUrl: optionalEnvVars.TMDB_API_URL,
  imageBaseUrl: optionalEnvVars.TMDB_IMAGE_BASE_URL,
} as const;

export const appConfig = {
  name: optionalEnvVars.APP_NAME,
  version: optionalEnvVars.APP_VERSION,
  description: optionalEnvVars.APP_DESCRIPTION,
  url: optionalEnvVars.APP_URL,
} as const;

export const featureFlags = {
  analytics: optionalEnvVars.ENABLE_ANALYTICS,
  pwa: optionalEnvVars.ENABLE_PWA,
  offlineMode: optionalEnvVars.ENABLE_OFFLINE_MODE,
  performanceMonitoring: optionalEnvVars.ENABLE_PERFORMANCE_MONITORING,
} as const;
```

### Environment Helpers

```typescript
// Check if we're in development mode
export const isDevelopment = optionalEnvVars.NODE_ENV === 'development';

// Check if we're in production mode
export const isProduction = optionalEnvVars.NODE_ENV === 'production';

// Check if debug mode is enabled
export const isDebugMode = optionalEnvVars.DEBUG_MODE;

// Check if mock data should be used
export const useMockData = optionalEnvVars.USE_MOCK_DATA;
```

---

## 🚢 Deployment Environments

### Netlify Deployment

For Netlify deployment, set environment variables in the Netlify dashboard:

1. Go to Site Settings > Environment Variables
2. Add each environment variable
3. Set different values for production and preview deployments

**Required for Netlify:**

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Vercel Deployment

For Vercel deployment, set environment variables in the Vercel dashboard:

1. Go to Project Settings > Environment Variables
2. Add each environment variable
3. Set different values for production and preview deployments

### Docker Deployment

For Docker deployment, use environment files:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Copy environment file
COPY .env.production .env

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🔒 Security Considerations

### API Key Security

- **Never commit API keys** to version control
- **Use environment variables** for all sensitive data
- **Rotate API keys** regularly
- **Use different keys** for development and production

### Environment File Security

```bash
# .gitignore (already configured)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### Content Security Policy

```typescript
// Add CSP nonce for inline scripts
const nonce = import.meta.env.VITE_CSP_NONCE;

// Use in meta tag
<meta httpEquiv="Content-Security-Policy"
      content={`script-src 'self' 'nonce-${nonce}';`} />
```

---

## 🧪 Testing Environment

### Test Environment Variables

```env
# .env.test
VITE_TMDB_API_KEY=test_api_key
VITE_USE_MOCK_DATA=true
VITE_TEST_MODE=true
VITE_DEBUG_MODE=false
```

### Mock Data Configuration

```typescript
// src/tests/setup.ts
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
  useMockData: true,
  validateEnvironment: vi.fn(),
}));
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. "Missing required environment variables"

**Problem:** Application fails to start due to missing API key.

**Solution:**

```bash
# Check if .env file exists
ls -la .env

# Create .env file if missing
cp .env.example .env

# Edit .env file and add your API key
nano .env
```

#### 2. "Invalid API key" error

**Problem:** TMDB API returns 401 Unauthorized.

**Solution:**

1. Verify your API key is correct
2. Check if the API key is properly set in environment
3. Ensure the API key has the correct permissions

#### 3. Environment variables not loading

**Problem:** Variables are not available in the application.

**Solution:**

```bash
# Restart the development server
npm run dev

# Check if variables are loaded
console.log(import.meta.env.VITE_TMDB_API_KEY);
```

#### 4. Build errors in production

**Problem:** Build fails due to missing environment variables.

**Solution:**

1. Ensure all required variables are set in production environment
2. Check if variables are properly configured in deployment platform
3. Verify variable names start with `VITE_`

### Debug Mode

Enable debug mode to get more information:

```env
VITE_DEBUG_MODE=true
```

This will:

- Log all environment variables (except sensitive ones)
- Show detailed error messages
- Enable additional debugging features

---

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/get-started/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🔄 Environment Management

### Best Practices

1. **Use different files** for different environments
2. **Never commit sensitive data** to version control
3. **Validate environment** on application startup
4. **Use type-safe access** to environment variables
5. **Document all variables** and their purposes
6. **Test with different configurations** regularly

### Environment File Priority

Vite loads environment files in this order (later files override earlier ones):

1. `.env`
2. `.env.local`
3. `.env.[mode]`
4. `.env.[mode].local`

### Environment Mode

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm run preview

# Test mode
npm run test
```
