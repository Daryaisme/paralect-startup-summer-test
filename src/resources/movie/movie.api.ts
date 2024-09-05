import { useQuery } from '@tanstack/react-query';
import { MoviesDataType } from '../../types';

export const useList = (params?: string) =>
  useQuery<MoviesDataType>({
    queryKey: ['movies', params],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&${params}`
      ).then((response) => {
        if (!response.ok) throw new Error('HTTP error');

        return response.json();
      }),
  });
