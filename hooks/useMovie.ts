import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id?:string)=>{
    // if we have id we are going to fetch if not - null
    const{data,error,isLoading} = useSWR(id?`/api/movies/${id}`:null,fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    });

    return {
        data,
        error,
        isLoading,
    }
}

export default useMovie;