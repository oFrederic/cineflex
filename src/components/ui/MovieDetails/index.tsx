import { Button, Grid, GridItem } from '@/components/ui';
import { useResponsiveValue } from '@/shared/hooks';
import { useState } from 'react';
import MovieCard, { type Movie } from '../MovieCard';
import styles from './MovieDetails.module.css';

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieDetailsData extends Movie {
  overview: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  cast: CastMember[];
  crew: CrewMember[];
  similar_movies: Movie[];
  backdrop_path: string;
  tagline: string;
  budget: number;
  revenue: number;
  status: string;
  original_language: string;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
}

export interface MovieDetailsProps {
  movie: MovieDetailsData;
  onAddToWatchlist?: (movieId: number) => void;
  onMovieClick?: (movieId: number) => void;
  className?: string;
  'data-testid'?: string;
}

type TabType = 'overview' | 'cast' | 'crew' | 'similar';

/**
 * MovieDetails Component
 * Comprehensive movie details page following DESIGN.md specifications
 * - Hero section using design system layout
 * - Information tabs with design system styling
 * - Cast and crew sections
 */
export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onAddToWatchlist,
  onMovieClick,
  className = '',
  'data-testid': dataTestId,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Use responsive hooks for dynamic styling
  const heroMinHeight = useResponsiveValue({
    xs: '50vh',
    sm: '55vh',
    md: '60vh',
    lg: '70vh',
    xl: '75vh',
    '2xl': '85vh',
    default: '80vh',
  });

  const heroTitleSize = useResponsiveValue({
    xs: 'var(--text-2xl)',
    sm: 'var(--text-3xl)',
    md: 'var(--text-4xl)',
    lg: 'var(--text-4xl)',
    xl: 'var(--text-5xl)',
    '2xl': 'var(--text-6xl)',
    default: 'var(--text-5xl)',
  });

  const posterMaxWidth = useResponsiveValue({
    xs: '150px',
    sm: '180px',
    md: '200px',
    lg: '250px',
    xl: '280px',
    '2xl': '350px',
    default: '300px',
  });

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    if (amount === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const tabs: Array<{ id: TabType; label: string; count?: number }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'cast', label: 'Cast', count: movie.cast.length },
    { id: 'crew', label: 'Crew', count: movie.crew.length },
    {
      id: 'similar',
      label: 'Similar Movies',
      count: movie.similar_movies.length,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={styles.overviewContent}>
            <p className={styles.overview}>{movie.overview}</p>

            <div className={styles.movieInfo}>
              <div className={styles.infoSection}>
                <h4 className={styles.infoTitle}>Details</h4>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Runtime</span>
                    <span className={styles.infoValue}>
                      {formatRuntime(movie.runtime)}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Status</span>
                    <span className={styles.infoValue}>{movie.status}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Language</span>
                    <span className={styles.infoValue}>
                      {movie.original_language.toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Budget</span>
                    <span className={styles.infoValue}>
                      {formatCurrency(movie.budget)}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Revenue</span>
                    <span className={styles.infoValue}>
                      {formatCurrency(movie.revenue)}
                    </span>
                  </div>
                </div>
              </div>

              {movie.genres.length > 0 && (
                <div className={styles.infoSection}>
                  <h4 className={styles.infoTitle}>Genres</h4>
                  <div className={styles.genres}>
                    {movie.genres.map(genre => (
                      <span key={genre.id} className={styles.genreTag}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.production_companies.length > 0 && (
                <div className={styles.infoSection}>
                  <h4 className={styles.infoTitle}>Production Companies</h4>
                  <div className={styles.companies}>
                    {movie.production_companies.map(company => (
                      <span key={company.id} className={styles.companyTag}>
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'cast':
        return (
          <div className={styles.castContent}>
            <Grid variant='movie' gap='md'>
              {movie.cast.slice(0, 12).map(member => (
                <GridItem key={member.id}>
                  <div className={styles.castCard}>
                    <div className={styles.castImage}>
                      {member.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                          alt={member.name}
                          loading='lazy'
                        />
                      ) : (
                        <div className={styles.castPlaceholder}>
                          <svg
                            width='40'
                            height='40'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                            <circle cx='12' cy='7' r='4' />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className={styles.castInfo}>
                      <h4 className={styles.castName}>{member.name}</h4>
                      <p className={styles.castCharacter}>{member.character}</p>
                    </div>
                  </div>
                </GridItem>
              ))}
            </Grid>
          </div>
        );

      case 'crew':
        return (
          <div className={styles.crewContent}>
            <div className={styles.crewSections}>
              {[
                'Directing',
                'Writing',
                'Production',
                'Sound',
                'Camera',
                'Editing',
              ].map(department => {
                const departmentCrew = movie.crew.filter(
                  member => member.department === department
                );

                if (departmentCrew.length === 0) return null;

                return (
                  <div key={department} className={styles.crewSection}>
                    <h4 className={styles.crewSectionTitle}>{department}</h4>
                    <div className={styles.crewList}>
                      {departmentCrew.slice(0, 5).map(member => (
                        <div key={member.id} className={styles.crewMember}>
                          <div className={styles.crewImage}>
                            {member.profile_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                alt={member.name}
                                loading='lazy'
                              />
                            ) : (
                              <div className={styles.crewPlaceholder}>
                                <svg
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                >
                                  <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                                  <circle cx='12' cy='7' r='4' />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className={styles.crewInfo}>
                            <h5 className={styles.crewName}>{member.name}</h5>
                            <p className={styles.crewJob}>{member.job}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'similar':
        return (
          <div className={styles.similarContent}>
            <Grid variant='movie' gap='md'>
              {movie.similar_movies.slice(0, 6).map(similarMovie => (
                <GridItem key={similarMovie.id}>
                  <MovieCard
                    movie={similarMovie}
                    onAddToWatchlist={onAddToWatchlist}
                    onMovieClick={onMovieClick}
                  />
                </GridItem>
              ))}
            </Grid>
          </div>
        );

      default:
        return null;
    }
  };

  const containerClasses = [styles.movieDetails, className]
    .filter(Boolean)
    .join(' ');

  // Apply responsive styles inline
  const heroSectionStyle = {
    minHeight: heroMinHeight,
  } as React.CSSProperties;

  const heroTitleStyle = {
    fontSize: heroTitleSize,
  } as React.CSSProperties;

  const posterStyle = {
    maxWidth: posterMaxWidth,
  } as React.CSSProperties;

  return (
    <div className={containerClasses} data-testid={dataTestId}>
      {/* Hero Section */}
      <section className={styles.heroSection} style={heroSectionStyle}>
        <div className={styles.heroBackground}>
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={`${movie.title} backdrop`}
              className={styles.heroImage}
            />
          )}
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <Grid variant='hero' gap='xl'>
            <GridItem>
              <div className={styles.heroInfo}>
                <h1 className={styles.heroTitle} style={heroTitleStyle}>
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className={styles.heroTagline}>"{movie.tagline}"</p>
                )}
                <div className={styles.heroMeta}>
                  <span className={styles.heroYear}>
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : 'Unknown'}
                  </span>
                  <span className={styles.heroRuntime}>
                    {formatRuntime(movie.runtime)}
                  </span>
                  <div className={styles.heroRating}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className={styles.starIcon}
                    >
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
                <div className={styles.heroGenres}>
                  {movie.genres.slice(0, 3).map(genre => (
                    <span key={genre.id} className={styles.heroGenreTag}>
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className={styles.heroActions}>
                  <Button variant='primary' size='lg'>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <polygon points='5,3 19,12 5,21' />
                    </svg>
                    Watch Trailer
                  </Button>
                  {onAddToWatchlist && (
                    <Button
                      variant='outline'
                      size='lg'
                      onClick={() => onAddToWatchlist(movie.id)}
                    >
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
                      </svg>
                      Add to Watchlist
                    </Button>
                  )}
                </div>
              </div>
            </GridItem>
            <GridItem>
              <div className={styles.heroPoster}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className={styles.posterImage}
                  style={posterStyle}
                />
              </div>
            </GridItem>
          </Grid>
        </div>
      </section>

      {/* Tabs Section */}
      <section className={styles.tabsSection}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={styles.tabCount}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>{renderTabContent()}</div>
      </section>
    </div>
  );
};

export default MovieDetails;
