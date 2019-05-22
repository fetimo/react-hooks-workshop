import React from 'react';
import axios from 'axios';

import { useI18n } from './I18nProvider';

const useMovieSearch = (query) => {
  // Apparently having multiple states is bad and better to have a single state.
  // Having a single state would avoid having to reset error/movies and mean it's more consistent.
  const [movies, setMovies] = React.useState([]);
  const [error, setError] = React.useState();
  const { locale } = useI18n();

  React.useEffect(() => {
    if (query) {
      // if (query === 'error') {
      //   throw new Error()
      // }
      setError();
      axios
        .get('https://imdb.smooth-code.com/3/search/movie', {
          params: {
            query,
            language: locale,
            api_key: 'c5742978852b8f695a61e22a33a8196c'
          }
        })
        .then(res => {
          setMovies(res.data.results);
        })
        .catch((error) => {
          setError(error);
          setMovies([]);
        });
      } else {
        setMovies([])
      }

  }, [locale, query]);

  return {
    error,
    movies
  };
}

export default useMovieSearch;