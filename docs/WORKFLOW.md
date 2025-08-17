# 🔄 Development Workflow Guide

This document covers the development workflow, Git practices, code review process, deployment pipeline, and quality assurance for the CineFlex application.

---

## 🎯 Workflow Overview

### Development Phases

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Feature   │───▶│   Review    │───▶│   Testing   │───▶│  Deploy     │
│ Development │    │   Process   │    │   & QA      │    │  Production │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Workflow Principles

1. **Feature Branch Workflow** - All development on feature branches
2. **Pull Request Reviews** - Mandatory code reviews for all changes
3. **Automated Testing** - CI/CD pipeline with comprehensive tests
4. **Quality Gates** - Automated quality checks before deployment
5. **Continuous Deployment** - Automated deployment to staging/production

---

## 🌿 Git Workflow

### Branch Strategy

```bash
# Main branches
main                    # Production-ready code
develop                 # Integration branch for features
staging                 # Pre-production testing

# Feature branches
feature/movie-grid      # New features
bugfix/search-error     # Bug fixes
hotfix/critical-issue   # Critical production fixes
```

### Branch Naming Convention

| Type         | Prefix      | Example                     | Description       |
| ------------ | ----------- | --------------------------- | ----------------- |
| **Feature**  | `feature/`  | `feature/movie-details`     | New functionality |
| **Bugfix**   | `bugfix/`   | `bugfix/search-crash`       | Bug fixes         |
| **Hotfix**   | `hotfix/`   | `hotfix/api-timeout`        | Critical fixes    |
| **Refactor** | `refactor/` | `refactor/state-management` | Code refactoring  |
| **Chore**    | `chore/`    | `chore/update-dependencies` | Maintenance tasks |

### Git Commands Workflow

```bash
# 1. Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/movie-grid

# 2. Make changes and commit
git add .
git commit -m "feat: add movie grid component with infinite scroll"

# 3. Push feature branch
git push origin feature/movie-grid

# 4. Create Pull Request (via GitHub/GitLab UI)

# 5. After PR approval, merge to develop
git checkout develop
git pull origin develop
git merge feature/movie-grid
git push origin develop

# 6. Clean up
git branch -d feature/movie-grid
git push origin --delete feature/movie-grid
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
# Format: <type>[optional scope]: <description>

# Examples:
feat: add movie search functionality
feat(movies): add infinite scroll to movie grid
fix(search): resolve search input debouncing issue
docs: update API documentation
refactor(components): extract reusable button component
test: add unit tests for movie card component
chore: update dependencies to latest versions
```

### Commit Types

| Type       | Description        | Example                            |
| ---------- | ------------------ | ---------------------------------- |
| `feat`     | New feature        | `feat: add movie watchlist`        |
| `fix`      | Bug fix            | `fix: resolve navigation issue`    |
| `docs`     | Documentation      | `docs: update README`              |
| `style`    | Code style changes | `style: format code with prettier` |
| `refactor` | Code refactoring   | `refactor: extract API service`    |
| `test`     | Adding tests       | `test: add component tests`        |
| `chore`    | Maintenance tasks  | `chore: update dependencies`       |

---

## 🔍 Code Review Process

### Pull Request Template

```markdown
## 📋 Description

Brief description of changes made

## 🎯 Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## 🧪 Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing completed

## 📸 Screenshots (if applicable)

Add screenshots to help explain your changes

## ✅ Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented where necessary
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Performance impact considered

## 🔗 Related Issues

Closes #123
```

### Review Guidelines

#### For Reviewers

1. **Code Quality**
   - Check for code style consistency
   - Verify proper error handling
   - Ensure performance considerations
   - Review security implications

2. **Testing**
   - Verify adequate test coverage
   - Check test quality and relevance
   - Ensure edge cases are covered

3. **Documentation**
   - Check for updated documentation
   - Verify code comments where needed
   - Review API documentation updates

4. **Functionality**
   - Test the feature manually
   - Verify it works as expected
   - Check for potential regressions

#### For Authors

1. **Before Submitting**
   - Self-review your code
   - Run all tests locally
   - Check for linting errors
   - Update documentation

2. **PR Description**
   - Provide clear description of changes
   - Include testing instructions
   - Add screenshots if UI changes
   - Link related issues

### Review Status

| Status                | Description          | Action Required           |
| --------------------- | -------------------- | ------------------------- |
| **Approved**          | ✅ Ready to merge    | Merge to target branch    |
| **Changes Requested** | 🔄 Needs updates     | Address reviewer feedback |
| **Comment**           | 💬 Discussion needed | Respond to comments       |
| **Blocked**           | 🚫 Cannot proceed    | Resolve blocking issues   |

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  # Quality Checks
  quality:
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

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  # Build and Deploy
  build-and-deploy:
    needs: quality
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          VITE_TMDB_API_KEY: ${{ secrets.TMDB_API_KEY }}

      - name: Deploy to staging
        if: github.ref == 'refs/heads/develop'
        run: npm run deploy:staging

      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: npm run deploy:production
```

### Quality Gates

```yaml
# .github/workflows/quality-gates.yml
name: Quality Gates

on: [pull_request]

jobs:
  quality-gates:
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

      # Code quality checks
      - name: ESLint
        run: npm run lint

      - name: Prettier check
        run: npm run format:check

      - name: TypeScript check
        run: npm run type-check

      # Test coverage
      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Check coverage threshold
        run: |
          COVERAGE=$(npm run test:coverage -- --reporter=text | grep "All files" | awk '{print $4}' | sed 's/%//')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage is below 80%: $COVERAGE%"
            exit 1
          fi

      # Bundle size check
      - name: Check bundle size
        run: npm run build
        env:
          VITE_TMDB_API_KEY: ${{ secrets.TMDB_API_KEY }}

      - name: Analyze bundle size
        run: npm run analyze
```

---

## 🧪 Testing Strategy

### Test Levels

```typescript
// Unit Tests - src/features/movies/__tests__/MovieCard.test.tsx
describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });
});

// Integration Tests - src/features/movies/__tests__/MovieGrid.integration.test.tsx
describe('MovieGrid Integration', () => {
  it('loads and displays movies', async () => {
    render(<MovieGrid />);
    await waitFor(() => {
      expect(screen.getByText('Movie Title')).toBeInTheDocument();
    });
  });
});

// E2E Tests - tests/e2e/movies.spec.ts
test('user can search and view movie details', async ({ page }) => {
  await page.goto('/search');
  await page.fill('[data-testid="search-input"]', 'Avengers');
  await page.click('[data-testid="movie-card"]');
  await expect(page).toHaveURL(/\/movie\/\d+/);
});
```

### Test Coverage Requirements

```json
// package.json
{
  "scripts": {
    "test:coverage": "vitest --coverage --reporter=text",
    "test:coverage:html": "vitest --coverage --reporter=html"
  },
  "vitest": {
    "coverage": {
      "thresholds": {
        "global": {
          "branches": 80,
          "functions": 80,
          "lines": 80,
          "statements": 80
        }
      }
    }
  }
}
```

---

## 🚢 Deployment Pipeline

### Environment Strategy

```bash
# Development Environment
http://localhost:5173          # Local development
http://dev.cineflex.com        # Development server

# Staging Environment
http://staging.cineflex.com    # Pre-production testing

# Production Environment
http://cineflex.com            # Live production
```

### Deployment Scripts

```json
// package.json
{
  "scripts": {
    "deploy:staging": "npm run build && aws s3 sync dist/ s3://cineflex-staging --delete",
    "deploy:production": "npm run build && aws s3 sync dist/ s3://cineflex-production --delete",
    "deploy:rollback": "aws s3 sync s3://cineflex-backup/ s3://cineflex-production --delete"
  }
}
```

### Environment Configuration

```typescript
// src/utils/env.ts
const getEnvironmentConfig = () => {
  switch (import.meta.env.MODE) {
    case 'development':
      return {
        apiUrl: 'http://localhost:3000/api',
        debug: true,
        analytics: false,
      };
    case 'staging':
      return {
        apiUrl: 'https://api-staging.cineflex.com',
        debug: true,
        analytics: false,
      };
    case 'production':
      return {
        apiUrl: 'https://api.cineflex.com',
        debug: false,
        analytics: true,
      };
    default:
      return {
        apiUrl: 'http://localhost:3000/api',
        debug: true,
        analytics: false,
      };
  }
};
```

---

## 📊 Quality Assurance

### Code Quality Tools

```json
// package.json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx,css,md}",
    "format:check": "prettier --check src/**/*.{ts,tsx,css,md}",
    "type-check": "tsc --noEmit",
    "audit": "npm audit --audit-level moderate"
  }
}
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write", "git add"],
    "*.{css,md}": ["prettier --write", "git add"]
  }
}
```

### Performance Monitoring

```typescript
// src/shared/utils/performance.ts
export const performanceMonitor = {
  measurePageLoad: () => {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    return {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ttfb: navigation.responseStart - navigation.requestStart,
      domLoad:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      windowLoad: navigation.loadEventEnd - navigation.loadEventStart,
    };
  },

  measureApiCall: (url: string) => {
    const start = performance.now();
    return {
      start: () => start,
      end: () => performance.now() - start,
    };
  },
};
```

---

## 🔄 Release Process

### Release Workflow

```bash
# 1. Create release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Update version
npm version patch  # or minor/major
git add package.json package-lock.json
git commit -m "chore: bump version to 1.2.0"

# 3. Merge to main
git checkout main
git merge release/v1.2.0
git tag v1.2.0
git push origin main --tags

# 4. Deploy to production
npm run deploy:production

# 5. Merge back to develop
git checkout develop
git merge release/v1.2.0
git push origin develop

# 6. Clean up
git branch -d release/v1.2.0
```

### Release Notes Template

```markdown
# Release v1.2.0

## 🎉 New Features

- Added movie search functionality
- Implemented infinite scroll for movie grid
- Added movie watchlist feature

## 🐛 Bug Fixes

- Fixed navigation issue on mobile devices
- Resolved search input debouncing problem
- Fixed movie card hover effects

## 🔧 Improvements

- Improved loading states
- Enhanced error handling
- Optimized bundle size

## 📚 Documentation

- Updated API documentation
- Added component usage examples
- Improved README

## 🧪 Testing

- Added unit tests for new components
- Improved test coverage to 85%
- Added E2E tests for critical user flows

## 🔄 Migration Guide

No breaking changes in this release.
```

---

## 🚨 Incident Response

### Incident Severity Levels

| Level  | Description                   | Response Time | Example            |
| ------ | ----------------------------- | ------------- | ------------------ |
| **P0** | Critical - Site down          | 15 minutes    | Complete outage    |
| **P1** | High - Major feature broken   | 1 hour        | Search not working |
| **P2** | Medium - Minor feature broken | 4 hours       | Image loading slow |
| **P3** | Low - Cosmetic issues         | 24 hours      | Button styling     |

### Incident Response Process

```bash
# 1. Detect and Assess
- Monitor alerts and user reports
- Assess impact and severity
- Notify relevant team members

# 2. Communicate
- Update status page
- Notify stakeholders
- Create incident ticket

# 3. Investigate and Fix
- Identify root cause
- Implement fix
- Test solution

# 4. Deploy
- Deploy hotfix to production
- Monitor for resolution
- Verify fix works

# 5. Post-Incident
- Document incident
- Conduct post-mortem
- Implement preventive measures
```

### Rollback Procedure

```bash
# Quick rollback to previous version
git checkout main
git log --oneline -5  # Find previous commit
git revert HEAD        # Revert last commit
git push origin main

# Or rollback to specific version
git checkout v1.1.0
git checkout -b hotfix/rollback-v1.1.0
git push origin hotfix/rollback-v1.1.0

# Deploy rollback
npm run deploy:production
```

---

## 📚 Best Practices

### Code Organization

1. **Feature-based Structure**

   ```
   src/
   ├── features/
   │   ├── movies/
   │   │   ├── components/
   │   │   ├── hooks/
   │   │   ├── services/
   │   │   └── types/
   │   └── search/
   ├── shared/
   │   ├── components/
   │   ├── hooks/
   │   ├── services/
   │   └── utils/
   └── pages/
   ```

2. **File Naming**
   - Components: `PascalCase.tsx`
   - Hooks: `camelCase.ts`
   - Utilities: `camelCase.ts`
   - Types: `camelCase.types.ts`

### Development Practices

1. **Code Review Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests are included and pass
   - [ ] Documentation is updated
   - [ ] Performance impact considered
   - [ ] Security implications reviewed

2. **Testing Strategy**
   - Unit tests for all components
   - Integration tests for features
   - E2E tests for critical flows
   - Performance tests for key metrics

3. **Documentation**
   - Keep README updated
   - Document API changes
   - Update component documentation
   - Maintain changelog

---

## 📚 Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Code Review Best Practices](https://google.github.io/eng-practices/review/)
- [Semantic Versioning](https://semver.org/)

---

## 🔄 Workflow Checklist

### Before Starting Work

- [ ] **Environment Setup** - Local development environment ready
- [ ] **Branch Strategy** - Understand current branch structure
- [ ] **Requirements** - Clear understanding of feature requirements
- [ ] **Testing Strategy** - Plan for testing approach

### During Development

- [ ] **Code Quality** - Follow coding standards and best practices
- [ ] **Testing** - Write tests as you develop
- [ ] **Documentation** - Update documentation as needed
- [ ] **Regular Commits** - Commit frequently with clear messages

### Before Submitting PR

- [ ] **Self Review** - Review your own code thoroughly
- [ ] **Tests Pass** - All tests pass locally
- [ ] **Linting** - No linting errors or warnings
- [ ] **Documentation** - Documentation is updated
- [ ] **Performance** - Performance impact is minimal

### After PR Approval

- [ ] **Merge** - Merge to target branch
- [ ] **Deploy** - Deploy to appropriate environment
- [ ] **Monitor** - Monitor for any issues
- [ ] **Cleanup** - Clean up feature branch
