import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "@/components/Navbar";

import FavoriteButton from "@/components/FavoriteButton";
import WatchingButton from "@/components/WatchingButton";
import LibraryButton from "@/components/LibraryButton";
import WantToWatchButton from "@/components/WantToWatchButton";
import CompletedButton from "@/components/CompletedButton";

const Watch = ()=>{
    const router = useRouter();
    const { movieId } = router.query;

    const{ data } = useMovie(movieId as string);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
                <h2 className="font-bold text-2xl mb-5">{data?.title}</h2>
                <div className="flex flex-col sm:flex-row justify-between items-start w-full max-w-xl mx-auto ">
                    <img src={data?.thumbnaiUrl} alt={data?.title} className="w-full sm:w-1/4 lg:w-1/3 mb-5 sm:mb-0 sm:mr-10 rounded-md" />
                    <div className="text-left ">
                        <p className="font-bold">{data?.description}</p>
                        <br />
                        <p className="font-bold">Genres: {data?.genre}</p>
                        <p className="font-bold">Episodes: {data?.duration}</p>
                    </div>
                    <div className="space-y-4 border border-gray-300 rounded p-4">
                        <div className="flex items-center ">
                            <FavoriteButton movieId={data?.id} />
                            <p className="ml-2">Favorite</p>
                        </div>
                        <div className="flex items-center ">
                            <LibraryButton movieId={data?.id} />
                            <p className="ml-2">All Anime</p>
                        </div>
                        <div className="flex items-center ">
                            <WatchingButton movieId={data?.id} />
                            <p className="ml-2">Watching</p>
                        </div>
                        <div className="flex items-center ">
                            <WantToWatchButton movieId={data?.id} />
                            <p className="ml-2">Want to Watch</p>
                        </div>
                        <div className="flex items-center ">
                            <CompletedButton movieId={data?.id} />
                            <p className="ml-2">Completed</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default Watch;