import { FC } from 'react';
import {
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Button,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { genreApi } from '../../resources/genre';
import { SORTING_METHODS } from './constants';
import classes from './index.module.css';

export type FormType = {
  genres: string[];
  releaseYear: string;
  ratingFrom: number;
  ratingTo: number;
  sortMethod: string;
};

interface FormProps {
  form: UseFormReturnType<FormType>;
}

const Filters: FC<FormProps> = ({ form }) => {
  const { data: genres } = genreApi.useList();

  const genresData = genres?.genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));

  return (
    <Stack gap={24}>
      <Group wrap="nowrap">
        <MultiSelect
          label="Genre"
          placeholder="Select genre"
          data={genresData}
          searchable
          maw={320}
          {...form.getInputProps('genres')}
        />

        <Select
          label="Release year"
          placeholder="Select release year"
          data={new Array(100).fill(1).map((_, i) => (2024 - i).toString())}
          miw={100}
          {...form.getInputProps('releaseYear')}
        />

        <Group wrap="nowrap" align="flex-end">
          <NumberInput
            label="Rating"
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

        <Button variant="text" mb={-27} onClick={form.reset}>
          Reset filters
        </Button>
      </Group>

      <Select
        label="Sort by"
        placeholder="Select kind of sort"
        data={SORTING_METHODS}
        w="fit-content"
        className={classes.sortSelect}
        {...form.getInputProps('sortMethod')}
      />
    </Stack>
  );
};

export default Filters;
