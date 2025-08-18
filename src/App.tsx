import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Components
import MainLayout from '@/components/layout/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import MovieDetailsPage from '@/pages/MovieDetailsPage';
import MoviesPage from '@/pages/MoviesPage';
import SearchPage from '@/pages/SearchPage';
import WatchlistPage from '@/pages/WatchlistPage';

// Constants
import { ROUTES } from '@/shared/constants/routes';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.MOVIES} element={<MoviesPage />} />
          <Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetailsPage />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
