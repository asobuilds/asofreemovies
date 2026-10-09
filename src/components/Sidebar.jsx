import React from 'react';
import { 
  Film, 
  Tv, 
  Clapperboard, 
  Home, 
  Heart, 
  DownloadCloud, 
  Flame, 
  User, 
  LogOut, 
  Sparkles, 
  X, 
  HardDrive,
  Radio,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { 
    currentRoute, 
    navigateTo, 
    watchlist, 
    selectedGenre, 
    setSelectedGenre
  } = useMovies();

  const { 
    currentUser, 
    isAuthenticated, 
    openAuthModal, 
    logout 
  } = useAuth();

  const handleNav = (route) => {
    navigateTo(route);
    if (window.innerWidth < 1024) onClose();
  };

  const navItems = [
    { id: 'home', label: 'Home / Discover', icon: Home, count: null },
    { id: 'movies', label: 'Movies', icon: Clapperboard, count: null },
    { id: 'series', label: 'Series', icon: Tv, count: null },
    { id: 'tv', label: 'TV Shows', icon: Radio, count: null },
    { id: 'trending', label: 'Trending & Charts', icon: Flame, count: null },
    { id: 'mylist', label: 'My Watchlist', icon: Heart, count: watchlist.length },
    { id: 'downloads', label: 'Compressed Vault', icon: HardDrive, count: null },
  ];

  const quickGenres = ['Action', 'Sci-Fi', 'Comedy', 'Drama', 'Fantasy', 'Crime'];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0a0d16] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E50914] to-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white font-['Poppins'] tracking-tight flex items-center gap-1">
                Aso<span className="text-[#E50914]">free</span>
              </div>
              <span className="text-[10px] text-[#00D2C4] font-bold uppercase tracking-widest block -mt-1">
                Movies & Series
              </span>
            </div>
          </button>

          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
          
          {/* Main Navigation Section */}
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 px-3 block mb-2">
              Menu & Categories
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E50914] text-white shadow-lg shadow-red-600/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && item.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-black/30 text-white' : 'bg-[#E50914]/20 text-[#E50914]'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Genre Tags */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 px-3 block">
              Quick Genres
            </span>
            <div className="flex flex-wrap gap-1.5 px-2">
              {quickGenres.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setSelectedGenre(g);
                    handleNav('explore');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    selectedGenre === g
                      ? 'bg-[#00D2C4]/20 text-[#00D2C4] border border-[#00D2C4]/50'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Data Saver Compressed Info Card */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Small MB Technology</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-snug">
              Multi-pass HEVC & AV1 compression allows lightweight file downloads (180MB - 390MB) on slow connections and mobile data.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure SSL Protected</span>
            </div>
          </div>

        </div>

        {/* User Account Section at Bottom */}
        <div className="p-4 border-t border-white/10 bg-black/40">
          {isAuthenticated && currentUser ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 shadow"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">
                    {currentUser.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 truncate">
                    {currentUser.email}
                  </p>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-block mt-0.5">
                    {currentUser.plan}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs font-bold text-white">Join Asofreemovies</div>
              <p className="text-[11px] text-gray-400">
                Register a free account to track downloads and save watchlist items.
              </p>
              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-2.5 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Create Free Account
              </button>
            </div>
          )}
        </div>

      </aside>
    </>
  );
}
