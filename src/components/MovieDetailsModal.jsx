import React from 'react';
import { 
  X, 
  Play, 
  Download, 
  Heart, 
  Check, 
  Star, 
  Clock, 
  Calendar, 
  Volume2, 
  Tv, 
  Sparkles,
  Share2
} from 'lucide-react';

export default function MovieDetailsModal({ 
  movie, 
  onClose, 
  onStream, 
  onDownload, 
  isInWatchlist, 
  onToggleWatchlist,
  allMovies = []
}) {
  if (!movie) return null;

  const similarMovies = allMovies
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 4);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-[#0f121d] border border-white/10 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop Banner Header */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-gray-900">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover filter brightness-70"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f121d] via-[#0f121d]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f121d] via-transparent to-transparent w-2/3" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white flex items-center justify-center border border-white/15 transition-all hover:scale-105"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Bottom Title & Actions on Backdrop */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white">
                  {movie.quality}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {movie.matchRate}% Match
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300">
                  {movie.ageRating}
                </span>
                <span className="text-gray-300 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {movie.rating} / 10
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                {movie.title}
              </h2>
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  onStream(movie);
                  onClose();
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Stream Now
              </button>

              <button
                onClick={() => onDownload(movie)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2 border border-white/15 backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
                title="Download Movie"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                Download
              </button>

              <button
                onClick={() => onToggleWatchlist(movie.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isInWatchlist
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                }`}
                title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              >
                <Heart className={`w-4 h-4 ${isInWatchlist ? 'fill-rose-400 text-rose-400' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Synopsis & Audio/Video specs */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Storyline
                </h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {movie.description}
                </p>
              </div>

              {/* Technical Badges */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Audio & Video Standards
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2 text-gray-300">
                    <Tv className="w-4 h-4 text-rose-400" />
                    <span>4K Ultra HD</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2 text-gray-300">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Dolby 5.1 Surround</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2 text-gray-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>HDR10+ / Vision</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Multi Subtitles</span>
                  </div>
                </div>
              </div>

              {/* Download Sizes preview */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Available Offline Storage Options
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {Object.entries(movie.fileSizes).map(([res, sz]) => (
                    <span 
                      key={res}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium"
                    >
                      <strong className="text-white">{res}:</strong> {sz}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Director, Cast, Genres */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 text-xs">
              <div>
                <span className="text-gray-400 block mb-1">Director</span>
                <span className="text-white font-semibold text-sm">{movie.director}</span>
              </div>

              <div>
                <span className="text-gray-400 block mb-1.5">Top Cast</span>
                <div className="flex flex-wrap gap-1.5">
                  {movie.cast.map((actor) => (
                    <span 
                      key={actor}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-gray-400 block mb-1.5">Genres</span>
                <div className="flex flex-wrap gap-1.5">
                  {movie.genres.map((g) => (
                    <span 
                      key={g}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 font-semibold"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-gray-400 block mb-1">Runtime</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> {movie.duration} ({movie.durationMinutes} mins)
                </span>
              </div>

              <div>
                <span className="text-gray-400 block mb-1">Release Year</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {movie.year}
                </span>
              </div>
            </div>

          </div>

          {/* Similar Recommended Movies */}
          {similarMovies.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                More Like This
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {similarMovies.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      onClose();
                      onStream(sim);
                    }}
                    className="group relative rounded-xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer hover:border-rose-500/50 transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={sim.backdrop}
                        alt={sim.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-2.5">
                      <h5 className="text-xs font-bold text-white truncate group-hover:text-rose-400 transition-colors">
                        {sim.title}
                      </h5>
                      <span className="text-[10px] text-gray-400">
                        {sim.year} • {sim.rating} ★
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
