import './style.css';
const img = document.querySelector('img');
img.style.display = 'none';
const regex = /^[a-zA-z]+$/;
const searchBar = document.getElementById('searchBar');
const error = document.getElementById('error');
function inputValidator() {
  if (regex.test(searchBar.value)) return true;
  else return false;
}
searchBar.addEventListener('input', () => {
  if (inputValidator()) {
    error.textContent = '';
    error.classList.remove('error');
  } else {
    error.textContent = 'Only words are allowed as input';
    error.classList.add('error');
  }
});
const gifLoader = document.querySelector('#gifLoader');
gifLoader.addEventListener('click', () => {
  if (inputValidator()) {
    fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=hFLAx6aQY4wb7X95uoSAOJOdmOHihn6s&tag=${searchBar.value}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Api Error ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        if (!response.data || !response.data.images) {
          throw new Error('No GIF found for the search');
        }
        error.classList.remove('error');
        error.textContent = '';
        img.style.display = 'block';
        img.src = response.data.images.original.url;
      })
      .catch((err) => {
        error.textContent = err.message;
        error.classList.add('error');
      });
  }
});
