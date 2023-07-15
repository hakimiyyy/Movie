let watchlist = [];

function createMovie() {
  const movieName = document.getElementById("fileName").value;

  watchlist.push({ title: movieName, watched: false });
  document.getElementById("fileName").value = "";

  saveWatchlist(); 
  readMovies();
}

function readMovies() {
  const fileDisplay = document.getElementById("fileDisplay");
  const watchedContainer = document.querySelector(".watchedContainer");
  const watchedMovies = document.getElementById("watchedMovies");

  fileDisplay.innerHTML = "";
  watchedMovies.innerHTML = "";

  watchlist.forEach((movie, index) => {
    fetch(`https://www.omdbapi.com/?apikey=d35b21da&t=${encodeURIComponent(movie.title)}`)
      .then((response) => response.json())
      .then((data) => {
        const movieElement = createMovieElement(data, index);

        if (movie.watched) {
          watchedMovies.appendChild(movieElement);
        } else {
          fileDisplay.appendChild(movieElement);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

function createMovieElement(data, index) {
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");

  const posterElement = document.createElement("img");
  posterElement.src = data.Poster;
  posterElement.alt = `${data.Title} Poster`;

  const movieNameElement = document.createElement("p");
  movieNameElement.textContent = data.Title;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove from Watchlist";
  deleteButton.addEventListener("click", () => {
    deleteMovie(index);
  });

  const updateButton = document.createElement("button");
  updateButton.textContent = "Mark as Watched";
  updateButton.addEventListener("click", () => {
    updateMovie(index);
  });

  movieElement.appendChild(posterElement);
  movieElement.appendChild(movieNameElement);
  movieElement.appendChild(deleteButton);
  movieElement.appendChild(updateButton);

  return movieElement;
}

function deleteMovie(index) {
  if (index >= 0 && index < watchlist.length) {
    watchlist.splice(index, 1);
    saveWatchlist(); 
    readMovies();
  }
}

function updateMovie(index) {
  if (index >= 0 && index < watchlist.length) {
    watchlist[index].watched = true;
    saveWatchlist(); 
    readMovies();
  }
}

function saveWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function loadWatchlist() {
  const savedWatchlist = localStorage.getItem("watchlist");

  if (savedWatchlist) {
    watchlist = JSON.parse(savedWatchlist);
  }
}


loadWatchlist();


readMovies();
