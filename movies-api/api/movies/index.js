import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies } from '../tmdb-api.js';  // Correct relative path


console.log('✅ movies router loaded');



const router = express.Router();

// GET /api/movies/discover
router.get('/discover', asyncHandler(async (req, res) => {
  const movies = await getMovies();  // no arguments
  res.status(200).json(movies);
}));

// GET /api/movies/upcoming
router.get('/upcoming', asyncHandler(async (req, res) => {
  const movies = await getUpcomingMovies();
  res.status(200).json(movies);
}));


export default router;
