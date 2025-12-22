import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import SavingsIcon from "@mui/icons-material/Savings";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import CastList from "../castList";
import { useMovieCredits, useMovieRecommendations } from "../../hooks/useMovie";
import MovieList from "../movieList";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const { data: credits, isPending: creditsLoading } = useMovieCredits(movie.id);
  const { data: recommendations, isPending: recommendationsLoading } = useMovieRecommendations(movie.id);

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 3 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Overview
      </Typography>
      <Typography variant="body1" paragraph>
        {movie.overview}
      </Typography>
      <Paper component="ul" sx={{ ...root, mb: 4 }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      {!creditsLoading && credits?.cast?.length > 0 && (
        <>
          <CastList cast={credits.cast} />
          <Divider sx={{ my: 4 }} />
        </>
      )}
      {!recommendationsLoading && recommendations?.results?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Recommended Movies
          </Typography>
          <MovieList movies={recommendations.results.slice(0, 6)} />
        </Box>
      )}
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<SavingsIcon />} label={movie.budget > 0 ? `${(movie.budget / 1_000_000).toFixed(1)}M` : 'N/A'} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Fab color="secondary" variant="extended" onClick={() => setDrawerOpen(true)} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </Box>
  );
}
export default MovieDetails;
