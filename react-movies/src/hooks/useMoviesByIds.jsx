import { useQueries } from '@tanstack/react-query';
import { getMovie } from '../api/tmdb-api';

export function useMoviesByIds(ids) {
  const queries = useQueries({
    queries: ids.map(id => ({
      queryKey: ['movie', { id }],
      queryFn: () => getMovie({ queryKey: ['movie', { id }] }),
      enabled: !!id,
    }))
  });

  const isLoading = queries.some(q => q.isLoading);
  const isError = queries.some(q => q.isError);
  const error = queries.find(q => q.isError)?.error;
  const movies = queries.map(q => q.data).filter(m => m && m.id);

  return { movies, isLoading, isError, error };
}
