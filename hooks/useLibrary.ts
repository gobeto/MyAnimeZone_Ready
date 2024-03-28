import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useLibrary = () => {
  const { data, error, mutate } = useSWR('/api/myLibraryGet', fetcher, {
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

export default useLibrary;