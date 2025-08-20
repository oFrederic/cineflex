import {
  Button,
  Input,
  Skeleton,
  SkeletonCard,
  SkeletonGrid,
  SkeletonText,
  Spinner,
} from '@/components/ui';
import { ROUTES } from '@/shared/constants/routes';

/**
 * HomePage Component
 * Main landing page showcasing the foundational components
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
