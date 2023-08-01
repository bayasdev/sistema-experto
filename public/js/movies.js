function getGenres() {
  // await fetch genres from API
  return fetch('/api/genres')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

function getMovies() {
  // fetch movies from API
  return fetch('/api/movies')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

async function populateView() {
  try {
    const genres = await getGenres();
    const movies = await getMovies();

    // populate table
    let table = document.getElementById('movies-table');
    let tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    movies.forEach((movie) => {
      let row = tbody.insertRow();
      let id = row.insertCell();
      let name = row.insertCell();
      let genre = row.insertCell();
      let actions = row.insertCell();
      id.innerHTML = movie.id;
      name.innerHTML = movie.name;

      // match genre id with genre name
      let genreId = movie.genre_id;
      let genreName = genres.find((genre) => genre.id === genreId)?.name;
      genre.innerHTML = genreName || 'N/A';

      actions.innerHTML = `
            <a href="editMovie.html?id=${movie.id}&name=${movie.name}&genre_id=${movie.genre_id}" class="btn btn-primary">
              <i class="fa-solid fa-edit"></i>
              Editar
            </a>
            <button class="btn btn-danger" onclick="deleteMovie(${movie.id})">
              <i class="fa-solid fa-trash"></i>
              Eliminar
            </button>
          `;
    });

    // populate select
    let select = document.getElementById('movie-genre');
    select.innerHTML = '';
    genres.forEach((genre) => {
      let option = document.createElement('option');
      option.value = genre.id;
      option.innerHTML = genre.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error populating view:', error);
  }
}

populateView();

function createMovie() {
  let name = document.getElementById('movie-name').value;
  let genre_id = document.getElementById('movie-genre').value;
  fetch('/api/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, genre_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      populateView();
    });
}

function deleteMovie(id) {
  fetch(`/api/movies/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      populateView();
    });
}
