import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";



//check if available session exist and if it doesnt it redirect to /auth
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
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
}

export default function Home() {
  const{ data: movies = []} = useMovieList();
  const{ data: favorites = [] } = useFavorites();
  const {isOpen,closeModal} = useInfoModal();
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
