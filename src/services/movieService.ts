import axios from "axios";
import type { Movie } from "../types/movie";

const Base_Url = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesProps {
  results: Movie[];
}

async function fetchMovies(query: string): Promise<Movie[]> {
  const res = await axios.get<FetchMoviesProps>(`${Base_Url}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data.results;
}

export default fetchMovies;
