import { NAVIGATION_ITEMS } from '@/shared/constants/routes';
import { useIsMobile } from '@/shared/hooks';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

/**
 * Navigation Component
 * Desktop and tablet navigation bar (hidden on mobile)
 */
export const Navigation: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't render navigation on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Navigation Links */}
        <div className={styles.links}>
          {NAVIGATION_ITEMS.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`${styles.link} ${
                location.pathname === item.path ? styles.active : ''
              }`}
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
