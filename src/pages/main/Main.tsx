import { FC, useEffect, useMemo, useState } from 'react';
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
import { useForm } from '@mantine/form';
import Filters, { FormType } from '../../components/filters/Filters';
import MovieCard from '../../components/movie/movieCard/MovieCard';
import { movieApi } from '../../resources/movie';
import { genreApi } from '../../resources/genre';
import noMovies from '../../assets/images/no-movies.svg';
import classes from './Main.module.css';

const Main: FC = () => {
  const [page, setPage] = useState(1);

  const form = useForm<FormType>();

  const queryString = useMemo(() => {
    const { genres, releaseYear, ratingFrom, ratingTo, sortMethod } =
      form.values;

    const params = new URLSearchParams({
      page: page.toString(),
      ...(genres && { with_genres: genres.join(',') }),
      ...(releaseYear && { primary_release_year: releaseYear }),
      ...(ratingFrom && { 'vote_average.gte': ratingFrom.toString() }),
      ...(ratingTo && { 'vote_average.lte': ratingTo.toString() }),
      ...(sortMethod && { sort_by: sortMethod }),
    });

    return params.toString();
  }, [form.values, page]);

  const {
    data: movies,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = movieApi.useList(queryString);

  const { data: genres } = genreApi.useList();

  useEffect(() => {
    setPage(1);
  }, [form.values]);

  if (isMoviesLoading)
    return (
      <Center className={classes.loadingWrapper}>
        <Loader size="lg" />
      </Center>
    );

  if (isMoviesError) return 'error';

  return (
    <Stack gap={24}>
      <Title order={2}>Movies</Title>

      <Filters form={form} />

      {movies?.results.length ? (
        <>
          <SimpleGrid cols={2}>
            {movies.results.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                genres={genres?.genres ?? []}
              />
            ))}
          </SimpleGrid>

          {movies.total_pages > 1 && (
            <Pagination
              total={Math.min(movies.total_pages, 500)}
              color="purple.5"
              value={page}
              onChange={setPage}
              boundaries={-1}
              classNames={{
                root: classes.paginationContainer,
                dots: classes.paginationDots,
              }}
            />
          )}
        </>
      ) : (
        <Center className={classes.errorWrapper}>
          <Stack align="center" gap={16}>
            <Image src={noMovies} w={311} />

            <Text fz={20} fw={600}>
              We don't have such movies, look for another one
            </Text>
          </Stack>
        </Center>
      )}
    </Stack>
  );
}

export default Main;
