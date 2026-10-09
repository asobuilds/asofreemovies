import React, { useMemo, useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  SlidersHorizontal, 
  Film, 
  X, 
  Sparkles,
  Clapperboard,
  Tv,
  Radio,
  HardDrive
} from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/SkeletonLoaders';
import { useMovies } from '../context/MovieContext';
import { MOCK_GENRES } from '../data/mockMovies';

export default function ExploreView() {
  const { 
    movies, 
    loading, 
    searchQuery, 
    setSearchQuery, 
    selectedGenre, 
    setSelectedGenre, 
    sortBy, 
    setSortBy,
    currentRoute,
    navigateTo 
  } = useMovies();

  // Selected media type filter: 'all' | 'movie' | 'series' | 'tv_show'
  const [selectedType, setSelectedType] = useState(() => {
    if (currentRoute === 'movies') return 'movie';
    if (currentRoute === 'series') return 'series';
    if (currentRoute === 'tv') return 'tv_show';
    return 'all';
  });

  // Filter and sort catalog
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Media type filter
    if (selectedType !== 'all') {
      result = result.filter((m) => m.type === selectedType);
    } else if (currentRoute === 'movies') {
      result = result.filter((m) => m.type === 'movie');
    } else if (currentRoute === 'series') {
      result = result.filter((m) => m.type === 'series');
    } else if (currentRoute === 'tv') {
      result = result.filter((m) => m.type === 'tv_show');
    }

    // Genre filter
    if (selectedGenre !== 'All') {
      result = result.filter((m) => m.genre.includes(selectedGenre));
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q)) ||
        m.cast.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.releaseDate) - new Date(a.releaseDate);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [movies, selectedType, selectedGenre, searchQuery, sortBy, currentRoute]);

  const handleClearFilters = () => {
    setSelectedGenre('All');
    setSearchQuery('');
    setSortBy('rating');
    setSelectedType('all');
  };

  const getPageTitle = () => {
    if (currentRoute === 'movies' || selectedType === 'movie') return 'Blockbuster Movies';
    if (currentRoute === 'series' || selectedType === 'series') return 'Bingeable Series';
    if (currentRoute === 'tv' || selectedType === 'tv_show') return 'Popular TV Shows';
    if (searchQuery) return `Results for "${searchQuery}"`;
    return 'Browse Full Catalog';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-7 animate-fade-in lg:pl-8">
      
      {/* Category Pills Header */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedType === 'all'
              ? 'bg-[#E50914] text-white shadow-lg shadow-red-600/30'
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
        >
          All Categories
        </button>
        <button
          onClick={() => setSelectedType('movie')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            selectedType === 'movie'
              ? 'bg-[#E50914] text-white shadow-lg shadow-red-600/30'
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
        >
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Movies</span>
        </button>
        <button
          onClick={() => setSelectedType('series')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            selectedType === 'series'
              ? 'bg-[#E50914] text-white shadow-lg shadow-red-600/30'
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>Series</span>
        </button>
        <button
          onClick={() => setSelectedType('tv_show')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            selectedType === 'tv_show'
              ? 'bg-[#E50914] text-white shadow-lg shadow-red-600/30'
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>TV Shows</span>
        </button>
      </div>

      {/* Page Header & Filtering Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Poppins']">
            {getPageTitle()}
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {loading ? 'Fetching updated catalog...' : `${filteredMovies.length} titles available with compressed small MB downloads`}
          </p>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Genre Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#121826] border border-white/15 text-xs text-gray-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-transparent font-semibold text-white focus:outline-none cursor-pointer"
            >
              {MOCK_GENRES.map((genre) => (
                <option key={genre} value={genre} className="bg-[#0b0f19] text-white">
                  {genre === 'All' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#121826] border border-white/15 text-xs text-gray-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="rating" className="bg-[#0b0f19] text-white">Highest Rated</option>
              <option value="newest" className="bg-[#0b0f19] text-white">Newest Release</option>
              <option value="title" className="bg-[#0b0f19] text-white">Title (A-Z)</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(selectedGenre !== 'All' || searchQuery || selectedType !== 'all') && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>
      </div>

      {/* Responsive Grid System: grid-cols-2 md:grid-cols-4 lg:grid-cols-6 */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-500">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Poppins']">
            No matching titles found
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Try switching categories or clearing search keywords.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-xs shadow-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

    </div>
  );
}
