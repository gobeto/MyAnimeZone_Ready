import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useWantToWatch = () => {
  const { data, error, mutate } = useSWR('/api/wantToWatchGet', fetcher, {
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

export default useWantToWatch;