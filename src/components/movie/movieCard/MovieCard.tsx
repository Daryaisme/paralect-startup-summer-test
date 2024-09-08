import { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import {
  GenreType,
  MovieDetailsType,
  MovieType,
  RatedMovie,
} from '../../../types';
import RatingModal from '../../ratingModal/RatingModal';
import { formatVotesCount } from '../movie.utils';
import fallbackImage from '../../../assets/images/no-photo.svg';
import classes from './MovieCard.module.css';

interface MovieCardProps {
  movie: MovieType | MovieDetailsType;
  genres: GenreType[];
}

const MovieCard: FC<MovieCardProps> = ({ movie, genres: allGenres }) => {
  const { colors } = useMantineTheme();

  const navigate = useNavigate();

  const {
    id,
    original_title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
  } = movie;

  const [
    isRatingModalOpened,
    { open: ratingModalOpen, close: ratingModalClose },
  ] = useDisclosure(false);

  const genresText = (
    'genre_ids' in movie
      ? allGenres
          .filter((genre) => movie.genre_ids.includes(genre.id))
          .map(({ name }) => name)
      : movie.genres.map(({ name }) => name)
  ).join(', ');

  const [ratedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const ratedMovie = ratedMovies.find((movie) => movie.id === id);

  const handleStarIconClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();

    ratingModalOpen();
  };

  return (
    <>
      <RatingModal
        movie={{ id, original_title }}
        opened={isRatingModalOpened}
        onClose={ratingModalClose}
      />

      <Group
        align="stretch"
        gap={16}
        wrap="nowrap"
        bg="white"
        p={24}
        fz={16}
        onClick={() => navigate(`/movies/${id}`)}
        className={classes.container}
      >
        <Flex
          w={120}
          h={170}
          align="center"
          justify="space-around"
          className={classes.imageContainer}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            fallbackSrc={fallbackImage}
            h={170}
          />
        </Flex>

        <Stack
          justify="space-between"
          maw="calc(100% - 136px)"
          className={classes.informationContainer}
        >
          <Group
            justify="space-between"
            align="flex-start"
            wrap="nowrap"
            gap={15}
          >
            <Stack gap={8} className={classes.titleContainer}>
              <Title order={3} c="purple.5" lineClamp={2}>
                {original_title}
              </Title>

              <Text size="md" c="grey.6" lh="20px">
                {new Date(release_date).getFullYear() || 'no data'}
              </Text>

              {vote_count > 0 && (
                <Group gap={8}>
                  <Group gap={4} fw={600}>
                    <IconStarFilled color={colors.yellow[1]} />

                    {Math.round(vote_average * 10) / 10}
                  </Group>

                  <Box c="grey.6">{`(${formatVotesCount(vote_count)})`}</Box>
                </Group>
              )}
            </Stack>

            <Group gap={4} wrap="nowrap">
              <ActionIcon
                bg="transparent"
                onClick={(e) => handleStarIconClick(e)}
              >
                <IconStarFilled
                  color={ratedMovie ? colors.purple[5] : colors.grey[3]}
                />
              </ActionIcon>

              {ratedMovie && <Text fw={600}>{ratedMovie.rating}</Text>}
            </Group>
          </Group>

          {genresText && (
            <Group gap={8} fw={400} maw="100%" wrap="nowrap">
              <Text c="grey.6">Genres</Text>

              <Text lineClamp={1}>{genresText}</Text>
            </Group>
          )}
        </Stack>
      </Group>
    </>
  );
};

export default MovieCard;
