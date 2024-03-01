import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";
import { BiChevronDown } from "react-icons/bi";
import TrailerButton from "./trailerButton";
import { useTranslation } from "react-i18next";
//hover effect on the movie card

interface MovieCardProps {
  data: Record<string, any>;
  trailer: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, trailer }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();
  const { t } = useTranslation();
  return (
    //ot tuk se promenq razmera na img za animeta v main page
    <div className="group bg-slate-500 col-span relative rounded-xl  w-[18vw] h-[22vw]">
      <img
        className="cursor-pointer 
            object-cover
            transition
            duration
            shadow-xl
            rounded-xl
            group-hover:opacity-90
            sm:group-hover:opacity-0
            delay-300
            w-[18vw]
            h-[22vw]
            "
        src={data.thumbnaiUrl}
        alt="Thumbnail"
      />
      <div
        className="
            opacity-0
            absolute
            top-0
            transition
            duration-200
            z-10
            invisible
            sm:visible
            delay-300
            w-[20vw]
            scale-0
            group-hover:scale-110
            gropu-hover: -translate-y-[3vw]
            group-hover:opacity-100
            "
      >
        <img
          className="
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-t-xl
                w-full
                h-[15vw]
                "
          src={data.thumbnaiUrl}
          alt="Thumbnail"
        />
        <div
          className="
                z-10
                bg-slate-500
                p-2
                lg:p-4
                absolute
                w-full
                transition
                shadow-md
                rounded b-xl
                "
        >
          <div className="flex flex-row items-center gap-3">
            <div
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
              onClick={() => router.push(`/watch/${data?.id}`)}
            >
              <AiOutlineInfoCircle size={25} />
            </div>
            {/* <FavoriteButton movieId={data?.id} /> */}
            {/* <div 
            onClick={()=>openModal(data?.id)}
            className="
            cursor-pointer 
            ml-auto 
            group/item 
            w-6 
            h-6 
            lg:w-10 
            lg:h-10 
            border-white 
            border-2 
            rounded-full 
            flex 
            justify-center 
            items-center 
            transition 
            hover:border-neutral-300">
              <BiChevronDown 
              size={30}
              className="
              text-white
              group-hover/item:text-neutral-300
              "/>
            </div> */}
            <div className="">
              {/* ml-auto */}
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
                href={trailer}
              >
                <BsFillPlayFill size={30} />
              </a>
            </div>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.title}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {t("Episodes")}: {data.duration}
            </p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {t("Genres")}: {data.genre}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
