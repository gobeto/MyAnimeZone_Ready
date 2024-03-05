import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites"; 
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";


interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  const { t } = useTranslation();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    // check if the movie is favorite and if it is, delete it
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
      Swal.fire({
        position: "center",
        icon: "error",
        title: t("This anime has been removed from favorites"),
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      response = await axios.post("/api/favorite", { movieId });
      Swal.fire({
        position: "center",
        icon: "success",
        title: t("This anime has been added to favorites"),
        showConfirmButton: false,
        timer: 1500
      });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
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
export default FavoriteButton;
