import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import PlayButton from "./InfoButton";
import useInfoModal from "@/hooks/useInfoModal";
import TrailerButton from "./trailerButton";

// Billboard component

const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

 // This function opens the modal with the current billboard data
  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);
  return (
    <div className="relative h-[56.25vw]">
      <img
        className="
        w-full
        h-[56.25vw]
        object-cover
        brightness-[60%]"
        src={data?.posterUrl}
        alt="thumnail"
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p
          className="
            text-white 
            text-1xl 
            md:text-5xl 
            h-full 
            w-[50%] 
            lg:text-6xl 
            font-bold 
            drop-shadow-xl"
        >
          {data?.title}
        </p>
        <p
          className="
            text-white
            text-[8px]
            md:text-lg
            mt-3
            md:mt-8
            w-[90%]
            md:w-[80%]
            lg:w-[50%]
            drop-shadow-xl
            "
        >
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <TrailerButton trailer={data?.videoUrl} />
        </div>
      </div>
    </div>
  );
};

export default Billboard;
