import './config.js';
import express from 'express';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import authenticate from './authenticate';
import moviesRouter from './api/movies';



const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Something went wrong!');
  }
  res
    .status(500)
    .send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack}`);
};

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter); 

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

console.log('Mongo URI =', process.env.MONGO_URI);

