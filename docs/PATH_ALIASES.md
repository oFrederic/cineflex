# Path Aliases

This document describes the path aliases configured in the CineFlex project for clean and maintainable imports.

## Overview

Path aliases allow you to use short, consistent import paths instead of long relative paths. This makes the code more readable and easier to maintain.

## Available Aliases

| Alias           | Path               | Description                          |
| --------------- | ------------------ | ------------------------------------ |
| `@/*`           | `src/*`            | Root source directory                |
| `@components/*` | `src/components/*` | Reusable UI components               |
| `@features/*`   | `src/features/*`   | Feature-based modules                |
| `@shared/*`     | `src/shared/*`     | Shared utilities and configurations  |
| `@pages/*`      | `src/pages/*`      | Page-level components                |
| `@styles/*`     | `src/styles/*`     | Global styles and themes             |
| `@assets/*`     | `src/assets/*`     | Static assets (images, icons, fonts) |
| `@tests/*`      | `src/tests/*`      | Test utilities and setup             |
| `@types/*`      | `src/types/*`      | TypeScript type definitions          |
| `@utils/*`      | `src/utils/*`      | Utility functions                    |

## Usage Examples

### Before (Relative Imports)

```typescript
import { MovieCard } from '../../../components/ui/MovieCard';
import { useMovies } from '../../../features/movies/hooks/useMovies';
import { formatDate } from '../../../shared/utils/formatters';
```

### After (Path Aliases)

```typescript
import { MovieCard } from '@/components/ui/MovieCard';
import { useMovies } from '@/features/movies/hooks/useMovies';
import { formatDate } from '@/shared/utils/formatters';
```

## Configuration Files

### Vite Configuration (`vite.config.ts`)

```typescript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      // ... other aliases
    },
  },
});
```

### TypeScript Configuration (`tsconfig.app.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
      // ... other aliases
    }
  }
}
```

## Best Practices

1. **Use `@/` for most imports** - This is the most common and recommended alias
2. **Use specific aliases for clarity** - Use `@components/`, `@features/`, etc. when you want to be explicit about the module type
3. **Keep imports consistent** - Use the same alias pattern throughout your files
4. **Avoid deep nesting** - Path aliases help you avoid deeply nested relative imports

## IDE Support

### VS Code

VS Code should automatically recognize the path aliases thanks to the TypeScript configuration. You'll get:

- Auto-completion for import paths
- Go to definition support
- Refactoring support

### Other IDEs

Most modern IDEs that support TypeScript will automatically recognize the path aliases from the `tsconfig.json` configuration.

## Troubleshooting

### Import Not Found

If you get "Module not found" errors:

1. Check that the file path is correct
2. Verify the alias is properly configured in both `vite.config.ts` and `tsconfig.app.json`
3. Restart your development server
4. Clear your IDE's cache

### TypeScript Errors

If TypeScript can't resolve the imports:

1. Run `npm run type-check` to see detailed errors
2. Make sure the `baseUrl` and `paths` are correctly configured in `tsconfig.app.json`
3. Restart your TypeScript language server in your IDE

## Migration Guide

When migrating existing code to use path aliases:

1. **Start with new files** - Use path aliases in all new code
2. **Gradually update existing files** - Update imports as you work on existing files
3. **Use search and replace** - You can use regex to bulk update imports:
   - Find: `from '\.\./\.\./\.\./`
   - Replace: `from '@/`
4. **Test thoroughly** - Make sure all imports work after migration
