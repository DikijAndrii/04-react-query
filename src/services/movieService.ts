import axios from "axios";
import type { Movie } from "../types/movie";

const Base_Url = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export interface FetchMoviesProps {
  results: Movie[];
  total_pages: number;
}

async function fetchMovies(
  query: string,
  page: number = 1
): Promise<FetchMoviesProps> {
  const res = await axios.get<FetchMoviesProps>(`${Base_Url}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data;
}

export default fetchMovies;
