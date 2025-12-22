// backend/tmdb-api.js
import fetch from 'node-fetch';

export const getMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&page=1&include_adult=false&include_video=false`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || 'Something went wrong');
  }

  return await response.json();
};
