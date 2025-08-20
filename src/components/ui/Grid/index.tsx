import type { ReactNode } from 'react';
import { useResponsiveValue } from '@/shared/hooks/useMediaQuery';
import styles from './Grid.module.css';

export interface GridProps {
  children: ReactNode;
  variant?: 'bento' | 'movie' | 'hero' | 'content';
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  'data-testid'?: string;
}

export interface GridItemProps {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  'data-testid'?: string;
}

/**
 * Grid Component
 * Responsive grid system based on DESIGN.md bento grid specifications
 */
export const Grid: React.FC<GridProps> = ({
  children,
  variant = 'content',
  columns = 1,
  gap = 'md',
  className = '',
  'data-testid': dataTestId,
}) => {
  // Use responsive hooks to determine grid columns based on breakpoint
  const responsiveColumns = useResponsiveValue({
    xs: variant === 'movie' ? 1 : 1,
    sm: variant === 'movie' ? 2 : 1,
    md: variant === 'movie' ? 3 : 2,
    lg: variant === 'movie' ? 4 : 3,
    xl: variant === 'movie' ? 5 : 4,
    '2xl': variant === 'movie' ? 6 : 5,
    default: columns,
  });

  const gridClasses = [
    styles.grid,
    styles[`grid--${variant}`],
    styles[`grid--cols-${responsiveColumns}`],
    styles[`grid--gap-${gap}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClasses} data-testid={dataTestId}>
      {children}
    </div>
  );
};

/**
 * GridItem Component
 * Individual grid item with span support
 */
export const GridItem: React.FC<GridItemProps> = ({
  children,
  span = 1,
  className = '',
  'data-testid': dataTestId,
}) => {
  const itemClasses = [
    styles.gridItem,
    styles[`gridItem--span-${span}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClasses} data-testid={dataTestId}>
      {children}
    </div>
  );
};

export default Grid;
