import { NAVIGATION_ITEMS } from '@/shared/constants/routes';
import { Link } from 'react-router-dom';

/**
 * Navigation Component
 * Basic navigation bar for testing routing
 */
export const Navigation: React.FC = () => {
  return (
    <nav
      style={{
        padding: '16px',
        backgroundColor: '#141414',
        borderBottom: '1px solid #404040',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {NAVIGATION_ITEMS.map(item => (
          <Link
            key={item.id}
            to={item.path}
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#2a2a2a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
