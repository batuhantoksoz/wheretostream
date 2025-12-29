'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]); // Arama sonuçları
  const [trending, setTrending] = useState<any[]>([]); // Türkiye trendleri
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sayfa açılınca Türkiye'de popüler filmleri çek
  useEffect(() => {
    const fetchTrending = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=tr-TR&region=TR`
        );
        const data = await res.json();
        setTrending(data.results?.slice(0, 10) || []); // İlk 10 popüler film
      } catch (error) {
        console.error("Trend hatası:", error);
      }
    };
    fetchTrending();
  }, []);

  // Otomatik Tamamlama (Türkçe sonuçlar için language=tr-TR eklendi)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=tr-TR`
        );
        const data = await res.json();
        
        if (data.results) {
          setSuggestions(data.results.slice(0, 5));
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Ana Arama Fonksiyonu
  const searchMovies = async (e?: any) => {
    if (e) e.preventDefault();
    if (!query) return;
    
    setShowSuggestions(false);
    setLoading(true);
    setHasSearched(true);
    
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=tr-TR`
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full border-b border-gray-800/50">
        <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
          WhereToStream
        </div>
        <Link 
          href="/blog" 
          className="text-gray-300 hover:text-white font-medium hover:bg-white/10 px-4 py-2 rounded-full transition"
        >
          Blog & Rehber
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center px-4 pt-16 pb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 tracking-tight leading-tight">
          Aradığın filmi <br />
          <span className="text-red-500">hangi platformda</span> izleyebilirsin?
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl text-center mb-10 max-w-2xl">
          Netflix, BluTV, Prime Video veya Disney+... Türkiye'deki tüm platformları senin için tarıyoruz.
        </p>

        {/* 🔍 ARAMA KUTUSU */}
        <div className="w-full max-w-2xl relative mb-16 z-50">
          <form onSubmit={searchMovies} className="relative">
            <input 
              className="w-full p-5 pl-8 rounded-full bg-gray-900 border border-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-2xl transition-all placeholder-gray-500"
              placeholder="Film adı girin (Örn: Harry Potter)..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)} 
              onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-8 rounded-full font-bold transition-colors"
            >
              {loading ? '...' : 'Ara'}
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
                        {movie.release_date?.split('-')[0] || 'Tarih Yok'} • Film
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* SONUÇLAR VEYA TRENDLER */}
        <div className="w-full max-w-7xl">
          
          {/* Eğer arama yapılmadıysa TRENDLERİ göster */}
          {!hasSearched && trending.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-200 border-l-4 border-red-500 pl-4">
                Türkiye'de Bu Hafta Popüler
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {trending.map((movie) => (
                  <Link href={`/movie/${movie.id}`} key={movie.id}>
                    <div className="group bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer h-full border border-gray-800 hover:border-red-500/50 shadow-lg">
                      <div className="relative aspect-[2/3]">
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                          className="w-full h-full object-cover"
                          alt={movie.title}
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          {(movie.vote_average || 0).toFixed(1)}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-white text-sm truncate">{movie.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {movie.release_date?.split('-')[0]}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Arama Sonuçları */}
          {hasSearched && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 z-0">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <Link href={`/movie/${movie.id}`} key={movie.id}>
                    <div className="group bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer h-full border border-gray-800 hover:border-red-500/50 shadow-lg">
                      <div className="relative aspect-[2/3]">
                        {movie.poster_path ? (
                          <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            className="w-full h-full object-cover"
                            alt={movie.title}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                            Resim Yok
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white truncate">{movie.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-400 text-sm">{movie.release_date?.split('-')[0] || '-'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                !loading && (
                  <div className="col-span-full text-center text-gray-500 mt-10">
                    Aradığınız kriterde film bulunamadı.
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </main>

      {/* YENİ FOOTER KISMI - TMDB Uyumlu */}
      <footer className="w-full border-t border-gray-800 py-10 mt-20 flex flex-col items-center text-center gap-6">
        
        {/* Yasal Uyarı ve Logo */}
        <div className="flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
          <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
            alt="TMDB Logo" 
            className="h-5" 
          />
          <p className="text-gray-500 text-xs max-w-sm leading-relaxed">
            Bu ürün TMDB verilerini kullanmaktadır ancak TMDB tarafından onaylanmamış veya sertifikalandırılmamıştır.
          </p>
        </div>

        <p className="text-gray-600 text-sm">
          © 2025 WhereToStream. Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
}