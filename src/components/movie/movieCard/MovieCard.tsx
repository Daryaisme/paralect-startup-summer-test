import { Box, Group, Image, Stack, Text, Title } from "@mantine/core";
import { MovieType } from "../../../types";

interface MovieCardProps {
  movie: MovieType;
}

function MovieCard({ movie: { id, original_title, poster_path, release_date, vote_average, vote_count, genre_ids} }: MovieCardProps) {
  return (
    <Box key={id} p={24} bg="white" fz="md">
      <Group gap={16}>
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          h={170}
        />
        <Stack justify="space-between">
          <Stack gap={8}>
            <Title order={3} c="purple.5" maw="100%">
              {original_title}
            </Title>
            <Text size="md">{new Date(release_date).getFullYear()}</Text>
            <Group gap={8}>
              <Box>
                <Image src="src/assets/images/star.svg" w={28} />
                {Math.round(vote_average * 10) / 10}
              </Box>
              {`(${vote_count})`}
            </Group>
          </Stack>
          <Group gap={8}>Genres</Group>
        </Stack>
        <Image src="src/assets/images/star.svg" h={28} />
      </Group>
    </Box>
  );
}

export default MovieCard;
