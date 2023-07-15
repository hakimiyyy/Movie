function displayMovies(movies) {
  const demo1Element = document.getElementById("demo1");
  const demoElement = document.getElementById("demo");

  demo1Element.innerHTML = "";
  demoElement.innerHTML = "";

  movies.forEach((movie) => {
    const title = movie.Title;
    const year = movie.Year;
    const poster = movie.Poster;
    const id = movie.imdbID;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const posterElement = document.createElement("img");
    posterElement.src = poster;
    posterElement.alt = `${title} Poster`;

    const idElement = document.createElement("idmov");
    idElement.classList.add("id");
    idElement.textContent = `ID: ${id}`;

    const detailsElement = document.createElement("p");
    detailsElement.textContent = `${title} (${year})`;

    const buttonElement = document.createElement("a");
    buttonElement.href = `viewmovie.html?i=${id}`;
    buttonElement.textContent = "Movie Details";
    buttonElement.href = `viewmovie.html?id=${id}`; 

    
    buttonElement.addEventListener("click", () => {
      fetchMovieDetails(id);
    });

    movieElement.appendChild(posterElement);
    movieElement.appendChild(detailsElement);
    movieElement.appendChild(buttonElement);
    movieElement.appendChild(idElement);

    demo1Element.appendChild(movieElement);
  });
}

function buttonClicked() {
  const apiKey = 'd35b21da';
  const searchQuery = document.getElementById("searchInput").value;

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const results = data.Search;

      displayMovies(results);
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchMovieDetails(movieId) {
  const apiKey = 'd35b21da';
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const synopsis = data.Plot;
      const cast = data.Actors;
      const releaseDate = data.Released;
      const ratings = data.Ratings;
      const poster = data.Poster;


      document.getElementById("synopsis").textContent = synopsis;
      document.getElementById("cast").textContent = cast;
      document.getElementById("release-date").textContent = releaseDate;
      document.getElementById("ratings").textContent = JSON.stringify(ratings);
      document.getElementById("poster").src = poster;
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchMovieDetails(movieId) {
  const apiKey = 'd35b21da';
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('movieDetails', JSON.stringify(data)); 
      window.location.href = 'viewmovie.html'; 
    })
    .catch((error) => {
      console.error(error);
    });
}
