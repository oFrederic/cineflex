import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * MovieDetailsPage Component
 * Page for displaying detailed movie information
 */
export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {id}</p>
      <p>Detailed information about the movie will be displayed here</p>
    </div>
  );
};

export default MovieDetailsPage;
