export interface GenreType {
  id: number,
  name: string,
}

interface ProductionCompanyType {
  id: number,
  logo_path: string | null,
  name: string,
  origin_country: string,
}

export interface MovieDetailsType {
  id: number,
  original_title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  runtime: number,
  budget: number,
  revenue: number,
  genres: GenreType[],
  overview: string,
  production_companies: ProductionCompanyType[],
  videos: string[],
}

export interface MovieType {
  id: number,
  original_title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  genre_ids: number[],
}

export interface MoviesDataType {
  results: MovieType[],
  total_pages: number,
}

export interface GenreDataType {
  genres: GenreType[],
}

export interface RatedMovie {
  id: number,
  rating: number,
}
