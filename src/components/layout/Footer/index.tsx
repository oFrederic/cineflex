import { ROUTES } from '@/shared/constants/routes';
import { useLocalStorage, useMediaQuery } from '@/shared/hooks';
import { STORAGE_KEYS } from '@/shared/utils/constants';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Netflix-style footer with enhanced design system styling
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Check if device is mobile/tablet (screen width < 1024px)
  const isMobileOrTablet = useMediaQuery('(max-width: 1023px)');

  // Get initial state from localStorage or default based on screen size
  const [isContentVisible, setIsContentVisible] = useLocalStorage<boolean>(
    STORAGE_KEYS.FOOTER_EXPANDED,
    !isMobileOrTablet // true on desktop, false on mobile/tablet
  );

  // Always show content on desktop, use stored state only on mobile/tablet
  const shouldShowContent = !isMobileOrTablet || isContentVisible;

  // Only set initial state once when component mounts or screen size changes
  useEffect(() => {
    // If no value is stored in localStorage, set the default based on screen size
    const storedValue = localStorage.getItem(STORAGE_KEYS.FOOTER_EXPANDED);
    if (storedValue === null) {
      setIsContentVisible(!isMobileOrTablet);
    }
  }, [isMobileOrTablet, setIsContentVisible]);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <footer
      className={`${styles.footer} ${!shouldShowContent ? styles.collapsed : ''}`}
    >
      <div className={styles.container}>
        {/* Toggle Button - Only show on mobile/tablet */}
        {isMobileOrTablet && (
          <div className={styles.toggleContainer}>
            <button
              onClick={toggleContent}
              className={styles.toggleButton}
              aria-label={
                isContentVisible ? 'Hide footer content' : 'Show footer content'
              }
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='currentColor'
                className={
                  isContentVisible ? styles.chevronDown : styles.chevronUp
                }
              >
                <path d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' />
              </svg>
            </button>
          </div>
        )}

        {/* Content Section - Collapsible on mobile/tablet */}
        <div
          className={`${styles.content} ${!shouldShowContent ? styles.hidden : ''}`}
        >
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <Link to={ROUTES.HOME} className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
                  <path
                    d='M16 2L20 12L30 12L22 18L26 28L16 22L6 28L10 18L2 12L12 12L16 2Z'
                    fill='currentColor'
                  />
                </svg>
              </div>
              <span className={styles.logoText}>CineFlex</span>
            </Link>
            <p className={styles.tagline}>
              Discover your next favorite movie with our comprehensive database
              powered by The Movie Database
            </p>
            <div className={styles.brandStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Movies</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>5K+</span>
                <span className={styles.statLabel}>TV Shows</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>1M+</span>
                <span className={styles.statLabel}>Users</span>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Navigation</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.MOVIES} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' />
                    </svg>
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.SEARCH} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                    </svg>
                    Search
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.WATCHLIST} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                    Watchlist
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Resources</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                    </svg>
                    About
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' />
                    </svg>
                    Help
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
                    </svg>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' />
                    </svg>
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Legal</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' />
                    </svg>
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' />
                    </svg>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                    </svg>
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Always visible */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              © {currentYear} CineFlex. All rights reserved.
            </p>
            <p className={styles.disclaimer}>
              Powered by{' '}
              <a
                href='https://www.themoviedb.org/'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.tmdbLink}
              >
                The Movie Database
              </a>{' '}
              • This product uses the TMDB API but is not endorsed or certified
              by TMDB.
            </p>
          </div>

          <div className={styles.socialLinks}>
            <a
              href='#'
              className={styles.socialLink}
              aria-label='Follow us on Twitter'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
              </svg>
            </a>
            <a
              href='#'
              className={styles.socialLink}
              aria-label='Follow us on Instagram'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
              </svg>
            </a>
            <a
              href='#'
              className={styles.socialLink}
              aria-label='Follow us on LinkedIn'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
