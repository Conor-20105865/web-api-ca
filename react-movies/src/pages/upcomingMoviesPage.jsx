import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";
import { Box, Typography } from "@mui/material";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upcoming Movies
      </Typography>
      <MovieList movies={movies} />
    </Box>
  );
};

export default UpcomingMoviesPage;
