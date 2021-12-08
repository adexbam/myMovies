const express = require('express');  
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

// API
let movies = [
    {
      title: 'Inception',
      director: ['Christopher Nolan'],
      genre: ['Action', 'Science Fiction'],
      releasedYear: 2010
    },
    {
      title: 'Your Name',
      director: 'Makoto Shinkai',
      genre: ['Animated', 'Romance', 'Drama'],
      releasedYear: 2016
    },
    {
      title: 'Scrubs',
      director: 'Bill Lawrence', 
      genre:['Medical drama', 'Comedy-drama', 'Sitcom'],
      releasedYear: 2001
    },
    {
      title: 'New Girl',
      director: 'Elizabeth Meriwether',
      genre:'Sitcom',
      releasedYear: 2011
    },
    {
      title: 'Brooklyn 99', 
      director: ['Dan Goor', 'Michael Schur'],
      genre: ['Police procedural Sitcom'],
      releasedYear: 2013
    },
    {
      title: 'The Matrix',
      director: 'The Wachowskis',
      genre: ['Action', 'Science Fiction'],
      releasedYear: 1999
    },
    {
      title: 'Parasite',
      director: 'Bong Joon-ho',
      genre: ['Thriller', 'Black Comedy'],
      releasedYear: 2019
    },
    {
      title: 'Forrest Gump',
      director: 'Robert Zemeckis',
      genre: ['Comedy', 'Drama'],
      releasedYear: 1994
    },
    {
      title: 'Wedding Crashers',
      director: 'David Dobkin',
      genre: ['Romance', 'Comedy'],
      releasedYear: 2005
    },
    {
      title: 'BoJack Horseman',
      director: 'Raphael Bob-Waksberg',
      genre: ['Sitcom', 'Comedy','Drama', 'Animated'],
      releasedYear: 2014
    }
];

// Gets the list of data about ALL movies to the user
app.get('/movies', (req, res) => {
  res.status(200).json(movies);

// Gets the data about a single movie, by titles

app.get('/movies/:title', (req, res) => {
  res.status(200).json(movies.find((movie) =>
      { return movie.title === req.params.title}));
  });

// Adds data for a new movie to our list of movies.
app.post('/movies/:newMovie', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing title in request body';
    res.status(400).send(message);
  } else {
    newMovie.title = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// Deletes a movie from our list by title
app.delete('/movies/:title', (req, res) => {
let movie = movies.find((movie) => { return movie.title === req.params.title });

if (movie) {
  movies = movies.filter((obj) => { return obj.title !== req.params.title });
  res.status(201).send('movie ' + req.params.title + ' was deleted.');
}
});

// Update the genre of a movie by movie title
app.put('/movies/:title/:genre', (req, res) => {
let movie = movies.find((movie) => { return movie.title === req.params.title });

if (movie) {
  movie.title[req.params.title] = parseInt(req.params.genre);
  res.status(201).send('Movie ' + req.params.title + ' was assigned a genre of ' + req.params.genre + ' in ' + req.params.title);
} else {
  res.status(404).send('Movie with the name ' + req.params.title + ' was not found.');
}
})});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
  });
