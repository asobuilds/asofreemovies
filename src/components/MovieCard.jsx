import React, { useState } from 'react';
import { 
  Play, 
  Download, 
  Heart, 
  Check, 
  Star, 
  Info,
  Clock
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  const { 
    navigateToWatch, 
    openDownloadModal, 
    watchlist, 
    toggleWatchlist 
  } = useMovies();

  const [isHovered, setIsHovered] = useState(false);
  const isInWatchlist = watchlist.includes(movie.id);

  const releaseYear = movie.releaseDate ? movie.releaseDate.substring(0, 4) : '2024';

  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-[#121826]/80 border border-white/[0.07] overflow-hidden transition-all duration-300 hover:border-[#E50914]/50 hover:shadow-2xl hover:shadow-red-600/10 hover:scale-105 cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // =========================================================================
        // TODO: Replace with API fetch: axios.get(`/api/movies/${movie.id}`)
        // =========================================================================
        navigateToWatch(movie);
      }}
    >
      {/* 2:3 Vertical Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-900">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter group-hover:brightness-90"
        />

        {/* Top Badges (Rating & HD Tag) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-300 shadow">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{movie.rating}</span>
          </div>

          <div className="px-1.5 py-0.5 rounded-md bg-[#E50914] text-white text-[10px] font-black uppercase tracking-wider shadow">
            {movie.downloadLinks?.['4K'] ? '4K' : 'HD'}
          </div>
        </div>

        {/* Subtle Bottom Vignette on Poster */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />

        {/* Smooth Fade-in Hover Overlay */}
        <div 
          className={`absolute inset-0 bg-black/65 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3 p-4 transition-opacity duration-300 z-20 ${
            isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Central Play Stream Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // =========================================================================
              // TODO: Replace with API fetch: axios.post('/api/user/stream-history', { id: movie.id });
              // =========================================================================
              navigateToWatch(movie);
            }}
            className="w-12 h-12 rounded-full bg-[#E50914] hover:bg-red-700 text-white flex items-center justify-center shadow-xl shadow-red-600/50 hover:scale-110 active:scale-95 transition-all"
            title="Stream Now"
          >
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </button>

          {/* Quick Rating & Release Year Label */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{movie.rating} / 10</span>
            </div>
            <span className="text-[11px] text-gray-300 font-medium block mt-0.5">
              {releaseYear} • {movie.duration}
            </span>
          </div>

          {/* Fast Action Buttons Row */}
          <div className="flex items-center gap-2 mt-1">
            {/* Fast "Add to Watchlist" Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // =========================================================================
                // TODO: Replace with API fetch: axios.post('/api/user/watchlist/toggle', { id: movie.id });
                // =========================================================================
                toggleWatchlist(movie.id);
              }}
              className={`p-2.5 rounded-xl border transition-all hover:scale-110 ${
                isInWatchlist
                  ? 'bg-[#E50914] text-white border-red-500'
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/20'
              }`}
              title={isInWatchlist ? "Remove from My List" : "Add to My List"}
            >
              <Heart className={`w-4 h-4 ${isInWatchlist ? 'fill-white' : ''}`} />
            </button>

            {/* Quick Download Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // =========================================================================
                // TODO: Replace with API fetch: axios.get(`/api/downloads/options/${movie.id}`)
                // =========================================================================
                openDownloadModal(movie);
              }}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-[#00D2C4]/30 text-[#00D2C4] border border-[#00D2C4]/40 transition-all hover:scale-110"
              title="Download Movie"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* View Full Info */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateToWatch(movie);
              }}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all hover:scale-110"
              title="Full Details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 bg-[#0f1422]">
        <div>
          <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#E50914] transition-colors">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
            <span>{releaseYear}</span>
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Clock className="w-3 h-3 text-gray-500" />
              {movie.duration}
            </span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mt-2">
          {movie.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/[0.06] text-gray-300"
            >
              {g}
            </span>
          ))}
          {movie.genre.length > 2 && (
            <span className="text-[10px] text-gray-500 px-1 py-0.5">
              +{movie.genre.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
