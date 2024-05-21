import React from "react";
import { useRouter } from "next/router";
import{AiOutlineInfoCircle} from 'react-icons/ai';
import { useTranslation } from "react-i18next";

interface PlayButtonProps{
    movieId:string;
}

const PlayButton: React.FC<PlayButtonProps> = ({movieId})=>{
    const router = useRouter();
    const { t } = useTranslation();

    return(
        <button
        onClick={()=>router.push(`/anime/${movieId}`)}
        className="
        bg-white
        rounded-md
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        lext-xs lg:text-lg
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
        >
            <AiOutlineInfoCircle className=" mr-1" />
            {t("Info")}
        </button>
    )
};

export default PlayButton;