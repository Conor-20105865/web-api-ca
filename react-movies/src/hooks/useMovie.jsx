import { useQuery } from "@tanstack/react-query";
import {
  getMovie,
  getMovies,
  getTopRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieRecommendations,
  getMovieCredits,
  getActorDetails,
  getActorMovieCredits,
  searchMovies,
} from "../api/tmdb-api";

export const useMovie = (id) => {
  return useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });
};

export const useMovies = (filters) => {
  return useQuery({
    queryKey: ["discover", { filters }],
    queryFn: getMovies,
  });
};

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRatedMovies,
  });
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popular"],
    queryFn: getPopularMovies,
  });
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });
};

export const useSearch = (query, page = 1) => {
  return useQuery({
    queryKey: ["search", { query, page }],
    queryFn: searchMovies,
    enabled: !!query,
  });
};

export const useMovieRecommendations = (id) => {
  return useQuery({
    queryKey: ["movieRecommendations", { id: id }],
    queryFn: getMovieRecommendations,
  });
};

export const useMovieCredits = (id) => {
  return useQuery({
    queryKey: ["movieCredits", { id: id }],
    queryFn: getMovieCredits,
  });
};

export const useActorDetails = (id) => {
  return useQuery({
    queryKey: ["actor", { id: id }],
    queryFn: getActorDetails,
  });
};

export const useActorMovieCredits = (id) => {
  return useQuery({
    queryKey: ["actorMovies", { id: id }],
    queryFn: getActorMovieCredits,
  });
};
