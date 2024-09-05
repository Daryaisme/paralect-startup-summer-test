import {
  Center,
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
import { GenreDataType, MoviesDataType } from '../../types';
import Filters, { FormType } from '../../components/filters/Filters';
import MovieCard from '../../components/movie/movieCard/MovieCard';
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';
import noMovies from '../../assets/images/no-movies.svg';
import { movieApi } from '../../resources/movie';

const url = `${import.meta.env.VITE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US`;
const url2 = `${import.meta.env.VITE_URL}/genre/movie/list`;

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

  // const { data, isLoading, isError } = useFetch<MoviesDataType>(
  //   `${url}&page=${page}&${q}`
  // );
  const { data } = movieApi.useList<null>();
  const { data: genres } = useFetch<GenreDataType>(url2);

  useEffect(() => {
    setPage(1);
  }, [form.values]);

  // if (isLoading)
  //   return (
  //     <Center className={classes.loadingWrapper}>
  //       <Loader />
  //     </Center>
  //   );

  // if (isError) return 'error';

  return (
    <Stack gap={24}>
      <Title order={2}>Movies</Title>

      <Filters form={form} />
      {data?.results.length ? (
        <>
          <SimpleGrid cols={2}>
            {data?.results.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                genres={genres?.genres ?? []}
              />
            ))}
          </SimpleGrid>

          <Pagination
            total={Math.min(data.total_pages, 500)}
            color="purple.5"
            value={page}
            onChange={setPage}
            boundaries={-1}
            classNames={{
              root: classes.paginationContainer,
              dots: classes.paginationDots,
            }}
          />
        </>
      ) : (
        <Stack align="center" gap={16}>
          <Image src={noMovies} w={311} />

          <Text fz={20} fw={600}>
            We don't have such movies, look for another one
          </Text>
        </Stack>
      )}
    </Stack>
  );
}

export default Main;
