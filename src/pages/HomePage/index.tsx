import React from 'react';
import { ROUTES } from '@/shared/constants/routes';
import {
  Button,
  Grid,
  GridItem,
  MovieGrid,
  SkeletonGrid,
} from '@/components/ui';
import { useMovies, useTrendingAll } from '@/shared/hooks';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Fetch real movie data using our hooks
  const {
    data: popularMovies,
    isLoading: popularLoading,
    isError: popularError,
  } = useMovies('popular', 1);

  const {
    data: topRatedMovies,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useMovies('top_rated', 1);

  const {
    data: nowPlayingMovies,
    isLoading: nowPlayingLoading,
    isError: nowPlayingError,
  } = useMovies('now_playing', 1);

  const {
    data: trendingContent,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useTrendingAll(1);

  const handleMovieClick = (movieId: number) => {
    navigate(`${ROUTES.MOVIE_DETAILS}/${movieId}`);
  };

  const handleAddToWatchlist = (movieId: number) => {
    // TODO: Implement watchlist functionality
    console.log(`Added movie ${movieId} to watchlist`);
  };

  const handleExploreMovies = () => {
    navigate(ROUTES.MOVIES);
  };

  const handleViewWatchlist = () => {
    navigate(ROUTES.WATCHLIST);
  };

  return (
    <div className='bg-primary min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-hero pt-24 pb-16'>
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='heading-1 mb-6 text-gradient-red'>
              Welcome to CineFlex
            </h1>
            <p className='body-large mb-8 text-secondary max-w-2xl mx-auto'>
              Discover the latest movies, trending content, and cinematic
              masterpieces. Your ultimate destination for movie exploration and
              entertainment.
            </p>
            <div className='flex gap-4 justify-center flex-wrap'>
              <Button variant='primary' size='lg' onClick={handleExploreMovies}>
                Explore Movies
              </Button>
              <Button variant='outline' size='lg' onClick={handleViewWatchlist}>
                View Watchlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='container py-12'>
        {/* Trending Now Section */}
        <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h2 className='heading-2 mb-2'>Trending Now</h2>
              <p className='text-secondary'>
                What's hot in movies, TV shows, and more
              </p>
            </div>
            <Button variant='outline' onClick={() => navigate(ROUTES.MOVIES)}>
              View All
            </Button>
          </div>

          {trendingLoading ? (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border'>
              <SkeletonGrid count={6} />
            </div>
          ) : trendingError ? (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border text-center'>
              <p className='text-error mb-4'>Failed to load trending content</p>
              <Button
                variant='primary'
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border'>
              <MovieGrid
                movies={trendingContent?.results || []}
                onAddToWatchlist={handleAddToWatchlist}
                onMovieClick={handleMovieClick}
              />
            </div>
          )}
        </section>

        {/* Popular Movies Section */}
        <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h2 className='heading-2 mb-2'>Popular Movies</h2>
              <p className='text-secondary'>
                The most watched movies right now
              </p>
            </div>
            <Button
              variant='outline'
              onClick={() => navigate(`${ROUTES.MOVIES}?category=popular`)}
            >
              View All
            </Button>
          </div>

          {popularLoading ? (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border'>
              <SkeletonGrid count={6} />
            </div>
          ) : popularError ? (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border text-center'>
              <p className='text-error mb-4'>Failed to load popular movies</p>
              <Button
                variant='primary'
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border'>
              <MovieGrid
                movies={popularMovies?.results || []}
                onAddToWatchlist={handleAddToWatchlist}
                onMovieClick={handleMovieClick}
              />
            </div>
          )}
        </section>

        {/* Top Rated Movies Section */}
        <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h2 className='heading-2 mb-2'>Top Rated Movies</h2>
              <p className='text-secondary'>
                Critically acclaimed masterpieces
              </p>
            </div>
            <Button
              variant='outline'
              onClick={() => navigate(`${ROUTES.MOVIES}?category=top_rated`)}
            >
              View All
            </Button>
          </div>

          {topRatedLoading ? (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border'>
              <SkeletonGrid count={6} />
            </div>
          ) : topRatedError ? (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border text-center'>
              <p className='text-error mb-4'>Failed to load top rated movies</p>
              <Button
                variant='primary'
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border'>
              <MovieGrid
                movies={topRatedMovies?.results || []}
                onAddToWatchlist={handleAddToWatchlist}
                onMovieClick={handleMovieClick}
              />
            </div>
          )}
        </section>

        {/* Now Playing Section */}
        <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h2 className='heading-2 mb-2'>Now Playing</h2>
              <p className='text-secondary'>Movies currently in theaters</p>
            </div>
            <Button
              variant='outline'
              onClick={() => navigate(`${ROUTES.MOVIES}?category=now_playing`)}
            >
              View All
            </Button>
          </div>

          {nowPlayingLoading ? (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border'>
              <SkeletonGrid count={6} />
            </div>
          ) : nowPlayingError ? (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border text-center'>
              <p className='text-error mb-4'>
                Failed to load now playing movies
              </p>
              <Button
                variant='primary'
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className='bg-secondary rounded-xl p-8 border border-surface-border'>
              <MovieGrid
                movies={nowPlayingMovies?.results || []}
                onAddToWatchlist={handleAddToWatchlist}
                onMovieClick={handleMovieClick}
              />
            </div>
          )}
        </section>

        {/* Quick Actions Section */}
        <section className='mb-16'>
          <div className='mb-8'>
            <h2 className='heading-2 mb-2'>Quick Actions</h2>
            <p className='text-secondary'>Explore more content and features</p>
          </div>

          <Grid variant='bento' gap='lg'>
            <GridItem span={2}>
              <div className='bg-secondary p-8 rounded-xl border border-surface-border h-full'>
                <h3 className='heading-4 mb-4'>Search Movies</h3>
                <p className='text-secondary mb-6'>
                  Find your favorite movies, actors, or discover new content
                  with our powerful search.
                </p>
                <Button
                  variant='primary'
                  onClick={() => navigate(ROUTES.SEARCH)}
                >
                  Start Searching
                </Button>
              </div>
            </GridItem>
            <GridItem>
              <div className='bg-secondary p-8 rounded-xl border border-surface-border h-full'>
                <h3 className='heading-4 mb-4'>Your Watchlist</h3>
                <p className='text-secondary mb-6'>
                  Keep track of movies you want to watch and build your personal
                  collection.
                </p>
                <Button
                  variant='outline'
                  onClick={() => navigate(ROUTES.WATCHLIST)}
                >
                  View Watchlist
                </Button>
              </div>
            </GridItem>
            <GridItem>
              <div className='bg-secondary p-8 rounded-xl border border-surface-border h-full'>
                <h3 className='heading-4 mb-4'>Browse Categories</h3>
                <p className='text-secondary mb-6'>
                  Explore movies by category, genre, or discover trending
                  content.
                </p>
                <Button
                  variant='outline'
                  onClick={() => navigate(ROUTES.MOVIES)}
                >
                  Browse Movies
                </Button>
              </div>
            </GridItem>
          </Grid>
        </section>

        {/* Stats Section */}
        <section className='mb-16'>
          <div className='mb-8'>
            <h2 className='heading-3 mb-2'>CineFlex Stats</h2>
            <p className='body-base text-secondary'>
              Your movie discovery journey
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='bg-secondary p-6 rounded-xl border border-surface-border text-center'>
              <div className='text-3xl font-bold text-accent-red mb-2'>
                {popularMovies?.total_results?.toLocaleString() || '0'}
              </div>
              <p className='body-small text-secondary'>Movies Available</p>
            </div>
            <div className='bg-secondary p-6 rounded-xl border border-surface-border text-center'>
              <div className='text-3xl font-bold text-accent-red mb-2'>
                {trendingContent?.total_results?.toLocaleString() || '0'}
              </div>
              <p className='body-small text-secondary'>Trending Items</p>
            </div>
            <div className='bg-secondary p-6 rounded-xl border border-surface-border text-center'>
              <div className='text-3xl font-bold text-accent-red mb-2'>
                {topRatedMovies?.total_results?.toLocaleString() || '0'}
              </div>
              <p className='body-small text-secondary'>Top Rated</p>
            </div>
            <div className='bg-secondary p-6 rounded-xl border border-surface-border text-center'>
              <div className='text-3xl font-bold text-accent-red mb-2'>
                {nowPlayingMovies?.total_results?.toLocaleString() || '0'}
              </div>
              <p className='body-small text-secondary'>Now Playing</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
