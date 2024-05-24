import { Stack } from '@mantine/core';
import { MovieDetailsType } from '../../types';

interface MovieTrailerProps {
  trailer: MovieDetailsType;
}

function MovieTrailer({
  trailer: { id, overview, production_companies, videos },
}: MovieTrailerProps) {
  return (
    <Stack gap={20} p={24}>
      <video
        src={`https://image.tmdb.org/t/p/original/${videos.results[0].id}`}
      ></video>
    </Stack>
  );
}

export default MovieTrailer;
