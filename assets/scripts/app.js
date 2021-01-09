const addMovieModal = document.querySelector("#add-modal");
const startAddMovieBtn = document.querySelector("header button");
const backDrop = document.querySelector("#backdrop");
const modalCancelBtn = document.querySelector("#cancel-modal");
const modalAddBtn = document.querySelector("#add-Movie");
const userInputs = addMovieModal.querySelectorAll("input");
// const mDescription = document.querySelector("#description");
const entryText = document.querySelector("#entry-text");
//const deleteElement = document.querySelector("#delete");
const deletionModal = document.querySelector("#delete-modal");
const cancelDeletion = document.querySelector("#cancel-deletion");

const movies = [];

let confirmDeletion = document.querySelector("#confirm-deletion");

const updateUI = () => {
    if(movies.length === 0){
        entryText.style.display = "block";
    }else {
        entryText.style.display = "none";
    }
}
const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        } 
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const movieUnorderedList = document.querySelector("#movie-list");
    movieUnorderedList.children[movieIndex].remove();
    closeMovieDeletionModal();
}

const deleteMovieHandler = (id) => {
  deletionModal.classList.add("visible");
  toggleBackDrop();

  confirmDeletion.replaceWith(confirmDeletion.cloneNode(true));
  confirmDeletion = document.querySelector("#confirm-deletion");

  cancelDeletion.addEventListener("click", cancelMovieDeletion);

  cancelDeletion.addEventListener("click", cancelMovieDeletion);
  confirmDeletion.addEventListener("click", deleteMovie.bind(null, id))
}

const closeMovieDeletionModal = () => {
    deletionModal.classList.remove("visible");
    toggleBackDrop();
}

const cancelMovieDeletion = () =>{
    closeMovieDeletionModal();
}
const renderMovieLists = (id, title, image, description, rating) => {
    const newMovieELement = document.createElement("li");
    newMovieELement.className = "movie-element";
    newMovieELement.innerHTML = `
    <div class="movie-element__image" >
    <img src="${image}" alt="${title}">
    </div>

    <div class="movie-element__info"> 
    <h2>${title}</h2>
    <h6>${description}</h6>
    <p>${rating}/5 <i class="fa fa-star" style="color: yellow;"></i></p> 
    <i class="fa fa-trash-o" id="delete"></i>
    </div>
    `
    newMovieELement.addEventListener("click", deleteMovieHandler.bind(null, id));
    const movieUnorderedList = document.querySelector("#movie-list");
    movieUnorderedList.append(newMovieELement);

}

const closeMovieModal = () => {
    addMovieModal.classList.remove("visible");
}

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackDrop();
};

const toggleBackDrop = () => {
  backDrop.classList.toggle("visible");
};

const clearMovieUserInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const addMovieHandler = () => {
  const movieTitle = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const movieDescription = userInputs[2].value;
  const movieRating = userInputs[3].value;
  
//   const movieDescription = mDescription.value;

  if (
    movieTitle.trim() === "" ||
    imageUrl.trim() === "" ||
    movieRating.trim() === "" ||
    parseInt(movieRating) < 1 ||
    parseInt(movieRating) > 5
  ) {
    alert("Invlaid input, ratings between (1-5).");
    return;
  }

  const newMovies = {
    id: Math.random().toString(),
    title: movieTitle,
    image: imageUrl,
    description: movieDescription,
    rating: movieRating,
    
  };

  movies.push(newMovies);
  console.log(movies);
  clearMovieUserInputs();
  closeMovieModal();
  toggleBackDrop();
  renderMovieLists(newMovies.id ,newMovies.title, newMovies.image, newMovies.description, newMovies.rating);
  updateUI();
 
};

const closeBackdropHandler = () => {
  clearMovieUserInputs();
  closeMovieModal();
  closeMovieDeletionModal();
};
startAddMovieBtn.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", closeBackdropHandler);
modalCancelBtn.addEventListener("click", closeBackdropHandler);
modalAddBtn.addEventListener("click", addMovieHandler);
