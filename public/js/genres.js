function getGenres() {
  // fetch from API
  fetch('/api/genres')
    .then((res) => res.json())
    .then((data) => {
      // populate table
      let table = document.getElementById('genres-table');
      let tbody = table.getElementsByTagName('tbody')[0];
      tbody.innerHTML = '';
      data.forEach((genre) => {
        let row = tbody.insertRow();
        let id = row.insertCell();
        let name = row.insertCell();
        let actions = row.insertCell();
        id.innerHTML = genre.id;
        name.innerHTML = genre.name;
        actions.innerHTML = `
          <a href="editGenre.html?id=${genre.id}&name=${genre.name}" class="btn btn-primary">
            <i class="fa-solid fa-edit"></i>
            Editar
          </a>
          <button class="btn btn-danger" onclick="deleteGenre(${genre.id})">
            <i class="fa-solid fa-trash"></i>
            Eliminar
          </button>
        `;
      });
    });
}

getGenres();

function createGenre() {
  let genre = document.getElementById('genre-name').value;
  fetch('/api/genres', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: genre }),
  })
    .then((res) => res.json())
    .then((data) => {
      getGenres();
    });
}

function deleteGenre(id) {
  fetch(`/api/genres/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      getGenres();
    });
}
