import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";
import img from '../../images/film-poster-placeholder.png';

export default function MovieCard({ movie, action }) { 

  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };


  return (
    <Card sx={{
      //attempt to make the cards all the same size bu nah prob overidden elsewhere
      height: { xs: 460, sm: 520, md: 580 },
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: 3,
      overflow: 'hidden',
      '&:hover': { transform: 'translateY(-4px)' },
      transition: 'transform 0.2s'
    }}>
      <CardHeader
        sx={{ minHeight: 64 }}
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" noWrap sx={{ fontWeight: 600 }}>
            {movie.title}
          </Typography>
        }
      />

      <CardMedia
        component="div"
        sx={{
         
          aspectRatio: '2 / 3',
          width: '100%',
          backgroundImage: `url(${movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0
        }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden', py: 2 }}>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between', height: 64 }}>
        {action ? action(movie) : null}
        <AddToPlaylistIcon movie={movie} />
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>

    </Card>
  );
}
