import React, { useState } from 'react';
import { 
  Play, 
  Info, 
  Download, 
  Heart, 
  Check, 
  Star, 
  Volume2, 
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { HeroBannerSkeleton } from './SkeletonLoaders';

export default function HeroBanner({ featuredMovies = [] }) {
  const { 
    loading, 
    navigateToWatch, 
    openDownloadModal, 
    watchlist, 
    toggleWatchlist 
  } = useMovies();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  if (loading) {
    return <HeroBannerSkeleton />;
  }

  if (!featuredMovies || featuredMovies.length === 0) return null;

  const movie = featuredMovies[currentIndex] || featuredMovies[0];
  const isInWatchlist = watchlist.includes(movie.id);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    setIsPlayingPreview(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
    setIsPlayingPreview(false);
  };

  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#0b0f19]">
      
      {/* Background Media with Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        {isPlayingPreview ? (
          <video
            src={movie.videoStreamUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center filter brightness-50 scale-105 transition-transform duration-1000"
          />
        ) : (
          <img
            src={movie.banner}
            alt={movie.title}
            className="w-full h-full object-cover object-center filter brightness-50 transition-all duration-700"
          />
        )}

        {/* Multi-layered cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent w-full lg:w-3/4" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Featured Content Details */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
        <div className="max-w-2xl space-y-4 sm:space-y-5 animate-fade-in">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
            <span className="px-2.5 py-1 rounded-md bg-[#E50914] text-white tracking-wider uppercase flex items-center gap-1 shadow-lg shadow-red-600/30">
              <Sparkles className="w-3 h-3" /> Featured Spotlight
            </span>

            <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15 text-amber-300 flex items-center gap-1 backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {movie.rating} Rating
            </span>

            <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 backdrop-blur-md">
              {movie.ageRating}
            </span>

            <span className="text-gray-400 font-medium">
              {movie.releaseDate.substring(0, 4)} • {movie.duration}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg font-['Poppins']">
            {movie.title}
          </h1>

          {/* Dynamic Genre Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-200 backdrop-blur-sm transition-colors"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base line-clamp-3 leading-relaxed max-w-xl">
            {movie.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            {/* High-Contrast "Play Now" Button */}
            <button
              onClick={() => {
                // =========================================================================
                // TODO: Replace with API fetch to log start of stream session:
                // await axios.post('/api/analytics/stream-start', { movieId: movie.id });
                // =========================================================================
                navigateToWatch(movie);
              }}
              className="px-6 py-3.5 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play className="w-5 h-5 fill-white" />
              Play Now
            </button>

            {/* "Info" / Full Details Button */}
            <button
              onClick={() => {
                // =========================================================================
                // TODO: Replace with API fetch: axios.get(`/api/movies/${movie.id}`)
                // =========================================================================
                navigateToWatch(movie);
              }}
              className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base flex items-center gap-2 border border-white/20 backdrop-blur-md active:scale-[0.98] transition-all"
            >
              <Info className="w-5 h-5" />
              Info
            </button>

            {/* Download Button */}
            <button
              onClick={() => {
                // =========================================================================
                // TODO: Replace with API fetch to verify user download license:
                // await axios.post('/api/downloads/request', { movieId: movie.id });
                // =========================================================================
                openDownloadModal(movie);
              }}
              className="px-4 py-3.5 rounded-xl bg-black/40 hover:bg-[#00D2C4]/20 text-[#00D2C4] border border-[#00D2C4]/40 font-semibold text-sm flex items-center gap-2 backdrop-blur-md active:scale-[0.98] transition-all"
              title="Download Movie"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Watchlist Toggle Button */}
            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`p-3.5 rounded-xl border font-medium text-sm flex items-center gap-2 backdrop-blur-md transition-all ${
                isInWatchlist
                  ? 'bg-[#E50914]/20 border-[#E50914]/50 text-[#E50914]'
                  : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
              }`}
              title={isInWatchlist ? "Remove from My List" : "Add to My List"}
            >
              {isInWatchlist ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Heart className="w-5 h-5" />}
            </button>

            {/* Sound Preview Toggle */}
            <button
              onClick={() => {
                if (!isPlayingPreview) {
                  setIsPlayingPreview(true);
                  setIsMuted(false);
                } else {
                  setIsMuted(!isMuted);
                }
              }}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-all ml-auto hidden sm:flex items-center gap-1.5 text-xs font-semibold"
              title="Toggle preview video sound"
            >
              {isPlayingPreview && !isMuted ? (
                <Volume2 className="w-4 h-4 text-[#00D2C4]" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-400" />
              )}
              <span>{isPlayingPreview ? (isMuted ? 'Muted' : 'Audio On') : 'Trailer'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Featured Slider Chevrons */}
      {featuredMovies.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-white flex items-center justify-center transition-all opacity-70 hover:opacity-100 hidden md:flex"
            aria-label="Previous Featured Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-white flex items-center justify-center transition-all opacity-70 hover:opacity-100 hidden md:flex"
            aria-label="Next Featured Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2">
            {featuredMovies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlayingPreview(false);
                }}
                className={`transition-all rounded-full ${
                  idx === currentIndex 
                    ? 'w-8 h-2 bg-[#E50914]' 
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
