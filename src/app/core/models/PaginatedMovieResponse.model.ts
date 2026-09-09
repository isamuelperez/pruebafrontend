import { MovieApiResult } from "./movie.model";

export interface PaginatedMovieResponse {
  page: number;
  results: MovieApiResult[];
  total_pages: number;
  total_results: number;
}