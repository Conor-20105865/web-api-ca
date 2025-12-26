import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../contexts/authContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import { createReview } from "../../api/tmdb-api";
import { useQueryClient } from "@tanstack/react-query";


const ratings = [
  {
    value: 5,
    label: "Excellent",
  },
  {
    value: 4,
    label: "Good",
  },
  {
    value: 3,
    label: "Average",
  },
  {
    value: 2,
    label: "Poor",
  },
  {
    value: 0,
    label: "Terrible",
  },
];

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const ReviewForm = ({ movie }) => {

  const authContext = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSnackClose = (event) => {
    setOpen(false);
    navigate(`/movies/${movie.id}`);
  };

  const onSubmit = async () => {
    if (!authContext.isAuthenticated) {
      alert("You must be logged in to submit a review");
      navigate("/login");
      return;
    }

    if (!content.trim()) {
      alert("Please write a review");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await createReview(movie.id, content, rating * 2, token);
      
      if (result.success) {
        setContent("");
        setRating(5);
        // Invalidate the reviews cache to refetch
        queryClient.invalidateQueries(['reviews', { movieId: movie.id }]);
        setOpen(true);
      } else {
        alert(result.msg || "Error submitting review");
      }
    } catch (error) {
      alert("Error submitting review: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>

      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Thank you for submitting a review
          </Typography>
        </MuiAlert>
      </Snackbar>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} noValidate>
        <Typography variant="h6" gutterBottom>
          Rating:
        </Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          size="large"
          sx={{ mb: 2 }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="review"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          label="Write your review"
          id="review"
          multiline
          minRows={8}
          maxRows={15}
          placeholder="Share your thoughts about this movie..."
        />

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            onClick={() => {
              setContent("");
              setRating(5);
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
