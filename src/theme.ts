import { colorsTuple, createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    'grey': [
      '#F5F5F6',
      '#F5F5F6',
      '#EAEBED',
      '#D5D6DC',
      '#D5D6DC',
      '#ACADB9',
      '#7B7C88',
      '#7B7C88',
      '#7B7C88',
      '#7B7C88',
    ],
    'purple': [
      '#F2EBF9',
      '#F2EBF9',
      '#E5D5FA',
      '#D1B4F8',
      '#BD93F7',
      '#9854F6',
      '#541F9D',
      '#541F9D',
      '#541F9D',
      '#541F9D',
    ],
    'yellow': colorsTuple('#FAB005'),
  },
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontWeight: '600',
    fontFamily: 'Inter',

    sizes: {
      h2: {
        fontSize: '32px',
        fontWeight: '700',
        lineHeight: '44.8px',
      },
      h3: {
        fontSize: '20px',
        fontWeight: '600',
      }
    },
  },
});

export default theme;