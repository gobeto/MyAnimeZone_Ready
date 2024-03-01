import React from "react";
import useAnime from "@/hooks/useAnimeVisualize";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";
import AnimesLibrary from "@/components/animesLibrary";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";
//import AnimeFilterButtons from "@/components/AnimeFilterButtons";


function AnimeVisualize() {
  const [anime, loading, error] = useAnime({ sort: "title", filter: "action" });
  const{ data: favorites = [] } = useFavorites();


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <> 
      <Navbar />
      {/* <AnimeFilterButtons animes={[]} setFilteredAnimes={() => {}}/> */}
      <div className="flex flex-col justify-center items-center pt-14">
        <AnimesLibrary />   
      </div>
      {/* <MovieList title="Favorites" data={favorites} /> */}
      <ScrollButton />
      <Footer />
    </>
  );
}

export default AnimeVisualize;
