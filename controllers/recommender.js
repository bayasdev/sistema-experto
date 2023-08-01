const { response } = require('express');
const swipl = require('swipl');

// consult Prolog file

swipl.call("consult('prolog/recommender.pl')");

const recommendMovie = (req, res = response) => {
  const { genre_id } = req.body;

  swipl.call('assert_movies');

  const query = new swipl.Query(
    `recommend_movies(${genre_id}, MovieId, MovieName)`
  );
  let ret = null;
  let movies = [];

  try {
    while ((ret = query.next())) {
      const id = ret.MovieId;
      const name = ret.MovieName;
      movies.push({ id, name });
    }
  } catch (e) {
    console.log(e);
  } finally {
    query.close();
  }

  res.json(movies);
};

module.exports = { recommendMovie };
