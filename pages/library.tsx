import React from "react";
import useAnime from "@/hooks/useAnimeVisualize";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import AnimesLibrary from "@/components/АnimesLibrary";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

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
