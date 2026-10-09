import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_MOVIES, MOCK_CATEGORIES } from '../data/mockMovies';
import { movieApi } from '../services/movieApi';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiSource, setApiSource] = useState('local');

  // Navigation route: 'home' | 'movies' | 'series' | 'tv' | 'trending' | 'mylist' | 'explore' | 'watch' | 'downloads'
  const [currentRoute, setCurrentRoute] = useState('home');
  const [activeMovie, setActiveMovie] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'newest' | 'title'

  // Watchlist persisted state
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('asofree_my_list');
      return saved ? JSON.parse(saved) : ['mov-01', 'ser-01'];
    } catch {
      return ['mov-01', 'ser-01'];
    }
  });

  // Download Modal state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadTargetMovie, setDownloadTargetMovie] = useState(null);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('asofree_my_list', JSON.stringify(watchlist));
    } catch (err) {
      console.error('Failed to sync watchlist', err);
    }
  }, [watchlist]);

  // Initial Data Fetching from backend /api/movies
  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await movieApi.fetchCatalog();
      setMovies(result.data);
      setApiSource(result.source);
      
      const featured = result.data.find((m) => m.isFeatured) || result.data[0];
      setActiveMovie(featured);
    } catch (err) {
      console.error('Error loading movie catalog:', err);
      setMovies(MOCK_MOVIES);
      setActiveMovie(MOCK_MOVIES[0]);
    } finally {
      setLoading(false);
    }
  };

  // Live Search Handler
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      const apiResults = await movieApi.search(query);
      if (apiResults && apiResults.length > 0) {
        setMovies((prev) => {
          const map = new Map(prev.map(m => [m.id, m]));
          apiResults.forEach(r => map.set(r.id, r));
          return Array.from(map.values());
        });
      }
    }
  };

  const toggleWatchlist = (movieId) => {
    const target = movies.find((m) => m.id === movieId);
    const title = target ? target.title : 'Title';

    setWatchlist((prev) => {
      if (prev.includes(movieId)) {
        showToast(`Removed "${title}" from My List`, 'info');
        return prev.filter((id) => id !== movieId);
      } else {
        showToast(`Saved "${title}" to My List`, 'watchlist');
        return [...prev, movieId];
      }
    });
  };

  const openDownloadModal = (movie) => {
    setDownloadTargetMovie(movie);
    setIsDownloadModalOpen(true);
  };

  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false);
    setDownloadTargetMovie(null);
  };

  const navigateToWatch = (movie) => {
    setActiveMovie(movie);
    setCurrentRoute('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const value = {
    movies,
    loading,
    error,
    categories: MOCK_CATEGORIES,
    currentRoute,
    navigateTo,
    activeMovie,
    setActiveMovie,
    navigateToWatch,
    watchlist,
    toggleWatchlist,
    isDownloadModalOpen,
    downloadTargetMovie,
    openDownloadModal,
    closeDownloadModal,
    searchQuery,
    setSearchQuery: handleSearch,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    toastMessage,
    showToast,
    refetchMovies: loadCatalog,
    apiSource
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}
