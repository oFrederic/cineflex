import { NAVIGATION_ITEMS } from '@/shared/constants/routes';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

/**
 * Navigation Component
 * Basic navigation bar for testing routing
 */
export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
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
    </nav>
  );
};

export default Navigation;
