import { useResponsiveValue } from '@/shared/hooks/useMediaQuery';
import { buildTMDBImageUrl } from '@/shared/utils/formatters';
import styles from './MovieCard.module.css';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview?: string;
  genre_ids?: number[];
}

export interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist?: (movieId: number) => void;
  onMovieClick?: (movieId: number) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * MovieCard Component
 * Displays movie information in a card format following DESIGN.md specifications
 * - 2/3 aspect ratio for movie poster display
 * - Design system typography for title and metadata
 * - Rating display with design system colors
 * - Hover effects and animations from DESIGN.md
 */
export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onAddToWatchlist,
  onMovieClick,
  className = '',
  'data-testid': dataTestId,
}) => {
  // Use responsive hooks for dynamic styling
  const aspectRatio = useResponsiveValue({
    xs: '3/4',
    sm: '3/4',
    md: '2/3',
    lg: '2/3',
    xl: '2/3',
    '2xl': '2/3',
    default: '2/3',
  });

  const titleSize = useResponsiveValue({
    xs: 'var(--text-xs)',
    sm: 'var(--text-sm)',
    md: 'var(--text-sm)',
    lg: 'var(--text-base)',
    xl: 'var(--text-base)',
    '2xl': 'var(--text-lg)',
    default: 'var(--text-sm)',
  });

  const handleCardClick = () => {
    onMovieClick?.(movie.id);
  };

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWatchlist?.(movie.id);
  };

  const formatYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const cardClasses = [styles.movieCard, className].filter(Boolean).join(' ');

  // Apply responsive styles inline
  const cardStyle = {
    aspectRatio,
  } as React.CSSProperties;

  const titleStyle = {
    fontSize: titleSize,
  } as React.CSSProperties;

  return (
    <article
      className={cardClasses}
      style={cardStyle}
      onClick={handleCardClick}
      data-testid={dataTestId}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`${movie.title} - ${formatYear(movie.release_date)}`}
    >
      {/* Movie Poster */}
      <div className={styles.posterContainer}>
        <img
          src={buildTMDBImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className={styles.poster}
          loading='lazy'
        />

        {/* Overlay with actions */}
        <div className={styles.overlay}>
          {onAddToWatchlist && (
            <button
              onClick={handleAddToWatchlist}
              className={styles.watchlistButton}
              aria-label={`Add ${movie.title} to watchlist`}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Movie Content */}
      <div className={styles.content}>
        <h3 className={styles.title} style={titleStyle} title={movie.title}>
          {movie.title}
        </h3>

        <div className={styles.meta}>
          <span className={styles.year}>{formatYear(movie.release_date)}</span>
          <div className={styles.rating}>
            <svg
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='currentColor'
              className={styles.starIcon}
            >
              <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
            </svg>
            <span>{formatRating(movie.vote_average)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
