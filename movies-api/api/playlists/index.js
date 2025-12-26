import express from 'express';
import Playlist from './playlistModel.js';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

// Get all playlists for logged-in user 
router.get('/', authenticate, asyncHandler(async (req, res) => {
    const playlists = await Playlist.findByUsername(req.user.username);
    res.status(200).json(playlists);
}));

// Create a new playlist
router.post('/', authenticate, asyncHandler(async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Playlist name is required.' });
    }

    // Check if playlist already exists
    const existing = await Playlist.findOne({ 
        name, 
        username: req.user.username 
    });

    if (existing) {
        return res.status(400).json({ success: false, msg: 'Playlist already exists.' });
    }

    const playlist = await Playlist.create({
        name,
        username: req.user.username,
        movies: []
    });
    
    res.status(201).json({ success: true, playlist });
}));

// Add movie to playlist 
router.post('/:name/movies', authenticate, asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    const playlistName = req.params.name;
    
    if (!movieId) {
        return res.status(400).json({ success: false, msg: 'Movie ID is required.' });
    }

    let playlist = await Playlist.findOne({ 
        name: playlistName, 
        username: req.user.username 
    });

    if (!playlist) {
        // Create playlist if it doesn't exist
        playlist = await Playlist.create({
            name: playlistName,
            username: req.user.username,
            movies: [movieId]
        });
    } else {
        // Add movie if not already in playlist
        if (!playlist.movies.includes(movieId)) {
            playlist.movies.push(movieId);
            await playlist.save();
        }
    }
    
    res.status(200).json({ success: true, playlist });
}));

// Remove movie from playlist
router.delete('/:name/movies/:movieId', authenticate, asyncHandler(async (req, res) => {
    const playlistName = req.params.name;
    const movieId = parseInt(req.params.movieId);
    
    const playlist = await Playlist.findOne({ 
        name: playlistName, 
        username: req.user.username 
    });

    if (!playlist) {
        return res.status(404).json({ success: false, msg: 'Playlist not found.' });
    }

    playlist.movies = playlist.movies.filter(id => id !== movieId);
    await playlist.save();
    
    res.status(200).json({ success: true, playlist });
}));

// Delete a playlist
router.delete('/:name', authenticate, asyncHandler(async (req, res) => {
    const playlistName = req.params.name;
    
    const result = await Playlist.findOneAndDelete({ 
        name: playlistName, 
        username: req.user.username 
    });

    if (!result) {
        return res.status(404).json({ success: false, msg: 'Playlist not found.' });
    }

    res.status(200).json({ success: true, msg: 'Playlist deleted.' });
}));

export default router;
