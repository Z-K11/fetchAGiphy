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
async function getAGiphy() {
  try {
    console.log('Giphy called');
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=hFLAx6aQY4wb7X95uoSAOJOdmOHihn6s&tag=${searchBar.value}`
    );
    if (!response.ok) {
      throw new Error(`API ERROR message = ${response.status}`);
    }
    const gifData = await response.json();
    if (!gifData.data || gifData.data.images) {
      throw new Error(`No gif found for the search`);
    }
    img.src = gifData.data.images.original.url;
    img.style.display = 'block';
  } catch (err) {
    console.error(err);
  }
}
const gifLoader = document.querySelector('#gifLoader');
gifLoader.addEventListener('click', () => {
  if (inputValidator()) {
    getAGiphy();
  }
});
