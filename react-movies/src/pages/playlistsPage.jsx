import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { useMoviesByIds } from "../hooks/useMoviesByIds";
import { Grid, Typography, Tabs, Tab, Box } from "@mui/material";
import MovieList from "../components/movieList";
import Spinner from "../components/spinner";

const PlaylistsPage = () => {
  const context = useContext(MoviesContext);
  const [value, setValue] = React.useState(0);
  const playlists = Object.entries(context.playlists);

  
  React.useEffect(() => {
    if (playlists.length === 0) {
      setValue(0);
      context.setActivePlaylist(null);
    } else if (value >= playlists.length) {
      setValue(0);
      context.setActivePlaylist(playlists[0][0]);
    }
  }, [playlists, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    context.setActivePlaylist(playlists[newValue][0]);
  };

  if (playlists.length === 0) {
    return (
      <Typography variant="h5" component="h3">
        No playlists created yet. Add movies to playlists from the movie cards!
      </Typography>
    );
  }

  const currentPlaylist = playlists[value] || [null, []];
  // Remove multiples IDs
  const movieIds = Array.from(new Set((currentPlaylist[1] || []).filter(Boolean)));


  const { movies, isLoading, isError, error } = useMoviesByIds(movieIds);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="playlist tabs"
        >
          {playlists.map(([name], index) => (
            <Tab key={name} label={name} id={`playlist-tab-${index}`} />
          ))}
        </Tabs>
      </Box>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Typography variant="h6" color="error">
          {error?.message || "Failed to load one or more movies."}
        </Typography>
      ) : movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <Typography variant="h6">
          This playlist is empty. Add some movies!
        </Typography>
      )}
    </>
  );
};

export default PlaylistsPage;