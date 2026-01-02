import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Veri Çekme Fonksiyonları
async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=tr-TR`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

async function getProviders(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.results?.TR || null;
}

// Dinamik Başlık (SEO)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);
  
  if (!movie) return { title: 'Film Bulunamadı' };

  return {
    title: `${movie.title} Nerede İzlenir? - Hangi Platformda?`,
    description: `${movie.title} filmini izleme seçenekleri. Vizyon tarihi, konusu ve yayınlanacağı platformlar.`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w500${movie.poster_path}`],
    },
  };
}

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const movieData = getMovie(id);
  const providersData = getProviders(id);
  const [movie, providers] = await Promise.all([movieData, providersData]);

  if (!movie) return notFound();

  // Tarih ve Durum Kontrolleri
  const releaseDate = new Date(movie.release_date);
  const today = new Date();
  const isUpcoming = releaseDate > today; // Gelecek film mi?
  
  // Formatlı Tarih
  const formattedDate = releaseDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Google Arama Linki Oluştur
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(movie.title + " izle")}`;

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

      {/* Arka Plan */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* İçerik */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 flex-1">
        
        {/* Poster */}
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
            {/* Etiketler */}
            {isUpcoming && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                YAKINDA
              </div>
            )}
          </div>
        </div>

        {/* Detaylar */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-400 mb-8 text-sm md:text-base flex-wrap">
            <span className="bg-gray-800 text-white px-2 py-1 rounded">{movie.release_date?.split('-')[0]}</span>
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

          {/* Platform Kutusu */}
          <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-red-500">▶</span> Nerede İzlenir?
            </h3>

            {/* SENARYO 1: Film Henüz Çıkmadıysa */}
            {isUpcoming ? (
              <div className="text-center py-6 bg-red-900/10 rounded-xl border border-red-900/30">
                <p className="text-3xl mb-3">🗓️</p>
                <h4 className="text-lg font-bold text-red-400 mb-2">Henüz Vizyona Girmedi</h4>
                <p className="text-gray-400 text-sm px-4">
                  Bu film <strong>{formattedDate}</strong> tarihinde sinemalarda olacak. 
                  Dijital platformlara gelmesi vizyon tarihinden sonra gerçekleşecektir.
                </p>
              </div>
            ) : providers ? (
              // SENARYO 2: Film Çıktı ve Verisi Var
              <div className="space-y-6">
                
                {providers.flatrate && (
                  <div>
                    <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-bold">Abonelik ile İzle</p>
                    <div className="flex gap-4 flex-wrap">
                      {providers.flatrate.map((provider: any) => (
                        <a 
                          key={provider.provider_id}
                          href={providers.link} 
                          target="_blank"
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

                {providers.rent && (
                  <div>
                    <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-bold mt-4">Kirala</p>
                    <div className="flex gap-4 flex-wrap">
                      {providers.rent.map((provider: any) => (
                        <a 
                          key={provider.provider_id}
                          href={providers.link}
                          target="_blank"
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
                
                {!providers.flatrate && !providers.rent && !providers.buy && (
                   <div className="flex flex-col gap-4">
                      <div className="text-gray-400 p-4 bg-gray-800/50 rounded-lg text-sm">
                        Bu film vizyona girmiş olsa da, şu an sistemimizdeki kayıtlı dijital platformlarda görünmüyor.
                      </div>
                      <a 
                        href={googleSearchUrl}
                        target="_blank"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full md:w-auto"
                      >
                        🔍 Google'da Ara
                      </a>
                   </div>
                )}
              </div>
            ) : (
              // SENARYO 3: Film Çıktı Ama HİÇBİR Veri Yok (Boş Data)
              <div className="flex flex-col items-start gap-4">
                <div className="text-gray-400 p-4 bg-gray-800/50 rounded-lg w-full text-sm leading-relaxed">
                   <strong className="text-white block mb-1">Veri Bulunamadı</strong>
                   Bu filmin Türkiye yayıncısı henüz veritabanımıza eklenmemiş. Yerel platformlarda veya sinemalarda olabilir.
                </div>
                
                {/* Kurtarıcı Buton */}
                <a 
                  href={googleSearchUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full"
                >
                  <span className="text-xl">G</span> "{movie.title}" için Google'da Ara
                </a>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-700">
              Veriler JustWatch tarafından sağlanmaktadır.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-10 mt-auto flex flex-col items-center text-center gap-6 relative z-10 bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-3 opacity-70">
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" className="h-5" />
          <p className="text-gray-500 text-xs">Bu ürün TMDB verilerini kullanmaktadır.</p>
        </div>
      </footer>
    </div>
  );
}