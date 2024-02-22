import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useWantToWatch from "@/hooks/useWantToWatch"; 

interface WantToWatchButtonProps {
  movieId: string;
}

const WantToWatchButton: React.FC<WantToWatchButtonProps> = ({ movieId }) => {
  const { mutate: mutateWantToWatch } = useWantToWatch();
  const { data: currentUser, mutate } = useCurrentUser();

  const isWantToWatch = useMemo(() => {
    const list = currentUser?.wantToWatchIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleWantToWatch = useCallback(async () => {
    let response;
    // check if the movie is want to watch and if it is, delete it
    if (isWantToWatch) {
      response = await axios.delete("/api/wantToWatch", { data: { movieId } });
    } else {
      response = await axios.post("/api/wantToWatch", { movieId });
    }

    const updatedWantToWatchIds = response?.data?.wantToWatchIds;

    mutate({
      ...currentUser,
      wantToWatchIds: updatedWantToWatchIds
    });

    mutateWantToWatch();
  }, [movieId, isWantToWatch, currentUser, mutate, mutateWantToWatch]);

  const Icon = isWantToWatch ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleWantToWatch}
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
export default WantToWatchButton;
