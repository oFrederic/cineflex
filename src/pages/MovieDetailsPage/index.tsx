import { useParams } from 'react-router-dom';

/**
 * MovieDetailsPage Component
 * Page for displaying detailed movie information
 */
export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className='container'>
      <div className='p-6'>
        <h1 className='heading-1 mb-6'>Movie Details</h1>
        <p className='body-large mb-4'>Movie ID: {id}</p>
        <p className='body-base'>
          Detailed information about the movie will be displayed here
        </p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
