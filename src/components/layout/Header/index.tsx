import { ROUTES } from '@/shared/constants/routes';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

/**
 * Header Component
 * Main application header with logo, search, and theme toggle
 */
export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isThemeDark, setIsThemeDark] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      // eslint-disable-next-line no-console
      console.log('Search for:', searchQuery);
    }
  };

  const toggleTheme = () => {
    setIsThemeDark(!isThemeDark);
    document.documentElement.setAttribute(
      'data-theme',
      isThemeDark ? 'light' : 'dark'
    );
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

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Switch to ${isThemeDark ? 'light' : 'dark'} theme`}
        >
          {isThemeDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;
