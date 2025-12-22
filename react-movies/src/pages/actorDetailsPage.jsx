import React from "react";
import { useParams } from "react-router";
import { useActorDetails, useActorMovieCredits } from "../hooks/useMovie";
import Spinner from '../components/spinner';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import MovieList from "../components/movieList";
import Paper from "@mui/material/Paper";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const { data: actor, error: actorError, isPending: actorLoading } = useActorDetails(id);
  const { data: credits, error: creditsError, isPending: creditsLoading } = useActorMovieCredits(id);

  if (actorLoading || creditsLoading) {
    return <Spinner />;
  }

  if (actorError || creditsError) {
    return <h1>{actorError?.message || creditsError?.message}</h1>;
  }

  const knownFor = credits.cast
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              sx={{ height: 'auto', width: '100%' }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {actor.name}
              </Typography>
              {actor.birthday && (
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Born: {new Date(actor.birthday).toLocaleDateString()}
                  {actor.place_of_birth && ` in ${actor.place_of_birth}`}
                </Typography>
              )}
              {actor.known_for_department && (
                <Chip 
                  label={actor.known_for_department} 
                  color="primary" 
                  sx={{ mt: 1, mb: 2 }}
                />
              )}
              <Typography variant="body1" paragraph>
                {actor.biography}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Known For
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <MovieList movies={knownFor} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActorDetailsPage;