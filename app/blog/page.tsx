import Link from 'next/link';

export default function BlogIndex() {
  // Blog yazılarını burada elle tanımlıyoruz (İleride veritabanından gelebilir)
  const posts = [
    {
      slug: 'disney-plus-marvel-guide',
      title: 'Marvel Filmleri Hangi Sırayla İzlenmeli? (2025)',
      desc: 'MCU evrenine girmek isteyenler için kronolojik izleme sırası ve Disney+ rehberi.',
      category: 'DISNEY+',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      icon: '🛡️'
    },
    {
      slug: 'best-netflix-tr-movies',
      title: "Netflix Türkiye'de İzleyebileceğiniz En İyi 10 Film",
      desc: 'IMDb puanlarına göre seçilmiş, hafta sonu izleyebileceğiniz en kaliteli Netflix filmleri.',
      category: 'NETFLIX',
      color: 'text-red-500',
      bgColor: 'bg-red-900/20',
      icon: '🍿'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition">
          WhereToStream
        </Link>
        <Link href="/" className="text-gray-300 hover:text-white font-medium hover:bg-white/10 px-4 py-2 rounded-full transition">
          Ana Sayfa
        </Link>
      </nav>

      {/* Başlık Alanı */}
      <header className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog & Rehber</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Dijital yayın platformları, film önerileri ve izleme listeleri hakkında en güncel içerikler.
        </p>
      </header>

      {/* Yazı Listesi (Grid) */}
      <main className="max-w-7xl mx-auto px-6 w-full pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition duration-300 hover:shadow-2xl h-full flex flex-col">
                
                {/* Görsel Alanı (Placeholder) */}
                <div className="h-48 bg-gray-800 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                  {post.icon}
                </div>
                
                {/* İçerik */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className={`text-xs font-bold tracking-wider mb-3 px-3 py-1 rounded-full w-fit ${post.bgColor} ${post.color}`}>
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {post.desc}
                  </p>
                  <span className="text-sm font-bold text-gray-300 group-hover:translate-x-2 transition-transform inline-block">
                    Devamını Oku →
                  </span>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-10 mt-auto text-center">
        <p className="text-gray-600 text-sm">© 2025 WhereToStream.</p>
      </footer>

    </div>
  );
}