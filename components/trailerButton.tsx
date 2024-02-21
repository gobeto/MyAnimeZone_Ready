import { BsFillPlayFill } from "react-icons/bs";

export default function TrailerButton({trailer}: {trailer: string}) {
    return (
        <a 
        className="bg-white
        text-white
        bg-opacity-30
        rounded-md
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-lg
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-opacity-20
        transition"	
        target="_blank"
        href={trailer}>
            <BsFillPlayFill className="mr-1" />
             Play trailer</a>
    )

}