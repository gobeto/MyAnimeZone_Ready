import React, { useState } from "react";
import Link from "next/link";
import useAnime from "@/hooks/useAnimeVisualize";
import { useTranslation } from "react-i18next";
interface Anime {
  thumbnaiUrl: string | undefined;
  id: string;
  title: string;
}

interface User {
  favoriteIds: string[];
  libraryAnimeIds: string[];
  watchingIds: string[];
  wantToWatchIds: string[];
  completedIds: string[];
}

interface AnimeListProps {
  animes: Anime[];
  user: User;
}

const AnimeList: React.FC<AnimeListProps> = ({ animes, user }) => {
  const [filter, setFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const [anime, loading, error] = useAnime({
    sort: "title",
    filter: "action",
    searchTerm,
  });

  const filteredAnime = anime.filter((anime: { title: string }) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAnimes = filteredAnime.filter((anime: Anime) => {
    switch (filter) {
      case "completedIds":
        return user.completedIds.includes(anime.id);
      case "wantToWatchIds":
        return user.wantToWatchIds.includes(anime.id);
      case "watchingIds":
        return user.watchingIds.includes(anime.id);
      case "libraryAnimeIds":
        return user.libraryAnimeIds.includes(anime.id);
      default:
        return true;
    }
  });

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center border-2 border-gray-300 w-96 cursor-pointer rounded-lg pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-6 h-6 hover:scale-110 transition-transform duration-200 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder={t("Search in your library")}
            className="focus:outline-none cursor-pointer w-96 h-10 pl-2 pr-2 rounded-lg bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />{" "}
        </div>
      </div>
      <br />
      <div className="flex gap-4 justify-center items-center">
        <button
          className="text-bg-slate-500 hover:text-white border-2 border-gray-300 hover:bg-slate-500 
          focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 
          text-center me-2 mb-2 "
          onClick={() => setFilter("completedIds")}
        >
          {t("Completed")}
        </button>
        <button
          className="text-bg-slate-500 hover:text-white border-2 border-gray-300 hover:bg-slate-500 
          focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 
          text-center me-2 mb-2 "
          onClick={() => setFilter("wantToWatchIds")}
        >
          {t("Want to watch")}
        </button>
        <button
          className="text-bg-slate-500 hover:text-white border-2 border-gray-300 hover:bg-slate-500 
          focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 
          text-center me-2 mb-2 "
          onClick={() => setFilter("watchingIds")}
        >
          {t("Watching")}
        </button>
        <button
          className="text-bg-slate-500 hover:text-white border-2 border-gray-300 hover:bg-slate-500 
          focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 
          text-center me-2 mb-2 "
          onClick={() => setFilter("libraryAnimeIds")}
        >
          {t("Library")}
        </button>
        <button
          className="text-bg-slate-500 hover:text-white border-2 border-gray-300 hover:bg-slate-500 
          focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 
          text-center me-2 mb-2 "
          onClick={() => setFilter("")}
        >
          {t("All")}
        </button>
      </div>

      <div className="flex justify-center items-center h-auto transition-all duration-500 ease-in-out">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center h-auto transition-all duration-500 ease-in-out">
          {filteredAnimes.map((anime) => (
            <div
              className="m-4 p-4 border-2 border-gray-300 text-white"
              key={anime.id}
            >
              <Link href={`/watch/${anime.id}`} key={anime.id}>
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
      </div>
    </div>
  );
};

export default AnimeList;
