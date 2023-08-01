function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const name = urlParams.get('name');
  const genre_id = urlParams.get('genre_id');
  return { id, name, genre_id };
}

function populateView() {
  const { name, genre_id } = getUrlParams();
  document.getElementById('movie-name').value = name;

  fetch('/api/genres')
    .then((res) => res.json())
    .then((data) => {
      // populate select
      let select = document.getElementById('movie-genre');
      select.innerHTML = '';
      data.forEach((genre) => {
        let option = document.createElement('option');
        option.value = genre.id;
        option.innerHTML = genre.name;
        if (genre.id === parseInt(genre_id)) {
          option.selected = true;
        }
        select.appendChild(option);
      });
    });
}

populateView();

function updateMovie() {
  const { id } = getUrlParams();
  const name = document.getElementById('movie-name').value;
  const genre_id = document.getElementById('movie-genre').value;

  const movie = {
    name,
    genre_id,
  };

  fetch(`/api/movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = '/movies.html';
    });
}
