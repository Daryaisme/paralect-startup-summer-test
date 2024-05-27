import {
  Button,
  Group,
  Image,
  Input,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import useFetch from '../../hooks/useFetch';
import { GenreDataType, MovieType, MoviesDataType, RatedMovie } from '../../types';
import { useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';
import MovieCard from '../../components/movie/movieCard/MovieCard';
import classes from './RatedMovies.module.css';
import searchIcon from '../../assets/images/search-icon.svg';
import noData from '../../assets/images/no-rated-movies.svg';

const url = `${import.meta.env.VITE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US`;
const url2 = `${import.meta.env.VITE_URL}/genre/movie/list`;
const url3 = `${import.meta.env.VITE_URL}/movie`;

function RatedMovies() {
  const [page, setPage] = useState(1);

  const [ratedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const { data, isLoading, isError } = useFetch<MoviesDataType>(url);

  const { data: genres } = useFetch<GenreDataType>(url2);

  const movies = data?.results.filter((movie) =>
    ratedMovies.find(({ id }) => id === movie.id)
  );
  const currentMovies = movies?.slice((page - 1) * 4, (page - 1) * 4 + 4);

  // let movies: MovieType[] = [];
  // ratedMovies.map(({ id }) => {
  //   const { data: movie } = useFetch<MovieType>(`${url3}/${id}`);
  //   if (movie) movies.push(movie);
  // });

  // useEffect(() => {
  //   setPage(1);
  // }, []);

  if (isLoading) return <Loader />;
  if (isError) return 'error';
  return (
    <>
      {currentMovies && movies ? (
        <Stack gap={24}>
          <Group>
            <Title order={2}>Rated movies</Title>
            <Input leftSection={<Image src={searchIcon} bg="black" w={16} />} rightSection={<Button />} />
          </Group>
          <SimpleGrid cols={2}>
            {currentMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} genres={genres?.genres ?? []}/>
            ))}
          </SimpleGrid>
          <Pagination
            mx="auto"
            total={Math.min(Math.ceil(movies.length / 4), 50)}
            color="purple.5"
            value={page}
            onChange={setPage}
            boundaries={-1}
            classNames={{
              root: classes.pagination_container,
              dots: classes.pagination_dots,
            }}
          />
        </Stack>
      ) : (
        <Stack align="center" gap={16}>
          <Image src={noData} w={311} />
          <Text fz={20} fw={600}>
            We don't have such movies, look for another one
          </Text>
        </Stack>
      )}
    </>
  );
}

export default RatedMovies;
