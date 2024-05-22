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
    value: 'vote_averaget.asc',
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

function Filters() {
  const { data, isLoading, isError } = useFetch<GenreDataType>(url, options);

  return (
    <Stack gap={16}>
      <Group gap={16}>
        <MultiSelect
          placeholder="Select genre"
          data={data?.genres.map((genre) => genre.name)}
          classNames={{ pill: classes.option }}
          label="Genres"
        />
        <Select
          placeholder="Select release year"
          data={new Array(100).fill(1).map((_, i) => (2024 - i).toString())}
          classNames={{ label: classes.label }}
          label="Release year"
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
            />
            <NumberInput
              placeholder="To"
              min={0}
              max={10}
              clampBehavior="strict"
            />
          </Group>
        </Stack>
        <Text size="14px">Reset filters</Text>
      </Group>
      <Select
        placeholder="Select release year"
        data={sortings.map(el => el.label)}
        classNames={{ label: classes.label }}
        label="Release year"
      />
    </Stack>
  );
}

export default Filters;
