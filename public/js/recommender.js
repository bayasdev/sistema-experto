function getGenres() {
  // fetch from api
  fetch('/api/genres')
    .then((res) => res.json())
    .then((data) => {
      // populate genre-select
      const genreSelect = document.getElementById('genre-select');
      genreSelect.innerHTML = '';
      data.forEach((genre) => {
        genreSelect.innerHTML += `<option value="${genre.id}">${genre.name}</option>`;
      });
    });
}

getGenres();

function recommendMovie() {
  const genreSelect = document.getElementById('genre-select');
  const genreId = genreSelect.value;

  fetch('/api/recommender', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ genre_id: genreId }),
  })
    .then((res) => res.json())
    .then((data) => {
      // populate recommendations-table
      let table = document.getElementById('recommendations-table');
      let tbody = table.getElementsByTagName('tbody')[0];
      tbody.innerHTML = '';
      data.forEach((movie) => {
        let row = tbody.insertRow();
        let id = row.insertCell();
        let name = row.insertCell();
        id.innerHTML = movie.id;
        name.innerHTML = movie.name;
      });
    });
}

function resetRecommendations() {
  let table = document.getElementById('recommendations-table');
  let tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = `
    <tr>
      <td colspan="2">No hay recomendaciones</td>
    </tr>
  `;
}
