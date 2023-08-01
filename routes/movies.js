const { Router } = require('express');
const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies');

const router = Router();

router.get('/', getMovies);

router.post('/', createMovie);

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = router;
