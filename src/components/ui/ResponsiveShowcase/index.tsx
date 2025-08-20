import {
  useBreakpoint,
  useIs2XL,
  useIsBelowXS,
  useIsLG,
  useIsMD,
  useIsSM,
  useIsXL,
  useIsXS,
  useResponsiveValue,
} from '@/shared/hooks';
import React from 'react';
import styles from './ResponsiveShowcase.module.css';

export interface ResponsiveShowcaseProps {
  className?: string;
  'data-testid'?: string;
}

/**
 * ResponsiveShowcase Component
 * Demonstrates the proper use of responsive hooks instead of hardcoded CSS media queries
 * Following DESIGN.md specifications for responsive design
 */
export const ResponsiveShowcase: React.FC<ResponsiveShowcaseProps> = ({
  className = '',
  'data-testid': dataTestId,
}) => {
  // Use responsive hooks for dynamic styling and behavior
  const currentBreakpoint = useBreakpoint();
  const isBelowXS = useIsBelowXS();
  const isXS = useIsXS();
  const isSM = useIsSM();
  const isMD = useIsMD();
  const isLG = useIsLG();
  const isXL = useIsXL();
  const is2XL = useIs2XL();

  // Example of useResponsiveValue hook for dynamic values
  const responsiveText = useResponsiveValue({
    xs: 'Extra Small Screen (≤474px)',
    sm: 'Small Screen (475px-639px)',
    md: 'Medium Screen (640px-767px)',
    lg: 'Large Screen (768px-1023px)',
    xl: 'Extra Large Screen (1024px-1279px)',
    '2xl': '2X Large Screen (≥1280px)',
    default: 'Default Screen',
  });

  const responsiveColor = useResponsiveValue({
    xs: '#ff6b6b',
    sm: '#4ecdc4',
    md: '#45b7d1',
    lg: '#96ceb4',
    xl: '#feca57',
    '2xl': '#ff9ff3',
    default: '#ffffff',
  });

  const responsiveFontSize = useResponsiveValue({
    xs: 'var(--text-sm)',
    sm: 'var(--text-base)',
    md: 'var(--text-lg)',
    lg: 'var(--text-xl)',
    xl: 'var(--text-2xl)',
    '2xl': 'var(--text-3xl)',
    default: 'var(--text-base)',
  });

  const responsivePadding = useResponsiveValue({
    xs: 'var(--space-3)',
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)',
    '2xl': 'var(--space-10)',
    default: 'var(--space-4)',
  });

  const responsiveGridColumns = useResponsiveValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    '2xl': 6,
    default: 2,
  });

  const containerClasses = [styles.responsiveShowcase, className]
    .filter(Boolean)
    .join(' ');

  // Apply responsive styles inline
  const showcaseStyle = {
    padding: responsivePadding,
  } as React.CSSProperties;

  const textStyle = {
    fontSize: responsiveFontSize,
    color: responsiveColor,
  } as React.CSSProperties;

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${responsiveGridColumns}, 1fr)`,
    gap: 'var(--space-4)',
  } as React.CSSProperties;

  return (
    <div
      className={containerClasses}
      style={showcaseStyle}
      data-testid={dataTestId}
    >
      <h2 className={styles.title}>Responsive Hooks Demo</h2>
      <p className={styles.description}>
        This component demonstrates the proper use of responsive hooks instead
        of hardcoded CSS media queries. All responsive behavior is controlled by
        React hooks following DESIGN.md specifications.
      </p>

      {/* Current Breakpoint Display */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Current Breakpoint State</h3>
        <div className={styles.breakpointDisplay}>
          <div
            className={styles.breakpointCard}
            style={{ backgroundColor: responsiveColor }}
          >
            <strong>Current Breakpoint:</strong>{' '}
            {currentBreakpoint.toUpperCase()}
          </div>
          <div
            className={styles.breakpointCard}
            style={{ backgroundColor: responsiveColor }}
          >
            <strong>Responsive Text:</strong> {responsiveText}
          </div>
        </div>
      </section>

      {/* Breakpoint Detection */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Breakpoint Detection</h3>
        <div className={styles.breakpointGrid}>
          <div
            className={`${styles.breakpointItem} ${isBelowXS ? styles.active : styles.inactive}`}
          >
            Below XS (&lt;475px): {isBelowXS ? '✅ Active' : '❌ Inactive'}
          </div>
          <div
            className={`${styles.breakpointItem} ${isXS ? styles.active : styles.inactive}`}
          >
            XS (475px-639px): {isXS ? '✅ Active' : '❌ Inactive'}
          </div>
          <div
            className={`${styles.breakpointItem} ${isSM ? styles.active : styles.inactive}`}
          >
            SM (640px-767px): {isSM ? '✅ Active' : '❌ Inactive'}
          </div>
          <div
            className={`${styles.breakpointItem} ${isMD ? styles.active : styles.inactive}`}
          >
            MD (768px-1023px): {isMD ? '✅ Active' : '❌ Inactive'}
          </div>
          <div
            className={`${styles.breakpointItem} ${isLG ? styles.active : styles.inactive}`}
          >
            LG (1024px-1279px): {isLG ? '✅ Active' : '❌ Inactive'}
          </div>
          <div
            className={`${styles.breakpointItem} ${isXL ? styles.active : styles.inactive}`}
          >
            XL (1280px-1535px): {isXL ? '✅ Active' : '❌ Inactive'}
          </div>
          <div
            className={`${styles.breakpointItem} ${is2XL ? styles.active : styles.inactive}`}
          >
            2XL (≥1536px): {is2XL ? '✅ Active' : '❌ Inactive'}
          </div>
        </div>
      </section>

      {/* Responsive Values Demo */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Responsive Values Demo</h3>
        <div className={styles.valuesDemo}>
          <div className={styles.valueCard}>
            <h4>Responsive Text</h4>
            <p style={textStyle}>
              This text changes size and color based on the current breakpoint
              using the useResponsiveValue hook.
            </p>
          </div>
          <div className={styles.valueCard}>
            <h4>Responsive Grid</h4>
            <div style={gridStyle}>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={styles.gridItem}>
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hook Usage Examples */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Hook Usage Examples</h3>
        <div className={styles.codeExamples}>
          <div className={styles.codeBlock}>
            <h4>useBreakpoint()</h4>
            <pre>
              <code>
                {`const breakpoint = useBreakpoint();
// Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`}
              </code>
            </pre>
          </div>
          <div className={styles.codeBlock}>
            <h4>useResponsiveValue()</h4>
            <pre>
              <code>
                {`const fontSize = useResponsiveValue({
  xs: 'var(--text-sm)',
  sm: 'var(--text-base)',
  md: 'var(--text-lg)',
  lg: 'var(--text-xl)',
  xl: 'var(--text-2xl)',
  '2xl': 'var(--text-3xl)',
  default: 'var(--text-base)',
});`}
              </code>
            </pre>
          </div>
          <div className={styles.codeBlock}>
            <h4>Individual Breakpoint Hooks</h4>
            <pre>
              <code>
                {`const isMobile = useIsBelowMD();
const isTablet = useIsMD();
const isDesktop = useIsLG();`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsiveShowcase;
