import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  X, 
  Settings, 
  Subtitles, 
  Download, 
  Sparkles,
  PictureInPicture,
  Check
} from 'lucide-react';

export default function VideoPlayerModal({ 
  movie, 
  onClose, 
  onDownload 
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const controlsTimeoutRef = useRef(null);

  const qualities = ['4K UHD', '1080p FHD', '720p HD', '480p SD'];
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (!showSettingsMenu) setShowControls(false);
      }, 3500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      } else if (e.code === 'Space') {
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
  }, [isPlaying, isMuted, isFullscreen, showSettingsMenu]);

  // Video event handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
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
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
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
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    showPlayerToast(`Playback Speed: ${speed}x`);
  };

  const handleQualityChange = (q) => {
    setSelectedQuality(q);
    showPlayerToast(`Switched stream quality to ${q}`);
    setShowSettingsMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
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
        console.error("PiP error:", err);
      }
    }
  };

  const showPlayerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const pad = (n) => String(n).padStart(2, '0');
    if (hrs > 0) {
      return `${hrs}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={movie.videoUrl}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        playsInline
      />

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/40">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Temporary Toast Banner inside Player */}
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-2xl pointer-events-none z-30 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Top Header Bar */}
      <div className={`absolute top-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between transition-opacity duration-300 z-20 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-lg sm:text-xl drop-shadow">
                {movie.title}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-600/90 text-white tracking-wider">
                {selectedQuality}
              </span>
              <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                {movie.ageRating} • {movie.genres.join(', ')}
              </span>
            </div>
            <span className="text-xs text-gray-400 italic">
              Streaming in Dolby Vision / Atmos Simulation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Direct Download in player */}
          <button
            onClick={() => onDownload(movie)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all"
            title="Download this movie"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Close Player */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Close Player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Big Play Button on Pause */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute z-20 w-20 h-20 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-600/50 hover:scale-110 transition-all pointer-events-auto"
        >
          <Play className="w-10 h-10 fill-white ml-1" />
        </button>
      )}

      {/* Subtitles Overlay */}
      {subtitlesEnabled && (
        <div className="absolute bottom-28 inset-x-0 flex justify-center pointer-events-none z-10 px-4">
          <div className="bg-black/75 px-4 py-1.5 rounded-lg text-amber-200 text-sm sm:text-base font-semibold tracking-wide drop-shadow-md border border-black/40">
            [Original Audio — Dolby Stereo 5.1 Surround]
          </div>
        </div>
      )}

      {/* Bottom Cinema Controls */}
      <div className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-20 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        
        {/* Timeline Slider */}
        <div className="relative group/timeline w-full mb-3 cursor-pointer">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 hover:h-2.5 bg-gray-700/80 rounded-lg appearance-none cursor-pointer accent-rose-500 transition-all"
          />
          {/* Progress buffer indicator */}
          <div 
            className="absolute top-0 left-0 h-1.5 hover:h-2.5 bg-rose-500/80 rounded-lg pointer-events-none transition-all"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-3 text-white">
          
          {/* Left Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/10 rounded-xl text-white transition-all hover:scale-105 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
            </button>

            {/* Rewind 10s */}
            <button
              onClick={() => seekRelative(-10)}
              className="p-2 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
              title="Rewind 10s"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Fast forward 10s */}
            <button
              onClick={() => seekRelative(10)}
              className="p-2 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
              title="Fast Forward 10s"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Volume & Mute */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-rose-500 opacity-80 group-hover/volume:opacity-100 transition-opacity"
              />
            </div>

            {/* Timestamps */}
            <div className="text-xs sm:text-sm font-medium text-gray-300 tracking-wider">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-500 mx-1.5">/</span>
              <span className="text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Subtitles Toggle */}
            <button
              onClick={() => {
                setSubtitlesEnabled(!subtitlesEnabled);
                showPlayerToast(subtitlesEnabled ? 'Subtitles Off' : 'Subtitles On (English CC)');
              }}
              className={`p-2 rounded-xl transition-all ${
                subtitlesEnabled 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                  : 'hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
              title="Toggle Subtitles / CC"
            >
              <Subtitles className="w-5 h-5" />
            </button>

            {/* Picture in Picture */}
            <button
              onClick={togglePiP}
              className="p-2 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all hidden sm:block"
              title="Picture in Picture"
            >
              <PictureInPicture className="w-5 h-5" />
            </button>

            {/* Settings & Quality Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className={`p-2 rounded-xl transition-all ${
                  showSettingsMenu ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
                title="Playback Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Settings Dropdown Popover */}
              {showSettingsMenu && (
                <div className="absolute bottom-12 right-0 w-64 p-3 rounded-2xl glass-panel bg-gray-900/95 border border-white/20 shadow-2xl space-y-3 z-30">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-1 border-b border-white/10 pb-2 flex items-center justify-between">
                    <span>Streaming Quality</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>

                  <div className="space-y-1">
                    {qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQualityChange(q)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedQuality === q
                            ? 'bg-rose-600 text-white font-bold'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span>{q}</span>
                        {selectedQuality === q && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-1 border-b border-white/10 pb-2 pt-1">
                    Speed
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    {speeds.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeedChange(s)}
                        className={`px-2 py-1 rounded text-xs font-semibold text-center transition-colors ${
                          playbackSpeed === s
                            ? 'bg-rose-600 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/15'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all hover:scale-105"
              title="Fullscreen (F)"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
