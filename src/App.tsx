import Navigation from '@/components/layout/Navigation';
import HomePage from '@/pages/HomePage';
import MovieDetailsPage from '@/pages/MovieDetailsPage';
import MoviesPage from '@/pages/MoviesPage';
import SearchPage from '@/pages/SearchPage';
import WatchlistPage from '@/pages/WatchlistPage';
import { ROUTES } from '@/shared/constants/routes';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
