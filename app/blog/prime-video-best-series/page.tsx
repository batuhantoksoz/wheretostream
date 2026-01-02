import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Amazon Prime Video En İyi Diziler (2025) - WhereToStream",
  description: "The Boys, Fallout, Reacher... Amazon Prime Video Türkiye'de izlemeniz gereken en iyi 5 yapımı listeledik.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent hover:opacity-80 transition">
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
            PRIME VIDEO ÖZEL
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Amazon Prime Video'da İzlemeniz Gereken En İyi 5 Dizi
          </h1>
          <p className="text-gray-400">
            Son Güncelleme: 2 Ocak 2026 • 5 dk okuma
          </p>
        </header>

        {/* Görsel Temsili */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-r from-blue-800 to-cyan-900 rounded-2xl mb-12 flex items-center justify-center border border-gray-800 shadow-2xl relative overflow-hidden group">
           <span className="text-8xl relative z-10 transform group-hover:scale-110 transition duration-500">📦</span>
           <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/TR-tr-20220502-popsignuptwoweeks-perspective_alpha_website_small.jpg')] opacity-10 mix-blend-overlay"></div>
        </div>

        {/* Metin */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl text-white mb-6">
            Netflix ve Disney+ arasında kararsız kaldıysanız, Amazon Prime Video'nun sessiz ama derinden ilerleyen kütüphanesine göz atmanın tam zamanı. İşte aboneliğinizin hakkını verecek 5 efsane yapım.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. The Boys</h2>
          <p>
            Süper kahramanların aslında "kötü", bencil ve şirketler tarafından yönetilen birer ürün olduğu bir dünya düşünün. <strong>The Boys</strong>, Marvel ve DC klişelerini yerle bir eden, kanlı, komik ve inanılmaz sürükleyici bir hiciv.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Fallout</h2>
          <p>
            Efsanevi oyun serisinden uyarlanan <strong>Fallout</strong>, nükleer kıyamet sonrası dünyayı hem korkutucu hem de absürt bir mizahla anlatıyor. Oyunun hayranı olmasanız bile atmosferine bayılacaksınız.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Reacher</h2>
          <p>
            Eski usul aksiyon sevenler buraya! Alan Ritchson'ın canlandırdığı Jack Reacher, gittiği her kasabada adaleti (ve kemikleri) kıra döke sağlayan devasa bir eski asker. Kafa yormayan, saf eğlence.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Invincible</h2>
          <p>
            "Çizgi film çocuklar içindir" algısını yıkmaya gelen bir başka yapım. Babası dünyanın en güçlü süper kahramanı olan Mark'ın hikayesi, beklediğinizden çok daha kanlı ve duygusal virajlara sahip.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. The Rings of Power (Güç Yüzükleri)</h2>
          <p>
            Yüzüklerin Efendisi evreninde, filmlerden binlerce yıl öncesine gidiyoruz. Görsel efektleri ve prodüksiyon kalitesiyle televizyon tarihinin en pahalı yapımı. Orta Dünya hasreti çekenler için birebir.
          </p>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 my-8">
            <p className="text-blue-200 font-medium m-0">
              💡 İpucu: Bu dizilerin hangisinin şu an yayında olduğunu veya kiralama seçeneklerini öğrenmek için ana sayfamızı kullanabilirsiniz.
            </p>
          </div>

        </div>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-gray-900 rounded-2xl border border-gray-800 text-center hover:border-blue-500 transition duration-300">
          <h3 className="text-2xl font-bold text-white mb-4">Bugün Ne İzlesem?</h3>
          <p className="text-gray-400 mb-6">
            Binlerce film ve dizi arasından sana en uygun olanı bulmak sadece saniyeler sürer.
          </p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-blue-900/20">
            Arama Yap →
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
          © 2026 WhereToStream.
        </p>
      </footer>
    </div>
  );
}