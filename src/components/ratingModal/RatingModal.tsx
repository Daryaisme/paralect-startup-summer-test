import {
  Button,
  Divider,
  Group,
  Modal,
  Rating,
  Stack,
  Text,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { RatedMovie } from '../../types';
import { useEffect, useState } from 'react';
import classes from './RatingModal.module.css';

interface RatingModalProps {
  id: number;
  title: string;
  opened: boolean;
  close: () => void;
}

function RatingModal({ id, title, opened, close }: RatingModalProps) {
  const [ratedMovies, setRatedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const movie = ratedMovies.find((movie) => movie.id === id);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(movie?.rating ?? 0);
  }, [movie, opened]);

  function handleClickSaveButton() {
    if (rating != 0) {
      setRatedMovies((movies) => [
        ...movies.filter((el) => el.id != id),
        { id, rating },
      ]);
    }
    close();
  }

  function handleClickRemoveButton() {
    setRatedMovies((movies) => [...movies.filter((el) => el.id != id)]);
    close();
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      onClick={(e) => e.stopPropagation()}
      title="Your rating"
      centered
      classNames={{
        header: classes.modal_header,
        content: classes.modal_content,
      }}
    >
      <Stack gap={16}>
        <Text fz={16} fw={700}>
          {title}
        </Text>
        <Rating count={10} value={rating} onChange={setRating} />
        <Group>
          <Button
            variant="filled"
            bg="purple.5"
            onClick={handleClickSaveButton}
          >
            Save
          </Button>
          <Button
            variant="subtle"
            c="purple.5"
            onClick={handleClickRemoveButton}
          >
            Remove rating
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default RatingModal;
