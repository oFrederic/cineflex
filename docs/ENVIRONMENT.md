# Environment Configuration

## Required Environment Variables

### TMDB API Configuration

- `VITE_TMDB_API_TOKEN`: Your TMDB API access token
  - Get your API token from: https://www.themoviedb.org/settings/api
  - Required for both development and production

### Optional Environment Variables

- `VITE_TMDB_API_URL`: TMDB API base URL
  - Defaults to: `https://api.themoviedb.org/3`
  - Usually not needed to change

## Environment Setup

### Development

1. Create a `.env` file in the root directory
2. Add your TMDB API token:
   ```
   VITE_TMDB_API_TOKEN=your_tmdb_api_token_here
   ```
3. Restart your development server

### Production (Netlify)

1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add the environment variable:
   - Key: `VITE_TMDB_API_TOKEN`
   - Value: Your TMDB API token
4. Redeploy your site

## CORS Configuration

The application uses different proxy configurations for development and production:

### Development

- Uses Vite's built-in proxy configuration
- Requests go to `/api/tmdb/*` and are proxied to TMDB API
- Configured in `vite.config.ts`

### Production

- Uses Netlify Functions as a proxy
- Requests go to `/api/tmdb/*` and are handled by `tmdb-proxy` function
- Configured in `netlify.toml` and `netlify/functions/tmdb-proxy.js`

## Security Notes

- Never commit your API token to version control
- The API token is kept server-side in production via Netlify Functions
- All API requests are proxied to avoid CORS issues
- Environment variables prefixed with `VITE_` are exposed to the client-side code
