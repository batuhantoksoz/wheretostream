import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto text-center md:text-left">
        <Link href="/" className="text-blue-500 hover:text-blue-400 mb-8 inline-block">← Ana Sayfaya Dön</Link>
        
        <h1 className="text-4xl font-bold text-white mb-6">Hakkımızda</h1>
        
        <p className="text-lg leading-relaxed mb-6">
          <strong>WhereToStream</strong>, Türkiye'deki film ve dizi severlerin yaşadığı "Bunu nerede izleyebilirim?" karmaşasına son vermek için kurulmuş bir arama motorudur.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Netflix, BluTV, Amazon Prime Video, Disney+ ve diğer dijital platformların kütüphanelerini tek bir çatı altında tarayarak, aradığınız içeriğe en hızlı şekilde ulaşmanızı sağlıyoruz.
        </p>

        <p className="text-lg leading-relaxed mb-10">
          Amacımız, izlemek istediğiniz filme ulaşmak için platformlar arasında kaybolmanızı engellemek ve size zaman kazandırmaktır.
        </p>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h3 className="text-white font-bold mb-2">Veri Kaynağı</h3>
          <p className="text-sm">
            Film ve dizi verilerimiz ile platform bilgileri, TMDB (The Movie Database) ve JustWatch altyapısı kullanılarak sağlanmaktadır.
          </p>
        </div>
      </div>
    </div>
  );
}