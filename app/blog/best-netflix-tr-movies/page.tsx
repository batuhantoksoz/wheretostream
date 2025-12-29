import Link from 'next/link';

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-blue-500 hover:underline mb-8 block">← Back to Blog</Link>
        
        <article className="prose prose-invert lg:prose-xl">
          <h1 className="text-4xl font-bold mb-6">Top 10 Movies on Netflix Turkey (2025)</h1>
          <p className="text-gray-400 mb-8">Updated: December 29, 2025</p>
          
          <p className="mb-6 text-lg leading-relaxed">
            Netflix Turkey has a massive library, but finding the hidden gems can be hard. 
            We have compiled the list of the best movies you can stream right now.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-blue-400">1. The Godfather</h2>
          <p className="mb-4 text-gray-300">
            A classic that needs no introduction. If you haven't seen it yet, now is the time.
            The story spans ten years from 1945 to 1955 and chronicles the Corleone crime family.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-blue-400">2. Inception</h2>
          <p className="mb-4 text-gray-300">
            Christopher Nolan's masterpiece about dreams within dreams. 
            Visually stunning and intellectually challenging.
          </p>

          {/* You can add more text here. AdSense loves long articles! */}
          
          <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-800">
            <h3 className="font-bold mb-2">Want to find where to stream other movies?</h3>
            <p className="text-gray-400 mb-4">Use our search engine to find streaming homes for any movie.</p>
            <Link href="/" className="inline-block bg-blue-600 px-6 py-2 rounded-full font-bold">
              Go to Search
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}