# Movies App - Web API Assignment 2

**Name:** Conor Cunningham  
**Student ID:** 20105865  
**Repository:** https://github.com/Conor-20105865/web-api-ca

A full-stack movies application with user authentication, reviews, favorites, and playlists.

## Features

- **User Authentication:** Sign up, login with JWT tokens, protected routes.
- **Reviews API:** Create, read, update, delete movie reviews (user-specific).
- **Favourites API:** Add/remove favorite movies (persisted per user).
- **Playlists API:** Create playlists, add/remove movies (user-specific).
- **Movies API:** Discover and upcoming movies endpoints.
- **Protected Pages:** My Reviews, Favorites, Playlists only visible when logged in.

## API Endpoints

### Authentication
- `POST /api/users` - Login/Register user

### Reviews (Protected)
- `GET /api/reviews/movie/:id` - Get reviews for a movie
- `GET /api/reviews/user/:username` - Get user's reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Favourites (Protected)
- `GET /api/favourites` - Get user's favorites
- `POST /api/favourites` - Add to favorites
- `DELETE /api/favourites/:movieId` - Remove favorite

### Playlists (Protected)
- `GET /api/playlists` - Get user's playlists
- `POST /api/playlists` - Create playlist
- `POST /api/playlists/:name/movies` - Add movie to playlist
- `DELETE /api/playlists/:name/movies/:movieId` - Remove movie
- `DELETE /api/playlists/:name` - Delete playlist

### Movies
- `GET /api/movies/discover` - Popular movies
- `GET /api/movies/upcoming` - Upcoming movies

## Authentication

- JWT token generated on login; stored in browser localStorage.
- Token sent as `Authorization: Bearer <token>` for protected requests.
- Backend validates token and enforces user-specific data access.

## Demo Video

https://youtu.be/PQip9jU1gN8
