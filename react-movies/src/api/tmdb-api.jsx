export const searchMovies = (args) => {
  const [, { query, page = 1 }] = args.queryKey;
  
  return fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};


  export const getTopRatedMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  // New endpoints
  export const getPopularMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getUpcomingMovies = () => {
    return fetch(
      `http://localhost:8080/api/movies/upcoming`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getMovieRecommendations = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getMovieCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getActorDetails = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getActorMovieCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

// Reviews API
export const getReviewsByMovie = async (movieId) => {
  const response = await fetch(`http://localhost:8080/api/reviews/movie/${movieId}`);
  return response.json();
};

export const getReviewsByUser = async (username, token) => {
  const response = await fetch(`http://localhost:8080/api/reviews/user/${username}`, {
    headers: {
      'Authorization': token
    }
  });
  return response.json();
};

export const createReview = async (movieId, content, rating, token) => {
  const response = await fetch('http://localhost:8080/api/reviews', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'post',
    body: JSON.stringify({ movieId, content, rating })
  });
  return response.json();
};

export const updateReview = async (reviewId, content, rating, token) => {
  const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'put',
    body: JSON.stringify({ content, rating })
  });
  return response.json();
};

export const deleteReview = async (reviewId, token) => {
  const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
    headers: {
      'Authorization': token
    },
    method: 'delete'
  });
  return response.json();
};

// Favs API
export const getFavourites = async (token) => {
  const response = await fetch('http://localhost:8080/api/favourites', {
    headers: {
      'Authorization': token
    }
  });
  return response.json();
};

export const addFavourite = async (movieId, token) => {
  const response = await fetch('http://localhost:8080/api/favourites', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'post',
    body: JSON.stringify({ movieId })
  });
  return response.json();
};

export const removeFavourite = async (movieId, token) => {
  const response = await fetch(`http://localhost:8080/api/favourites/${movieId}`, {
    headers: {
      'Authorization': token
    },
    method: 'delete'
  });
  return response.json();
};

// Playlists API
export const getPlaylists = async (token) => {
  const response = await fetch('http://localhost:8080/api/playlists', {
    headers: {
      'Authorization': token
    }
  });
  return response.json();
};

export const createPlaylist = async (name, token) => {
  const response = await fetch('http://localhost:8080/api/playlists', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'post',
    body: JSON.stringify({ name })
  });
  return response.json();
};

export const addMovieToPlaylist = async (playlistName, movieId, token) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${playlistName}/movies`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'post',
    body: JSON.stringify({ movieId })
  });
  return response.json();
};

export const removeMovieFromPlaylist = async (playlistName, movieId, token) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${playlistName}/movies/${movieId}`, {
    headers: {
      'Authorization': token
    },
    method: 'delete'
  });
  return response.json();
};

export const deletePlaylist = async (name, token) => {
  const response = await fetch(`http://localhost:8080/api/playlists/${name}`, {
    headers: {
      'Authorization': token
    },
    method: 'delete'
  });
  return response.json();
};
