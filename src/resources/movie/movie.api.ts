import { useQueries, useQuery } from '@tanstack/react-query';
import { MovieDetailsType, MoviesDataType, MovieType } from '../../types';

const fetchMovie = async <T>(id: number): Promise<T> => {
  const response = await fetch(
    `${import.meta.env.VITE_URL}/movie/${id}?append_to_response=videos`
  );
  
  if (!response.ok) throw new Error('HTTP error');

  return await response.json();
};

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

export const useListByIds = (ids: number[]) =>
  useQueries({
    queries: ids.map((id) => ({
      queryKey: ['movie', id],
      queryFn: () => fetchMovie<MovieType>(id),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });

export const useGet = (id: number) =>
  useQuery<MovieDetailsType>({
    queryKey: ['movie', id],
    queryFn: () => fetchMovie<MovieDetailsType>(id),
  });
