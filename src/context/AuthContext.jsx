import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80"
];

// Pre-configured official account requested by user
const INITIAL_ASOBUILDS_ACCOUNT = {
  id: 'usr-asobuilds',
  name: 'Asobuilds',
  email: 'agenesunday143@gmail.com',
  password: 'Aso123',
  avatar: AVATAR_OPTIONS[1],
  plan: 'VIP All-Access Pass',
  role: 'Owner & Member',
  createdAt: new Date().toISOString()
};

export function AuthProvider({ children }) {
  // Registered users database in localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('asofree_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure Asobuilds account is present
        if (!parsed.some(u => u.email.toLowerCase() === INITIAL_ASOBUILDS_ACCOUNT.email.toLowerCase())) {
          return [INITIAL_ASOBUILDS_ACCOUNT, ...parsed];
        }
        return parsed;
      }
      return [INITIAL_ASOBUILDS_ACCOUNT];
    } catch {
      return [INITIAL_ASOBUILDS_ACCOUNT];
    }
  });

  // Current active logged in session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('asofree_current_user');
      if (saved) {
        return JSON.parse(saved);
      }
      // Default to logged-in Asobuilds account
      return INITIAL_ASOBUILDS_ACCOUNT;
    } catch {
      return INITIAL_ASOBUILDS_ACCOUNT;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('asofree_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('asofree_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('asofree_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  // Register New User
  const register = ({ name, email, password, avatar }) => {
    setAuthError(null);
    const normalizedEmail = email.trim().toLowerCase();

    if (!name || !email || !password) {
      setAuthError('Please fill in all required fields.');
      return false;
    }

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      setAuthError('An account with this email already exists. Please log in.');
      return false;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      avatar: avatar || AVATAR_OPTIONS[Math.floor(Math.random() * AVATAR_OPTIONS.length)],
      plan: 'Free Unlimited HD',
      role: 'Member',
      createdAt: new Date().toISOString()
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    closeAuthModal();
    return true;
  };

  // Log In Existing User
  const login = ({ email, password }) => {
    setAuthError(null);
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!matchedUser) {
      setAuthError('Invalid email or password. Please verify your credentials.');
      return false;
    }

    setCurrentUser(matchedUser);
    closeAuthModal();
    return true;
  };

  // Log Out
  const logout = () => {
    setCurrentUser(null);
  };

  // Update Profile
  const updateProfile = ({ name, avatar }) => {
    if (!currentUser) return;
    const updated = { ...currentUser, name: name || currentUser.name, avatar: avatar || currentUser.avatar };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, ...updated } : u)));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        users,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        authError,
        openAuthModal,
        closeAuthModal,
        register,
        login,
        logout,
        updateProfile,
        avatarOptions: AVATAR_OPTIONS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
