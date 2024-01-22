import React from "react";
import useAnime from "@/hooks/useAnimeVisualize";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";
import AnimesLibrary from "@/components/animesLibrary";

function AnimeVisualize() {
  const [anime, loading, error] = useAnime({ sort: "title", filter: "action" });

  const handleClick = () => {
    console.log("SVG clicked");
    // Add your logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <AnimesLibrary />
      </div>
    </>
  );
}

export default AnimeVisualize;
