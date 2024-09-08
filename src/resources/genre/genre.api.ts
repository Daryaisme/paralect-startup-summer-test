import { useQuery } from '@tanstack/react-query';
import { GenresDataType } from '../../types';

export const useList = () =>
  useQuery<GenresDataType>({
    queryKey: ['genres'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_URL}/genre/movie/list`).then((response) => {
        if (!response.ok) throw new Error('HTTP error');

        return response.json();
      }),
  });
