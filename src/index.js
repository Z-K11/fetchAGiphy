import './style.css';
const img = document.querySelector('img');
const gifLoader = document.querySelector('#gifLoader');
gifLoader.addEventListener('click', () => {
  fetch(
    'https://api.giphy.com/v1/gifs/random?api_key=hFLAx6aQY4wb7X95uoSAOJOdmOHihn6s&tag=cats'
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      img.src = response.data.images.original.url;
    });
});
