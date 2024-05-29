import { useState, useEffect, useCallback } from 'react';

const useMoviesQuery = <T>(urls: string[]) => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((response) => response.json()));
      console.log(data)
      setData(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [urls]);

  useEffect(() => {
    fetchData();
  }, [urls]);

  return { data, isLoading, isError };
};

export default useMoviesQuery;