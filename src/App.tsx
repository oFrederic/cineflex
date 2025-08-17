import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navigation from '@/components/layout/Navigation';

// Pages
import HomePage from '@/pages/HomePage';
import MoviesPage from '@/pages/MoviesPage';
import MovieDetailsPage from '@/pages/MovieDetailsPage';
import SearchPage from '@/pages/SearchPage';
import WatchlistPage from '@/pages/WatchlistPage';

// Constants
import { ROUTES } from '@/shared/constants/routes';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navigation />
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.MOVIES} element={<MoviesPage />} />
          <Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetailsPage />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
