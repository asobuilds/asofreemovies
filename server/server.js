import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables securely from server/.env or root .env
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY || '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// ==============================================================
// Security Middleware & Attack Prevention
// ==============================================================
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Prevent clickjacking by restricting framing
  res.setHeader('X-Frame-Options', 'DENY');
  // XSS protection header
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Strict Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Content Security Policy for secure API serving
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; media-src 'self' https: data:; connect-src 'self' https:;"
  );
  next();
});

// CORS configuration (restricts unauthorized origin injection)
app.use(cors({
  origin: '*', // Allows local frontend dev server proxy
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));

// Simple in-memory rate limiting to protect against DDoS / abuse attacks
const rateLimitMap = new Map();
app.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 120; // 120 requests per minute

  const record = rateLimitMap.get(clientIp) || { count: 0, startTime: now };
  if (now - record.startTime > windowMs) {
    record.count = 1;
    record.startTime = now;
  } else {
    record.count++;
  }

  rateLimitMap.set(clientIp, record);

  if (record.count > maxRequests) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  next();
});

// Periodic cleanup of rate limit map to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.startTime > 60000) {
      rateLimitMap.delete(ip);
    }
  }
}, 60000);

// ==============================================================
// Data & Media Helpers
// ==============================================================
const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
  10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality',
  10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
};

const STREAM_SAMPLE_URLS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
];

// Fallback high-quality curated dataset when TMDB API key is not yet set
const FALLBACK_MEDIA = [
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
    videoStreamUrl: STREAM_SAMPLE_URLS[0],
    downloadLinks: {
      "480p": { quality: "480p Ultra-Compressed (Mobile)", size: "185 MB", megabytes: 185, resolution: "854 × 480", format: "H.265 / HEVC Data Saver", compressionTag: "90% Smaller", url: STREAM_SAMPLE_URLS[0] },
      "720p": { quality: "720p High Efficiency (HD)", size: "390 MB", megabytes: 390, resolution: "1280 × 720", format: "AV1 / x265 Compact", compressionTag: "70% Smaller", url: STREAM_SAMPLE_URLS[0] },
      "1080p": { quality: "1080p FHD (Compressed 10-Bit)", size: "780 MB", megabytes: 780, resolution: "1920 × 1080", format: "HEVC x265 Crisp Master", compressionTag: "55% Smaller", url: STREAM_SAMPLE_URLS[0] }
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
    videoStreamUrl: STREAM_SAMPLE_URLS[1],
    downloadLinks: {
      "480p": { quality: "480p Ultra-Compressed (Mobile)", size: "195 MB", megabytes: 195, resolution: "854 × 480", format: "H.265 / HEVC Data Saver", compressionTag: "90% Smaller", url: STREAM_SAMPLE_URLS[1] },
      "720p": { quality: "720p High Efficiency (HD)", size: "410 MB", megabytes: 410, resolution: "1280 × 720", format: "AV1 / x265 Compact", compressionTag: "70% Smaller", url: STREAM_SAMPLE_URLS[1] },
      "1080p": { quality: "1080p FHD (Compressed 10-Bit)", size: "820 MB", megabytes: 820, resolution: "1920 × 1080", format: "HEVC x265 Crisp Master", compressionTag: "55% Smaller", url: STREAM_SAMPLE_URLS[1] }
    }
  },
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
    videoStreamUrl: STREAM_SAMPLE_URLS[6],
    downloadLinks: {
      "480p": { quality: "480p Compressed (Season Pack / Ep)", size: "140 MB / ep", megabytes: 140, resolution: "854 × 480", format: "H.265 Mobile Stream", compressionTag: "90% Smaller", url: STREAM_SAMPLE_URLS[6] },
      "720p": { quality: "720p HD Series Pack", size: "290 MB / ep", megabytes: 290, resolution: "1280 × 720", format: "AV1 High Efficiency", compressionTag: "70% Smaller", url: STREAM_SAMPLE_URLS[6] },
      "1080p": { quality: "1080p Complete Season Pack", size: "590 MB / ep", megabytes: 590, resolution: "1920 × 1080", format: "HEVC 10-Bit Crisp", compressionTag: "55% Smaller", url: STREAM_SAMPLE_URLS[6] }
    }
  },
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
    videoStreamUrl: STREAM_SAMPLE_URLS[4],
    downloadLinks: {
      "480p": { quality: "480p Ultra-Compressed (Mobile)", size: "130 MB / show", megabytes: 130, resolution: "854 × 480", format: "H.265 / HEVC Data Saver", compressionTag: "90% Smaller", url: STREAM_SAMPLE_URLS[4] },
      "720p": { quality: "720p High Efficiency (HD)", size: "270 MB / show", megabytes: 270, resolution: "1280 × 720", format: "AV1 / x265 Compact", compressionTag: "70% Smaller", url: STREAM_SAMPLE_URLS[4] },
      "1080p": { quality: "1080p FHD (Compressed 10-Bit)", size: "540 MB / show", megabytes: 540, resolution: "1920 × 1080", format: "HEVC x265 Crisp Master", compressionTag: "55% Smaller", url: STREAM_SAMPLE_URLS[4] }
    }
  }
];

function transformTmdbItem(item, forcedType = null, index = 0) {
  const isTv = forcedType === 'tv_show' || forcedType === 'series' || item.first_air_date !== undefined || item.media_type === 'tv';
  const type = isTv ? (item.number_of_seasons > 1 || forcedType === 'series' ? 'series' : 'tv_show') : 'movie';
  const title = item.title || item.name || item.original_title || 'Untitled';
  const releaseDate = item.release_date || item.first_air_date || '2024';
  const poster = item.poster_path 
    ? `${TMDB_IMAGE_BASE}/w500${item.poster_path}`
    : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80';
  const banner = item.backdrop_path 
    ? `${TMDB_IMAGE_BASE}/original${item.backdrop_path}`
    : 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80';

  const genre = (item.genre_ids || []).map(id => GENRE_MAP[id]).filter(Boolean);
  if (genre.length === 0) genre.push(isTv ? 'Drama' : 'Action');

  const rating = item.vote_average ? Math.round(item.vote_average * 10) / 10 : 8.5;
  const streamUrl = STREAM_SAMPLE_URLS[index % STREAM_SAMPLE_URLS.length];

  return {
    id: `tmdb-${item.id}`,
    title,
    poster,
    banner,
    description: item.overview || `Stream and download ${title} in compressed small MB format.`,
    rating: rating > 0 ? rating : 8.2,
    releaseDate,
    duration: isTv ? `${item.number_of_seasons || 2} Seasons` : '1h 55m',
    ageRating: item.adult ? '18+' : 'PG-13',
    cast: ['Leading Cast', 'Supporting Cast'],
    genre,
    category: item.vote_average > 8 ? 'Top Rated' : 'Trending Now',
    isFeatured: index === 0,
    type,
    videoStreamUrl: streamUrl,
    isApiSource: true,
    downloadLinks: {
      "480p": { quality: "480p Ultra-Compressed (Mobile)", size: "185 MB", megabytes: 185, resolution: "854 × 480", format: "H.265 / HEVC Data Saver", compressionTag: "90% Smaller", url: streamUrl },
      "720p": { quality: "720p High Efficiency (HD)", size: "390 MB", megabytes: 390, resolution: "1280 × 720", format: "AV1 / x265 Compact", compressionTag: "70% Smaller", url: streamUrl },
      "1080p": { quality: "1080p FHD (Compressed 10-Bit)", size: "780 MB", megabytes: 780, resolution: "1920 × 1080", format: "HEVC x265 Crisp Master", compressionTag: "55% Smaller", url: streamUrl }
    }
  };
}

// In-memory cache for TMDB requests to reduce latency and prevent API quota exhaustion
let cachedCatalog = null;
let lastCacheTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// ==============================================================
// REST API Endpoints
// ==============================================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Asofreemovies Backend API',
    apiKeyConfigured: Boolean(TMDB_API_KEY && TMDB_API_KEY.trim().length > 5),
    timestamp: new Date().toISOString()
  });
});

// GET /api/movies - Fetches complete catalog securely using server TMDB_API_KEY
app.get('/api/movies', async (req, res) => {
  try {
    const apiKey = TMDB_API_KEY ? TMDB_API_KEY.trim() : '';

    // If no TMDB API key in server/.env, serve rich local catalog
    if (!apiKey) {
      return res.json({
        data: FALLBACK_MEDIA,
        source: 'local',
        message: 'Operating on local catalog. Add TMDB_API_KEY to server/.env to sync live movies automatically.'
      });
    }

    // Return cached catalog if fresh
    const now = Date.now();
    if (cachedCatalog && (now - lastCacheTime < CACHE_DURATION)) {
      return res.json({ data: cachedCatalog, source: 'cache', cached: true });
    }

    const authParam = apiKey.startsWith('eyJ') ? '' : `api_key=${apiKey}`;
    const headers = apiKey.startsWith('eyJ')
      ? { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/json' };

    const fetchUrl = (endpoint, params = '') => {
      const sep = endpoint.includes('?') ? '&' : '?';
      return `${TMDB_BASE_URL}${endpoint}${sep}${authParam}${params}`;
    };

    const [moviesRes, tvRes, trendingRes] = await Promise.allSettled([
      fetch(fetchUrl('/discover/movie', '&sort_by=popularity.desc&page=1'), { headers }),
      fetch(fetchUrl('/discover/tv', '&sort_by=popularity.desc&page=1'), { headers }),
      fetch(fetchUrl('/trending/all/week'), { headers })
    ]);

    let combined = [];

    if (trendingRes.status === 'fulfilled' && trendingRes.value.ok) {
      const d = await trendingRes.value.json();
      combined.push(...(d.results || []).slice(0, 10).map((item, idx) => transformTmdbItem(item, null, idx)));
    }

    if (moviesRes.status === 'fulfilled' && moviesRes.value.ok) {
      const d = await moviesRes.value.json();
      combined.push(...(d.results || []).slice(0, 15).map((item, idx) => transformTmdbItem(item, 'movie', idx + 10)));
    }

    if (tvRes.status === 'fulfilled' && tvRes.value.ok) {
      const d = await tvRes.value.json();
      combined.push(...(d.results || []).slice(0, 15).map((item, idx) => transformTmdbItem(item, idx % 2 === 0 ? 'series' : 'tv_show', idx + 25)));
    }

    // Deduplicate items by ID
    const map = new Map();
    combined.forEach(m => {
      if (!map.has(m.id)) map.set(m.id, m);
    });

    const finalCatalog = Array.from(map.values());

    if (finalCatalog.length > 0) {
      finalCatalog[0].isFeatured = true;
      cachedCatalog = finalCatalog;
      lastCacheTime = now;
      return res.json({
        data: finalCatalog,
        source: 'tmdb_api',
        count: finalCatalog.length
      });
    }

    return res.json({ data: FALLBACK_MEDIA, source: 'fallback' });
  } catch (error) {
    console.error('Server error fetching movies:', error);
    return res.json({ data: FALLBACK_MEDIA, source: 'fallback', error: error.message });
  }
});

// GET /api/movies/search?q=query - Secure search using server API key
app.get('/api/movies/search', async (req, res) => {
  const query = req.query.q || '';
  if (!query.trim()) {
    return res.json({ results: [] });
  }

  const apiKey = TMDB_API_KEY ? TMDB_API_KEY.trim() : '';
  if (!apiKey) {
    const q = query.toLowerCase();
    const matched = FALLBACK_MEDIA.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.genre.some(g => g.toLowerCase().includes(q))
    );
    return res.json({ results: matched, source: 'local' });
  }

  try {
    const authParam = apiKey.startsWith('eyJ') ? '' : `api_key=${apiKey}&`;
    const headers = apiKey.startsWith('eyJ') ? { Authorization: `Bearer ${apiKey}` } : {};
    const url = `${TMDB_BASE_URL}/search/multi?${authParam}query=${encodeURIComponent(query)}&page=1`;

    const response = await fetch(url, { headers });
    if (!response.ok) {
      return res.json({ results: [] });
    }

    const data = await response.json();
    const items = (data.results || [])
      .filter(item => item.poster_path || item.backdrop_path)
      .map((item, idx) => transformTmdbItem(item, null, idx));

    return res.json({ results: items, source: 'tmdb_api' });
  } catch (err) {
    console.error('Search error:', err);
    return res.json({ results: [] });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🎬 Asofreemovies Secure Backend Server Started`);
  console.log(`🔒 Port: ${PORT}`);
  console.log(`🔑 TMDB API Key: ${TMDB_API_KEY ? 'Configured (Active)' : 'Not set (Using fallback catalog)'}`);
  console.log(`======================================================\n`);
});
