import { useState, useEffect } from 'react';
import axios from 'axios';

interface movie {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnaiUrl: string;
  genre: string;
  duration: string;
}

interface Options {
  sort?: string;
  filter?: string;
}

const usemovie = (options: Options = {}): [movie[], boolean, any] => {
  const [movie, setmovie] = useState<movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchmovie = async () => {
      try {
        const response = await axios.get('/api/movies', { params: options });
        setmovie(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchmovie();
  }, [options]);

  return [movie, loading, error];
};

export default usemovie;