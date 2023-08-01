const { Router } = require('express');
const { recommendMovie } = require('../controllers/recommender');

const router = Router();

router.post('/', recommendMovie);

module.exports = router;
