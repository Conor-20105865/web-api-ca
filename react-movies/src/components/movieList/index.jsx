import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Grow } from "@mui/material";

const MovieList = ({ movies, action }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3} justifyContent="flex-start">
        {movies.map((movie, index) => (
          <Grow
            key={movie.id}
            in={true}
            timeout={(index + 1) * 200}
          >
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ display: 'flex' }}>
              <Box sx={{ 
                height: '100%',
                width: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}>
                <Movie 
                  movie={movie} 
                  action={action}
                />
              </Box>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
