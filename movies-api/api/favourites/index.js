import express from 'express';
import Favourite from './favouriteModel.js';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

// Get all favourites for logged in user
router.get('/', authenticate, asyncHandler(async (req, res) => {
    const favourites = await Favourite.findByUsername(req.user.username);
    res.status(200).json(favourites);
}));

// Add a movie to favourites
router.post('/', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    
    if (!movieId) {
        return res.status(400).json({ success: false, msg: 'Movie ID is required.' });
    }

    // Check if already added
    const existing = await Favourite.findOne({ 
        movieId, 
        username: req.user.username 
    });

    if (existing) {
        return res.status(400).json({ success: false, msg: 'Movie already in favourites.' });
    }

    const favourite = await Favourite.create({
        movieId,
        username: req.user.username
    });
    
    res.status(201).json({ success: true, favourite });
}));

// Remove a favourite
router.delete('/:movieId', authenticate, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    
    const result = await Favourite.findOneAndDelete({ 
        movieId, 
        username: req.user.username 
    });

    if (!result) {
        return res.status(404).json({ success: false, msg: 'Favourite not found.' });
    }

    res.status(200).json({ success: true, msg: 'Favourite removed.' });
}));

export default router;
