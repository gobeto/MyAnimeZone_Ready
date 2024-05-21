import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLibrary from "@/hooks/useLibrary"; 
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";


interface LibraryButtonProps {
  movieId: string;
}

const LibraryButton: React.FC<LibraryButtonProps> = ({ movieId }) => {
  const { mutate: mutateLibrary } = useLibrary(); // Hook to trigger a re-fetch of the library
  const { data: currentUser, mutate } = useCurrentUser(); // Hook to get and mutate current user data
  const { t } = useTranslation();

  // Memoized value
  const isLibrary = useMemo(() => {
    const list = currentUser?.libraryAnimeIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]); // Dependencies for the useMemo hook

  // Function to toggle the library status of the movie
  const toggleLibrarys = useCallback(async () => {
    let response;
    // check if the movie is library and if it is, delete it
    if (isLibrary) {
      response = await axios.delete("/api/myLibrary", { data: { movieId } });
      Swal.fire({
        position: "center",
        icon: "error",
        title: t("This anime has been removed from your library list"),
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      response = await axios.post("/api/myLibrary", { movieId });
      Swal.fire({
        position: "center",
        icon: "success",
        title: t("This anime has been added to your library"),
        showConfirmButton: false,
        timer: 1500
      });
    }

    const updatedLibraryIds = response?.data?.libraryAnimeIds;

    mutate({
      ...currentUser,
      libraryAnimeIds: updatedLibraryIds
    });

    mutateLibrary();
  }, [movieId, isLibrary, currentUser, mutate, mutateLibrary]);  // Dependencies for the useCallback hook

  const Icon = isLibrary ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleLibrarys}
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-slate-500
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-netural-300
        hover:bg-slate-500
        "
    >
      <Icon className="text-slate-500 hover:text-white " size={25} />
    </div>
  );
};
export default LibraryButton;
