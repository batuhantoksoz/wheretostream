import Link from 'next/link';

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent hover:opacity-80 transition">
          WhereToStream
        </Link>
        <div className="flex gap-4">
           <Link href="/" className="text-gray-300 hover:text-white font-medium hover:bg-white/10 px-4 py-2 rounded-full transition">
            Ana Sayfa
          </Link>
        </div>
      </nav>

      {/* Blog Başlığı */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Rehber ve İçerikler</h1>
        <p className="text-gray-400 text-xl mb-12">
          Hangi platformda ne izlenir? Netflix, Disney+, BluTV ve Prime Video Türkiye kütüphanelerindeki gizli hazineler.
        </p>

        {/* Blog Yazıları Listesi */}
        <div className="grid gap-6">
          
          {/* Şimdilik tek yazı var, onu da Türkçeleştirilmiş gibi gösterelim */}
          <Link href="/blog/best-netflix-tr-movies" className="group">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-red-500/50 transition-all hover:bg-gray-800/50">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-48 h-32 bg-gray-800 rounded-xl flex items-center justify-center text-3xl">
                  🍿
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold group-hover:text-red-400 transition-colors mb-2">
                    Netflix Türkiye'de İzleyebileceğiniz En İyi 10 Film (2025)
                  </h2>
                  <p className="text-gray-400 mb-4">
                    Ne izleyeceğinize karar veremiyor musunuz? İşte şu an Netflix Türkiye kütüphanesinde bulunan en yüksek puanlı filmler.
                  </p>
                  <span className="text-red-500 text-sm font-bold uppercase tracking-wider">Okumaya Başla →</span>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </main>

      <footer className="w-full border-t border-gray-800 py-8 mt-10 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 WhereToStream.
        </p>
      </footer>
    </div>
  );
}