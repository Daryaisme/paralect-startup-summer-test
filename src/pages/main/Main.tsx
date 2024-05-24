import {
  Image,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import classes from './Main.module.css';
import useFetch from '../../hooks/useFetch';
import { MoviesDataType } from '../../types';
import Filters, { FormType } from '../../components/filters/Filters';
import MovieCard from '../../components/movie/movieCard/MovieCard';
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';

const url = `${import.meta.env.VITE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US`;

function Main() {
  const [page, setPage] = useState(1);

  const form = useForm<FormType>({
    initialValues: {
      genres: [],
      releaseYear: '',
      ratingFrom: NaN,
      ratingTo: NaN,
      sortMethod: '',
    },
  });

  const q = useMemo(() => {
    const params = new URLSearchParams();

    const genres = form.values.genres;
    if (genres) params.append('with_genres', genres.join(','));

    const year = form.values.releaseYear;
    if (year) params.append('primary_release_year', year);

    const ratingFrom = form.values.ratingFrom;
    if (ratingFrom) params.append('vote_average.gte', ratingFrom.toString());

    const ratingTo = form.values.ratingTo;
    if (ratingTo) params.append('vote_average.lte', ratingTo.toString());

    const sort = form.values.sortMethod;
    if (sort) params.append('sort_by', sort);

    return params;
  }, [form.values, page]);

  const { data, isLoading, isError } = useFetch<MoviesDataType>(`${url}&page=${page}&${q}`);

  useEffect(() => {
    setPage(1);
  }, [form.values]);

  if (isLoading) return <Loader />;
  if (isError) return 'error';
  return (
    <Stack gap={24}>
      <Title order={2}>Movies</Title>
      <Filters form={form} />
      {data?.results.length ? (
        <>
          <SimpleGrid cols={2}>
            {data?.results.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </SimpleGrid>
          <Pagination
            total={Math.min(data.total_pages, 500)}
            color="purple.5"
            value={page}
            onChange={setPage}
            boundaries={-1}
            classNames={{
              root: classes.pagination_container,
              dots: classes.pagination_dots,
            }}
          />
        </>
      ) : (
        <Stack align='center' gap={16}>
          <Image src="src/assets/images/no-movies.svg" w={311} />
          <Text fz={20} fw={600}>
            We don't have such movies, look for another one
          </Text>
        </Stack>
      )}
    </Stack>
  );
}

export default Main;
