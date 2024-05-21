import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

// display animes on main page

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-black text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-5 gap-8">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} trailer={movie.videoUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
