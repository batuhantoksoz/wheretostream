import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Veri Çekme Fonksiyonları
async function getShow(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=tr-TR`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

async function getProviders(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.results?.TR || null;
}

// Dinamik SEO Başlığı
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const show = await getShow(id);
  
  if (!show) return { title: 'Dizi Bulunamadı' };

  return {
    title: `${show.name} Nerede İzlenir? - Hangi Platformda?`,
    description: `${show.name} dizisini izleme seçenekleri. Oyuncular, konusu ve yayınlanacağı dijital platformlar.`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w500${show.poster_path}`],
    },
  };
}

export default async function TVDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const showData = getShow(id);
  const providersData = getProviders(id);
  const [show, providers] = await Promise.all([showData, providersData]);

  if (!show) return notFound();

  // Tarih Kontrolleri
  const firstAirDate = new Date(show.first_air_date);
  const today = new Date();
  const isUpcoming = firstAirDate > today; // Gelecek dizi mi?
  
  // Formatlı Tarih
  const formattedDate = firstAirDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Google Arama Linki
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(show.name + " dizi izle")}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full border-b border-gray-800 z-50 relative">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
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
          backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* İçerik */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 flex-1">
        
        {/* Poster */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative group">
            {show.poster_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                alt={show.name} 
                className="w-full h-auto"
              />
            ) : (
              <div className="w-full h-96 bg-gray-800 flex items-center justify-center">Resim Yok</div>
            )}
             {/* Etiket */}
             {isUpcoming && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                YAKINDA
              </div>
            )}
          </div>
        </div>

        {/* Detaylar */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">{show.name}</h1>
          <p className="text-xl text-gray-400 mb-6 italic">{show.original_name}</p>
          
          <div className="flex items-center gap-4 text-gray-400 mb-8 text-sm md:text-base flex-wrap">
            <span className="bg-gray-800 text-white px-2 py-1 rounded">{show.first_air_date?.split('-')[0]}</span>
            <span>•</span>
            <span>{show.number_of_seasons} Sezon</span>
            <span>•</span>
            <span className="text-yellow-500 font-bold">★ {show.vote_average?.toFixed(1)}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-200 mb-2">Özet</h3>
          <p className="text-gray-300 leading-relaxed text-lg mb-10">
            {show.overview || "Bu dizi için Türkçe özet henüz eklenmemiş."}
          </p>

          {/* Platform Kutusu */}
          <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-blue-500">▶</span> Nerede İzlenir?
            </h3>

            {/* SENARYO 1: Dizi Henüz Başlamadıysa */}
            {isUpcoming ? (
              <div className="text-center py-6 bg-blue-900/10 rounded-xl border border-blue-900/30">
                <p className="text-3xl mb-3">🗓️</p>
                <h4 className="text-lg font-bold text-blue-400 mb-2">Henüz Yayınlanmadı</h4>
                <p className="text-gray-400 text-sm px-4">
                  Bu dizi ilk bölümüyle <strong>{formattedDate}</strong> tarihinde yayınlanmaya başlayacak.
                </p>
              </div>
            ) : providers ? (
              // SENARYO 2: Dizi Var ve Platform Verisi Mevcut
              <div className="space-y-6">
                {providers.flatrate && (
                  <div>
                    <p className="text-sm text-gray-400 mb-3 uppercase font-bold">Abonelik</p>
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
                            className="w-16 h-16 rounded-xl shadow-lg hover:scale-110 transition-transform"
                            title={`${provider.provider_name} üzerinden izle`}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {!providers.flatrate && !providers.rent && !providers.buy && (
                   <div className="flex flex-col gap-4">
                      <div className="text-gray-400 p-4 bg-gray-800/50 rounded-lg text-sm">
                        Bu dizi yayınlanmış olsa da, şu an sistemimizdeki kayıtlı dijital platformlarda görünmüyor.
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
              // SENARYO 3: Dizi Var Ama HİÇ Veri Yok
              <div className="flex flex-col items-start gap-4">
                <div className="text-gray-400 p-4 bg-gray-800/50 rounded-lg w-full text-sm leading-relaxed">
                   <strong className="text-white block mb-1">Veri Bulunamadı</strong>
                   Bu dizinin Türkiye yayıncısı henüz veritabanımıza eklenmemiş.
                </div>
                
                {/* Kurtarıcı Buton */}
                <a 
                  href={googleSearchUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full"
                >
                  <span className="text-xl">G</span> "{show.name}" için Google'da Ara
                </a>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-700">Veriler JustWatch tarafından sağlanmaktadır.</p>
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