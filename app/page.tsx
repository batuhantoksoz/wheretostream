'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ⚡️ SİHİRLİ KISIM: Yazmayı bitirince otomatik ara (Debounce)
  useEffect(() => {
    // Sayaç başlat: Kullanıcı elini klavyeden çektikten yarım saniye sonra çalış
    const delayDebounceFn = setTimeout(async () => {
      if (query.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      console.log("Otomatik aranıyor...", query); // Bunu konsolda göreceksin!

      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        
        if (data.results) {
          setSuggestions(data.results.slice(0, 5)); // İlk 5 sonucu göster
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Enter'a basınca yapılan ana arama
  const searchMovies = async (e?: any) => {
    if (e) e.preventDefault();
    if (!query) return;
    
    setShowSuggestions(false);
    setLoading(true);
    setHasSearched(true);
    
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          WhereToStream
        </div>
        <Link 
          href="/blog" 
          className="text-gray-300 hover:text-white font-medium hover:bg-white/10 px-4 py-2 rounded-full transition"
        >
          Blog & Guides
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center px-4 pt-20 pb-10">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight">
          Find where to watch <br />
          <span className="text-blue-500">your favorite movies.</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl text-center mb-10 max-w-2xl">
          Search for any movie to instantly see if it is streaming on Netflix, BluTV, Prime Video, or Apple TV in Turkey.
        </p>

        {/* 🔍 ARAMA ALANI */}
        <div className="w-full max-w-2xl relative mb-16 z-50">
          <form onSubmit={searchMovies} className="relative">
            <input 
              className="w-full p-5 pl-8 rounded-full bg-gray-900 border border-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-2xl transition-all"
              placeholder="Search for a movie (e.g. Interstellar)..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)} 
              onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full font-bold transition-colors"
            >
              {loading ? '...' : 'Search'}
            </button>
          </form>

          {/* ✨ ÖNERİ LİSTESİ */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 left-0 w-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl z-50">
              {suggestions.map((movie) => (
                <Link 
                  href={`/movie/${movie.id}`} 
                  key={movie.id}
                  onClick={() => setShowSuggestions(false)}
                >
                  <div className="flex items-center gap-4 p-4 hover:bg-gray-800 transition cursor-pointer border-b border-gray-800 last:border-0">
                    {movie.poster_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
                        alt={movie.title} 
                        className="w-10 h-14 object-cover rounded"
                      />
                    ) : (
                      <div className="w-10 h-14 bg-gray-700 rounded flex items-center justify-center text-xs">?</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-lg truncate">{movie.title}</h4>
                      <p className="text-sm text-gray-400">
                        {movie.release_date?.split('-')[0] || 'Unknown'} • Movie
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Ana Sonuçlar */}
        <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 z-0">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="group bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer h-full border border-gray-800 hover:border-blue-500/50 shadow-lg">
                  <div className="relative aspect-[2/3]">
                    {movie.poster_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        className="w-full h-full object-cover"
                        alt={movie.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-white truncate">{movie.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-400 text-sm">{movie.release_date?.split('-')[0] || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            hasSearched && !loading && (
              <div className="col-span-full text-center text-gray-500 mt-10">
                No movies found. Try searching for something else!
              </div>
            )
          )}
        </div>
      </main>

      <footer className="w-full border-t border-gray-800 py-8 mt-20 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 WhereToStream. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </footer>
    </div>
  );
}