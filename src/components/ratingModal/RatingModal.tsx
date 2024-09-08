import { FC, useEffect, useState } from 'react';
import {
  Button,
  Group,
  Modal,
  ModalProps,
  Rating,
  Stack,
  Text,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { RatedMovie } from '../../types';
import classes from './RatingModal.module.css';

interface RatingModalProps extends ModalProps {
  movie: {
    id: number;
    original_title: string;
  };
}

const RatingModal: FC<RatingModalProps> = ({
  movie: { id, original_title },
  ...rest
}) => {
  const [rating, setRating] = useState(0);

  const [ratedMovies, setRatedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const ratedMovie = ratedMovies.find((movie) => movie.id === id);

  useEffect(() => {
    setRating(ratedMovie?.rating ?? 0);
  }, [ratedMovie, rest.opened]);

  const handleSaveButtonClick = () => {
    if (rating != 0) {
      setRatedMovies((movies) => [
        ...movies.filter((movie) => movie.id != id),
        { id, rating },
      ]);
    }

    rest.onClose();
  };

  const handleRemoveButtonClick = () => {
    setRatedMovies((movies) => [...movies.filter((movie) => movie.id != id)]);

    rest.onClose();
  };

  return (
    <Modal.Root centered {...rest} classNames={classes}>
      <Modal.Overlay bg="#33333354" />

      <Modal.Content radius={8} p={16}>
        <Modal.Header p={0} mih="auto" pb={16}>
          <Modal.Title>
            <Text>Your rating</Text>
          </Modal.Title>

          <Modal.CloseButton />
        </Modal.Header>

        <Modal.Body p={0}>
          <Stack gap={16}>
            <Text fw={700}>{original_title}</Text>

            <Rating size="lg" count={10} value={rating} onChange={setRating} />

            <Group>
              <Button
                variant="filled"
                size="md"
                onClick={handleSaveButtonClick}
              >
                Save
              </Button>

              <Button variant="text" onClick={handleRemoveButtonClick}>
                Remove rating
              </Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RatingModal;
