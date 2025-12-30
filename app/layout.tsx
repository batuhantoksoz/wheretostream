import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script'; // 👇 AdSense için bunu kullanacağız

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
      </body>
      
      {/* Google Analytics (Bu çalışıyordu, dokunmadık) */}
      <GoogleAnalytics gaId="G-ZD270XMJ3Y" />
      
      {/* 👇 AdSense Kodu (Manuel Yöntem - Hata Vermez) */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8135530407990099"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </html>
  );
}