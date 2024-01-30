import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "@/components/Navbar";

const Watch = ()=>{
    const router = useRouter();
    const { movieId } = router.query;

    const{ data } = useMovie(movieId as string);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="font-bold text-2xl mb-5">{data?.title}</h2>
                <div className="flex flex-col sm:flex-row items-start justify-center w-full max-w-xl mx-auto">
                <img src={data?.thumbnaiUrl} alt={data?.title} className="w-full sm:w-1/4 lg:w-1/3 mb-5 sm:mb-0 sm:mr-10 rounded-md" />
                    <div className="text-left">
                        <p className="font-bold">{data?.description}</p>
                        <br />
                        <p className="font-bold">Genres: {data?.genre}</p>
                        <p className="font-bold">Episodes: {data?.duration}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Watch;