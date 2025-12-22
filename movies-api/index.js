import './config.js';
import express from 'express';
import cors from 'cors';
import usersRouter from './api/users/index.js';
import moviesRouter from './api/movies/index.js';
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

app.get('/ping', (req, res) => {
  res.send('pong');
});


app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

console.log('Mongo URI =', process.env.MONGO_URI);
