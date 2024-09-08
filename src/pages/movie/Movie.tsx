import { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  Anchor,
  Avatar,
  Breadcrumbs,
  Center,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { IconMovie } from '@tabler/icons-react';
import MovieDetailsCard from '../../components/movie/movieDetails/MovieDetailsCard';
import { movieApi } from '../../resources/movie';
import classes from './Movie.module.css';

const MoviePage: FC = () => {
  const { id } = useParams();

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = movieApi.useGet(Number(id));

  const items = [
    { title: 'Movies', href: '/movies' },
    { title: movie?.original_title, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  if (isMovieLoading)
    return (
      <Center className={classes.loadingWrapper}>
        <Loader size="lg" />
      </Center>
    );

  if (isMovieError) 'error';

  return (
    <Stack px={90} gap={20}>
      {movie && (
        <>
          <Breadcrumbs className={classes.breadcrumbs}>{items}</Breadcrumbs>

          <MovieDetailsCard movie={movie} />

          {(movie.videos.results[0] ||
            movie.overview ||
            movie.production_companies.length > 0) && (
            <Stack className={classes.trailerContainer}>
              {movie.videos.results[0] && (
                <>
                  <Text fz={20} fw={700}>
                    Trailer
                  </Text>

                  <iframe
                    width="500"
                    height="281"
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                    allowFullScreen
                    className={classes.video}
                  />

                  <Divider c="grey.3" />
                </>
              )}

              {movie.overview && (
                <>
                  <Stack gap={16}>
                    <Text fz={20} fw={700}>
                      Description
                    </Text>

                    <Text>{movie.overview}</Text>
                  </Stack>

                  <Divider c="grey.3" />
                </>
              )}

              {movie.production_companies.length > 0 && (
                <>
                  <Stack gap={16}>
                    <Text fz={20} fw={700}>
                      Production
                    </Text>

                    <Stack gap={12}>
                      {movie.production_companies.map((company) => (
                        <Group key={company.id} gap={8}>
                          <Avatar
                            src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                            classNames={{
                              image: classes.avatarImage,
                              root: classes.avatarRoot,
                              placeholder: classes.avatarPlaceholder,
                            }}
                            children={<IconMovie stroke={1} />}
                          />

                          <Text fw={700}>{company.name}</Text>
                        </Group>
                      ))}
                    </Stack>
                  </Stack>

                  <Divider c="grey.3" />
                </>
              )}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default MoviePage;
