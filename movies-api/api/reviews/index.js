import express from 'express';
import Review from './reviewModel.js';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

//all reviews for a movie
router.get('/movie/:id', asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id);
    const reviews = await Review.findByMovieId(movieId);
    res.status(200).json(reviews);
}));

// Get all reviews by a user
router.get('/user/:username', authenticate, asyncHandler(async (req, res) => {
    const reviews = await Review.findByUsername(req.params.username);
    res.status(200).json(reviews);
}));

// Get all reviews
router.get('/', authenticate, asyncHandler(async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json(reviews);
}));

// Create new review
router.post('/', authenticate, asyncHandler(async (req, res) => {
    const { movieId, content, rating } = req.body;
    
    if (!movieId || !content) {
        return res.status(400).json({ success: false, msg: 'Movie ID and content are required.' });
    }

    const review = await Review.create({
        movieId,
        username: req.user.username,
        content,
        rating
    });
    
    res.status(201).json({ success: true, review });
}));

// Update review
router.put('/:id', authenticate, asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
        return res.status(404).json({ success: false, msg: 'Review not found.' });
    }
    
    if (review.username !== req.user.username) {
        return res.status(403).json({ success: false, msg: 'Not authorized to update this review.' });
    }

    const { content, rating } = req.body;
    if (content) review.content = content;
    if (rating !== undefined) review.rating = rating;
    
    await review.save();
    res.status(200).json({ success: true, review });
}));

// Delete review
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
        return res.status(404).json({ success: false, msg: 'Review not found.' });
    }
    
    if (review.username !== req.user.username) {
        return res.status(403).json({ success: false, msg: 'Not authorized to delete this review.' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: 'Review deleted.' });
}));

export default router;
