import React from 'react';
import { ROUTES } from '@/shared/constants/routes';
import {
  Button,
  Grid,
  GridItem,
  Input,
  MovieCard,
  MovieDetails,
  MovieGrid,
  ResponsiveShowcase,
  Skeleton,
  SkeletonGrid,
  Spinner,
} from '@/components/ui';

// Sample data for showcase
const sampleMovies = [
  {
    id: 1,
    title: 'Inception',
    poster_path:
      'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    overview:
      'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster_path:
      'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    release_date: '2008-07-18',
    vote_average: 9.0,
    overview:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  },
  {
    id: 3,
    title: 'Interstellar',
    poster_path:
      'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    release_date: '2014-11-07',
    vote_average: 8.6,
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    poster_path:
      'https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg',
    release_date: '1994-10-14',
    vote_average: 8.9,
    overview:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
  },
  {
    id: 5,
    title: 'Fight Club',
    poster_path:
      'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    release_date: '1999-10-15',
    vote_average: 8.8,
    overview:
      'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
  },
  {
    id: 6,
    title: 'The Matrix',
    poster_path:
      'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    release_date: '1999-03-31',
    vote_average: 8.7,
    overview:
      'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
  },
];

const sampleMovieDetails = {
  id: 1,
  title: 'Inception',
  tagline: 'Your mind is the scene of the crime.',
  overview:
    'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  poster_path:
    'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  backdrop_path:
    'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
  release_date: '2010-07-16',
  runtime: 148,
  vote_average: 8.8,
  vote_count: 23456,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Sci-Fi' },
    { id: 3, name: 'Thriller' },
  ],
  cast: [
    {
      id: 1,
      name: 'Leonardo DiCaprio',
      character: 'Cobb',
      profile_path: '/actor-1.jpg',
      order: 0,
    },
    {
      id: 2,
      name: 'Joseph Gordon-Levitt',
      character: 'Arthur',
      profile_path: '/actor-2.jpg',
      order: 1,
    },
    {
      id: 3,
      name: 'Ellen Page',
      character: 'Ariadne',
      profile_path: '/actor-3.jpg',
      order: 2,
    },
  ],
  crew: [
    {
      id: 1,
      name: 'Christopher Nolan',
      job: 'Director',
      profile_path: '/crew-1.jpg',
      department: 'Directing',
    },
    {
      id: 2,
      name: 'Hans Zimmer',
      job: 'Composer',
      profile_path: '/crew-2.jpg',
      department: 'Sound',
    },
  ],
  similar_movies: sampleMovies.slice(1, 4),
  budget: 160000000,
  revenue: 836836967,
  status: 'Released',
  original_language: 'en',
  production_companies: [
    { id: 1, name: 'Warner Bros. Pictures', logo_path: null },
    { id: 2, name: 'Legendary Entertainment', logo_path: null },
    { id: 3, name: 'Syncopy', logo_path: null },
  ],
};

export const HomePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-accent-red/10 via-background to-accent-red/5 py-16'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='heading-1 mb-6 bg-gradient-to-r from-accent-red to-accent-red/80 bg-clip-text text-transparent'>
              Welcome to CineFlex
            </h1>
            <p className='body-large mb-8 text-secondary max-w-2xl mx-auto'>
              Discover amazing movies and TV shows with our modern, responsive
              design system
            </p>
            <div className='flex gap-4 justify-center flex-wrap'>
              <Button variant='primary' size='lg'>
                Explore Movies
              </Button>
              <Button variant='outline' size='lg'>
                View Watchlist
              </Button>
            </div>
            <p className='text-sm text-tertiary mt-6'>
              Current route: {ROUTES.HOME}
            </p>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <div className='container mx-auto px-6 py-12'>
        {/* MovieCard Showcase */}
        <section className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='heading-2 mb-4'>MovieCard Component</h2>
            <p className='body-large text-secondary max-w-3xl mx-auto'>
              Interactive movie cards with hover effects, watchlist
              functionality, and responsive design
            </p>
          </div>

          <div className='bg-surface rounded-xl p-8 border border-surface-border'>
            <h3 className='heading-4 mb-6 text-center'>
              Interactive Movie Cards
            </h3>
            <Grid variant='movie' gap='lg'>
              {sampleMovies.slice(0, 6).map(movie => (
                <GridItem key={movie.id}>
                  <MovieCard
                    movie={movie}
                    onAddToWatchlist={movieId => {
                      // eslint-disable-next-line no-console
                      console.log(`Added movie ${movieId} to watchlist`);
                    }}
                    onMovieClick={movieId => {
                      // eslint-disable-next-line no-console
                      console.log(`Clicked on movie ${movieId}`);
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </div>
        </section>

        {/* MovieGrid Showcase */}
        <section className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='heading-2 mb-4'>MovieGrid Component</h2>
            <p className='body-large text-secondary max-w-3xl mx-auto'>
              Responsive grid system that adapts from 1 column on mobile to 6
              columns on large screens
            </p>
          </div>

          <div className='space-y-12'>
            {/* MovieGrid with Movies */}
            <div className='bg-surface rounded-xl p-8 border border-surface-border'>
              <h3 className='heading-4 mb-6 text-center'>
                MovieGrid with Movies
              </h3>
              <MovieGrid
                movies={sampleMovies}
                onAddToWatchlist={movieId => {
                  // eslint-disable-next-line no-console
                  console.log(`Added movie ${movieId} to watchlist`);
                }}
                onMovieClick={movieId => {
                  // eslint-disable-next-line no-console
                  console.log(`Clicked on movie ${movieId}`);
                }}
              />
            </div>

            {/* Loading State */}
            <div className='bg-surface rounded-xl p-8 border border-surface-border'>
              <h3 className='heading-4 mb-6 text-center'>Loading State</h3>
              <MovieGrid movies={[]} loading={true} />
            </div>

            {/* Empty State */}
            <div className='bg-surface rounded-xl p-8 border border-surface-border'>
              <h3 className='heading-4 mb-6 text-center'>Empty State</h3>
              <MovieGrid movies={[]}>
                <div className='text-center'>
                  <Button variant='primary' size='lg'>
                    Browse Popular Movies
                  </Button>
                </div>
              </MovieGrid>
            </div>
          </div>
        </section>

        {/* Grid System Showcase */}
        <section className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='heading-2 mb-4'>Grid System</h2>
            <p className='body-large text-secondary max-w-3xl mx-auto'>
              Flexible grid layouts for different content types and screen sizes
            </p>
          </div>

          <div className='space-y-12'>
            {/* Bento Grid */}
            <div className='bg-surface rounded-xl p-8 border border-surface-border'>
              <h3 className='heading-4 mb-6 text-center'>Bento Grid Layout</h3>
              <Grid variant='bento' gap='lg'>
                <GridItem span={2}>
                  <div className='bg-secondary p-6 rounded-lg border border-surface-border h-full'>
                    <h4 className='heading-5 mb-3'>Featured Content</h4>
                    <p className='text-secondary'>
                      This item spans 2 columns in the bento grid layout,
                      perfect for highlighting important content.
                    </p>
                  </div>
                </GridItem>
                <GridItem>
                  <div className='bg-secondary p-6 rounded-lg border border-surface-border h-full'>
                    <h4 className='heading-5 mb-3'>Regular Item</h4>
                    <p className='text-secondary'>
                      Standard grid item with single column span.
                    </p>
                  </div>
                </GridItem>
                <GridItem>
                  <div className='bg-secondary p-6 rounded-lg border border-surface-border h-full'>
                    <h4 className='heading-5 mb-3'>Another Item</h4>
                    <p className='text-secondary'>
                      Another standard grid item.
                    </p>
                  </div>
                </GridItem>
                <GridItem span={2}>
                  <div className='bg-secondary p-6 rounded-lg border border-surface-border h-full'>
                    <h4 className='heading-5 mb-3'>Wide Content</h4>
                    <p className='text-secondary'>
                      This item also spans 2 columns for balanced layout and
                      better visual hierarchy.
                    </p>
                  </div>
                </GridItem>
              </Grid>
            </div>

            {/* Hero Grid */}
            <div className='bg-surface rounded-xl p-8 border border-surface-border'>
              <h3 className='heading-4 mb-6 text-center'>Hero Grid Layout</h3>
              <Grid variant='hero' gap='xl'>
                <GridItem>
                  <div className='bg-secondary p-8 rounded-lg border border-surface-border'>
                    <h4 className='heading-4 mb-4'>Hero Content</h4>
                    <p className='text-secondary mb-6'>
                      This is the main hero content area with larger text and
                      more prominent styling for important messaging.
                    </p>
                    <Button variant='primary'>Call to Action</Button>
                  </div>
                </GridItem>
                <GridItem>
                  <div className='bg-secondary p-8 rounded-lg border border-surface-border'>
                    <h4 className='heading-4 mb-4'>Supporting Content</h4>
                    <p className='text-secondary mb-6'>
                      This is the supporting content area that complements the
                      hero section with additional information.
                    </p>
                    <Button variant='outline'>Learn More</Button>
                  </div>
                </GridItem>
              </Grid>
            </div>
          </div>
        </section>

        {/* MovieDetails Showcase */}
        <section className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='heading-2 mb-4'>MovieDetails Component</h2>
            <p className='body-large text-secondary max-w-3xl mx-auto'>
              Comprehensive movie information display with hero section, tabs,
              and cast/crew details
            </p>
          </div>

          <div className='bg-surface rounded-xl p-8 border border-surface-border'>
            <h3 className='heading-4 mb-6 text-center'>
              MovieDetails with Hero Section
            </h3>
            <MovieDetails
              movie={sampleMovieDetails}
              onAddToWatchlist={movieId => {
                // eslint-disable-next-line no-console
                console.log(`Added movie ${movieId} to watchlist`);
              }}
              onMovieClick={movieId => {
                // eslint-disable-next-line no-console
                console.log(`Clicked on movie ${movieId}`);
              }}
            />
          </div>
        </section>

        {/* UI Components Showcase */}
        <section className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='heading-2 mb-4'>UI Components</h2>
            <p className='body-large text-secondary max-w-3xl mx-auto'>
              Foundational components built with the design system
            </p>
          </div>

          <div className='space-y-12'>
            {/* Buttons */}
            <div className='bg-surface rounded-xl p-8 border border-surface-border'>
              <h3 className='heading-4 mb-6 text-center'>Button Components</h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                <div className='space-y-4'>
                  <h4 className='heading-6 text-center'>Variants</h4>
                  <div className='space-y-3'>
                    <Button variant='primary' className='w-full'>
                      Primary
                    </Button>
                    <Button variant='secondary' className='w-full'>
                      Secondary
                    </Button>
                    <Button variant='outline' className='w-full'>
                      Outline
                    </Button>
                    <Button variant='ghost' className='w-full'>
                      Ghost
                    </Button>
                  </div>
                </div>
                <div className='space-y-4'>
                  <h4 className='heading-6 text-center'>Sizes</h4>
                  <div className='space-y-3'>
                    <Button variant='primary' size='sm' className='w-full'>
                      Small
                    </Button>
                    <Button variant='primary' className='w-full'>
                      Medium
                    </Button>
                    <Button variant='primary' size='lg' className='w-full'>
                      Large
                    </Button>
                  </div>
                </div>
                <div className='space-y-4'>
                  <h4 className='heading-6 text-center'>States</h4>
                  <div className='space-y-3'>
                    <Button variant='primary' loading className='w-full'>
                      Loading
                    </Button>
                    <Button variant='primary' disabled className='w-full'>
                      Disabled
                    </Button>
                  </div>
                </div>
                <div className='space-y-4'>
                  <h4 className='heading-6 text-center'>Interactive</h4>
                  <div className='space-y-3'>
                    <Button
                      variant='primary'
                      className='w-full hover:scale-105 transition-transform'
                    >
                      Hover Me
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full hover:bg-accent-red hover:text-white transition-colors'
                    >
                      Color Change
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className='bg-surface rounded-xl p-8 border border-surface-border'>
              <h3 className='heading-4 mb-6 text-center'>Input Components</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Regular Input</label>
                  <Input placeholder='Enter text...' onChange={_value => {}} />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Search Input</label>
                  <Input
                    type='search'
                    placeholder='Search movies...'
                    onChange={_value => {}}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Error Input</label>
                  <Input
                    placeholder='Invalid input'
                    error='This field is required'
                    onChange={_value => {}}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Disabled Input</label>
                  <Input placeholder='Disabled' disabled />
                </div>
              </div>
            </div>

            {/* Loading Components */}
            <div className='bg-surface rounded-xl p-8 border border-surface-border'>
              <h3 className='heading-4 mb-6 text-center'>Loading Components</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {/* Spinners */}
                <div className='space-y-4'>
                  <h4 className='heading-5 text-center'>Spinners</h4>
                  <div className='flex justify-center gap-6'>
                    <div className='flex flex-col items-center gap-2'>
                      <Spinner size='sm' />
                      <span className='text-sm text-tertiary'>Small</span>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <Spinner size='md' />
                      <span className='text-sm text-tertiary'>Medium</span>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <Spinner size='lg' />
                      <span className='text-sm text-tertiary'>Large</span>
                    </div>
                  </div>
                </div>

                {/* Skeletons */}
                <div className='space-y-4'>
                  <h4 className='heading-5 text-center'>Skeletons</h4>
                  <div className='flex gap-4 justify-center'>
                    <div className='flex flex-col gap-2'>
                      <Skeleton width='60px' height='60px' />
                      <span className='text-sm text-tertiary'>Square</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Skeleton width='120px' height='20px' />
                      <span className='text-sm text-tertiary'>Text</span>
                    </div>
                  </div>
                </div>

                {/* Skeleton Grid */}
                <div className='space-y-4'>
                  <h4 className='heading-5 text-center'>Skeleton Grid</h4>
                  <SkeletonGrid count={4} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Showcase */}
        <section className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='heading-2 mb-4'>Responsive Design</h2>
            <p className='body-large text-secondary max-w-3xl mx-auto'>
              Test responsive behavior and breakpoint detection
            </p>
          </div>

          <div className='bg-surface rounded-xl p-8 border border-surface-border'>
            <ResponsiveShowcase />
          </div>
        </section>

        {/* Breakpoint Test */}
        <section className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='heading-2 mb-4'>Breakpoint Indicators</h2>
            <p className='body-large text-secondary max-w-3xl mx-auto'>
              Visual indicators for current screen size and responsive behavior
            </p>
          </div>

          <div className='bg-surface rounded-xl p-8 border border-surface-border'>
            <div className='grid gap-4'>
              <div className='xs:hidden bg-accent-red text-white p-4 rounded-lg text-center'>
                <strong>XS (≤474px):</strong> Mobile - 1 column grid, compact
                spacing
              </div>
              <div className='hidden xs:block sm:hidden bg-accent-red text-white p-4 rounded-lg text-center'>
                <strong>SM (475px-639px):</strong> Small mobile - 2 columns,
                basic spacing
              </div>
              <div className='hidden sm:block md:hidden bg-accent-red text-white p-4 rounded-lg text-center'>
                <strong>MD (640px-767px):</strong> Large mobile - 3 columns,
                comfortable spacing
              </div>
              <div className='hidden md:block lg:hidden bg-accent-red text-white p-4 rounded-lg text-center'>
                <strong>LG (768px-1023px):</strong> Tablet - 4 columns, standard
                spacing
              </div>
              <div className='hidden lg:block xl:hidden bg-accent-red text-white p-4 rounded-lg text-center'>
                <strong>XL (1024px-1279px):</strong> Small desktop - 5 columns,
                generous spacing
              </div>
              <div className='hidden xl:block 2xl:hidden bg-accent-red text-white p-4 rounded-lg text-center'>
                <strong>2XL (1280px-1535px):</strong> Desktop - 6 columns,
                premium spacing
              </div>
              <div className='hidden 2xl:block bg-accent-red text-white p-4 rounded-lg text-center'>
                <strong>3XL (≥1536px):</strong> Large desktop - 6 columns,
                maximum spacing
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
