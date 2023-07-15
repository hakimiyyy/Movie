const moviesContainer = document.getElementById('movies');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const recommendedMoviesContainer = document.getElementById('recommendedMovies');

async function fetchMoviesByGenre(genre) {
  const apiKey = 'd35b21da';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(genre)}&type=movie`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.Search;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

async function fetchMoviesByTitle(title) {
  const apiKey = 'd35b21da';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.Search;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
      <h3>${movie.Title}</h3>
      <p>Released: ${movie.Year}</p>
      <p>Imdb ID: ${movie.imdbID}</p>
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="200">
    `;

    movieElement.addEventListener('click', () => {
      window.location.href = `movie.html?id=${movie.imdbID}`;
    });

    moviesContainer.appendChild(movieElement);
  });
}

async function fetchRecommendedMovies(genre) {
  const apiKey = 'd35b21da';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${genre}&type=movie`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.Search;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    return [];
  }
}

function displayRecommendedMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.sort((a, b) => b.Year - a.Year);

  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
      <h3>${movie.Title}</h3>
      <p>Released: ${movie.Year}</p>
      <p>Imdb ID: ${movie.imdbID}</p>
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="200">
    `;

    movieElement.addEventListener('click', () => {
      window.location.href = `movie.html?id=${movie.imdbID}`;
    });

    moviesContainer.appendChild(movieElement);
  });
}

function handleSearchButtonClick() {
  const searchInputValue = searchInput.value.trim();

  if (searchInputValue !== '') {
    fetchMoviesByTitle(searchInputValue)
      .then((movies) => {
        displayMovies(movies);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

function loadRecommendedMovies(genre) {
  fetchRecommendedMovies(genre)
    .then((movies) => {
      displayRecommendedMovies(movies);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

searchButton.addEventListener('click', handleSearchButtonClick);

loadRecommendedMovies('action');
