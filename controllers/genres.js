const { response } = require('express');
const swipl = require('swipl');

// consult Prolog file

swipl.call("consult('prolog/genres.pl')");

// CRUD operations

const getGenres = (req, res = response) => {
  const query = new swipl.Query('get_genres(X)');
  let ret = null;
  let genres = [];

  try {
    while ((ret = query.next())) {
      const id = ret.X.args[0];
      const name = ret.X.args[1];
      genres.push({ id, name });
    }
  } catch (e) {
    console.log(e);
  } finally {
    query.close();
  }

  res.json(genres);
};

const createGenre = (req, res = response) => {
  const { name } = req.body;

  swipl.call(`create_genre(${name.toLowerCase().replace(/ /g, '_')})`);

  res.status(201).json(name);
};

const updateGenre = (req, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  swipl.call(`update_genre(${id}, ${name.toLowerCase().replace(/ /g, '_')})`);

  res.json(name);
};

const deleteGenre = (req, res = response) => {
  const { id } = req.params;

  swipl.call(`delete_genre(${id})`);

  res.json(id);
};

module.exports = {
  createGenre,
  getGenres,
  updateGenre,
  deleteGenre,
};
