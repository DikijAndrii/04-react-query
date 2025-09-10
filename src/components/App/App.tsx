import { useState } from "react";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSearch(query: string) {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const res = await fetchMovies(query);
      if (res.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(res);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
