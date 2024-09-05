import {
  Button,
  Center,
  Group,
  Image,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import useFetch from '../../hooks/useFetch';
import { GenresDataType, MovieType, RatedMovie } from '../../types';
import { useLocalStorage } from '@mantine/hooks';
import { useMemo, useRef, useState } from 'react';
import MovieCard from '../../components/movie/movieCard/MovieCard';
import classes from './RatedMovies.module.css';
import searchIcon from '../../assets/images/search-icon.svg';
import noData from '../../assets/images/no-rated-movies.svg';
import useMoviesQuery from '../../hooks/useMoviesQuery';
import { useNavigate } from 'react-router-dom';

const url = `${import.meta.env.VITE_URL}/genre/movie/list`;

function RatedMovies() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [ratedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const urls = useMemo(
    () =>
      ratedMovies.map(({ id }) => `${import.meta.env.VITE_URL}/movie/${id}`),
    [ratedMovies]
  );

  const {
    data: movies,
    isLoading,
    isError,
  } = urls
    ? useMoviesQuery<MovieType>(urls)
    : { data: null, isLoading: true, isError: true };

  const { data: genres } = useFetch<GenresDataType>(url);

  const filteredMovies = useMemo(
    () => movies?.filter((movie) => movie.original_title.includes(title)),
    [movies, title]
  );

  let currentMovies = filteredMovies?.slice((page - 1) * 4, (page - 1) * 4 + 4);

  function handleClickSearchButton() {
    setPage(1);
    setTitle(inputRef.current?.value || '');
  }

  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError) return 'error';
  return (
    <>
      {movies?.length ? (
        <Stack gap={24}>
          <Group justify='space-between'>
            <Title order={2}>Rated movies</Title>
            <TextInput
              className={classes.input}
              ref={inputRef}
              leftSection={<Image src={searchIcon} w={16} />}
              rightSection={
                <Button
                  onClick={handleClickSearchButton}
                  variant="filled"
                  py={8}
                  px={12}
                  bg="purple.5"
                >
                  Search
                </Button>
              }
              classNames={{
                section: classes.search_section,
                input: classes.search_input,
              }}
            />
          </Group>
          <SimpleGrid cols={2}>
            {currentMovies?.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                genres={genres?.genres ?? []}
              />
            ))}
          </SimpleGrid>
          {filteredMovies && filteredMovies.length > 4 && (
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
          )}
        </Stack>
      ) : (
        <Center mih='calc(100vh - 40px - 82px)'>
          <Stack align="center" gap={16}>
            <Image src={noData} w={311} />
            <Text fz={20} fw={600}>
              We don't have such movies, look for another one
            </Text>
            <Button
          color="purple.5"
          px={20}
          py={10}
          variant="filled"
          onClick={() => navigate('/')}
        >
          Find movies
        </Button>
          </Stack>
        </Center>
      )}
    </>
  );
}

export default RatedMovies;
