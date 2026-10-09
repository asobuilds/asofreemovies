import React, { useState, useEffect, useRef } from 'react';
import { 
  Film, 
  Search, 
  X, 
  User, 
  Heart, 
  DownloadCloud, 
  LogOut, 
  ChevronDown, 
  Sparkles, 
  Tv, 
  Clapperboard, 
  Menu, 
  Radio
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onToggleSidebar }) {
  const { 
    currentRoute, 
    navigateTo, 
    searchQuery, 
    setSearchQuery, 
    watchlist,
    showToast 
  } = useMovies();

  const {
    currentUser,
    isAuthenticated,
    openAuthModal,
    logout
  } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('explore');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 lg:pl-72 ${
        isScrolled
          ? 'bg-[#0a0d16]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left Side: Hamburger Toggle (Mobile/Tablet) & Brand Link */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo in Navbar (visible on mobile) */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 group text-left focus:outline-none lg:hidden"
            aria-label="Asofreemovies Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E50914] to-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
              <Film className="w-4 h-4" />
            </div>
            <div className="text-lg font-black tracking-tight text-white font-['Poppins']">
              Aso<span className="text-[#E50914]">free</span>
            </div>
          </button>

          {/* Quick Category tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRoute === 'home'
                  ? 'text-white bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => navigateTo('movies')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentRoute === 'movies'
                  ? 'text-white bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5 text-rose-400" />
              Movies
            </button>
            <button
              onClick={() => navigateTo('series')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentRoute === 'series'
                  ? 'text-white bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-[#00D2C4]" />
              Series
            </button>
            <button
              onClick={() => navigateTo('tv')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentRoute === 'tv'
                  ? 'text-white bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              TV Shows
            </button>
          </nav>
        </div>

        {/* Right Side: Search Bar and User Profile / Auth */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className={`relative flex items-center transition-all duration-300 ${
              isSearchOpen || searchQuery ? 'w-48 sm:w-64 md:w-72' : 'w-9'
            }`}
          >
            {isSearchOpen || searchQuery ? (
              <div className="w-full flex items-center rounded-full bg-black/60 border border-white/20 backdrop-blur-md px-3 py-1.5 shadow-xl ring-1 ring-[#E50914]/40">
                <Search className="w-3.5 h-3.5 text-[#00D2C4] mr-2 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search titles, actors, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-white p-0.5 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-400 hover:text-white p-0.5 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* User Account / Profile Button */}
          {isAuthenticated && currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#E50914]/50 transition-all focus:outline-none"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <span className="text-xs font-bold text-white hidden md:inline truncate max-w-[100px]">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
              </button>

              {/* Profile Menu Popover */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-2xl glass-panel bg-[#0d121f]/95 border border-white/15 shadow-2xl p-4 space-y-3 z-50 animate-fade-in">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
                      <p className="text-[10px] text-gray-400 truncate">{currentUser.email}</p>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-block mt-0.5">
                        {currentUser.plan}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => {
                        navigateTo('mylist');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-[#E50914]" />
                      <span>My Watchlist ({watchlist.length})</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('downloads');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <DownloadCloud className="w-4 h-4 text-emerald-400" />
                      <span>Compressed Downloads</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                        showToast('Signed out of account', 'info');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-3.5 py-1.5 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all hidden sm:block"
              >
                Register
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
