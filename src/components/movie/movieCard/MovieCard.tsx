import {
  Box,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { GenreDataType, MovieType, RatedMovie } from '../../../types';
import Star from '../../star/Star';
import useFetch from '../../../hooks/useFetch';
import RatingModal from '../../ratingModal/RatingModal';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import classes from './MovieCard.module.css';

const url = 'https://api.themoviedb.org/3/genre/movie/list';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGMzMDhmOWNiYzkwN2FkMDkwNTQ0ODkxMThmNjllYyIsInN1YiI6IjY2NGQwMjBjZWIwNTU4ZTk2MjEzYmU5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQxJYsNeswFzhP9wOMamnuCYL4VeC8EnaXZGM73huH8',
  },
};

interface MovieCardProps {
  movie: MovieType;
}

function formatVotesCount(num: number) {
  const suffixes = ['', 'K', 'M'];

  let c = 0;
  while (num >= 1000 && c < suffixes.length - 1) {
    num /= 1000;
    c++;
  }

  return num.toFixed(1).replace(/\.0$/, '') + suffixes[c];
}

function MovieCard({
  movie: {
    id,
    original_title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    genre_ids,
  },
}: MovieCardProps) {
  const { data } = useFetch<GenreDataType>(url, options);

  const theme = useMantineTheme();

  const genresText = data?.genres
    .filter((genre) => genre_ids.includes(genre.id))
    .map(({ name }) => name)
    .join(', ');

  const [opened, { open, close }] = useDisclosure(false);

  const [ratedMovies, setRatedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const movie = ratedMovies.find((movie) => movie.id === id);

  return (
    <Box key={id} p={24} bg="white" fz="md">
      <Group align="stretch" gap={16} wrap="nowrap">
        <Box w={120} h={170}>
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            fallbackSrc="src/assets/images/no-photo.svg"
            w={120}
            h={170}
          />
        </Box>
        <Stack justify="space-between" w="100%">
          <Stack gap={8}>
            <Title order={3} c="purple.5">
              {original_title}
            </Title>
            <Text size="md" c="grey.6" lh="20px">
              {new Date(release_date).getFullYear() || 'no date'}
            </Text>
            <Group gap={8} fw={600} fz="md">
              <Group gap={4}>
                <Star color={theme.colors.yellow[1]} />
                {Math.round(vote_average * 10) / 10}
              </Group>
              <Box
                c="grey.6"
                fw={400}
              >{`(${formatVotesCount(vote_count)})`}</Box>
            </Group>
          </Stack>
          <Group gap={8} c="grey.6" fw={400}>
            Genres
            <Text c="black">{genresText}</Text>
          </Group>
        </Stack>
        <Group className={classes.star_container} onClick={open} gap={4}>
          <Star color={movie ? theme.colors.purple[5] : theme.colors.grey[3]} />
          {movie && <Text>{movie.rating}</Text>}
        </Group>
      </Group>
      <RatingModal
        id={id}
        title={original_title}
        opened={opened}
        close={close}
      />
    </Box>
  );
}

export default MovieCard;
