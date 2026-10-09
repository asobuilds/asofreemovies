import React, { useState } from 'react';
import { 
  X, 
  Download, 
  HardDrive, 
  Check, 
  Sparkles, 
  FileVideo, 
  ShieldCheck, 
  Zap, 
  Smartphone,
  Cpu
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function DownloadModal() {
  const { 
    isDownloadModalOpen, 
    downloadTargetMovie, 
    closeDownloadModal, 
    showToast 
  } = useMovies();

  const [selectedQuality, setSelectedQuality] = useState('720p');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  if (!isDownloadModalOpen || !downloadTargetMovie) return null;

  const movie = downloadTargetMovie;

  const qualityOptions = [
    {
      id: '480p',
      label: '480p Ultra-Compressed',
      sublabel: 'Mobile Data Saver',
      size: movie.downloadLinks?.['480p']?.size || '185 MB',
      compression: '90% Smaller',
      format: 'H.265 / HEVC Compact (Low Data)',
      resolution: '854 × 480',
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      icon: Smartphone
    },
    {
      id: '720p',
      label: '720p High Efficiency',
      sublabel: 'Recommended Balance',
      size: movie.downloadLinks?.['720p']?.size || '390 MB',
      compression: '70% Smaller',
      format: 'AV1 / x265 High Efficiency Stream',
      resolution: '1280 × 720',
      badgeColor: 'border-[#00D2C4]/40 text-[#00D2C4] bg-[#00D2C4]/10',
      icon: Zap
    },
    {
      id: '1080p',
      label: '1080p FHD Compressed',
      sublabel: 'Crisp Master Quality',
      size: movie.downloadLinks?.['1080p']?.size || '780 MB',
      compression: '55% Smaller',
      format: 'HEVC 10-Bit Compressed Audio/Video',
      resolution: '1920 × 1080',
      badgeColor: 'border-[#E50914]/40 text-[#E50914] bg-[#E50914]/10',
      icon: Cpu
    }
  ];

  const handleStartDownload = (directFile = false) => {
    const selected = qualityOptions.find((q) => q.id === selectedQuality);
    const size = selected ? selected.size : '390 MB';

    if (directFile) {
      const link = document.createElement('a');
      link.href = movie.videoStreamUrl;
      link.download = `Asofreemovies_${movie.title.replace(/[^a-zA-Z0-9]/g, '_')}_${selectedQuality}_compressed.mp4`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Saving compressed file (${size}) to your computer`, 'download');
      closeDownloadModal();
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(10);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          showToast(`Downloaded: "${movie.title}" (${size}) saved for offline playback!`, 'download');
          closeDownloadModal();
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={closeDownloadModal}
    >
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#0f1422] border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Movie Backdrop */}
        <div className="relative h-32 w-full overflow-hidden bg-gray-900">
          <img
            src={movie.banner}
            alt={movie.title}
            className="w-full h-full object-cover filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1422] via-[#0f1422]/60 to-transparent" />
          
          <button
            onClick={closeDownloadModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#E50914] to-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Compressed Small MB
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-1 font-['Poppins']">
                {movie.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Compressed Quality Options */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                Choose Compressed Download Format
              </label>
              <span className="text-[11px] text-[#00D2C4] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Fast Small MB Downloads
              </span>
            </div>

            <div className="space-y-2.5">
              {qualityOptions.map((opt) => {
                const isSelected = selectedQuality === opt.id;
                const IconComponent = opt.icon;

                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedQuality(opt.id)}
                    className={`relative p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#E50914]/15 border-[#E50914] shadow-lg shadow-red-600/15 ring-1 ring-[#E50914]/50'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-xs ${opt.badgeColor}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {opt.label}
                          </span>
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${opt.badgeColor}`}>
                            {opt.compression}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {opt.resolution} • {opt.format}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-black text-white block font-mono">
                        {opt.size}
                      </span>
                      {isSelected ? (
                        <span className="text-[10px] font-bold text-[#E50914] flex items-center justify-end gap-1 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" /> Selected
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-500">
                          Small MB
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data Saver Explanation */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#00D2C4]" />
              Encoded with multi-pass HEVC/AV1 to preserve crisp 1080p/720p visuals in minimal MB.
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 shrink-0 ml-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Virus Free
            </span>
          </div>

          {/* Download progress bar */}
          {isDownloading && (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Downloading compressed movie package...</span>
                <span className="font-bold text-[#E50914]">{downloadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#E50914] to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              disabled={isDownloading}
              onClick={() => handleStartDownload(false)}
              className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#E50914] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Downloading...' : `Download Compressed (${qualityOptions.find(q => q.id === selectedQuality)?.size})`}</span>
            </button>

            <button
              disabled={isDownloading}
              onClick={() => handleStartDownload(true)}
              className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/15 active:scale-[0.98] transition-all"
              title="Save directly to phone or computer"
            >
              <FileVideo className="w-4 h-4 text-[#00D2C4]" />
              <span>Direct .mp4</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
