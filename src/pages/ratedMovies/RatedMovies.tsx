import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useMantineTheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { RatedMovie } from '../../types';
import MovieCard from '../../components/movie/movieCard/MovieCard';
import noData from '../../assets/images/no-rated-movies.svg';
import noMovies from '../../assets/images/no-movies.svg';
import { genreApi } from '../../resources/genre';
import { movieApi } from '../../resources/movie';
import classes from './RatedMovies.module.css';

const RatedMovies: FC = () => {
  const { colors } = useMantineTheme();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [ratedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const ids = ratedMovies.map(({ id }) => id);

  const {
    data: movies,
    isLoading: isMoviesLoading,
    isError: isMovieError,
  } = movieApi.useListByIds(ids);

  const { data: genres } = genreApi.useList();

  const filteredMovies = useMemo(
    () =>
      movies?.filter((movie) =>
        movie?.original_title.toLowerCase().includes(title.toLowerCase())
      ),
    [movies, title]
  );

  const currentMovies = filteredMovies?.slice(
    (page - 1) * 4,
    (page - 1) * 4 + 4
  );

  useEffect(() => {
    if (currentMovies.length === 0 && page != 1)
      setPage((currPage) => currPage - 1);
  }, [currentMovies]);

  function handleClickSearchButton() {
    setPage(1);
    setTitle(inputRef.current?.value || '');
  }

  if (isMoviesLoading)
    return (
      <Center className={classes.loadingWrapper}>
        <Loader size="lg" />
      </Center>
    );

  if (isMovieError) return 'error';

  if (!movies)
    return (
      <Center className={classes.errorWrapper}>
        <Stack align="center" gap={16}>
          <Image src={noData} w={311} />

          <Text fz={20} fw={600}>
            We don't have such movies, look for another one
          </Text>

          <Button variant="filled" size="md" onClick={() => navigate('/')}>
            Find movies
          </Button>
        </Stack>
      </Center>
    );

  return (
    <>
      <Stack gap={24}>
        <Group justify="space-between">
          <Title order={2}>Rated movies</Title>

          <TextInput
            ref={inputRef}
            leftSection={
              <IconSearch size={16} color={colors.grey[5]} stroke={1.5} />
            }
            rightSection={
              <Button
                variant="filled"
                mr={12}
                onClick={handleClickSearchButton}
              >
                Search
              </Button>
            }
            classNames={{
              section: classes.searchSection,
              input: classes.searchInput,
            }}
          />
        </Group>

        {currentMovies.length ? (
          <>
            <SimpleGrid cols={2}>
              {currentMovies.map(
                (movie) =>
                  movie && (
                    <MovieCard
                      movie={movie}
                      key={movie.id}
                      genres={genres?.genres ?? []}
                    />
                  )
              )}
            </SimpleGrid>

            {filteredMovies.length > 4 && (
              <Pagination
                mx="auto"
                total={Math.min(Math.ceil(movies.length / 4), 50)}
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
          <Stack align="center" gap={16}>
            <Image src={noMovies} w={311} />

            <Text fz={20} fw={600}>
              We don't have such movies, look for another one
            </Text>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default RatedMovies;
