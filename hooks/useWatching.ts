import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useWatching = () =>{
    const {data,error,isLoading,mutate} = useSWR('/api/watchingS' , fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return{
        data,
        error,
        isLoading,
        mutate
    }
} 
export default useWatching; 