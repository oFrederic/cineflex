import { ROUTES } from '@/shared/constants/routes';

/**
 * HomePage Component
 * Main landing page of the application
 */
export const HomePage: React.FC = () => {
  return (
    <div className='container'>
      <div className='p-6'>
        <h1 className='heading-1 mb-6'>Welcome to CineFlex</h1>
        <p className='body-large mb-4'>Discover amazing movies and TV shows</p>
        <p className='body-small text-tertiary'>Current route: {ROUTES.HOME}</p>
      </div>
    </div>
  );
};

export default HomePage;
