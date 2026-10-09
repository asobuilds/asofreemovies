import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function MovieRow({ title, subtitle, movies = [] }) {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollOffset = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollOffset : scrollLeft + scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative py-5 group/row">
      {/* Category Header */}
      <div className="flex items-end justify-between mb-3 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Poppins'] flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Scroll Control Chevrons */}
        <div className="flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E50914] border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E50914] border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Containers with scrollbar-none */}
      <div
        ref={rowRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth px-4 sm:px-6 lg:px-8 pb-3"
      >
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="w-[165px] sm:w-[200px] md:w-[225px] shrink-0"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
