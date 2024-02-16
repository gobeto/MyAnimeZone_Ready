import React, { useState } from "react";
import useAnime from "@/hooks/useAnimeVisualize";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "@/components/Router";
import FilterButtons from "@/components/FilterButtons";
import useCurrentUser from "@/hooks/useCurrentUser";

function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [anime, loading, error] = useAnime({
    sort: "title",
    filter: "action",
    searchTerm,
  });
  const router = useRouter();
  //gets the data of the user and use it for filter buttons
  const {data} = useCurrentUser();

  const filteredAnime = anime.filter((anime) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* <div className="flex justify-center items-center border-2 border-gray-300 w-auto cursor-pointer rounded-lg pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className="w-6 h-6 hover:scale-110 transition-transform duration-200 ml-2"
          //onClick={handleClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search in your library"
          className="focus:outline-none cursor-pointer w-96 h-10 pl-2 pr-2 rounded-lg bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />{" "}
      </div> */}
      <FilterButtons animes={anime} user={data}   />
      {/* <div className="flex justify-center items-center h-auto transition-all duration-500 ease-in-out">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center h-auto transition-all duration-500 ease-in-out">
          {filteredAnime.map((anime) => (
            <div
              className="m-4 p-4 border-2 border-gray-300 text-white"
              key={anime.id}
            >
              <Link href={`/anime/${anime.id}`} key={anime.id}>
                <img
                  className="w-60 h-72 object-cover"
                  src={anime.thumbnaiUrl}
                  alt={anime.title}
                />
              </Link>
              <h2 className="mt-2 text-center text-black font-black">
                {anime.title}
              </h2>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default Library;
