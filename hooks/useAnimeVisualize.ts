import { useEffect, useState } from 'react';
import axios from 'axios';


interface Movie {
  status: string;
  id: any;
  title: string;
  description: string;
  videoUrl: string;
  thumbnaiUrl: string;
  genre: string;
  duration: string;
}

interface Options {
  sort?: string;
  filter?: string;
  searchTerm?: string;
}

// Custom hook to fetch and filter movies
const useMovie = (options: Options = {}): [Movie[], boolean, any, (searchTerm: string) => void] => {
  const [movies, setMovies] = useState<Movie[]>([]);// State to store all movies
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);// State to store filtered movies
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Effect to fetch movies based on options
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movies', { params: options });
        setMovies(response.data);
        setFilteredMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMovies();
}, [JSON.stringify(options)]);// Refetch movies if options change

// Effect to filter movies based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredMovies(movies);
    } else {
      const newFilteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredMovies(newFilteredMovies);
    }
  }, [searchTerm, movies]);

  return [filteredMovies, loading, error, setSearchTerm];
};

export default useMovie;