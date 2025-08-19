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
              {theme === 'light' ? '🌙' : '☀️'}
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
