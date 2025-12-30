import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import CookieConsent from './components/CookieConsent'; // 👈 1. YENİ EKLENEN SATIR

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhereToStream - Hangi Film Nerede İzlenir?",
  description: "Netflix, BluTV, Prime Video ve Disney+ Türkiye içeriklerini arayın. Hangi filmin hangi platformda olduğunu hemen bulun.",
  verification: {
    google: 'fWP9uTEw1M5arjvuw457NtkeKIcMCtKwZFyY0zynDuU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
        <CookieConsent /> {/* 👈 2. YENİ EKLENEN SATIR (En altta dursun) */}
      </body>
      
      {/* Google Analytics */}
      <GoogleAnalytics gaId="G-ZD270XMJ3Y" />
      
      {/* AdSense Kodu */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8135530407990099"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </html>
  );
}