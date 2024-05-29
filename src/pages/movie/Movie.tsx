import {
  Anchor,
  Avatar,
  Breadcrumbs,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import MovieDetailsCard from '../../components/movie/movieDetails/MovieDetailsCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { MovieDetailsType } from '../../types';
import classes from './Movie.module.css';

function MoviePage() {
  let { id } = useParams();
  const url = `${import.meta.env.VITE_URL}/movie/${id}?append_to_response=videos`;

  const { data , isLoading, isError } = useFetch<MovieDetailsType>(url);

  const items = [
    { title: 'Movies', href: '/movies' },
    { title: data?.original_title, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  if (isLoading) <Loader />
  if (isError) <>error</>
  return (
    <Stack px={90} gap={20}>
      {data && (
        <>
          <Breadcrumbs className={classes.breadcrumbs}>{items}</Breadcrumbs>
          <MovieDetailsCard movie={data}></MovieDetailsCard>
          {/* <MovieTrailer trailer={data}></MovieTrailer> */}
          <Stack className={classes.trailer_container}>
            <Text fz={20} fw={700}>
              Trailer
            </Text>
            {data.videos.results[0] && (
              <iframe
                width="500"
                height="281"
                src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                allowFullScreen
                className={classes.video}
              ></iframe>
            )}
            <Divider c="grey.3"></Divider>
            <Stack gap={16}>
              <Text fz={20} fw={700}>
                Description
              </Text>
              <Text>{data.overview}</Text>
            </Stack>
            <Divider c="grey.3"></Divider>
            <Stack gap={16}>
              <Text fz={20} fw={700}>
                Production
              </Text>
              <Stack gap={12}>
                {data.production_companies && data.production_companies.map((company) => (
                  <Group key={company.id} gap={8}>
                    <Avatar
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}` || null}
                      classNames={{ image: classes.avatar_image, root: classes.avatar_root }}
                    />
                    <Text fw={700}>{company.name}</Text>
                  </Group>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default MoviePage;
