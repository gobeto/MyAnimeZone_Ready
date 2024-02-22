import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/infoModal";
import useInfoModal from "@/hooks/useInfoModal";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";


//check if available session exist and if it doesnt it redirect to /auth
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
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

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
    <nav className="z-50 w-full"> 
      <Navbar/>
      </nav>
      <Billboard />
      <div className="pd-40">
        <MovieList title="Trending Now" data={movies} />
      </div>
      <ScrollButton />
      <Footer />
    </>
  );
}
