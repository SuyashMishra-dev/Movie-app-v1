let movies = [
  {
    id: 1,
    name: "Movie 1",
    description: "Description of Movie 1",
    runningTime: "120 min",
    comments: [],
    isFavorite: false,
  },
  {
    id: 2,
    name: "Movie 2",
    description: "Description of Movie 2",
    runningTime: "90 min",
    comments: [],
    isFavorite: false,
  },
  // Add more dummy movies here
];

const getMovies = () => movies;

const getMovieById = (id) => movies.find((movie) => movie.id === parseInt(id));

const addMovie = (movie) => {
  movies.push(movie);
  return movie;
};

const deleteMovie = (id) => {
  movies = movies.filter((movie) => movie.id !== parseInt(id));
  return movies;
};

const addComment = (movieId, comment) => {
  const movie = getMovieById(movieId);
  if (movie) {
    movie.comments.push(comment);
  }
  return movie;
};

const deleteComment = (movieId, commentId) => {
  const movie = getMovieById(movieId);
  if (movie) {
    movie.comments = movie.comments.filter(
      (comment) => comment.id !== parseInt(commentId)
    );
  }
  return movie;
};

const toggleFavorite = (movieId) => {
  const movie = getMovieById(movieId);
  if (movie) {
    movie.isFavorite = !movie.isFavorite;
  }
  return movie;
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  addComment,
  deleteComment,
  toggleFavorite,
};
