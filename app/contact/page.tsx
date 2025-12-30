import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <Link href="/" className="text-blue-500 hover:text-blue-400 mb-8 inline-block">← Ana Sayfaya Dön</Link>
        
        <h1 className="text-4xl font-bold text-white mb-8">İletişim</h1>
        
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <p className="text-lg mb-6">
            Önerileriniz, hata bildirimleriniz veya reklam işbirlikleri için bize her zaman ulaşabilirsiniz.
          </p>
          
          <div className="flex flex-col gap-4 items-center">
            <div className="bg-black/50 px-6 py-4 rounded-full border border-gray-700">
              <span className="text-gray-500 mr-2">E-posta:</span>
              <a href="mailto:infowheretostream@gmail.com" className="text-white font-bold hover:text-blue-400 transition">
                infowheretostream@gmail.com
              </a>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Mesajlarınıza genellikle 24 saat içinde dönüş yapıyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}