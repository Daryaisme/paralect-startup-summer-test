import { Button, Group, Modal, Rating, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { RatedMovie } from '../../types';
import { useState } from 'react';

interface RatingModalProps {
  id: number;
  title: string;
  opened: boolean;
  close: () => void;
}

function RatingModal({ id, title, opened, close }: RatingModalProps) {
  const [rating, setRating] = useState(0);

  const [ratedMovies, setRatedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'ratedMovies',
    defaultValue: [],
  });

  const movie = ratedMovies.find((movie) => movie.id === id);

  function handleClickSaveButton() {
    setRatedMovies((movies) => [...movies.filter(el => el.id != id), {id, rating}]);
    close();
  }

  function handleClickRemoveButton() {
    setRatedMovies((movies) => [...movies.filter(el => el.id != id)]);
    close();
  }

  return (
    <Modal opened={opened} onClose={close} title="Your rating" centered>
      <Text fz={16} fw={700}>{title}</Text>
      <Rating count={10} value={movie ? movie.rating : rating} onChange={setRating} />
      <Group>
        <Button variant="filled" onClick={handleClickSaveButton}>Save</Button>
        <Button variant="subtle" onClick={handleClickRemoveButton}>Remove rating</Button>
      </Group>
    </Modal>
  );
}

export default RatingModal;
