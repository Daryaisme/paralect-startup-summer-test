import { FC, MouseEvent } from 'react';
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Image,
  Stack,
  Table,
  TableData,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import { MovieDetailsType, RatedMovie } from '../../../types';
import RatingModal from '../../ratingModal/RatingModal';
import fallbackImage from '../../../assets/images/no-photo.svg';
import { formatTime, formatVotesCount } from '../movie.utils';
import classes from './MovieDetailsCard.module.css';

interface MovieDetailsCardProps {
  movie: MovieDetailsType;
}

const MovieDetailsCard: FC<MovieDetailsCardProps> = ({
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
}) => {
  const { colors } = useMantineTheme();

  const [ratedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const ratedMovie = ratedMovies.find((movie) => movie.id === id);

  const [
    isRatingModalOpened,
    { open: ratingModalOpen, close: ratingModalClose },
  ] = useDisclosure(false);

  const movieInformation: TableData = {
    body: [
      ['Duration', runtime ? formatTime(runtime) : 'no data'],
      [
        'Premiere',
        release_date
          ? new Date(release_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'no data',
      ],
      ['Budget', budget ? `$${budget.toLocaleString('en-US')}` : 'no data'],
      [
        'Gross worldwide',
        revenue ? `$${revenue.toLocaleString('en-US')}` : 'no data',
      ],
      [
        'Genres',
        genres.length
          ? genres.map((genre) => genre.name).join(', ')
          : 'no data',
      ],
    ],
  };

  const handleStarIconClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();

    ratingModalOpen();
  };

  return (
    <Box bg="white" p={24} fz={16} className={classes.container}>
      <RatingModal
        movie={{ id, original_title }}
        opened={isRatingModalOpened}
        onClose={ratingModalClose}
      />

      <Group align="stretch" gap={16} wrap="nowrap">
        <Flex
          w={250}
          align="center"
          justify="space-around"
          className={classes.imageContainer}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            fallbackSrc={fallbackImage}
            w={250}
          />
        </Flex>

        <Stack
          justify="space-between"
          maw="calc(100% - 266px)"
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

          <Table
            data={movieInformation}
            withRowBorders={false}
            classNames={{ td: classes.tableTd }}
          />
        </Stack>
      </Group>
    </Box>
  );
};

export default MovieDetailsCard;
