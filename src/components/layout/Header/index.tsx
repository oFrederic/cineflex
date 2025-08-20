import { ROUTES } from '@/shared/constants/routes';
import { useLocalStorage } from '@/shared/hooks';
import { validateSearchQuery } from '@/shared/utils';
import { STORAGE_KEYS } from '@/shared/utils/constants';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

/**
 * Header Component
 * Main application header with logo, search, theme toggle, and mobile navigation
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();

  // Theme management with localStorage persistence
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>(
    STORAGE_KEYS.THEME,
    'dark'
  );

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle search submission
  const handleSearch = (query: string) => {
    if (validateSearchQuery(query)) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(query)}`);
    }
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to={ROUTES.HOME} className={styles.logo}>
            <span className={styles.logoText}>CineFlex</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className={styles.searchContainer}>
            <input
              type='text'
              placeholder='Search movies...'
              className={styles.searchInput}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch(e.currentTarget.value);
                }
              }}
            />
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
                </svg>
              ) : (
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1 -1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1 -9 0ZM18.894 6.166a.75.75 0 0 0 -1.06 -1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591 -1.59ZM21.75 12a.75.75 0 0 1 -.75.75h-2.25a.75.75 0 0 1 0 -1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06 -1.06l-1.59 -1.591a.75.75 0 1 0 -1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1 -1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0 -1.061 -1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591 -1.59ZM6 12a.75.75 0 0 1 -.75.75H3a.75.75 0 0 1 0 -1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06 -1.06l-1.59 -1.591a.75.75 0 0 0 -1.061 1.06l1.59 1.591Z' />
                </svg>
              )}
            </button>

            {/* Hamburger Menu - Only on mobile/tablet */}
            <button
              onClick={toggleMobileMenu}
              className={styles.hamburger}
              aria-label='Toggle mobile menu'
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={e => e.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <h2>Menu</h2>
              <button
                onClick={closeMobileMenu}
                className={styles.closeButton}
                aria-label='Close mobile menu'
              >
                ✕
              </button>
            </div>

            <nav className={styles.mobileNav}>
              <Link
                to={ROUTES.HOME}
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to={ROUTES.MOVIES}
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
              >
                Movies
              </Link>
              <Link
                to={ROUTES.SEARCH}
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
              >
                Search
              </Link>
              <Link
                to={ROUTES.WATCHLIST}
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
              >
                Watchlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
