import React from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import { HeroBannerSkeleton, MovieRowSkeleton } from '../components/SkeletonLoaders';
import { useMovies } from '../context/MovieContext';
import { Clapperboard, Tv, Radio, Sparkles, HardDrive, Smartphone, ShieldCheck } from 'lucide-react';

export default function HomeView() {
  const { movies, loading, categories, navigateTo } = useMovies();

  if (loading) {
    return (
      <div className="space-y-6 lg:pl-72">
        <HeroBannerSkeleton />
        <MovieRowSkeleton count={5} />
        <MovieRowSkeleton count={5} />
      </div>
    );
  }

  const featuredMovies = movies.filter((m) => m.isFeatured);
  const moviesList = movies.filter((m) => m.type === 'movie');
  const seriesList = movies.filter((m) => m.type === 'series');
  const tvShowsList = movies.filter((m) => m.type === 'tv_show');
  const trendingList = movies.filter((m) => m.category === 'Trending Now' || m.rating >= 8.8);

  return (
    <div className="space-y-4 lg:pl-72 animate-fade-in">
      
      {/* Immersive Featured Spotlight Slider */}
      <HeroBanner featuredMovies={featuredMovies.length > 0 ? featuredMovies : movies.slice(0, 3)} />

      {/* Compressed Data Saver Feature Announcement Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0f1422] to-[#161d2d] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  Data-Saver Technology
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  Small Megabytes (MB)
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                All movies and series on Asofreemovies are compressed into lightweight MB files (180MB - 390MB) for ultra-fast downloads on mobile data and slow internet.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('movies')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all text-center"
            >
              Browse Movies
            </button>
            <button
              onClick={() => navigateTo('series')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10 text-xs font-semibold transition-all text-center"
            >
              Browse Series
            </button>
          </div>
        </div>
      </div>

      {/* Distinct Vertically Stacked Categories */}
      <div className="max-w-7xl mx-auto space-y-4 pt-2">
        
        {/* 1. Trending Now */}
        <MovieRow
          title="🔥 Trending Right Now"
          subtitle="Top streamed titles across Asofreemovies this week"
          movies={trendingList}
        />

        {/* 2. Blockbuster Movies */}
        <MovieRow
          title="🎬 Full Feature Movies"
          subtitle="High definition blockbuster feature films"
          movies={moviesList}
        />

        {/* 3. Bingeable Series */}
        <MovieRow
          title="📺 Multi-Season Series"
          subtitle="Complete episodic seasons with compact episode packs"
          movies={seriesList}
        />

        {/* 4. Popular TV Shows */}
        <MovieRow
          title="📡 TV Broadcasts & Reality Shows"
          subtitle="Competitions, reality broadcasts, and talk shows"
          movies={tvShowsList}
        />

        {/* 5. Top Rated Masterpieces */}
        <MovieRow
          title="⭐ Top Rated Masterpieces (8.5+)"
          subtitle="Critically acclaimed movies and series"
          movies={movies.filter((m) => m.rating >= 8.6)}
        />

      </div>
    </div>
  );
}
