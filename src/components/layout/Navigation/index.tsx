import { NAVIGATION_ITEMS } from '@/shared/constants/routes';
import { useIsMobile, useIsTablet } from '@/shared/hooks';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

/**
 * Navigation Component
 * Basic navigation bar for testing routing
 */
export const Navigation: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Mobile Menu Button */}
        {(isMobile || isTablet) && (
          <button
            onClick={toggleMenu}
            className={styles.mobileMenuButton}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Navigation Links */}
        <div className={`${styles.links} ${isMenuOpen ? styles.menuOpen : ''}`}>
          {NAVIGATION_ITEMS.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`${styles.link} ${
                location.pathname === item.path ? styles.active : ''
              }`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
