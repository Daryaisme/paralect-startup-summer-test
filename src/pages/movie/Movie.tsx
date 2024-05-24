import { Box } from '@mantine/core';
import MovieDetailsCard from '../../components/movie/movieDetails/MovieDetailsCard';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { MovieDetailsType } from '../../types';
import MovieTrailer from '../../components/movieTrailer/MovieTrailet';

function MoviePage() {
  let { id } = useParams();
  const url = `${import.meta.env.VITE_URL}/movie/${id}?append_to_response=videos`;

  const { data } = useFetch<MovieDetailsType>(url);

  return (
    <Box pt={40}>
      {data && (
        <>
          <MovieDetailsCard movie={data}></MovieDetailsCard>
          <MovieTrailer trailer={data}></MovieTrailer>
        </>
      )}
    </Box>
  );
}

export default MoviePage;
