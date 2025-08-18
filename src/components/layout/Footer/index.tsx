import { ROUTES } from '@/shared/constants/routes';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Application footer with links and copyright information
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.content}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <Link to={ROUTES.HOME} className={styles.logo}>
              <span className={styles.logoText}>CineFlex</span>
            </Link>
            <p className={styles.tagline}>
              Discover amazing movies and TV shows
            </p>
          </div>

          {/* Links Section */}
          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Explore</h3>
              <ul className={styles.linkList}>
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
              <h3 className={styles.linkTitle}>About</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href='#' className={styles.link}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className={styles.link}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href='#' className={styles.link}>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Support</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href='#' className={styles.link}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href='#' className={styles.link}>
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href='#' className={styles.link}>
                    Report Issue
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
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

          {/* Social Links */}
          <div className={styles.socialLinks}>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label='GitHub'
            >
              📱
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label='Twitter'
            >
              🐦
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label='LinkedIn'
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
