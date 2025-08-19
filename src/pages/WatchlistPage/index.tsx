import { useLocalStorage } from '@/shared/hooks';
import { STORAGE_KEYS } from '@/shared/utils/constants';

interface WatchlistItem {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  addedAt: string;
}

/**
 * WatchlistPage Component
 * Page for managing personal watchlist
 */
export const WatchlistPage: React.FC = () => {
  // Watchlist management with localStorage persistence
  const [watchlist, setWatchlist] = useLocalStorage<WatchlistItem[]>(
    STORAGE_KEYS.WATCHLIST,
    []
  );

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(item => item.id !== movieId));
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <div className='container'>
      <div className='p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='heading-1'>My Watchlist</h1>
          {watchlist.length > 0 && (
            <button
              onClick={clearWatchlist}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
              Clear All
            </button>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className='text-center py-12'>
            <p className='body-large text-gray-600 mb-4'>
              Your watchlist is empty
            </p>
            <p className='text-gray-500'>
              Start adding movies and TV shows to your watchlist to see them
              here
            </p>
          </div>
        ) : (
          <div>
            <p className='body-large text-gray-600 mb-6'>
              Your personal collection of movies and TV shows to watch (
              {watchlist.length} items)
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {watchlist.map(item => (
                <div
                  key={item.id}
                  className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
                >
                  {item.poster_path ? (
                    <img
                      src={item.poster_path}
                      alt={item.title}
                      className='w-full h-64 object-cover'
                    />
                  ) : (
                    <div className='w-full h-64 bg-gray-200 flex items-center justify-center'>
                      <span className='text-gray-500'>No Image</span>
                    </div>
                  )}

                  <div className='p-4'>
                    <h3 className='font-semibold text-lg mb-2'>{item.title}</h3>
                    {item.release_date && (
                      <p className='text-gray-600 text-sm mb-2'>
                        Released: {new Date(item.release_date).getFullYear()}
                      </p>
                    )}
                    <p className='text-gray-500 text-xs mb-3'>
                      Added: {new Date(item.addedAt).toLocaleDateString()}
                    </p>

                    <button
                      onClick={() => removeFromWatchlist(item.id)}
                      className='w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm'
                    >
                      Remove from Watchlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
