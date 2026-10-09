import React, { useState } from 'react';
import { MovieProvider, useMovies } from './context/MovieContext';
import { AuthProvider } from './context/AuthContext';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DownloadModal from './components/DownloadModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import HomeView from './views/HomeView';
import ExploreView from './views/ExploreView';
import WatchView from './views/WatchView';
import MyListView from './views/MyListView';

function AppContent() {
  const { currentRoute, toastMessage } = useMovies();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView />;
      case 'movies':
      case 'series':
      case 'tv':
      case 'trending':
      case 'explore':
      case 'downloads':
        return <ExploreView />;
      case 'watch':
        return <WatchView />;
      case 'mylist':
        return <MyListView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-gray-100 selection:bg-[#E50914] selection:text-white font-['Poppins']">
      
      {/* Collapsible / Fixed Clean Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Top Navbar with Sidebar Hamburger Toggle */}
      <Navbar 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Compressed Movie Download Modal (Small MB) */}
      <DownloadModal />

      {/* User Registration & Sign In Modal */}
      <AuthModal />

      {/* Action Notification Toast */}
      {toastMessage && (
        <Toast toast={toastMessage} onClose={() => {}} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <AppContent />
      </MovieProvider>
    </AuthProvider>
  );
}
