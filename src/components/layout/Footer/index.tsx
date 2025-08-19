import { ROUTES } from '@/shared/constants/routes';
import { useLocalStorage, useMediaQuery } from '@/shared/hooks';
import { STORAGE_KEYS } from '@/shared/utils/constants';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Application footer with links and copyright information
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
      className={`${styles.footer} ${!isContentVisible ? styles.collapsed : ''}`}
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
              {isContentVisible ? '▼' : '▲'}
            </button>
          </div>
        )}

        {/* Content Section - Collapsible on mobile/tablet */}
        <div
          className={`${styles.content} ${!isContentVisible ? styles.hidden : ''}`}
        >
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <Link to={ROUTES.HOME} className={styles.logo}>
              <span className={styles.logoText}>CineFlex</span>
            </Link>
            <p className={styles.tagline}>
              Discover your next favorite movie with our comprehensive database
            </p>
          </div>

          {/* Links Section */}
          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Navigation</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.MOVIES} className={styles.link}>
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.SEARCH} className={styles.link}>
                    Search
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.WATCHLIST} className={styles.link}>
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
                    About
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    Help
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
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
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HOME} className={styles.link}>
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
              </a>
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
