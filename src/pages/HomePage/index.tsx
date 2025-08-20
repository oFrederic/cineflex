import {
  Button,
  Grid,
  GridItem,
  Input,
  MovieCard,
  Skeleton,
  SkeletonCard,
  SkeletonGrid,
  SkeletonText,
  Spinner,
} from '@/components/ui';
import { ROUTES } from '@/shared/constants/routes';

// Sample movie data for showcase
const sampleMovies = [
  {
    id: 1,
    title: 'Inception',
    poster_path:
      'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    overview:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
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
    title: 'The Shawshank Redemption',
    poster_path:
      'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    release_date: '1994-09-23',
    vote_average: 9.3,
    overview:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  },
  {
    id: 6,
    title: 'Fight Club',
    poster_path:
      'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    release_date: '1999-10-15',
    vote_average: 8.8,
    overview:
      'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
  },
];

/**
 * HomePage Component
 * Main landing page showcasing the foundational components and grid system
 */
export const HomePage: React.FC = () => {
  return (
    <div className='container'>
      <div className='p-6'>
        <h1 className='heading-1 mb-6'>Welcome to CineFlex</h1>
        <p className='body-large mb-4'>Discover amazing movies and TV shows</p>
        <p className='body-small text-tertiary mb-8'>
          Current route: {ROUTES.HOME}
        </p>

        {/* Grid System Showcase */}
        <section className='mb-12'>
          <h2 className='heading-3 mb-6'>Responsive Grid System</h2>

          {/* Bento Grid */}
          <div className='mb-8'>
            <h3 className='heading-4 mb-4'>Bento Grid Layout</h3>
            <Grid variant='bento' gap='lg'>
              <GridItem span={2}>
                <div className='bg-secondary p-6 rounded-lg border border-surface-border'>
                  <h4 className='heading-5 mb-2'>Featured Content</h4>
                  <p className='text-secondary'>
                    This item spans 2 columns in the bento grid layout.
                  </p>
                </div>
              </GridItem>
              <GridItem>
                <div className='bg-secondary p-6 rounded-lg border border-surface-border'>
                  <h4 className='heading-5 mb-2'>Regular Item</h4>
                  <p className='text-secondary'>
                    Standard grid item with single column span.
                  </p>
                </div>
              </GridItem>
              <GridItem>
                <div className='bg-secondary p-6 rounded-lg border border-surface-border'>
                  <h4 className='heading-5 mb-2'>Another Item</h4>
                  <p className='text-secondary'>Another standard grid item.</p>
                </div>
              </GridItem>
              <GridItem span={2}>
                <div className='bg-secondary p-6 rounded-lg border border-surface-border'>
                  <h4 className='heading-5 mb-2'>Wide Content</h4>
                  <p className='text-secondary'>
                    This item also spans 2 columns for balanced layout.
                  </p>
                </div>
              </GridItem>
            </Grid>
          </div>

          {/* Movie Grid */}
          <div className='mb-8'>
            <h3 className='heading-4 mb-4'>Movie Grid Layout</h3>
            <Grid variant='movie' gap='md'>
              {Array.from({ length: 6 }, (_, i) => (
                <GridItem key={i}>
                  <div className='bg-secondary p-4 rounded-lg border border-surface-border aspect-[2/3] flex flex-col justify-between'>
                    <div className='bg-tertiary h-32 rounded mb-3'></div>
                    <div>
                      <h4 className='heading-6 mb-1'>Movie Title {i + 1}</h4>
                      <p className='text-xs text-tertiary'>2024 • Action</p>
                    </div>
                  </div>
                </GridItem>
              ))}
            </Grid>
          </div>

          {/* Hero Grid */}
          <div className='mb-8'>
            <h3 className='heading-4 mb-4'>Hero Grid Layout</h3>
            <Grid variant='hero' gap='xl'>
              <GridItem>
                <div className='bg-secondary p-8 rounded-lg border border-surface-border'>
                  <h4 className='heading-4 mb-4'>Hero Content</h4>
                  <p className='text-secondary mb-4'>
                    This is the main hero content area with larger text and more
                    prominent styling.
                  </p>
                  <Button variant='primary'>Call to Action</Button>
                </div>
              </GridItem>
              <GridItem>
                <div className='bg-secondary p-8 rounded-lg border border-surface-border'>
                  <h4 className='heading-4 mb-4'>Supporting Content</h4>
                  <p className='text-secondary mb-4'>
                    This is the supporting content area that complements the
                    hero section.
                  </p>
                  <Button variant='outline'>Learn More</Button>
                </div>
              </GridItem>
            </Grid>
          </div>

          {/* Content Grid */}
          <div className='mb-8'>
            <h3 className='heading-4 mb-4'>Content Grid Layout</h3>
            <Grid variant='content' gap='md'>
              {Array.from({ length: 4 }, (_, i) => (
                <GridItem key={i}>
                  <div className='bg-secondary p-6 rounded-lg border border-surface-border'>
                    <h4 className='heading-5 mb-2'>Content Card {i + 1}</h4>
                    <p className='text-secondary'>
                      This is a content card that adapts to different screen
                      sizes using the responsive grid system.
                    </p>
                  </div>
                </GridItem>
              ))}
            </Grid>
          </div>

          {/* Custom Column Grid */}
          <div className='mb-8'>
            <h3 className='heading-4 mb-4'>Custom Column Grid</h3>
            <Grid columns={3} gap='lg'>
              <GridItem span={2}>
                <div className='bg-secondary p-6 rounded-lg border border-surface-border'>
                  <h4 className='heading-5 mb-2'>Wide Content (2 columns)</h4>
                  <p className='text-secondary'>
                    This item spans 2 out of 3 columns.
                  </p>
                </div>
              </GridItem>
              <GridItem>
                <div className='bg-secondary p-6 rounded-lg border border-surface-border'>
                  <h4 className='heading-5 mb-2'>Narrow Content</h4>
                  <p className='text-secondary'>This item takes 1 column.</p>
                </div>
              </GridItem>
            </Grid>
          </div>
        </section>

        {/* MovieCard Showcase */}
        <section className='mb-12'>
          <h2 className='heading-3 mb-6'>MovieCard Component</h2>
          <p className='body-large mb-6'>
            MovieCard component following DESIGN.md specifications with 2/3
            aspect ratio, hover effects, and design system typography.
          </p>

          {/* MovieCard Grid */}
          <div className='mb-8'>
            <h3 className='heading-4 mb-4'>Movie Cards with Hover Effects</h3>
            <Grid variant='movie' gap='md'>
              {sampleMovies.map(movie => (
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

          {/* MovieCard with Custom Content */}
          <div className='mb-8'>
            <h3 className='heading-4 mb-4'>MovieCard with Custom Children</h3>
            <Grid variant='movie' gap='md'>
              {sampleMovies.slice(0, 3).map(movie => (
                <GridItem key={movie.id}>
                  <MovieCard
                    movie={movie}
                    onAddToWatchlist={movieId => {
                      // eslint-disable-next-line no-console
                      console.log(`Added movie ${movieId} to watchlist`);
                    }}
                  >
                    <div className='flex gap-2 mt-2'>
                      <span className='text-xs bg-accent-red text-white px-2 py-1 rounded'>
                        Action
                      </span>
                      <span className='text-xs bg-surface-border text-text-secondary px-2 py-1 rounded'>
                        Adventure
                      </span>
                    </div>
                  </MovieCard>
                </GridItem>
              ))}
            </Grid>
          </div>
        </section>

        {/* Component Showcase */}
        <section className='mb-12'>
          <h2 className='heading-3 mb-6'>Foundational Components</h2>

          {/* Button Showcase */}
          <div className='mb-12'>
            <h3 className='heading-4 mb-4'>Button Components</h3>
            <div className='flex gap-4 flex-wrap'>
              <Button variant='primary'>Primary Button</Button>
              <Button variant='secondary'>Secondary Button</Button>
              <Button variant='outline'>Outline Button</Button>
              <Button variant='ghost'>Ghost Button</Button>
              <Button variant='primary' size='sm'>
                Small
              </Button>
              <Button variant='primary' size='lg'>
                Large
              </Button>
              <Button variant='primary' loading>
                Loading
              </Button>
              <Button variant='primary' disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Input Showcase */}
          <div className='mb-12'>
            <h3 className='heading-4 mb-4'>Input Components</h3>
            <div className='flex gap-4 flex-wrap'>
              <div className='w-64'>
                <Input
                  placeholder='Regular input'
                  onChange={_value => {
                    // Handle input change
                  }}
                />
              </div>
              <div className='w-64'>
                <Input
                  type='search'
                  placeholder='Search movies...'
                  onChange={_value => {
                    // Handle search
                  }}
                />
              </div>
              <div className='w-64'>
                <Input
                  placeholder='Error input'
                  error='This field is required'
                  onChange={_value => {
                    // Handle error input
                  }}
                />
              </div>
              <div className='w-64'>
                <Input placeholder='Disabled input' disabled />
              </div>
            </div>
          </div>

          {/* Loading Showcase */}
          <div className='mb-12'>
            <h3 className='heading-4 mb-6'>Loading Components</h3>

            {/* Spinners */}
            <div className='mb-8'>
              <h4 className='heading-5 mb-4'>Spinners</h4>
              <div className='flex gap-6 items-center'>
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

            {/* Basic Skeletons */}
            <div className='mb-8'>
              <h4 className='heading-5 mb-4'>Basic Skeletons</h4>
              <div className='flex gap-6 items-end'>
                <div className='flex flex-col gap-2'>
                  <Skeleton width='200px' height='20px' />
                  <span className='text-sm text-tertiary'>Rectangle</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <Skeleton width='60px' height='60px' />
                  <span className='text-sm text-tertiary'>Square</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <Skeleton width='120px' height='120px' />
                  <span className='text-sm text-tertiary'>Large Square</span>
                </div>
              </div>
            </div>

            {/* Skeleton Text */}
            <div className='mb-8'>
              <h4 className='heading-5 mb-4'>Skeleton Text</h4>
              <div className='flex gap-8'>
                <div className='flex flex-col gap-2'>
                  <SkeletonText lines={3} />
                  <span className='text-sm text-tertiary'>3 Lines</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <SkeletonText lines={1} />
                  <span className='text-sm text-tertiary'>1 Line</span>
                </div>
              </div>
            </div>

            {/* Skeleton Cards */}
            <div className='mb-8'>
              <h4 className='heading-5 mb-4'>Skeleton Cards</h4>
              <div className='flex gap-4 flex-wrap'>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>

            {/* Skeleton Grid */}
            <div>
              <h4 className='heading-5 mb-4'>Skeleton Grid (Responsive)</h4>
              <SkeletonGrid count={6} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
