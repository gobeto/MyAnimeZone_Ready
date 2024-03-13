import React, { useState } from "react";
import useAnime from "@/hooks/useAnimeVisualize";
import Link from "next/link";
import { useRouter } from "next/router";
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
      <FilterButtons animes={anime} user={data}   />
    </>
  );
}

export default Library;
