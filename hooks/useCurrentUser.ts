import useSWR from "swr";
import fetcher from "@/lib/fetcher";

//fetch "currentUser" data from the server
const useCurrentUser = () => {
  const { data, error, mutate } = useSWR('/api/current', fetcher);

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useCurrentUser;