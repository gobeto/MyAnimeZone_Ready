import React from "react";
import useAnime from "@/hooks/useAnimeVisualize";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";
import AnimesLibrary from "@/components/animesLibrary";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await getSession(context);

    if (!session) {
      console.log('No session found, redirecting to /auth');
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
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
