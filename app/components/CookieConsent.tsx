'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    // Eğer daha önce seçim yapılmadıysa (ne true ne false ise) göster
    if (consent === null) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie_consent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-4 md:p-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
      <div className="text-gray-300 text-sm md:text-base text-center md:text-left max-w-4xl">
        <p>
          Size daha iyi bir deneyim sunmak ve site trafiğini analiz etmek için çerezleri kullanıyoruz. 
          Detaylı bilgi için <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline font-medium">Gizlilik Politikamızı</a> inceleyebilirsiniz.
        </p>
      </div>
      <div className="flex gap-3">
        {/* Reddet Butonu (Gri ve Çerçeveli) */}
        <button 
          onClick={declineCookies}
          className="bg-transparent border border-gray-600 hover:bg-gray-800 hover:text-white text-gray-400 font-bold py-2 px-6 rounded-full transition-all whitespace-nowrap"
        >
          Reddet
        </button>

        {/* Kabul Et Butonu (Mavi ve Parlak) */}
        <button 
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all whitespace-nowrap shadow-lg shadow-blue-900/20"
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}