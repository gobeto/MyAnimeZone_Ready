import useSWR from "swr";

import fetcher from "@/lib/fetcher";

//fetch billboard data
const useBillboard = () => {
  const { data, error} = useSWR("api/random", fetcher, {
    //Prevents automatic revalidation of the data when it's considered stale.
    revalidateIfStale: false,
    //Prevents automatic revalidation of the data when the window gets focused.
    revalidateOnFocus: false,
    //Prevents automatic revalidation of the data when the browser gets reconnected.
    revalidateOnReconnect: false,
  });

  const isLoading = !data && !error;


  return {
    data,
    error,
    isLoading,
  };
};

export default useBillboard