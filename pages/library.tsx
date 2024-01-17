import React from 'react';
import useAnime from '@/hooks/useAnimeVisualize';
import Navbar from '@/components/Navbar';
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";

function AnimeVisualize() {
  const [anime, loading, error] = useAnime({ sort: 'title', filter: 'action' });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-wrap justify-center">
          {anime.map((anime) => (
            <div key={anime.id} className="m-4 p-4 border-2 border-gray-300 text-white">
              <img className="w-64 h-64 object-cover" src={anime.thumbnaiUrl} alt={anime.title} />
            </div>
          ))}
        </div>
      </div>
      <MovieList title="Trending Now" data={anime} />
      {/* <MovieList title="Top Rated" data={useFavorites().data} /> */}

    </>
  );
}

export default AnimeVisualize;