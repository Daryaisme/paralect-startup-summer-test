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
import { useState } from 'react';
import { UseFormReturnType, useForm } from '@mantine/form';

const url = 'https://api.themoviedb.org/3/genre/movie/list';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGMzMDhmOWNiYzkwN2FkMDkwNTQ0ODkxMThmNjllYyIsInN1YiI6IjY2NGQwMjBjZWIwNTU4ZTk2MjEzYmU5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQxJYsNeswFzhP9wOMamnuCYL4VeC8EnaXZGM73huH8',
  },
};

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
  const { data, isLoading, isError } = useFetch<GenreDataType>(url, options);

  const genresData = data?.genres.map(genre => ({ value: genre.id.toString(), label: genre.name }))

  return (
    <Stack gap={16}>
      <Group gap={16}>
        <MultiSelect
          placeholder="Select genre"
          data={genresData}
          classNames={{ pill: classes.option }}
          label="Genres"
          {...form.getInputProps('genres')}
        />
        <Select
          placeholder="Select release year"
          data={new Array(100).fill(1).map((_, i) => (2024 - i).toString())}
          classNames={{ label: classes.label }}
          label="Release year"
          {...form.getInputProps('releaseYear')}
        />
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
