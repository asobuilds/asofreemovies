import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  CheckCircle2, 
  Film, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    closeAuthModal, 
    register, 
    login, 
    authError,
    avatarOptions 
  } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: avatarOptions[0]
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authModalMode === 'register') {
      register(formData);
    } else {
      login({ email: formData.email, password: formData.password });
    }
  };

  const handleQuickDemoLogin = () => {
    login({ email: 'user@asofreemovies.com', password: 'password123' });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={closeAuthModal}
    >
      <div 
        className="relative w-full max-w-md rounded-3xl bg-[#0f1422] border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Branding */}
        <div className="p-6 bg-gradient-to-b from-[#181f33] to-[#0f1422] border-b border-white/10 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E50914] to-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-['Poppins']">
                Aso<span className="text-[#E50914]">free</span>movies
              </h3>
              <p className="text-[11px] text-[#00D2C4] font-medium">
                Free Unlimited Streaming & Compressed Downloads
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex rounded-xl bg-black/40 p-1 border border-white/10 mt-4">
            <button
              onClick={() => setAuthModalMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authModalMode === 'login'
                  ? 'bg-[#E50914] text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthModalMode('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authModalMode === 'register'
                  ? 'bg-[#E50914] text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {authError}
            </div>
          )}

          {/* Registration: Name & Avatar Selection */}
          {authModalMode === 'register' && (
            <>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  Full Name
                </label>
                <div className="relative flex items-center rounded-xl bg-black/40 border border-white/10 focus-within:border-[#E50914] px-3 py-2.5">
                  <User className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Ade"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  Choose Profile Avatar
                </label>
                <div className="flex items-center gap-2">
                  {avatarOptions.map((av, idx) => (
                    <img
                      key={idx}
                      src={av}
                      alt={`Avatar option ${idx + 1}`}
                      onClick={() => setFormData({ ...formData, avatar: av })}
                      className={`w-9 h-9 rounded-full object-cover cursor-pointer border-2 transition-all hover:scale-110 ${
                        formData.avatar === av ? 'border-[#E50914] ring-2 ring-[#E50914]/50' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center rounded-xl bg-black/40 border border-white/10 focus-within:border-[#E50914] px-3 py-2.5">
              <Mail className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-gray-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5">
              Password
            </label>
            <div className="relative flex items-center rounded-xl bg-black/40 border border-white/10 focus-within:border-[#E50914] px-3 py-2.5">
              <Lock className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-gray-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
          >
            <span>{authModalMode === 'register' ? 'Register Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* One-click demo member login */}
          {authModalMode === 'login' && (
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              ⚡ Quick Demo Account Sign-In
            </button>
          )}

          <div className="pt-2 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted local session • Zero ads or hidden subscription</span>
          </div>

        </form>
      </div>
    </div>
  );
}
