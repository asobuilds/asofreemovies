import React from 'react';
import { CheckCircle2, Download, Heart, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'download':
        return <Download className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'watchlist':
        return <Heart className="w-5 h-5 text-rose-400 shrink-0 fill-rose-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl glass-panel shadow-2xl border border-white/10 text-white animate-bounce-in max-w-md">
      {getIcon()}
      <div className="text-sm font-medium pr-2">
        {toast.message}
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
