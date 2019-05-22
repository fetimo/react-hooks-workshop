import useMovieSearch from '../hooks/useMovieSearch';

export function MovieSearch({ query, children }) {
  const movieSearch = useMovieSearch(query)
  return children(movieSearch)
}

export default MovieSearch;