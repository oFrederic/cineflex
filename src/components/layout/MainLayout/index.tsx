import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import type { ReactNode } from 'react';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout Component
 * Main layout wrapper that provides consistent structure across all pages
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className={styles.main}>
        {/* Navigation */}
        <Navigation />

        {/* Page Content */}
        <div className={styles.content}>{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
