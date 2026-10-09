import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  FileCode,
  HardDrive
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function ApiSettingsModal({ isOpen, onClose }) {
  const { currentApiKey, saveApiKey, refetchMovies, showToast } = useMovies();
  const [inputKey, setInputKey] = useState(currentApiKey || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await saveApiKey(inputKey);
    setIsSaving(false);
    showToast(inputKey.trim() ? 'Movie API Key saved! Updating catalog...' : 'Cleared API Key, using local collection.', 'info');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#0f1422] border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D2C4] to-cyan-600 flex items-center justify-center text-black font-bold shadow-lg shadow-[#00D2C4]/20">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-['Poppins']">
                Movie API Configuration
              </h3>
              <p className="text-xs text-gray-400">
                Automatic catalog updates via TMDB or custom API
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

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          
          {/* Explanation Banner */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2 font-bold text-white">
              <FileCode className="w-4 h-4 text-[#00D2C4]" />
              <span>How to add your API Key in `.env`:</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Open your project file <code className="text-rose-400 bg-black/40 px-1 py-0.5 rounded">.env</code> and set:
            </p>
            <pre className="p-2.5 rounded-xl bg-black/60 text-emerald-300 font-mono text-[11px] overflow-x-auto">
VITE_TMDB_API_KEY=your_actual_tmdb_api_key
            </pre>
            <p className="text-gray-400 text-[11px]">
              Or paste it directly into the input field below to sync immediately without restarting the server!
            </p>
          </div>

          {/* Input Field */}
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5">
              TMDB API Key (or v4 Read Access Token)
            </label>
            <div className="relative flex items-center rounded-xl bg-black/50 border border-white/10 focus-within:border-[#00D2C4] px-3.5 py-3">
              <Key className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Paste API key here (e.g. 8f2b3... or eyJhbG...)"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-gray-500 font-mono"
              />
            </div>
          </div>

          {/* Quick link to get TMDB key */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Don't have an API key?</span>
            <a
              href="https://www.themoviedb.org/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00D2C4] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Get Free Key at TMDB</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
              <span>Save & Update Catalog</span>
            </button>

            {inputKey && (
              <button
                type="button"
                onClick={() => setInputKey('')}
                className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold transition-colors"
              >
                Clear
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
