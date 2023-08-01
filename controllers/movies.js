const { response } = require('express');
const swipl = require('swipl');

// consult Prolog file

swipl.call("consult('prolog/movies.pl')");

// CRUD operations

const getMovies = (req, res = response) => {
  const query = new swipl.Query('get_movies(X)');
  let ret = null;
  let movies = [];

  try {
    while ((ret = query.next())) {
      const id = ret.X.args[0];
      const name = ret.X.args[1];
      const genre_id = ret.X.args[2];
      movies.push({ id, name, genre_id });
    }
  } catch (e) {
    console.log(e);
  } finally {
    query.close();
  }

  res.json(movies);
};

const createMovie = (req, res = response) => {
  const { name, genre_id } = req.body;

  swipl.call(
    `create_movie(${name.toLowerCase().replace(/ /g, '_')}, ${genre_id})`
  );

  res.status(201).json(name);
};

const updateMovie = (req, res = response) => {
  const { id } = req.params;
  const { name, genre_id } = req.body;

  swipl.call(
    `update_movie(${id}, ${name.toLowerCase().replace(/ /g, '_')}, ${genre_id})`
  );

  res.json(name);
};

const deleteMovie = (req, res = response) => {
  const { id } = req.params;

  swipl.call(`delete_movie(${id})`);

  res.json(id);
};

module.exports = {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
};
