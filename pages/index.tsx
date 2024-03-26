import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

//check if available session exist and if it doesnt it redirect to /auth
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context).catch(error => {
    console.error('Error getting session:', error);
    return null;
  });

  if (!session) {
    console.log('No session found, redirecting to /auth');
    return {
      redirect: {
        destination: "/library",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { t } = useTranslation();

  return (
    <>
    <nav className="z-50 w-full"> 
      <Navbar/>
      </nav>
      <Billboard />
      <div className="pd-40">
        <MovieList title={t("All Animes")} data={movies} />
      </div>
      <ScrollButton />
      <Footer />
    </>
  );
}
