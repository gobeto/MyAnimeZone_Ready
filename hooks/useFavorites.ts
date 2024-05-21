import useSWR from "swr";
import fetcher from "@/lib/fetcher";

//fetch "favorites" data from the server
const useFavorites = () => {
  const { data, error, mutate } = useSWR('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useFavorites;