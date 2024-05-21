import axios from "axios";
// A fetcher function that uses axios to fetch data from a given URL
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
