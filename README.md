# 🎬 Asofreemovies — Free Movies, Series & TV Shows

A high-performance, dark-themed streaming and compressed downloading platform built with **React 19**, **Vite**, and **Tailwind CSS**. Designed for ultra-fast browsing and data-saver small megabyte (MB) downloads.

---

## 🌟 What's New & Upgraded

### 1. 🔑 Movie API Integration via `.env` (Auto-Updating)
Asofreemovies automatically connects to **The Movie Database (TMDB)** or your custom API link to keep the catalog fresh with the latest trending movies, series, and TV shows.
- Simply open [`.env`](.env) and set your key:
  ```env
  VITE_TMDB_API_KEY=your_actual_tmdb_api_key_here
  VITE_MOVIE_API_URL=https://api.themoviedb.org/3
  ```
- **Instant UI API Setup**: You can also click the **"Configure API"** button in the sidebar or navbar to paste your key directly in the UI without restarting the dev server!
- **Graceful Local Fallback**: When no API key is set, the application operates seamlessly using a built-in collection of feature movies, multi-season series, and TV shows.

### 2. 🗜️ Compressed Movie Files (Small Megabytes)
Engineered for mobile data savers and bandwidth efficiency with multi-pass HEVC/x265 and AV1 compression:
- **480p Ultra-Compressed (Mobile)**: **~180 MB** (90% smaller file size, perfect for phones)
- **720p High Efficiency (HD)**: **~390 MB** (70% smaller file size, compact HD)
- **1080p Full HD (Compressed)**: **~780 MB** (55% smaller file size, crisp 10-bit master)
- Users can click **"Download"** on any title to pick a format or save the direct `.mp4` file to their device.

### 3. 👤 User Accounts & Registration
- Users can **Register** a personal account with their name, email, password, and custom avatar.
- Users can **Sign In**, track personal download history, and synchronize their **Watchlist**.
- Includes a one-click **Quick Demo Account** login for instant testing.
- Accounts and preferences persist securely in browser storage.

### 4. 🗂️ Distinct Entertainment Categories
- **🎬 Movies**: Full feature-length blockbuster films.
- **📺 Series**: Multi-season bingeable drama and sci-fi series with episode packs.
- **📡 TV Shows**: Reality competitions, talk shows, and automotive series.
- **🔥 Trending**: Real-time popular titles across all media.

### 5. 🧭 Clean Sidebar Navigation
- Sleek, accessible left sidebar containing:
  - Brand header and logo.
  - Main categories (**Home**, **Movies**, **Series**, **TV Shows**, **Trending**, **My Watchlist**, **Compressed Vault**).
  - Quick genre pills (Action, Sci-Fi, Comedy, Drama, Fantasy, Crime).
  - Movie API Sync status indicator and settings trigger.
  - User account status card with profile details or "Create Free Account" button.
- Responsive mobile hamburger drawer.

---

## 🚀 Quick Start

```bash
# Navigate to project folder
cd C:\Users\USER\.gemini\antigravity\scratch\cineverse

# Start Vite dev server
npm run dev
```

Visit the app in your browser at:
**[http://localhost:5173/](http://localhost:5173/)**

---

## 📁 Key File Structure

```
cineverse/
├── .env                       # API keys (VITE_TMDB_API_KEY)
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Clean sidebar with categories, genres, API status, and auth
│   │   ├── Navbar.jsx         # Sticky header with search, hamburger toggle, and profile
│   │   ├── AuthModal.jsx      # User registration and login modal
│   │   ├── ApiSettingsModal.jsx # TMDB / Custom API key configuration modal
│   │   ├── DownloadModal.jsx  # Compressed download formats (480p ~180MB, 720p ~390MB, 1080p ~780MB)
│   │   ├── HeroBanner.jsx     # Featured content spotlight slider
│   │   ├── MovieCard.jsx      # 2:3 poster card with hover action overlay
│   │   ├── MovieRow.jsx       # Category horizontal scrollable rows
│   │   ├── Footer.jsx         # Site footer with brand and category links
│   │   └── SkeletonLoaders.jsx# Shimmering loading placeholders
│   ├── context/
│   │   ├── AuthContext.jsx    # User registration, authentication, and profiles
│   │   └── MovieContext.jsx   # Catalog state, API sync, filtering, and watchlist
│   ├── services/
│   │   └── movieApi.js        # TMDB and custom API client service
│   ├── data/
│   │   └── mockMovies.js      # Structured movies, series, and TV shows collection
│   ├── views/
│   │   ├── HomeView.jsx       # Main dashboard with categories
│   │   ├── ExploreView.jsx    # Filterable grid by Movies, Series, TV Shows, and genres
│   │   ├── WatchView.jsx      # Video player wrapper and compressed download matrix
│   │   └── MyListView.jsx     # Personal saved watchlist
│   └── App.jsx
```
