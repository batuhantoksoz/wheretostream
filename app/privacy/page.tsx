import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-500 hover:text-blue-400 mb-8 inline-block">← Ana Sayfaya Dön</Link>
        
        <h1 className="text-3xl font-bold text-white mb-6">Gizlilik Politikası</h1>
        <p className="mb-4 text-sm text-gray-500">Son Güncelleme: 30 Aralık 2025</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Genel Bakış</h2>
            <p>WhereToStream ("biz", "sitemiz"), kullanıcıların kişisel gizliliğine saygı duyar. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde hangi bilgilerin toplandığını ve nasıl kullanıldığını açıklar.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Google AdSense ve Çerezler</h2>
            <p>Sitemiz, reklam gösterimi için Google AdSense kullanmaktadır. Google, reklamları sunmak için çerezleri (cookies) kullanır. Google'ın reklam çerezlerini kullanması, size ve diğer sitelere yaptığınız ziyaretlere dayalı olarak reklam sunmasına olanak tanır.</p>
            <p className="mt-2">Kullanıcılar, Google'ın Reklam Ayarları sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilirler.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. Google Analytics</h2>
            <p>Site trafiğini analiz etmek ve kullanıcı deneyimini geliştirmek için Google Analytics kullanıyoruz. Bu hizmet, IP adresiniz, tarayıcı türünüz ve ziyaret ettiğiniz sayfalar gibi anonim verileri toplayabilir.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">4. Veri Güvenliği</h2>
            <p>Kullanıcı bilgilerinin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri uyguluyoruz. Ancak, internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olduğunu garanti edemeyiz.</p>
          </section>
        </div>
      </div>
    </div>
  );
}