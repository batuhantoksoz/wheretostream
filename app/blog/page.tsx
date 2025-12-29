import Link from 'next/link';

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-500 hover:underline mb-8 block">← Back to Search</Link>
        
        <h1 className="text-5xl font-bold mb-10 text-center">Streaming Guides & News</h1>
        
        <div className="grid gap-8">
          {/* Article Card 1 */}
          <Link href="/blog/best-netflix-tr-movies" className="block group">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400">Top 10 Movies on Netflix Turkey (2025)</h2>
              <p className="text-gray-400">Don't know what to watch? Here are the highest-rated movies currently streaming on Netflix TR.</p>
              <span className="text-blue-500 text-sm mt-4 block">Read Article →</span>
            </div>
          </Link>

          {/* Article Card 2 (Placeholder) */}
          <Link href="/blog/marvel-watch-order" className="block group">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400">How to Watch Marvel Movies in Order</h2>
              <p className="text-gray-400">The ultimate guide to watching the MCU timeline chronologically.</p>
              <span className="text-blue-500 text-sm mt-4 block">Read Article →</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}