export interface GenreType {
  id: number;
  name: string;
}

interface ProductionCompanyType {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface VideoType {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieType {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieDetailsType {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  runtime: number;
  revenue: number;
  genres: GenreType[];
  overview: string;
  production_companies: ProductionCompanyType[];
  videos: { results: VideoType[] };
}

export interface MoviesDataType {
  results: MovieType[];
  total_pages: number;
}

export interface GenresDataType {
  genres: GenreType[];
}

export interface RatedMovie {
  id: number;
  rating: number;
}
