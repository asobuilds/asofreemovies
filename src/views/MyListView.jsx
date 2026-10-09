import React from 'react';
import { Heart, Film, ArrowRight } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { useMovies } from '../context/MovieContext';

export default function MyListView() {
  const { movies, watchlist, navigateTo } = useMovies();

  const watchlistMovies = movies.filter((m) => watchlist.includes(m.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-8 animate-fade-in lg:pl-72">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-widest mb-1.5">
          <Heart className="w-3.5 h-3.5 fill-[#E50914]" />
          <span>Saved Titles</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Poppins']">
          My Watchlist
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          {watchlistMovies.length} {watchlistMovies.length === 1 ? 'title' : 'titles'} saved to your Asofreemovies library
        </p>
      </div>

      {/* Grid or Empty State */}
      {watchlistMovies.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-500">
            <Heart className="w-8 h-8 text-[#E50914]/50" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Poppins']">
            Your Watchlist is Empty
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Click the heart icon on any movie, series, or TV show to save it here for instant streaming and compressed downloads.
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-xs shadow-lg transition-colors inline-flex items-center gap-2"
          >
            <span>Browse Asofreemovies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {watchlistMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

    </div>
  );
}
