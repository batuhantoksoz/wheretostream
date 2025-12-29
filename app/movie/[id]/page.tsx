import Link from 'next/link';

async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  return res.json();
}

async function getProviders(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results?.TR || null; 
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await getMovie(id);
  const providers = await getProviders(id);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <Link href="/" className="text-blue-500 hover:underline mb-8 block text-xl">
        ← Back to Search
      </Link>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3">
          {movie.poster_path ? (
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="rounded-xl shadow-2xl w-full border border-gray-800"
            />
          ) : (
            <div className="h-96 bg-gray-800 rounded-xl flex items-center justify-center">No Image</div>
          )}
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">{movie.overview}</p>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Where to Watch</h2>
            
            {providers?.flatrate ? (
              <div className="flex gap-6 flex-wrap">
                {providers.flatrate.map((provider: any) => (
                  <div key={provider.provider_id} className="text-center">
                    <img 
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                      alt={provider.provider_name}
                      className="w-20 h-20 rounded-xl mb-3 mx-auto shadow-lg"
                    />
                    <span className="text-sm text-gray-300 font-medium">{provider.provider_name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Not currently streaming on subscription services.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}