import { MOCK_MOVIES } from '../data/mockMovies';

/**
 * Frontend Movie API Client
 * Securely communicates with the backend server via `/api/movies`
 * The TMDB API Key remains strictly stored in the server/.env file and is NEVER exposed to clients.
 */
class MovieApiClient {
  async fetchCatalog() {
    try {
      const response = await fetch('/api/movies', {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result.data && result.data.length > 0) {
        return {
          data: result.data,
          source: result.source || 'backend',
          message: 'Catalog loaded securely from backend.'
        };
      }

      return { data: MOCK_MOVIES, source: 'local' };
    } catch (err) {
      console.warn('Backend server not yet started or offline. Using local verified catalog:', err.message);
      return {
        data: MOCK_MOVIES,
        source: 'local',
        message: 'Loaded local collection. Start backend server (npm run server) for live API updates.'
      };
    }
  }

  async search(query) {
    if (!query || !query.trim()) return null;

    try {
      const response = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) return null;

      const result = await response.json();
      return result.results || null;
    } catch (err) {
      console.warn('Backend search error:', err.message);
      return null;
    }
  }
}

export const movieApi = new MovieApiClient();
