import React from "react";
import useAnime from "@/hooks/useAnimeVisualize";
import Navbar from "@/components/Navbar";
import AnimesLibrary from "@/components/АnimesLibrary";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

// Fetch server-side session data
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {}
  }
}

function AnimeVisualize() {
  const [anime, loading, error] = useAnime({ sort: "title", filter: "action" });


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <> 
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-14">
        <AnimesLibrary />   
      </div>
      <ScrollButton />
      <Footer />
    </>
  );
}

export default AnimeVisualize;
