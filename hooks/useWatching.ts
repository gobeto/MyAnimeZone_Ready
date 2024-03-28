import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useWatching = () => {
  const { data, error, mutate } = useSWR('/api/watchingGet', fetcher, {
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

export default useWatching;