import type { ReactNode } from 'react';
import { Grid, GridItem, SkeletonGrid } from '@/components/ui';
import MovieCard, { type Movie } from '../MovieCard';
import styles from './MovieGrid.module.css';

export interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  onAddToWatchlist?: (movieId: number) => void;
  onMovieClick?: (movieId: number) => void;
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

/**
 * MovieGrid Component
 * Responsive movie grid following DESIGN.md specifications
 * - Responsive movie grid (2→6 columns)
 * - 4pt grid spacing system
 * - Skeleton loading states from DESIGN.md
 */
export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading = false,
  onAddToWatchlist,
  onMovieClick,
  className = '',
  children,
  'data-testid': dataTestId,
}) => {
  const gridClasses = [styles.movieGrid, className].filter(Boolean).join(' ');

  // Show skeleton loading state
  if (loading) {
    return (
      <div className={gridClasses} data-testid={dataTestId}>
        <SkeletonGrid count={12} />
      </div>
    );
  }

  // Show empty state
  if (!movies || movies.length === 0) {
    return (
      <div className={gridClasses} data-testid={dataTestId}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg
              width='48'
              height='48'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
              <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>No movies found</h3>
          <p className={styles.emptyText}>
            Try adjusting your search criteria or browse our popular movies.
          </p>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={gridClasses} data-testid={dataTestId}>
      <Grid variant='movie' gap='md'>
        {movies.map(movie => (
          <GridItem key={movie.id}>
            <MovieCard
              movie={movie}
              onAddToWatchlist={onAddToWatchlist}
              onMovieClick={onMovieClick}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default MovieGrid;
