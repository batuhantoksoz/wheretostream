import Link from 'next/link';

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition">
          WhereToStream
        </Link>
        <div className="flex gap-4">
           <Link href="/blog" className="text-gray-300 hover:text-white font-medium hover:bg-white/10 px-4 py-2 rounded-full transition">
            ← Blog'a Dön
          </Link>
        </div>
      </nav>

      {/* Makale İçeriği */}
      <article className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        
        {/* Başlık ve Tarih */}
        <header className="mb-10 text-center">
          <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm font-bold tracking-wider mb-4 inline-block">
            DISNEY+ REHBERİ
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Marvel Filmleri Hangi Sırayla İzlenmeli? (2025 Güncel)
          </h1>
          <p className="text-gray-400">
            Son Güncelleme: 30 Aralık 2025 • 6 dk okuma
          </p>
        </header>

        {/* Görsel Temsili */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl mb-12 flex items-center justify-center border border-gray-800 shadow-2xl">
           <span className="text-6xl">🛡️</span>
        </div>

        {/* Metin */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl text-white mb-6">
            Marvel Sinematik Evreni (MCU) o kadar büyüdü ki, yeni başlayanlar için olay örgüsünü takip etmek bir labirente dönüşebiliyor. Disney+ Türkiye kütüphanesindeki içerikleri kronolojik olarak nasıl izlemeniz gerektiğini derledik.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Başlangıç: İlk Yenilmezler</h2>
          <p>
            Hikayeye en baştan başlamak istiyorsanız <strong>Captain America: The First Avenger</strong> ile II. Dünya Savaşı dönemine gitmelisiniz. Ardından 90'larda geçen <strong>Captain Marvel</strong> geliyor.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Avengers Kuruluyor</h2>
          <p>
            Modern zamanlara geldiğimizde ise sırasıyla <strong>Iron Man</strong>, <strong>Iron Man 2</strong>, <strong>The Incredible Hulk</strong>, <strong>Thor</strong> ve nihayetinde tüm ekibin toplandığı <strong>The Avengers (2012)</strong> filmini izlemelisiniz.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Sonsuzluk Savaşına Doğru</h2>
          <p>
            Evrenin genişlediği bu dönemde <strong>Guardians of the Galaxy</strong> serisi uzay maceralarını başlatırken, <strong>Captain America: Civil War</strong> kahramanlarımızı ikiye bölüyor. Her şeyin düğümlendiği nokta ise efsanevi <strong>Avengers: Infinity War</strong> ve <strong>Endgame</strong> ikilisi.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Dizi Çağı (Disney+ Özel)</h2>
          <p>
            Endgame sonrası dönemde Disney+ dizileri büyük önem taşıyor. Özellikle <strong>WandaVision</strong>, <strong>Loki</strong> ve <strong>Moon Knight</strong> sadece tamamlayıcı değil, ana hikayeyi şekillendiren yapımlar haline geldi.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Nerede İzlenir?</h2>
          <p>
            Tüm bu Marvel külliyatı şu an Disney+ Türkiye üzerinde mevcut. Ancak bazı Spider-Man filmleri telif hakları nedeniyle farklı platformlarda (Netflix veya Prime Video) olabiliyor. Hangi filmin nerede olduğunu bulmak için sitemizin arama motorunu kullanabilirsiniz.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-gray-900 rounded-2xl border border-gray-800 text-center hover:border-blue-500 transition duration-300">
          <h3 className="text-2xl font-bold text-white mb-4">Hangi Marvel Filmi Nerede?</h3>
          <p className="text-gray-400 mb-6">
            Spider-Man, X-Men veya Deadpool... Aradığın kahramanın hangi platformda olduğunu hemen bul.
          </p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-blue-900/20">
            Hemen Ara →
          </Link>
        </div>

      </article>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-10 text-center mt-auto">
        <div className="flex justify-center gap-6 mb-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">Gizlilik</Link>
            <Link href="/about" className="hover:text-white">Hakkımızda</Link>
        </div>
        <p className="text-gray-600 text-sm">
          © 2025 WhereToStream.
        </p>
      </footer>
    </div>
  );
}