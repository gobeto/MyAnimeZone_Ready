import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieList = () => {
  // Fetch the list of movies 
  const { data, error, mutate } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const isLoading = !data && !error;

  return { data, error, isLoading, mutate };
};

export default useMovieList;