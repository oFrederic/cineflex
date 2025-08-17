import { ROUTES } from '@/shared/constants/routes';
import React from 'react';

/**
 * HomePage Component
 * Main landing page of the application
 */
export const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to CineFlex</h1>
      <p>Discover amazing movies and TV shows</p>
      <p>Current route: {ROUTES.HOME}</p>
    </div>
  );
};

export default HomePage;
