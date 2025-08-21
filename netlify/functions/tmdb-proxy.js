const axios = require('axios');

// TMDB API configuration
const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_TOKEN = process.env.VITE_TMDB_API_TOKEN;

exports.handler = async (event, _context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Check if API token is available
  if (!TMDB_API_TOKEN) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'TMDB API token not configured',
        status_code: 500,
      }),
    };
  }

  try {
    // Extract the path from the request
    let path = event.path;

    // Remove function prefix if present
    if (path.startsWith('/.netlify/functions/tmdb-proxy')) {
      path = path.replace('/.netlify/functions/tmdb-proxy', '');
    }

    // If path is empty or just '/', try to get it from the raw URL
    if (!path || path === '/') {
      // For redirected requests, the path is in the rawUrl
      const rawUrl = event.rawUrl || '';
      const apiMatch = rawUrl.match(/\/api\/tmdb(.*?)(?:\?|$)/);
      if (apiMatch) {
        path = apiMatch[1];
      } else {
        // If we can't extract the path, return an error with debug info
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Invalid API path',
            status_code: 400,
            debug: {
              originalPath: event.path,
              rawUrl: event.rawUrl,
              queryStringParameters: event.queryStringParameters,
            },
          }),
        };
      }
    }

    // Ensure path starts with '/'
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    // Debug logging to understand what's happening
    console.log('Function debug info:', {
      originalPath: event.path,
      extractedPath: path,
      rawUrl: event.rawUrl,
      queryStringParameters: event.queryStringParameters,
    });

    // Get query parameters
    const queryParams = event.queryStringParameters || {};
    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    // Construct the full URL
    const url = `${TMDB_API_URL}${path}${queryString ? `?${queryString}` : ''}`;

    // Debug logging
    console.log('Function called with:', {
      originalPath: event.path,
      extractedPath: path,
      finalUrl: url,
      queryParams,
    });

    // Make request to TMDB API
    const response = await axios({
      method: event.httpMethod,
      url,
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('TMDB Proxy Error:', error);

    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        statusCode: error.response.status,
        headers,
        body: JSON.stringify({
          error: error.response.data?.status_message || 'API Error',
          status_code: error.response.status,
        }),
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: 'Service unavailable',
          status_code: 503,
        }),
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Internal server error',
          status_code: 500,
        }),
      };
    }
  }
};
