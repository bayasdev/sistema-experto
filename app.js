const express = require('express');

const app = express();

// parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static('public'));

// routes

app.use('/api/genres', require('./routes/genres'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/recommender', require('./routes/recommender'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
