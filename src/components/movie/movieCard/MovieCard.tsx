import {
  Box,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { GenreType, MovieType, RatedMovie } from '../../../types';
import Star from '../../star/Star';
import RatingModal from '../../ratingModal/RatingModal';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import classes from './MovieCard.module.css';
import { useNavigate } from 'react-router-dom';
import fallbackimage from '../../../assets/images/no-photo.svg';


interface MovieCardProps {
  movie: MovieType;
  genres: GenreType[];
}

export function formatVotesCount(num: number) {
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
  genres
}: MovieCardProps) {

  const theme = useMantineTheme();

  const genresText = genres
    .filter((genre) => genre_ids.includes(genre.id))
    .map(({ name }) => name)
    .join(', ');

  const [opened, { open, close }] = useDisclosure(false);

  const [ratedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const movie = ratedMovies.find((movie) => movie.id === id);

  const navigate = useNavigate();

  return (
    <Box key={id} className={classes.movie_container} onClick={() => navigate(`/movies/${id}`)}>
      <Group align="stretch" gap={16} wrap="nowrap">
        <Box w={120} h={170}>
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            fallbackSrc={fallbackimage}
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
          <Group className={classes.text} gap={8} fw={400}>
            <Text c="grey.6">Genres</Text>
            <Text className={classes.text_clipped}>{genresText}</Text>
          </Group>
        </Stack>
        <Group className={classes.star_container} onClick={(e) => {e.stopPropagation(); open()}} gap={4}>
          <Star color={movie ? theme.colors.purple[5] : theme.colors.grey[3]} />
          {movie && <Text fw={600}>{movie.rating}</Text>}
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
