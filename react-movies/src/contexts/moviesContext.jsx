import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlists, setPlaylists] = useState({});
  const [activePlaylist, setActivePlaylist] = useState("watchLater");  // Default playlist no worky :(

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    }
    else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };

  // New playlist functions
  const createPlaylist = (name) => {
    if (!playlists[name]) {
      setPlaylists({ ...playlists, [name]: [] });
    }
  };

  const deletePlaylist = (name) => {
    const { [name]: removed, ...remainingPlaylists } = playlists;
    setPlaylists(remainingPlaylists);
    if (activePlaylist === name) {
      setActivePlaylist("watchLater");
    }
  };

  const addToPlaylist = (movie, playlistName = activePlaylist) => {
    if (!movie || movie.id === undefined || movie.id === null) return;
    const id = Number(movie.id);
    if (Number.isNaN(id)) return;

    if (!playlists[playlistName]) {
      createPlaylist(playlistName);
    }

    if (!playlists[playlistName].includes(id)) {
      setPlaylists({
        ...playlists,
        [playlistName]: [...(playlists[playlistName] || []), id]
      });
    }
  };

  const removeFromPlaylist = (movie, playlistName = activePlaylist) => {
    if (!movie || movie.id === undefined || movie.id === null) return;
    const id = Number(movie.id);
    if (Number.isNaN(id)) return;
    if (playlists[playlistName]) {
      setPlaylists({
        ...playlists,
        [playlistName]: playlists[playlistName].filter(pid => pid !== id)
      });
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
