import React, { useEffect, useState } from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { useTranslation } from "react-i18next";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import FavoriteButton from "@/components/FavoriteButton";
import WatchingButton from "@/components/WatchingButton";
import LibraryButton from "@/components/LibraryButton";
import WantToWatchButton from "@/components/WantToWatchButton";
import CompletedButton from "@/components/CompletedButton";
import EditButton from "@/components/EditAnimeButton";
import NavbarItem from "@/components/NavbarItem";
import axios from "axios";
import Swal from "sweetalert2";

interface DeleteMovieProps {
  onClose: () => void;
  movie: { id: string };

}
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


function Watch({ onClose, movie }: DeleteMovieProps) {
  const [error, setError] = useState(null);

  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  const [showEditButton, setshowEditButton] = useState(false);
  const [showDeleteButton, setshowDeleteButton] = useState(false);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn-confirm",
      cancelButton: "btn-cancel",
    },
    buttonsStyling: false,
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const { t } = useTranslation();

  ////
  const deleteMovie = async () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete("/api/animeDelete", {
              data: { id: data?.id },
            });

            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

            console.log(response.data);
            // Redirect to another page
            await router.push("/");
            // Reload the window
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  ////
  useEffect(() => {
    axios
      .get("/api/current")
      .then((response) => {
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error); // Set the error state
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h2 className="font-bold text-3xl mb-5 -mt-20">{data?.title}</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start w-full max-w-5xl mx-auto gap-1">
          <img
            src={data?.thumbnaiUrl}
            alt={data?.title}
            className="w-full sm:w-1/4 lg:w-1/3 mb-5 sm:mb-0 sm:mr-5 rounded-md"
          />
          
          <div className="text-left">
            <div className="font-bold w-5xl">{data?.description}</div>
            <br />
            <p className="font-bold">
              {t("Genres")}: {data?.genre}
            </p>
            <p className="font-bold">
              {t("Episodes")}: {data?.duration}
            </p>
          </div>
          {/* trailer button */}
          {/* <div>
            <a
                className="cursor-pointer
                w-6
                h-6
                lg:w-10
                lg:h-10
                bg-white
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:bg-neutral-300
                "
                target="_blank"
                href={data?.videoUrl}
              >
                <BsFillPlayFill size={30} />
              </a>
            </div> */}
          <div className="space-y-4  border border-slate-500 rounded p-10 w-2xl ">
            <div className="flex items-center ">
              <FavoriteButton movieId={data?.id} />
              <p className="ml-2">{t("Favorite")}</p>
            </div>
            <div className="flex items-center ">
              <LibraryButton movieId={data?.id} />
              <p className="ml-2">{t("Library")}</p>
            </div>
            <div className="flex items-center ">
              <WatchingButton movieId={data?.id} />
              <p className="ml-2">{t("Watching")}</p>
            </div>
            <div className="flex items-center w-xl ">
              <WantToWatchButton movieId={data?.id} />
              <p className="ml-2 ">{t("Want to watch")}</p>
            </div>
            <div className="flex items-center ">
              <CompletedButton movieId={data?.id} />
              <p className="ml-2">{t("Completed")}</p>
            </div>

            
            {/* edit button */}
            {isAdmin && (
              <div
                className="bg-slate-300 text-slate-500 hover:text-white border-2 border-gray-300 hover:bg-slate-500 
                focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center me-2 mb-2 w-56 h-11"
              >
                <NavbarItem
                  label={t("Edit")}
                  onClick={() => setshowEditButton(!showEditButton)}
                />
              </div>
            )}
            {showEditButton && (
              <EditButton
                onClose={() => setshowEditButton(false)}
                movie={{
                  id: data?.id,
                  title: data?.title,
                  description: data.description,
                  videoUrl: data.videoUrl,
                  thumbnaiUrl: data.thumbnaiUrl,
                  posterUrl: data.posterUrl,
                  genre: data.genre,
                  duration: data.duration,
                }}
              />
            )}
            {/* delete button */}
            {/* {isAdmin && (
              <div
                className="bg-slate-300 text-slate-500 hover:text-white border-2 border-gray-300 hover:bg-slate-500 
                focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center me-2 mb-2"
              >
                <NavbarItem
                  label={t("Delete")}
                  onClick={() => setshowDeleteButton(!showDeleteButton)} />

              </div>
            )}
            {showDeleteButton && (
              <DeleteButton
                onClose={() => setshowDeleteButton(false)}
                movie={{
                  id: data?.id,
                }}
              />
            )} */}

            {/* dlet */}

            {isAdmin && (
              <div
                className="bg-slate-300  hover:text-white border-2 border-gray-300 hover:bg-slate-500 
              focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg  px-5 py-2.5 
              text-center me-2 mb-2 text-white w-56 font-bold h-11 text-sm"
              >
                <button
                  onClick={deleteMovie}
                  // className="bg-slate-300 hover:text-white border-1 border-gray-300 hover:bg-slate-500
                  //            focus:ring-4 focus:outline-none focus:ring-gray-300  text-sm px-5 py-2.5
                  //            text-center me-2 mb-2 text-white rounded w-56 font-bold"
                  id={data?.id}
                >
                  {t("Delete anime")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Watch;
