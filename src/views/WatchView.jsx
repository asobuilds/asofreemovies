import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Minimize, 
  Subtitles, 
  PictureInPicture, 
  Settings, 
  Download, 
  Heart, 
  Check, 
  Star, 
  Calendar, 
  Clock, 
  Film, 
  Tv, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  ArrowLeft,
  Smartphone,
  Zap,
  Cpu
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function WatchView() {
  const { 
    activeMovie, 
    movies, 
    navigateTo, 
    openDownloadModal, 
    watchlist, 
    toggleWatchlist, 
    showToast 
  } = useMovies();

  const videoRef = useRef(null);
  const playerWrapperRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const controlsTimeoutRef = useRef(null);

  if (!activeMovie) {
    return (
      <div className="pt-32 pb-20 text-center text-gray-400">
        <p>No title selected.</p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-4 py-2 bg-[#E50914] text-white rounded-xl text-sm font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const movie = activeMovie;
  const isInWatchlist = watchlist.includes(movie.id);

  // Recommended "More Like This"
  const recommendedMovies = movies
    .filter((m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g)))
    .slice(0, 6);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (!showSpeedMenu) setShowControls(false);
      }, 3500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'ArrowLeft') {
        seekRelative(-10);
      } else if (e.key === 'ArrowRight') {
        seekRelative(10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, isMuted, isFullscreen, duration, showSpeedMenu]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      setIsVideoLoading(true);
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedPlaying(true);
          setIsVideoLoading(false);
        })
        .catch(() => setIsVideoLoading(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.volume = volume;
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const seekRelative = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
    showToast(`Speed: ${speed}x`, 'info');
  };

  const toggleFullscreen = () => {
    if (!playerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const togglePiP = async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '00:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    const pad = (n) => String(n).padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in lg:pl-8">
      
      {/* Back Navigation Button */}
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Asofreemovies</span>
      </button>

      {/* TOP: Custom Styled Video Player Wrapper */}
      <div 
        ref={playerWrapperRef}
        onMouseMove={handleMouseMove}
        className="relative w-full aspect-video max-h-[720px] rounded-3xl bg-black overflow-hidden shadow-2xl border border-white/10 select-none group"
      >
        <video
          ref={videoRef}
          src={movie.videoStreamUrl}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onWaiting={() => setIsVideoLoading(true)}
          onPlaying={() => {
            setIsVideoLoading(false);
            setIsPlaying(true);
            setHasStartedPlaying(true);
          }}
          playsInline
        />

        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none z-30">
            <div className="w-14 h-14 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-2xl" />
          </div>
        )}

        {!hasStartedPlaying && (
          <div className="absolute inset-0 z-20 overflow-hidden bg-gray-950 flex items-center justify-center">
            <img
              src={movie.banner}
              alt={movie.title}
              className="w-full h-full object-cover filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <button
              onClick={togglePlay}
              className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E50914] hover:bg-red-700 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 hover:scale-110 active:scale-95 transition-all"
              aria-label="Start streaming"
            >
              <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-white ml-1.5" />
            </button>

            <div className="absolute bottom-6 left-8 z-10 hidden sm:block">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#00D2C4] block">
                Free Instant Streaming
              </span>
              <h2 className="text-2xl font-black text-white font-['Poppins']">
                {movie.title}
              </h2>
            </div>
          </div>
        )}

        {hasStartedPlaying && !isPlaying && !isVideoLoading && (
          <button
            onClick={togglePlay}
            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E50914]/90 hover:bg-[#E50914] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all pointer-events-auto"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
          </button>
        )}

        {hasStartedPlaying && subtitlesEnabled && (
          <div className="absolute bottom-20 inset-x-0 flex justify-center pointer-events-none z-10 px-4">
            <div className="bg-black/80 px-4 py-1.5 rounded-lg text-amber-300 text-xs sm:text-sm font-semibold tracking-wide border border-black/40">
              [Dolby Atmos 5.1 Stereo Stream]
            </div>
          </div>
        )}

        {/* Video Cinema Controls */}
        <div 
          className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent transition-opacity duration-300 z-20 ${
            showControls && hasStartedPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative w-full mb-3 cursor-pointer group/seek">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 hover:h-2.5 bg-gray-700/80 rounded-lg appearance-none cursor-pointer accent-[#E50914] transition-all"
            />
            <div 
              className="absolute top-0 left-0 h-1.5 hover:h-2.5 bg-[#E50914] rounded-lg pointer-events-none transition-all"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-3 text-white text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="p-1.5 hover:bg-white/10 rounded-xl text-white transition-transform active:scale-90"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              <button
                onClick={() => seekRelative(-10)}
                className="p-1.5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white"
                title="Rewind 10s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => seekRelative(10)}
                className="p-1.5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white"
                title="Forward 10s"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 group/vol">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-[#E50914]" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 sm:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
                />
              </div>

              <div className="text-[11px] sm:text-xs text-gray-300 font-medium pl-1">
                <span>{formatTime(currentTime)}</span>
                <span className="text-gray-500 mx-1">/</span>
                <span className="text-gray-400">{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  setSubtitlesEnabled(!subtitlesEnabled);
                  showToast(subtitlesEnabled ? 'Subtitles Off' : 'Subtitles On', 'info');
                }}
                className={`p-1.5 rounded-xl transition-all ${
                  subtitlesEnabled ? 'bg-[#E50914]/20 text-[#E50914]' : 'text-gray-400 hover:text-white'
                }`}
                title="Subtitles"
              >
                <Subtitles className="w-4 h-4" />
              </button>

              <button
                onClick={togglePiP}
                className="p-1.5 text-gray-400 hover:text-white hidden sm:block"
                title="Picture-in-Picture"
              >
                <PictureInPicture className="w-4 h-4" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                >
                  {playbackSpeed}x
                </button>
                {showSpeedMenu && (
                  <div className="absolute bottom-9 right-0 bg-[#0f1422] border border-white/15 rounded-xl p-1.5 shadow-xl flex flex-col gap-1 z-30">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeedChange(s)}
                        className={`px-3 py-1 text-xs rounded-lg text-left font-medium ${
                          playbackSpeed === s ? 'bg-[#E50914] text-white font-bold' : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 text-gray-300 hover:text-white"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Full Details Layout & Compressed Downloads Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
              <span className="px-2.5 py-0.5 rounded-md bg-[#E50914] text-white uppercase">
                {movie.type === 'series' ? 'TV Series' : movie.type === 'tv_show' ? 'TV Show' : 'Movie'}
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15 text-amber-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {movie.rating} Rating
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300">
                {movie.ageRating}
              </span>
              <span className="text-gray-400 font-medium">
                {movie.releaseDate} • {movie.duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Poppins']">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-2 pt-1">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Storyline
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Compressed Small MB Download Matrix */}
          <div className="p-6 rounded-3xl bg-[#121826] border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2 font-['Poppins']">
                  <Download className="w-5 h-5 text-[#00D2C4]" />
                  Download in Compressed Small Megabytes (MB)
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Optimized using HEVC x265 and AV1 codecs for 70% smaller downloads with zero quality loss.
                </p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Data Saver
              </span>
            </div>

            {/* Matrix Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* 480p Ultra-Compressed */}
              <button
                onClick={() => openDownloadModal(movie)}
                className="p-3.5 rounded-2xl bg-gradient-to-b from-emerald-500/15 to-transparent hover:from-emerald-500/25 border border-emerald-500/40 text-left transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-300 text-sm">480p Ultra-Compact</span>
                  <Smartphone className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                </div>
                <div className="text-xs text-white font-black mt-1 font-mono">
                  {movie.downloadLinks?.['480p']?.size || '185 MB'}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  Mobile Data Saver (90% Smaller)
                </div>
              </button>

              {/* 720p High Efficiency */}
              <button
                onClick={() => openDownloadModal(movie)}
                className="p-3.5 rounded-2xl bg-gradient-to-b from-[#00D2C4]/15 to-transparent hover:from-[#00D2C4]/25 border border-[#00D2C4]/40 text-left transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#00D2C4] text-sm">720p High Efficiency</span>
                  <Zap className="w-4 h-4 text-[#00D2C4] group-hover:translate-y-0.5 transition-transform" />
                </div>
                <div className="text-xs text-white font-black mt-1 font-mono">
                  {movie.downloadLinks?.['720p']?.size || '390 MB'}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  Compact HD (70% Smaller)
                </div>
              </button>

              {/* 1080p FHD Compressed */}
              <button
                onClick={() => openDownloadModal(movie)}
                className="p-3.5 rounded-2xl bg-gradient-to-b from-[#E50914]/20 to-transparent hover:from-[#E50914]/30 border border-[#E50914]/50 text-left transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-sm">1080p FHD Compressed</span>
                  <Cpu className="w-4 h-4 text-[#E50914] group-hover:translate-y-0.5 transition-transform" />
                </div>
                <div className="text-xs text-rose-300 font-black mt-1 font-mono">
                  {movie.downloadLinks?.['1080p']?.size || '780 MB'}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  Master Crisp Quality (55% Smaller)
                </div>
              </button>
            </div>
          </div>

          {/* Cast */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Starring Cast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {movie.cast.map((actor) => (
                <div 
                  key={actor}
                  className="p-3 rounded-2xl bg-[#121826]/60 border border-white/5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                    {actor[0]}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{actor}</h5>
                    <span className="text-[10px] text-gray-400 block truncate">Main Role</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#121826] border border-white/10 space-y-3 shadow-xl">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Save & Share
            </h4>

            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                isInWatchlist
                  ? 'bg-[#E50914]/20 border-[#E50914] text-[#E50914]'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
              }`}
            >
              {isInWatchlist ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>In My Watchlist</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  <span>Add to My Watchlist</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Copied title share link', 'info');
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Title</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#121826] border border-white/10 space-y-4 text-xs">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Technical Details
            </h4>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-gray-400">Audio Codec</span>
                <span className="font-semibold text-white">Dolby Digital Plus 5.1</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-gray-400">Download Compression</span>
                <span className="font-semibold text-emerald-400">HEVC x265 (Small MB)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-gray-400">Platform</span>
                <span className="font-semibold text-white">Asofreemovies Direct</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Cost</span>
                <span className="font-semibold text-[#00D2C4]">100% Free</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RECOMMENDED "MORE LIKE THIS" */}
      {recommendedMovies.length > 0 && (
        <div className="pt-10 border-t border-white/10 space-y-5">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Poppins']">
            More Like This on Asofreemovies
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {recommendedMovies.map((rec) => (
              <MovieCard key={rec.id} movie={rec} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
