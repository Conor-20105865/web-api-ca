import React from "react";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Grow } from "@mui/material";
import placeholder from '../../images/film-poster-placeholder.png';

const CastList = ({ cast }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.slice(0, 12).map((actor, index) => (
          <Grow
            key={actor.id}
            in={true}
            timeout={(index + 1) * 200}
          >
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={() => navigate(`/actors/${actor.id}`)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : placeholder
                  }
                  alt={actor.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="div" noWrap>
                    {actor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {actor.character}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Box>
  );
};

export default CastList;