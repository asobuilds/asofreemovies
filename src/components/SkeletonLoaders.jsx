import React from 'react';

/**
 * Shimmering skeleton for the Hero Banner during data fetch
 */
export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[540px] sm:h-[620px] bg-[#111625] overflow-hidden animate-pulse flex items-end">
      {/* Dark gradient overlay placeholder */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-transparent w-3/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-4">
        {/* Badges placeholder */}
        <div className="flex items-center gap-3">
          <div className="h-5 w-24 bg-gray-800 rounded-md animate-shimmer" />
          <div className="h-5 w-16 bg-gray-800 rounded-md animate-shimmer" />
          <div className="h-5 w-20 bg-gray-800 rounded-md animate-shimmer" />
        </div>

        {/* Title placeholder */}
        <div className="h-12 sm:h-16 w-2/3 max-w-xl bg-gray-800/80 rounded-xl animate-shimmer" />

        {/* Description placeholder */}
        <div className="space-y-2 max-w-lg">
          <div className="h-4 w-full bg-gray-800/60 rounded animate-shimmer" />
          <div className="h-4 w-4/5 bg-gray-800/60 rounded animate-shimmer" />
          <div className="h-4 w-2/3 bg-gray-800/60 rounded animate-shimmer" />
        </div>

        {/* Buttons placeholder */}
        <div className="flex items-center gap-4 pt-4">
          <div className="h-12 w-36 bg-gray-700 rounded-xl animate-shimmer" />
          <div className="h-12 w-32 bg-gray-800 rounded-xl animate-shimmer" />
          <div className="h-12 w-12 bg-gray-800 rounded-xl animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

/**
 * Shimmering skeleton for 2:3 vertical poster MovieCard
 */
export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-[#121826] border border-white/5 overflow-hidden animate-pulse">
      {/* 2:3 Poster aspect ratio */}
      <div className="relative aspect-[2/3] w-full bg-gray-800/70 animate-shimmer">
        <div className="absolute top-2.5 left-2.5 h-5 w-12 bg-gray-700/80 rounded" />
      </div>

      {/* Info labels */}
      <div className="p-3.5 space-y-2.5">
        <div className="h-4 w-3/4 bg-gray-700/80 rounded animate-shimmer" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-12 bg-gray-800 rounded" />
          <div className="h-3 w-16 bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Shimmering skeleton for MovieRow carousel
 */
export function MovieRowSkeleton({ count = 5 }) {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Title bar placeholder */}
      <div className="h-6 w-48 bg-gray-800 rounded-md animate-shimmer" />

      {/* Cards row */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="w-[170px] sm:w-[210px] md:w-[230px] shrink-0">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
