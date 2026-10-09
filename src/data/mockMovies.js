/**
 * Asofreemovies Catalog Data
 * Formatted with compressed download tiers (small MB sizes)
 * Includes distinct categories: Movies, Series, TV Shows
 */

export const MOCK_MOVIES = [
  // --- MOVIES ---
  {
    id: "mov-01",
    title: "Tears of Steel",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    description: "In a dystopian cyber-future, an Amsterdam defense squadron stages a crucial timeline event to deactivate autonomous military machines.",
    rating: 8.8,
    releaseDate: "2024-04-12",
    duration: "1h 52m",
    ageRating: "PG-13",
    cast: ["Derek de Lint", "Sergio Hasselbaink", "Rogier Schippers", "Vanja Rukavina"],
    genre: ["Action", "Sci-Fi", "Cyberpunk"],
    category: "Trending Now",
    isFeatured: true,
    type: "movie",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Ultra-Compressed (Mobile)",
        size: "185 MB",
        megabytes: 185,
        resolution: "854 × 480",
        format: "H.265 / HEVC Data Saver",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
      },
      "720p": {
        quality: "720p High Efficiency (HD)",
        size: "390 MB",
        megabytes: 390,
        resolution: "1280 × 720",
        format: "AV1 / x265 Compact",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
      },
      "1080p": {
        quality: "1080p FHD (Compressed 10-Bit)",
        size: "780 MB",
        megabytes: 780,
        resolution: "1920 × 1080",
        format: "HEVC x265 Crisp Master",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
      }
    }
  },
  {
    id: "mov-02",
    title: "Sintel: The Dragon's Path",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
    description: "A determined nomad girl nurtures an injured dragon cub. When it is stolen by an elder dragon, she sets out across treacherous snowbound mountain ranges.",
    rating: 9.1,
    releaseDate: "2023-11-20",
    duration: "2h 05m",
    ageRating: "PG-13",
    cast: ["Halina Reijn", "Thom Hoffman", "Lani Minella"],
    genre: ["Fantasy", "Adventure", "Animation"],
    category: "Top Rated",
    isFeatured: true,
    type: "movie",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Ultra-Compressed (Mobile)",
        size: "195 MB",
        megabytes: 195,
        resolution: "854 × 480",
        format: "H.265 / HEVC Data Saver",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
      },
      "720p": {
        quality: "720p High Efficiency (HD)",
        size: "410 MB",
        megabytes: 410,
        resolution: "1280 × 720",
        format: "AV1 / x265 Compact",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
      },
      "1080p": {
        quality: "1080p FHD (Compressed 10-Bit)",
        size: "820 MB",
        megabytes: 820,
        resolution: "1920 × 1080",
        format: "HEVC x265 Crisp Master",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
      }
    }
  },
  {
    id: "mov-03",
    title: "Chronicles of the Blaze",
    poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=80",
    description: "An underground street racing syndicate operating inside neon highway tunnels uncovers an international corporate espionage syndicate.",
    rating: 8.9,
    releaseDate: "2024-01-15",
    duration: "2h 12m",
    ageRating: "R",
    cast: ["Elena Rostova", "Kaelen Drake", "Dante Cruz"],
    genre: ["Action", "Thriller", "Crime"],
    category: "Action Thrillers",
    isFeatured: true,
    type: "movie",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Ultra-Compressed (Mobile)",
        size: "210 MB",
        megabytes: 210,
        resolution: "854 × 480",
        format: "H.265 / HEVC Data Saver",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
      },
      "720p": {
        quality: "720p High Efficiency (HD)",
        size: "450 MB",
        megabytes: 450,
        resolution: "1280 × 720",
        format: "AV1 / x265 Compact",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
      },
      "1080p": {
        quality: "1080p FHD (Compressed 10-Bit)",
        size: "890 MB",
        megabytes: 890,
        resolution: "1920 × 1080",
        format: "HEVC x265 Crisp Master",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
      }
    }
  },
  {
    id: "mov-04",
    title: "Big Buck Bunny: Woodland Revenge",
    poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1920&q=80",
    description: "A good-natured giant rabbit takes a stand against three bullies of the forest using clever tactical contraptions.",
    rating: 8.6,
    releaseDate: "2023-08-10",
    duration: "1h 38m",
    ageRating: "G",
    cast: ["Jan Morgenstern", "Campbell Barton"],
    genre: ["Animation", "Comedy", "Family"],
    category: "Animation & Family",
    isFeatured: false,
    type: "movie",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Ultra-Compressed (Mobile)",
        size: "160 MB",
        megabytes: 160,
        resolution: "854 × 480",
        format: "H.265 / HEVC Data Saver",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      },
      "720p": {
        quality: "720p High Efficiency (HD)",
        size: "340 MB",
        megabytes: 340,
        resolution: "1280 × 720",
        format: "AV1 / x265 Compact",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      },
      "1080p": {
        quality: "1080p FHD (Compressed 10-Bit)",
        size: "680 MB",
        megabytes: 680,
        resolution: "1920 × 1080",
        format: "HEVC x265 Crisp Master",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      }
    }
  },

  // --- SERIES (Multi-Season Episodic) ---
  {
    id: "ser-01",
    title: "Neon Horizon: Shinjuku Protocol",
    poster: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=80",
    description: "A dark cyberpunk saga following an elite squad of memory recovery specialists exposing clandestine corporate trials across Tokyo's skyline.",
    rating: 9.0,
    releaseDate: "2024-05-10",
    duration: "4 Seasons (36 Episodes)",
    ageRating: "TV-MA",
    cast: ["Rin Takahashi", "Max Chen", "Zoe Saldana"],
    genre: ["Sci-Fi", "Drama", "Thriller"],
    category: "Trending Series",
    isFeatured: true,
    type: "series",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Compressed (Season Pack / Ep)",
        size: "140 MB / ep",
        megabytes: 140,
        resolution: "854 × 480",
        format: "H.265 Mobile Stream",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      },
      "720p": {
        quality: "720p HD Series Pack",
        size: "290 MB / ep",
        megabytes: 290,
        resolution: "1280 × 720",
        format: "AV1 High Efficiency",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      },
      "1080p": {
        quality: "1080p Complete Season Pack",
        size: "590 MB / ep",
        megabytes: 590,
        resolution: "1920 × 1080",
        format: "HEVC 10-Bit Crisp",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      }
    }
  },
  {
    id: "ser-02",
    title: "Shadow Protocol: Cold Vault",
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
    description: "An incarcerated aerospace cryptographer must plan an escape from an offshore ice-bound automated facility before a global system reset.",
    rating: 8.7,
    releaseDate: "2024-03-02",
    duration: "2 Seasons (18 Episodes)",
    ageRating: "TV-MA",
    cast: ["Viktor Sterling", "Aaliyah Brooks", "Sean McAllister"],
    genre: ["Action", "Crime", "Mystery"],
    category: "Action Thrillers",
    isFeatured: false,
    type: "series",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Ultra-Compressed (Mobile)",
        size: "150 MB / ep",
        megabytes: 150,
        resolution: "854 × 480",
        format: "H.265 / HEVC Data Saver",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
      },
      "720p": {
        quality: "720p High Efficiency (HD)",
        size: "310 MB / ep",
        megabytes: 310,
        resolution: "1280 × 720",
        format: "AV1 / x265 Compact",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
      },
      "1080p": {
        quality: "1080p FHD (Compressed 10-Bit)",
        size: "620 MB / ep",
        megabytes: 620,
        resolution: "1920 × 1080",
        format: "HEVC x265 Crisp Master",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
      }
    }
  },
  {
    id: "ser-03",
    title: "Quantum Grid: Fall of Power",
    poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80",
    description: "A cascade blackout shuts down continental reactors during freezing weather. Engineers race against temperature drops to restore satellites.",
    rating: 8.9,
    releaseDate: "2024-02-18",
    duration: "3 Seasons (24 Episodes)",
    ageRating: "TV-14",
    cast: ["Harrison Cole", "Naomi Zhang", "Matthias Berg"],
    genre: ["Sci-Fi", "Drama", "Suspense"],
    category: "Sci-Fi & Cyberpunk",
    isFeatured: false,
    type: "series",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Ultra-Compressed (Mobile)",
        size: "145 MB / ep",
        megabytes: 145,
        resolution: "854 × 480",
        format: "H.265 / HEVC Data Saver",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
      },
      "720p": {
        quality: "720p High Efficiency (HD)",
        size: "295 MB / ep",
        megabytes: 295,
        resolution: "1280 × 720",
        format: "AV1 / x265 Compact",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
      },
      "1080p": {
        quality: "1080p FHD (Compressed 10-Bit)",
        size: "610 MB / ep",
        megabytes: 610,
        resolution: "1920 × 1080",
        format: "HEVC x265 Crisp Master",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
      }
    }
  },

  // --- TV SHOWS (Reality, Docu-Series, Broadcasts) ---
  {
    id: "tv-01",
    title: "Trans-Continental Bullrun 3000",
    poster: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
    description: "Fifteen daredevil drivers take on 3,000 miles of public highways and dirt passes in the world's most intense broadcast reality race.",
    rating: 8.5,
    releaseDate: "2023-10-12",
    duration: "2 Seasons (16 Shows)",
    ageRating: "TV-PG",
    cast: ["Brock Mercer", "Tessa Reyes", "Julian Ford"],
    genre: ["Reality", "Action", "Sports"],
    category: "Popular TV Shows",
    isFeatured: false,
    type: "tv_show",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Ultra-Compressed (Mobile)",
        size: "130 MB / show",
        megabytes: 130,
        resolution: "854 × 480",
        format: "H.265 / HEVC Data Saver",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
      },
      "720p": {
        quality: "720p High Efficiency (HD)",
        size: "270 MB / show",
        megabytes: 270,
        resolution: "1280 × 720",
        format: "AV1 / x265 Compact",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
      },
      "1080p": {
        quality: "1080p FHD (Compressed 10-Bit)",
        size: "540 MB / show",
        megabytes: 540,
        resolution: "1920 × 1080",
        format: "HEVC x265 Crisp Master",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
      }
    }
  },
  {
    id: "tv-02",
    title: "Junkyard Grand Prix: 1000 Dollar Builds",
    poster: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    banner: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80",
    description: "Contestants buy $1,000 clunkers and modify them into speed machines to challenge supercars on a custom obstacle track.",
    rating: 8.4,
    releaseDate: "2024-05-04",
    duration: "4 Seasons (40 Shows)",
    ageRating: "TV-PG",
    cast: ["Leo Vance", "Gemma Arterton", "Felix Kim"],
    genre: ["Entertainment", "Comedy", "Cars"],
    category: "Popular TV Shows",
    isFeatured: false,
    type: "tv_show",
    videoStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    downloadLinks: {
      "480p": {
        quality: "480p Ultra-Compressed (Mobile)",
        size: "125 MB / show",
        megabytes: 125,
        resolution: "854 × 480",
        format: "H.265 / HEVC Data Saver",
        compressionTag: "90% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
      },
      "720p": {
        quality: "720p High Efficiency (HD)",
        size: "260 MB / show",
        megabytes: 260,
        resolution: "1280 × 720",
        format: "AV1 / x265 Compact",
        compressionTag: "70% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
      },
      "1080p": {
        quality: "1080p FHD (Compressed 10-Bit)",
        size: "520 MB / show",
        megabytes: 520,
        resolution: "1920 × 1080",
        format: "HEVC x265 Crisp Master",
        compressionTag: "55% Smaller",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
      }
    }
  }
];

export const MOCK_GENRES = [
  "All",
  "Action",
  "Sci-Fi",
  "Adventure",
  "Animation",
  "Thriller",
  "Comedy",
  "Fantasy",
  "Drama",
  "Crime",
  "Reality"
];

export const MOCK_CATEGORIES = [
  { id: "trending", title: "🔥 Trending on Asofreemovies", filter: (m) => m.category === "Trending Now" || m.rating >= 8.8 },
  { id: "movies", title: "🎬 Blockbuster Movies", filter: (m) => m.type === "movie" },
  { id: "series", title: "📺 Top Bingeable Series", filter: (m) => m.type === "series" },
  { id: "tv_shows", title: "📡 Popular TV Shows", filter: (m) => m.type === "tv_show" },
  { id: "top_rated", title: "⭐ Critically Acclaimed (8.5+)", filter: (m) => m.rating >= 8.6 },
  { id: "scifi", title: "⚡ Sci-Fi & Cyberpunk", filter: (m) => m.genre.includes("Sci-Fi") }
];
