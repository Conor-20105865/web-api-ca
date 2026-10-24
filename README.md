# Movies App: Full Stack Web API

A full stack movie application developed using React, Node.js, Express and MongoDB.

The application extends a React movie discovery interface with a backend API supporting user authentication, personal reviews, favourites and custom playlists.

Movie information is retrieved from The Movie Database (TMDB).

## Features

### User Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT authentication
- Protected application pages
- Access to data belonging to each user

### Movie Discovery

- Browse popular and upcoming movies
- View movie details
- Explore top rated movies
- Search for movies and people
- View actor information and filmographies
- Retrieve movie information from TMDB

### Movie Reviews

- Create personal movie reviews
- View reviews for individual movies
- View reviews associated with a user
- Edit existing reviews
- Delete reviews

### Favourites

- Add movies to favourites
- Remove movies from favourites
- Retrieve a user's saved favourites

### Playlists

- Create named playlists
- Add movies to playlists
- Remove movies from playlists
- Delete playlists
- Retrieve playlists associated with a user

## Technology Stack

### Frontend

- React 19
- JavaScript
- Vite 7
- React Router 7
- Material UI 7
- TanStack React Query 5
- React Context API
- React Hook Form

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- dotenv
- node-fetch

### External Services

- TMDB API

## Project Structure

```text
web-api-ca/
├── movies-api/
│   ├── api/
│   │   ├── users/
│   │   ├── reviews/
│   │   ├── favourites/
│   │   ├── playlists/
│   │   ├── movies/
│   │   └── tmdb-api.js
│   ├── authenticate/
│   ├── db/
│   ├── config.js
│   ├── index.js
│   └── package.json
├── react-movies/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Requirements

- Node.js compatible with Vite 7
- npm
- MongoDB database
- TMDB API credentials
- Modern web browser

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Conor-20105865/web-api-ca.git
cd web-api-ca
```

### 2. Install backend dependencies

```bash
cd movies-api
npm ci
```

### 3. Configure backend environment variables

Create a `.env` file inside `movies-api/`.

```dotenv
PORT=8080
MONGO_URI=your_mongodb_connection_string
SECRET=your_long_random_jwt_secret
TMDB_KEY=your_tmdb_v3_api_key
```

Replace the placeholders with your own values.

Never commit real database credentials or JWT secrets to Git.

Generate a strong random value for `SECRET`.

The backend loads environment variables through dotenv.

### 4. Start the backend

From the `movies-api` directory:

```bash
npm run dev
```

Alternatively:

```bash
npm start
```

The frontend is configured to contact the backend at:

```text
http://localhost:8080
```

The configured backend port should therefore be 8080 unless the frontend API URLs are also changed.

### 5. Install frontend dependencies

Open another terminal.

From the repository root:

```bash
cd react-movies
npm ci
```

### 6. Configure frontend environment variables

Create a `.env` file inside `react-movies/`.

```dotenv
VITE_TMDB_KEY=your_tmdb_v3_api_key
```

This is required because several frontend requests access TMDB directly.

Important: Vite variables prefixed with `VITE_` are exposed to code running in the browser. Do not place private server credentials in these variables.

### 7. Start the frontend

From the `react-movies` directory:

```bash
npm run dev
```

Open the local address displayed by Vite.

Both the backend and frontend development servers must be running for the full application to function.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Retrieve users |
| POST | `/api/users` | Authenticate a user |
| POST | `/api/users?action=register` | Register a user |

Registration requires a username and password.

Passwords must contain at least eight characters, including a letter, a number and an accepted special character.

### Movies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies/discover` | Retrieve discovered movies |
| GET | `/api/movies/upcoming` | Retrieve upcoming movies |

These endpoints use the backend TMDB integration.

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/movie/:id` | Retrieve reviews for a movie |
| GET | `/api/reviews/user/:username` | Retrieve reviews associated with a user |
| POST | `/api/reviews` | Create a review |
| PUT | `/api/reviews/:id` | Update a review |
| DELETE | `/api/reviews/:id` | Delete a review |

### Favourites

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/favourites` | Retrieve user favourites |
| POST | `/api/favourites` | Add a favourite |
| DELETE | `/api/favourites/:movieId` | Remove a favourite |

### Playlists

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/playlists` | Retrieve playlists |
| POST | `/api/playlists` | Create a playlist |
| POST | `/api/playlists/:name/movies` | Add a movie |
| DELETE | `/api/playlists/:name/movies/:movieId` | Remove a movie |
| DELETE | `/api/playlists/:name` | Delete a playlist |

Authentication is required for operations involving individual users where enforced by the corresponding router.

## Authentication

The application uses JSON Web Tokens.

When a user signs in successfully:

1. The backend verifies the supplied credentials.
2. A JWT is generated.
3. The backend returns the token with a `BEARER ` prefix.
4. The frontend stores the returned value in browser localStorage.
5. Authenticated requests send the stored value through the Authorization header.

Example:

```http
Authorization: BEARER your_jwt_token
```

JWT validation is performed by backend authentication middleware.

## Database

MongoDB stores application records using Mongoose models.

The backend contains models for:

- Users
- Movie reviews
- Favourites
- Playlists

Connection details are supplied through `MONGO_URI`.

A running, accessible MongoDB database is required for persistent features.

## Development Commands

### Backend

Run in `movies-api/`:

```bash
npm run dev
```

Start without nodemon:

```bash
npm start
```

### Frontend

Run in `react-movies/`:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Run each command separately as needed.

## Health Check

The backend provides:

```http
GET /ping
```

A successful response returns:

```text
pong
```

This checks that the HTTP server responds. It does not verify MongoDB connectivity or TMDB availability.

## Security Considerations

- Passwords are hashed using bcrypt.
- Protected operations use JWT authentication.
- Database credentials and JWT secrets must remain private.
- Frontend environment variables prefixed with `VITE_` are visible in the browser.
- JWTs are currently stored in localStorage.
- The backend enables CORS through the cors middleware.
- Production deployments should use HTTPS and appropriate CORS restrictions.

This project is intended for development and educational use. Additional security hardening would be required before production deployment.

## Known Limitations

- Frontend requests to the backend use hardcoded localhost:8080 addresses.
- Some movie data is fetched directly from TMDB rather than through the backend.
- JWTs are stored in browser localStorage.
- Deployment configuration is not fully documented.
- Automated tests are not configured in the current package scripts.
- The current backend logs the MongoDB connection URI, which should be corrected before production use.

## Potential Improvements

- Move frontend backend URLs to configuration using environment variables
- Remove sensitive database connection logging
- Add automated API tests
- Add frontend integration tests
- Strengthen production authentication and session handling
- Configure CORS policies appropriate to each environment
- Add API request validation
- Centralise error handling
- Add deployment instructions

## Demo Video

https://youtu.be/PQip9jU1gN8

## Project Purpose

This application was developed to demonstrate full stack web development using a React frontend, REST API, MongoDB persistence, user authentication and integration with an external movie data service.

It builds on a movie discovery interface by adding user data managed by the backend and protected application functionality.
