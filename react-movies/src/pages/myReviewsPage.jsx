import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contexts/authContext";
import { getReviewsByUser } from "../api/tmdb-api";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Typography, Card, CardContent, Grid, Rating, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MyReviewsPage = () => {
  const context = useContext(AuthContext);
  const [reviewsWithMovies, setReviewsWithMovies] = useState([]);
  
  const token = localStorage.getItem("token");

  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ["myReviews", context.userName],
    queryFn: () => getReviewsByUser(context.userName, token),
    enabled: !!context.isAuthenticated && !!context.userName,
  });

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const fetchMovies = async () => {
        const reviewsWithMovieData = await Promise.all(
          reviews.map(async (review) => {
            try {
              const movie = await getMovie({ queryKey: ["movie", { id: review.movieId }] });
              return { ...review, movie };
            } catch (err) {
              console.error(`Failed to fetch movie ${review.movieId}:`, err);
              return { ...review, movie: null };
            }
          })
        );
        setReviewsWithMovies(reviewsWithMovieData);
      };
      fetchMovies();
    }
  }, [reviews]);

  if (!context.isAuthenticated) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5">Please log in to view your reviews.</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5">Error loading reviews: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Reviews
      </Typography>
      
      {reviewsWithMovies.length === 0 ? (
        <Typography variant="body1">You haven't written any reviews yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {reviewsWithMovies.map((review) => (
            <Grid item xs={12} key={review._id}>
              <Card>
                <CardContent>
                  {review.movie && (
                    <Typography variant="h6" component={Link} to={`/movies/${review.movieId}`} sx={{ textDecoration: 'none', color: 'primary.main' }}>
                      {review.movie.title}
                    </Typography>
                  )}
                  {review.rating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                      <Rating value={review.rating / 2} precision={0.5} readOnly />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {review.rating}/10
                      </Typography>
                    </Box>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {review.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyReviewsPage;
