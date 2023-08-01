const { Router } = require('express');
const {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genres');

const router = Router();

router.get('/', getGenres);

router.post('/', createGenre);

router.put('/:id', updateGenre);

router.delete('/:id', deleteGenre);

module.exports = router;
