import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import { getReviewsByMovie } from "../../api/tmdb-api";
import Spinner from '../spinner'
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { AuthContext } from "../../contexts/authContext";


export default function MovieReviews({ movie }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { data: reviews, error, isPending, isError } = useQuery({
    queryKey: ['reviews', { movieId: movie.id }],
    queryFn: () => getReviewsByMovie(movie.id),
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const reviewList = Array.isArray(reviews) ? reviews : [];

  return (
    <>
      {authContext.isAuthenticated && (
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/reviews/form', { state: { movieId: movie.id } })}
          >
            Write a Review
          </Button>
        </Box>
      )}
      
      {reviewList.length === 0 ? (
        <Box sx={{ padding: 2 }}>
          <Typography variant="body1">No reviews yet. Be the first to review!</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 550}} aria-label="reviews table">
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell>Review</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviewList.map((r) => (
                <TableRow key={r._id}>
                  <TableCell component="th" scope="row">
                    {r.username}
                  </TableCell>
                  <TableCell align="center">
                    {r.rating && <Rating value={r.rating / 2} precision={0.5} readOnly />}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{r.content.substring(0, 100)}...</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
