import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useCompleted from "@/hooks/useCompleted"; 

interface CompletedButtonProps {
  movieId: string;
}

const CompletedButton: React.FC<CompletedButtonProps> = ({ movieId }) => {
  const { mutate: mutateCompleted } = useCompleted();
  const { data: currentUser, mutate } = useCurrentUser();

  const isCompleted = useMemo(() => {
    const list = currentUser?.completedIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleCompleted = useCallback(async () => {
    let response;
    // check if the movie is completed and if it is, delete it
    if (isCompleted) {
      response = await axios.delete("/api/completed", { data: { movieId } });
    } else {
      response = await axios.post("/api/completed", { movieId });
    }

    const updatedCompletedIds = response?.data?.completedIds;

    mutate({
      ...currentUser,
      completedIds: updatedCompletedIds
    });

    mutateCompleted();
  }, [movieId, isCompleted, currentUser, mutate, mutateCompleted]);

  const Icon = isCompleted ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleCompleted}
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
export default CompletedButton;
