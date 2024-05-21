import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import useCurrentUser from "@/hooks/useCurrentUser";
import useWatching from "@/hooks/useWatching"; 


// Interface for WatchingButton component props
interface WatchingButtonProps {
  movieId: string;
}

const WatchingButton: React.FC<WatchingButtonProps> = ({ movieId }) => {
  const { mutate: mutateWatching } = useWatching();
  const { data: currentUser, mutate } = useCurrentUser();
  const { t } = useTranslation();

  const isWatching = useMemo(() => {
    const list = currentUser?.watchingIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  // Function to toggle the "watching" status of the movie
  const watchingFavorites = useCallback(async () => {
    let response;
    // check if the movie is watching and if it is, delete it
    if (isWatching) {
      response = await axios.delete("/api/watching", { data: { movieId } });
      Swal.fire({
        position: "center",
        icon: "error",
        title: t("This anime has been removed from your watching list"),
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      response = await axios.post("/api/watching", { movieId });
      Swal.fire({
        position: "center",
        icon: "success",
        title: t("This anime has been added to your watching list"),
        showConfirmButton: false,
        timer: 1500
      });
    }

    // Update the user's "watching" IDs
    const updatedWatchingIds = response?.data?.watchingIds;

    mutate({
      ...currentUser,
      watchingIds: updatedWatchingIds
    });

    mutateWatching();// Trigger re-fetch of "watching" list
  }, [movieId, isWatching, currentUser, mutate, mutateWatching]); // Dependencies for the useCallback hook

  const Icon = isWatching ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={watchingFavorites}
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
      <Icon className="text-slate-500 hover:text-white" size={25} />
    </div>
  );
};
export default WatchingButton;
