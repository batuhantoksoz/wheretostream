'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function MovieDetail() {
  const params = useParams(); // URL'deki ID'yi al
  const id = params?.id; // ID'yi güvenli bir şekilde çek
  
  const [movie, setMovie] = useState<any>(null);
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      try {
        // 1. Film Detaylarını Çek (Türkçe)
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=tr-TR`
        );
        const movieData = await movieRes.json();
        setMovie(movieData);

        // 2. İzleme Platformlarını Çek (Türkiye Bölgesi)
        const providerRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`
        );
        const providerData = await providerRes.json();
        // Sadece Türkiye (TR) verisini al
        setProviders(providerData.results?.TR || null);

      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Yükleniyor...</div>;
  if (!movie) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Film bulunamadı.</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full border-b border-gray-800 z-50 relative">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent hover:opacity-80 transition">
          WhereToStream
        </Link>
        <Link href="/" className="text-gray-300 hover:text-white px-4 py-2 hover:bg-white/10 rounded-full transition">
          ← Geri Dön
        </Link>
      </nav>

      {/* Arka Plan Görseli (Blur Efektli) */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 flex-1">
        
        {/* SOL Taraf: Poster */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative group">
            {movie.poster_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="w-full h-auto"
              />
            ) : (
              <div className="w-full h-96 bg-gray-800 flex items-center justify-center">Resim Yok</div>
            )}
          </div>
        </div>

        {/* SAĞ Taraf: Detaylar ve Platformlar */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-400 mb-8 text-sm md:text-base flex-wrap">
            <span>{movie.release_date?.split('-')[0]}</span>
            <span>•</span>
            <span>{movie.genres?.map((g: any) => g.name).join(', ')}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-yellow-500 font-bold">
              ★ {movie.vote_average?.toFixed(1)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-200 mb-2">Özet</h3>
          <p className="text-gray-300 leading-relaxed text-lg mb-10">
            {movie.overview || "Bu film için Türkçe özet henüz eklenmemiş."}
          </p>

          {/* 🎬 İZLEME PLATFORMLARI BÖLÜMÜ */}
          <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-red-500">▶</span> Nerede İzlenir?
            </h3>

            {providers ? (
              <div className="space-y-6">
                
                {/* 1. ABONELİK (Flatrate) */}
                {providers.flatrate && (
                  <div>
                    <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-bold">Abonelik ile İzle</p>
                    <div className="flex gap-4 flex-wrap">
                      {providers.flatrate.map((provider: any) => (
                        <a 
                          key={provider.provider_id}
                          href={providers.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                        >
                          <img 
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                            alt={provider.provider_name}
                            className="w-16 h-16 rounded-xl shadow-lg group-hover:scale-110 transition-transform border-2 border-transparent group-hover:border-red-500"
                            title={`${provider.provider_name} ile izle`}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. KİRALA (Rent) */}
                {providers.rent && (
                  <div>
                    <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-bold mt-4">Kirala</p>
                    <div className="flex gap-4 flex-wrap">
                      {providers.rent.map((provider: any) => (
                        <a 
                          key={provider.provider_id}
                          href={providers.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <img 
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                            alt={provider.provider_name}
                            className="w-12 h-12 rounded-lg grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                            title={`${provider.provider_name} üzerinden kirala`}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Hiçbir seçenek yoksa */}
                {!providers.flatrate && !providers.rent && !providers.buy && (
                   <div className="text-gray-400">Bu film şu an Türkiye dijital platformlarında bulunmuyor.</div>
                )}

              </div>
            ) : (
              <div className="text-gray-400">
                Bu filmin Türkiye yayıncısı henüz veritabanımıza eklenmemiş.
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-700">
              Veriler JustWatch tarafından sağlanmaktadır.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer - TMDB Uyumlu */}
      <footer className="w-full border-t border-gray-800 py-10 mt-auto flex flex-col items-center text-center gap-6 relative z-10 bg-[#0a0a0a]">
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