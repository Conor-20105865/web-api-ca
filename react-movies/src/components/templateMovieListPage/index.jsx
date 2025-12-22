import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Pagination from "../pagination";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function MovieListPageTemplate({ 
  movies, 
  title, 
  action,
  currentPage,
  totalPages,
  onPageChange,
  sortFilter,
  yearFilter,
  ratingFilter,
  genreFilter,
  onUserInput
}) {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>

        <Grid item xs={12} md={3} lg={2}>
          <Box sx={{ position: { md: 'sticky' }, top: '20px' }}>
            <FilterCard
              onUserInput={onUserInput}
              sortFilter={sortFilter}
              yearFilter={yearFilter}
              ratingFilter={ratingFilter}
              genreFilter={genreFilter}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={9} lg={10}>
          <Box>
            <MovieList action={action} movies={movies} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </Box>
        </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default MovieListPageTemplate;
