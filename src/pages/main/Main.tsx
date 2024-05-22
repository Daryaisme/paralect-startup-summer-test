import {
  Box,
  Group,
  Image,
  Loader,
  MultiSelect,
  NumberInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import classes from './Main.module.css';
import useFetch from '../../hooks/useFetch';
import { MoviesDataType } from '../../types';
import Filters from '../../components/filters/Filters';
import MovieCard from '../../components/movie/movieCard/MovieCard';

const url =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGMzMDhmOWNiYzkwN2FkMDkwNTQ0ODkxMThmNjllYyIsInN1YiI6IjY2NGQwMjBjZWIwNTU4ZTk2MjEzYmU5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQxJYsNeswFzhP9wOMamnuCYL4VeC8EnaXZGM73huH8',
  },
};

function Main() {
  const { data, isLoading, isError } = useFetch<MoviesDataType>(url, options);

  if (isLoading) return <Loader />;
  if (isError) return 'error';
  return (
    <Stack>
      <Title order={2}>Movies</Title>
      <Filters />
      {data?.results.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </Stack>
  );
}

export default Main;
