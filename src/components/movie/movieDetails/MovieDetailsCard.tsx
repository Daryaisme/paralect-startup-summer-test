import {
  Box,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { MovieDetailsType, RatedMovie } from '../../../types';
import Star from '../../star/Star';
import { formatVotesCount } from '../movieCard/MovieCard';
import classes from './MovieDetailsCard.module.css';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import RatingModal from '../../ratingModal/RatingModal';

function formatTime(mins: number) {
  const hs = Math.floor(mins / 60);
  const ms = mins % 60;

  return `${hs}h ${ms < 10 ? '0' : ''}${ms}m`;
}

interface MovieDetailsCardProps {
  movie: MovieDetailsType;
}

function MovieDetailsCard({
  movie: {
    id,
    original_title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    runtime,
    budget,
    revenue,
    genres,
  },
}: MovieDetailsCardProps) {
  const theme = useMantineTheme();

  const [ratedMovies, setRatedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const movie = ratedMovies.find((movie) => movie.id === id);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Group className={classes.movie_container}>
        <Box w={250}>
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            fallbackSrc="src/assets/images/no-photo.svg"
            w={250}
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
          <Group>
            <Stack gap={13}>
              <Text className={classes.property}>Duration</Text>
              <Text className={classes.property}>Premiere</Text>
              <Text className={classes.property}>Budget</Text>
              <Text className={classes.property}>Gross worldwide</Text>
              <Text className={classes.property}>Genres</Text>
            </Stack>
            <Stack gap={13}>
              <Text>{formatTime(runtime)}</Text>
              <Text>
                {new Date(release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Text>{`$${budget.toLocaleString('en-US')}`}</Text>
              <Text>{`$${revenue.toLocaleString('en-US')}`}</Text>
              <Text>{genres.map((genre) => genre.name).join(', ')}</Text>
            </Stack>
          </Group>
        </Stack>
        <Group className={classes.star_container} onClick={(e) => {e.stopPropagation(); open()}}>
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

export default MovieDetailsCard;
