import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Main from './pages/main/Main';
import MoviePage from './pages/movie/Movie';
import RatedMovies from './pages/ratedMovies/RatedMovies';
import Page404 from './pages/page404/Page404';
import theme from './theme';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './query-client';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/movies" replace />} />
            <Route path="/movies" element={<Main />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/rated" element={<RatedMovies />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
