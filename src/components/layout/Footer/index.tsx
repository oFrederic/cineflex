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
              🐦
            </a>
            <a
              href='#'
              className={styles.socialLink}
              aria-label='Follow us on Instagram'
            >
              📷
            </a>
            <a
              href='#'
              className={styles.socialLink}
              aria-label='Follow us on LinkedIn'
            >
              💼
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
