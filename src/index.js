const img = document.querySelector('img');
fetch(
  'https://api.giphy.com/v1/gifs/translate?api_key=hFLAx6aQY4wb7X95uoSAOJOdmOHihn6s&s=cats'
)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    img.src = response.data.images.original.url;
  });
