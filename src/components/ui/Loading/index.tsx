import styles from './Loading.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export interface SkeletonCardProps {
  className?: string;
}

/**
 * Spinner Component
 * Loading spinner with different sizes
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClass = styles[`spinner--${size}`];
  const spinnerClasses = [styles.spinner, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={spinnerClasses} role='status' aria-label='Loading'>
      <div className={styles.spinnerCircle} />
    </div>
  );
};

/**
 * Skeleton Component
 * Basic skeleton placeholder
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
}) => {
  const skeletonClasses = [styles.skeleton, className]
    .filter(Boolean)
    .join(' ');

  const style = {
    width,
    height,
  };

  return <div className={skeletonClasses} style={style} aria-hidden='true' />;
};

/**
 * SkeletonText Component
 * Text skeleton with multiple lines
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 1,
  className = '',
}) => {
  const textClasses = [styles.skeletonText, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={textClasses} aria-hidden='true'>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={styles.skeletonLine}
          style={{
            width: index === lines - 1 ? '75%' : '100%',
          }}
        />
      ))}
    </div>
  );
};

/**
 * SkeletonCard Component
 * Movie card skeleton placeholder
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = '',
}) => {
  const cardClasses = [styles.skeletonCard, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} aria-hidden='true'>
      <div className={styles.skeletonPoster} />
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonMeta}>
          <div className={styles.skeletonYear} />
          <div className={styles.skeletonRating} />
        </div>
      </div>
    </div>
  );
};

/**
 * SkeletonGrid Component
 * Grid of skeleton cards
 */
export const SkeletonGrid: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 6, className = '' }) => {
  const gridClasses = [styles.skeletonGrid, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClasses} aria-hidden='true'>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default {
  Spinner,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonGrid,
};
