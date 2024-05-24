import {
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import classes from './Filters.module.css';
import { GenreDataType } from '../../types';
import useFetch from '../../hooks/useFetch';
import { UseFormReturnType } from '@mantine/form';

const url = `${import.meta.env.VITE_URL}/genre/movie/list`;

const sortings = [
  {
    value: 'popularity.desc',
    label: 'Most popular',
  },
  {
    value: 'popularity.asc',
    label: 'Least popular',
  },
  {
    value: 'vote_average.desc',
    label: 'Most rated',
  },
  {
    value: 'vote_average.asc',
    label: 'Least rated',
  },
  {
    value: 'vote_count.desc',
    label: 'Most voted',
  },
  {
    value: 'vote_count.asc',
    label: 'Least voted',
  },
  {
    value: 'original_title.asc',
    label: 'Title (A-Z)',
  },
  {
    value: 'original_title.desc',
    label: 'Title (Z-A)',
  },
  {
    value: 'revenue.desc',
    label: 'Top grossing',
  },
  {
    value: 'revenue.asc',
    label: 'Lowest grossing',
  },
];

export interface FormType {
  genres: string[];
  releaseYear: string;
  ratingFrom: number;
  ratingTo: number;
  sortMethod: string;
}

interface FormProps {
  form: UseFormReturnType<FormType>;
}

function Filters({ form }: FormProps) {
  const { data, isLoading, isError } = useFetch<GenreDataType>(url);

  const genresData = data?.genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));

  return (
    <Stack gap={24}>
      <Group>
        <Stack gap={16}>
          <MultiSelect
            placeholder="Select genre"
            data={genresData}
            classNames={{ pill: classes.pill, option: classes.option }}
            label="Genres"
            {...form.getInputProps('genres')}
          />
        </Stack>
        <Stack gap={8}>
          <Text size="md" fw={700}>
            Release year
          </Text>
          <Select
            placeholder="Select release year"
            data={new Array(100).fill(1).map((_, i) => (2024 - i).toString())}
            classNames={{ label: classes.label }}
            {...form.getInputProps('releaseYear')}
          />
        </Stack>
        <Stack gap={8}>
          <Text size="md" fw={700}>
            Ratings
          </Text>
          <Group>
            <NumberInput
              placeholder="From"
              min={0}
              max={10}
              clampBehavior="strict"
              {...form.getInputProps('ratingFrom')}
            />
            <NumberInput
              placeholder="To"
              min={0}
              max={10}
              clampBehavior="strict"
              {...form.getInputProps('ratingTo')}
            />
          </Group>
        </Stack>
        <Text size="14px">Reset filters</Text>
      </Group>
      <Select
        placeholder="Select release year"
        data={sortings}
        classNames={{ label: classes.label }}
        label="Release year"
        {...form.getInputProps('sortMethod')}
      />
    </Stack>
  );
}

export default Filters;
