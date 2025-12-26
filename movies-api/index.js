import './config.js';
import express from 'express';
import cors from 'cors';
import usersRouter from './api/users/index.js';
import moviesRouter from './api/movies/index.js';
import reviewsRouter from './api/reviews/index.js';
import favouritesRouter from './api/favourites/index.js';
import playlistsRouter from './api/playlists/index.js';
import authenticate from './authenticate/index.js';
import './db/index.js';



const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Something went wrong!');
  }
  res.status(500).send(`Error details: ${err.stack}`);
};

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/favourites', favouritesRouter);
app.use('/api/playlists', playlistsRouter);


//ai code because ping is not working
//switched to es modules
//resolved import issues after switch
//killed stale processes running on port 8080
app.get('/ping', (req, res) => {
  res.send('pong');
});


app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

console.log('Mongo URI =', process.env.MONGO_URI);
