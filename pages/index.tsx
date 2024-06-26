import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";


// Fetch server-side session data
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { t } = useTranslation();

  return (
    <div>
      <nav className="z-50 w-full"> 
      <Navbar/>
      </nav>
      <Billboard />
      <div className="pd-40">
        <MovieList title={t("All Animes")} data={movies} />
      </div>
      <ScrollButton />
      <Footer />
      
    </div>
  );
}
