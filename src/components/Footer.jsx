import React from 'react';
import { Film, Globe, Share2, Tv, Radio, Heart, ShieldCheck, Sparkles, HardDrive } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function Footer() {
  const { navigateTo } = useMovies();

  return (
    <footer className="border-t border-white/10 bg-[#070a12] text-gray-400 text-xs py-14 px-4 sm:px-6 lg:px-8 mt-20 lg:pl-72">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Multi-column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E50914] to-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <Film className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-white font-['Poppins']">
                Aso<span className="text-[#E50914]">free</span>movies
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Your free entertainment hub for streaming and downloading movies, series, and TV shows in compressed, small-megabyte formats. Enjoy high quality with minimal data usage.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <button aria-label="Web Portal" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </button>
              <button aria-label="Broadcast TV" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors">
                <Tv className="w-4 h-4" />
              </button>
              <button aria-label="Radio Stream" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors">
                <Radio className="w-4 h-4" />
              </button>
              <button aria-label="Share" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-['Poppins']">Categories</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Home Discover
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('movies')} className="hover:text-white transition-colors">
                  Movies (Films)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('series')} className="hover:text-white transition-colors">
                  TV Series
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tv')} className="hover:text-white transition-colors">
                  TV Shows
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mylist')} className="hover:text-white transition-colors">
                  My Watchlist
                </button>
              </li>
            </ul>
          </div>

          {/* Compressed Downloads Col */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-['Poppins']">Compressed Tech</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Ultra-Compact 480p (~180MB)</span></li>
              <li><span className="text-gray-400">High Efficiency 720p (~390MB)</span></li>
              <li><span className="text-gray-400">Compressed 1080p (~780MB)</span></li>
              <li><span className="text-gray-400">Multi-pass HEVC & AV1</span></li>
              <li><span className="text-gray-400">Data Saver Mobile Packs</span></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-['Poppins']">About & Terms</h4>
            <ul className="space-y-2">
              <li><button className="hover:text-white transition-colors">Help & FAQ</button></li>
              <li><button className="hover:text-white transition-colors">API Connection</button></li>
              <li><button className="hover:text-white transition-colors">Terms of Use</button></li>
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} Asofreemovies. Free streaming & compressed downloads.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-400">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              Ultra-Low Megabytes (MB)
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Sparkles className="w-3.5 h-3.5 text-[#00D2C4]" />
              TMDB API Ready
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
