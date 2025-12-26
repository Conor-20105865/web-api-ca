import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./authContext";
import { getFavourites, addFavourite, removeFavourite, getPlaylists, createPlaylist as createPlaylistAPI, addMovieToPlaylist, removeMovieFromPlaylist, deletePlaylist as deletePlaylistAPI } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const authContext = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlists, setPlaylists] = useState({});
  const [activePlaylist, setActivePlaylist] = useState("watchLater");

  // Load favorites from backend when user logs in
  useEffect(() => {
    if (authContext.isAuthenticated && authContext.token) {
      loadFavoritesFromBackend();
      loadPlaylistsFromBackend();
    } else {
      setFavorites([]);
      setPlaylists({});
    }
  }, [authContext.isAuthenticated, authContext.token]);

  const loadFavoritesFromBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      const favs = await getFavourites(token);
      if (Array.isArray(favs)) {
        setFavorites(favs.map(fav => fav.movieId));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const loadPlaylistsFromBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      const playlistsArray = await getPlaylists(token);
      if (Array.isArray(playlistsArray)) {
        const playlistsObj = {};
        playlistsArray.forEach(playlist => {
          playlistsObj[playlist.name] = playlist.movies;
        });
        setPlaylists(playlistsObj);
      }
    } catch (error) {
      console.error("Error loading playlists:", error);
    }
  };

  const addToFavorites = async (movie) => {
    if (!authContext.isAuthenticated) {
      alert("You must be logged in to add favorites");
      return;
    }

    if (!favorites.includes(movie.id)) {
      try {
        const token = localStorage.getItem("token");
        await addFavourite(movie.id, token);
        setFavorites([...favorites, movie.id]);
      } catch (error) {
        console.error("Error adding favorite:", error);
        alert("Failed to add favorite");
      }
    }
  };

  const removeFromFavorites = async (movie) => {
    try {
      const token = localStorage.getItem("token");
      await removeFavourite(movie.id, token);
      setFavorites(favorites.filter(mId => mId !== movie.id));
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Failed to remove favorite");
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };

  // Playlist functions
  const createPlaylist = async (name) => {
    if (!authContext.isAuthenticated) {
      return;
    }

    if (!playlists[name]) {
      try {
        const token = localStorage.getItem("token");
        const result = await createPlaylistAPI(name, token);
        if (result.success || result.playlist) {
          setPlaylists({ ...playlists, [name]: [] });
        }
      } catch (error) {
        console.error("Error creating playlist:", error);
      }
    }
  };

  const deletePlaylist = async (name) => {
    try {
      const token = localStorage.getItem("token");
      await deletePlaylistAPI(name, token);
      const { [name]: _, ...remainingPlaylists } = playlists;
      setPlaylists(remainingPlaylists);
      if (activePlaylist === name) {
        setActivePlaylist("watchLater");
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
      alert("Failed to delete playlist");
    }
  };

  const addToPlaylist = async (movie, playlistName = activePlaylist) => {
    if (!authContext.isAuthenticated) {
      alert("You must be logged in to add to playlists");
      return;
    }

    if (!movie || movie.id === undefined || movie.id === null) return;
    const id = Number(movie.id);
    if (Number.isNaN(id)) return;

    try {
      const token = localStorage.getItem("token");
      await addMovieToPlaylist(playlistName, id, token);

      
      if (!playlists[playlistName]) {
        setPlaylists({ ...playlists, [playlistName]: [id] });
      } else if (!playlists[playlistName].includes(id)) {
        setPlaylists({
          ...playlists,
          [playlistName]: [...playlists[playlistName], id]
        });
      }
    } catch (error) {
      console.error("Error adding to playlist:", error);
      alert("Failed to add to playlist");
    }
  };

  const removeFromPlaylist = async (movie, playlistName = activePlaylist) => {
    if (!movie || movie.id === undefined || movie.id === null) return;
    const id = Number(movie.id);
    if (Number.isNaN(id)) return;
    
    if (playlists[playlistName]) {
      try {
        const token = localStorage.getItem("token");
        await removeMovieFromPlaylist(playlistName, id, token);
        
        setPlaylists({
          ...playlists,
          [playlistName]: playlists[playlistName].filter(pid => pid !== id)
        });
      } catch (error) {
        console.error("Error removing from playlist:", error);
        alert("Failed to remove from playlist");
      }
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        playlists,
        activePlaylist,
        setActivePlaylist,
        createPlaylist,
        deletePlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
