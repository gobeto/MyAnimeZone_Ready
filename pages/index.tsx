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
  try {
    const session = await getSession(context);

    console.log('Session:', session);
    console.log('Context:', context);

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
  } catch (error) {
    console.error('Error getting session:', error);
    // You might want to redirect to an error page here, depending on your application's behavior
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}

export default function Home() {
  const{ data: movies = []} = useMovieList();
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
