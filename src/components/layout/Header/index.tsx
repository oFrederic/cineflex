import { ROUTES } from '@/shared/constants/routes';
import { useLocalStorage } from '@/shared/hooks';
import { validateSearchQuery } from '@/shared/utils';
import { SEARCH, STORAGE_KEYS } from '@/shared/utils/constants';
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

  // Search functionality with debouncing
  const [searchQuery, setSearchQuery] = useState('');
  // TODO: Implement debounced search for API integration
  // const debouncedSearchQuery = useSearchDebounce(searchQuery, SEARCH.DEBOUNCE_DELAY);

  // Search history management
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    STORAGE_KEYS.SEARCH_HISTORY,
    []
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && validateSearchQuery(searchQuery)) {
      // Add to search history
      const newHistory = [
        searchQuery.trim(),
        ...searchHistory.filter(item => item !== searchQuery.trim()),
      ].slice(0, SEARCH.MAX_HISTORY_ITEMS);

      setSearchHistory(newHistory);

      // Navigate to search page with query
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Initialize theme on component mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to={ROUTES.HOME} className={styles.logo}>
          <span className={styles.logoText}>CineFlex</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <input
            type='text'
            placeholder='Search movies...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type='submit' className={styles.searchButton}>
            🔍
          </button>
        </form>

        {/* Right Side Controls */}
        <div className={styles.controls}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={styles.mobileMenuButton}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
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
      )}
    </header>
  );
};

export default Header;
