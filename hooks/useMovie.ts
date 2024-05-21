import useSWR from "swr";
import fetcher from "@/lib/fetcher";

//fetch "anime" data from the server
const useMovie = (id?: string) => {
  // if we have id we are going to fetch if not - null
  const { data, error, mutate } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useMovie;