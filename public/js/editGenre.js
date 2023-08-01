function getUrlParams(){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const name = urlParams.get('name');
  return {id, name};
}

function populateView(){
  const {name} = getUrlParams();
  document.getElementById('genre-name').value = name;
}

populateView();

function updateGenre(){
  const {id} = getUrlParams();
  const name = document.getElementById('genre-name').value;
  fetch(`/api/genres/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
    .then(res => res.json())
    .then(data => {
      window.location.href = '/genres.html';
    });
}
