import React from 'react';
import { 
  X, 
  DownloadCloud, 
  Play, 
  Pause, 
  Trash2, 
  CheckCircle2, 
  HardDrive, 
  Film, 
  RefreshCw, 
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';

export default function DownloadsDrawer({ 
  isOpen, 
  onClose, 
  activeDownloads, 
  completedDownloads, 
  onPauseDownload, 
  onResumeDownload, 
  onCancelDownload, 
  onDeleteDownloaded, 
  onStreamDownloaded,
  onClearAllCompleted
}) {
  if (!isOpen) return null;

  // Calculate simulated storage
  const totalCompleted = completedDownloads.length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div 
        className="relative w-full max-w-md bg-[#0e111a] border-l border-white/10 h-full shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <DownloadCloud className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Download Manager
              </h2>
              <p className="text-xs text-gray-400">
                Offline Movies & Transfers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Active Downloads Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Active Transfers ({activeDownloads.length})
              </span>
            </div>

            {activeDownloads.length === 0 ? (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center text-xs text-gray-500">
                No active downloads in progress
              </div>
            ) : (
              <div className="space-y-3">
                {activeDownloads.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-2xl bg-[#141824] border border-white/10 space-y-2.5 shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={task.movie.poster}
                        alt={task.movie.title}
                        className="w-12 h-16 rounded-lg object-cover shrink-0 bg-gray-900 border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {task.movie.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                            {task.quality}
                          </span>
                          <span>{task.size}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                          <span>{task.isPaused ? 'Paused' : `${task.speed || '18.4 MB/s'}`}</span>
                          <span className="font-semibold text-rose-400">{Math.round(task.progress)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          task.isPaused ? 'bg-amber-500' : 'bg-gradient-to-r from-rose-500 to-amber-400'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>

                    {/* Controls (Pause/Resume, Cancel) */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      {task.isPaused ? (
                        <button
                          onClick={() => onResumeDownload(task.id)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1 transition-colors"
                        >
                          <Play className="w-3 h-3 fill-white" /> Resume
                        </button>
                      ) : (
                        <button
                          onClick={() => onPauseDownload(task.id)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <Pause className="w-3 h-3 fill-white" /> Pause
                        </button>
                      )}

                      <button
                        onClick={() => onCancelDownload(task.id)}
                        className="p-1 text-gray-400 hover:text-rose-400 transition-colors"
                        title="Cancel Download"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed Downloads Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Downloaded for Offline ({completedDownloads.length})
              </span>

              {completedDownloads.length > 0 && (
                <button
                  onClick={onClearAllCompleted}
                  className="text-[11px] text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {completedDownloads.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-2">
                <HardDrive className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-xs font-medium text-gray-400">
                  No downloaded movies yet
                </p>
                <p className="text-[11px] text-gray-500">
                  Click the Download button on any movie to watch offline without internet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedDownloads.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#141824] border border-white/10 flex items-center justify-between gap-3 shadow-md hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.movie.poster}
                        alt={item.movie.title}
                        className="w-12 h-16 rounded-lg object-cover shrink-0 bg-gray-900 border border-white/10"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {item.movie.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                            {item.quality}
                          </span>
                          <span>{item.size}</span>
                        </div>
                        <div className="text-[10px] text-emerald-400/90 font-medium flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3 h-3" /> Ready Offline
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Play Offline button */}
                      <button
                        onClick={() => {
                          onStreamDownloaded(item.movie);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-md shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
                        title="Play movie offline"
                      >
                        <Play className="w-4 h-4 fill-white" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteDownloaded(item.id)}
                        className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                        title="Delete Download"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Storage Stats */}
        <div className="p-4 border-t border-white/10 bg-black/40 text-xs">
          <div className="flex items-center justify-between text-gray-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-gray-400" />
              Allocated Storage
            </span>
            <span className="font-semibold text-white">
              {totalCompleted * 2.1} GB used
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${Math.min(100, Math.max(8, totalCompleted * 12))}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
