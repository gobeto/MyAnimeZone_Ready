import React, { useEffect, useState } from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "@/components/Navbar";

import FavoriteButton from "@/components/FavoriteButton";
import WatchingButton from "@/components/WatchingButton";
import LibraryButton from "@/components/LibraryButton";
import WantToWatchButton from "@/components/WantToWatchButton";
import CompletedButton from "@/components/CompletedButton";
import EditButton from "@/components/EditAnimeButton";
import DeleteButton from "@/components/DeleteAnimeButton";
import NavbarItem from "@/components/NavbarItem";
import axios from "axios";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  const [showEditButton, setshowEditButton] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("/api/current")
      .then((response) => {
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h2 className="font-bold text-3xl mb-5 -mt-20">{data?.title}</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start w-full max-w-5xl mx-auto gap-4">
          <img
            src={data?.thumbnaiUrl}
            alt={data?.title}
            className="w-full sm:w-1/4 lg:w-1/3 mb-5 sm:mb-0 sm:mr-5 rounded-md"
          />
          <div className="text-left">
            <div className="font-bold w-5xl">{data?.description}</div>
            <br />
            <p className="font-bold">Genres: {data?.genre}</p>
            <p className="font-bold">Episodes: {data?.duration}</p>
          </div>
          <div className="space-y-4  border border-slate-500 rounded p-10 w-2xl">
            <div className="flex items-center ">
              <FavoriteButton movieId={data?.id} />
              <p className="ml-2">Favorite</p>
            </div>
            <div className="flex items-center ">
              <LibraryButton movieId={data?.id} />
              <p className="ml-2">Library</p>
            </div>
            <div className="flex items-center ">
              <WatchingButton movieId={data?.id} />
              <p className="ml-2">Watching</p>
            </div>
            <div className="flex items-center w-xl ">
              <WantToWatchButton movieId={data?.id} />
              <p className="ml-2 w-10 ">Want to watch</p>
            </div>
            <div className="flex items-center ">
              <CompletedButton movieId={data?.id} />
              <p className="ml-2">Completed</p>
            </div>
            {/* <EditButton />
            <DeleteButton /> */}

            {isAdmin && (
            <NavbarItem
              label="Edit"
              onClick={() => setshowEditButton(!showEditButton)}
            />
          )}
          {showEditButton && (
            <EditButton onClose={() => setshowEditButton(false)} />
          )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Watch;
