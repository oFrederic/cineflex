import { useLocalStorage, useSearchDebounce } from '@/shared/hooks';
import { validateSearchQuery } from '@/shared/utils';
import { SEARCH, STORAGE_KEYS } from '@/shared/utils/constants';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * SearchPage Component
 * Page for searching movies and TV shows
 */
export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  // Search state management
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const debouncedSearchQuery = useSearchDebounce(
    searchQuery,
    SEARCH.DEBOUNCE_DELAY
  );

  // Search history management
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    STORAGE_KEYS.SEARCH_HISTORY,
    []
  );

  // Update URL when search query changes
  useEffect(() => {
    if (debouncedSearchQuery && validateSearchQuery(debouncedSearchQuery)) {
      setSearchParams({ q: debouncedSearchQuery });
    } else if (!debouncedSearchQuery) {
      setSearchParams({});
    }
  }, [debouncedSearchQuery, setSearchParams]);

  // Update local state when URL changes
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && validateSearchQuery(searchQuery)) {
      // Add to search history
      const newHistory = [
        searchQuery.trim(),
        ...searchHistory.filter(item => item !== searchQuery.trim()),
      ].slice(0, SEARCH.MAX_HISTORY_ITEMS);

      setSearchHistory(newHistory);
    }
  };

  const handleHistoryItemClick = (historyItem: string) => {
    setSearchQuery(historyItem);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className='container'>
      <div className='p-6'>
        <h1 className='heading-1 mb-6'>Search</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className='mb-8'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for movies, TV shows, and actors...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
              minLength={SEARCH.MIN_QUERY_LENGTH}
              maxLength={SEARCH.MAX_QUERY_LENGTH}
            />
            <button
              type='submit'
              className='absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
              Search
            </button>
          </div>
        </form>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className='mb-8'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='heading-2'>Recent Searches</h2>
              <button
                onClick={clearHistory}
                className='text-sm text-gray-500 hover:text-red-600 transition-colors'
              >
                Clear History
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryItemClick(item)}
                  className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-100 hover:text-red-700 transition-colors'
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {debouncedSearchQuery && validateSearchQuery(debouncedSearchQuery) ? (
          <div>
            <h2 className='heading-2 mb-4'>
              Search Results for "{debouncedSearchQuery}"
            </h2>
            <p className='body-large text-gray-600'>
              TODO: Implement search results display
            </p>
          </div>
        ) : (
          <p className='body-large text-gray-600'>
            Enter a search query to find movies, TV shows, and actors
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
