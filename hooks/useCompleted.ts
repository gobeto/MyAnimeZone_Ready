import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCompleted = () => {
  const { data, error, mutate } = useSWR('/api/completedGet', fetcher, {
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

export default useCompleted;