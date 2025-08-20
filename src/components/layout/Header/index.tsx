import { Input } from '@/components/ui';
import { ROUTES } from '@/shared/constants/routes';
import { useLocalStorage } from '@/shared/hooks';
import { validateSearchQuery } from '@/shared/utils';
import { STORAGE_KEYS } from '@/shared/utils/constants';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

/**
 * Header Component
 * Netflix-style responsive header with logo, navigation, search, and theme toggle
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Theme management with localStorage persistence
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>(
    STORAGE_KEYS.THEME,
    'dark'
  );

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

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
      setSearchQuery('');
    }
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Check if current route is active
  const isActiveRoute = (route: string) => {
    return location.pathname === route;
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

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link
              to={ROUTES.HOME}
              className={`${styles.navLink} ${isActiveRoute(ROUTES.HOME) ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link
              to={ROUTES.MOVIES}
              className={`${styles.navLink} ${isActiveRoute(ROUTES.MOVIES) ? styles.active : ''}`}
            >
              Movies
            </Link>
            <Link
              to={ROUTES.SEARCH}
              className={`${styles.navLink} ${isActiveRoute(ROUTES.SEARCH) ? styles.active : ''}`}
            >
              Search
            </Link>
            <Link
              to={ROUTES.WATCHLIST}
              className={`${styles.navLink} ${isActiveRoute(ROUTES.WATCHLIST) ? styles.active : ''}`}
            >
              Watchlist
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className={styles.searchContainer}>
            <Input
              type='search'
              placeholder='Search movies...'
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                className={styles.searchButton}
                onClick={() => handleSearch(searchQuery)}
                aria-label='Search'
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                </svg>
              </button>
            )}
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
              <span
                className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}
              ></span>
              <span
                className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}
              ></span>
              <span
                className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={e => e.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileLogo}>
                <div className={styles.logoIcon}>
                  <svg width='24' height='24' viewBox='0 0 32 32' fill='none'>
                    <path
                      d='M16 2L20 12L30 12L22 18L26 28L16 22L6 28L10 18L2 12L12 12L16 2Z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
                <span className={styles.logoText}>CineFlex</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className={styles.closeButton}
                aria-label='Close mobile menu'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z' />
                </svg>
              </button>
            </div>

            {/* Mobile Search */}
            <div className={styles.mobileSearch}>
              <Input
                type='search'
                placeholder='Search movies...'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  className={styles.mobileSearchButton}
                  onClick={() => {
                    handleSearch(searchQuery);
                    closeMobileMenu();
                  }}
                  aria-label='Search'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                  </svg>
                </button>
              )}
            </div>

            <nav className={styles.mobileNav}>
              <Link
                to={ROUTES.HOME}
                className={`${styles.mobileNavLink} ${isActiveRoute(ROUTES.HOME) ? styles.active : ''}`}
                onClick={closeMobileMenu}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                </svg>
                Home
              </Link>
              <Link
                to={ROUTES.MOVIES}
                className={`${styles.mobileNavLink} ${isActiveRoute(ROUTES.MOVIES) ? styles.active : ''}`}
                onClick={closeMobileMenu}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' />
                </svg>
                Movies
              </Link>
              <Link
                to={ROUTES.SEARCH}
                className={`${styles.mobileNavLink} ${isActiveRoute(ROUTES.SEARCH) ? styles.active : ''}`}
                onClick={closeMobileMenu}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                </svg>
                Search
              </Link>
              <Link
                to={ROUTES.WATCHLIST}
                className={`${styles.mobileNavLink} ${isActiveRoute(ROUTES.WATCHLIST) ? styles.active : ''}`}
                onClick={closeMobileMenu}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
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
