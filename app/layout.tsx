import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleAdSense } from '@next/third-parties/google';

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
      
      {/* Google Analytics */}
      <GoogleAnalytics gaId="G-ZD270XMJ3Y" />
      
      {/* AdSense Kodu */}
      <GoogleAdSense publisherId="pub-8135530407990099" />
    </html>
  );
}