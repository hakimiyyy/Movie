const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('id');


async function displayMovieDetails(movieId) {
  try {
 
    const response = await fetch(`https://www.omdbapi.com/?apikey=40c8bb9e&i=${movieId}`);
    const data = await response.json();

    
    const movieDetails = document.getElementById('movie-details');
    const titleElement = document.createElement('h2');
    const posterElement = document.createElement('img');
    const synopsisElement = document.createElement('p');
    const castElement = document.createElement('p');
    const releaseDateElement = document.createElement('p');
    const ratingsElement = document.createElement('p');

    titleElement.textContent = data.Title;
    posterElement.src = data.Poster;
    posterElement.alt = `${data.Title} Poster`;
    synopsisElement.textContent = data.Plot;
    castElement.textContent = `Cast: ${data.Actors}`;
    releaseDateElement.textContent = `Release Date: ${data.Released}`;
    ratingsElement.textContent = `Ratings: ${data.imdbRating}/10`;

    
    movieDetails.appendChild(titleElement);
    movieDetails.appendChild(posterElement);
    movieDetails.appendChild(synopsisElement);
    movieDetails.appendChild(castElement);
    movieDetails.appendChild(releaseDateElement);
    movieDetails.appendChild(ratingsElement);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}


displayMovieDetails(movieId);
