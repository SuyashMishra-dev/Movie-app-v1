const { addMovie, deleteMovie, deleteComment } = require("../data/movies");

exports.addMovie = (req, res) => {
  const { name, description, runningTime } = req.body;
  const newMovie = {
    id: Date.now(),
    name,
    description,
    runningTime,
    comments: [],
    isFavorite: false,
  };
  res.json(addMovie(newMovie));
};

exports.deleteMovie = (req, res) => {
  const updatedMovies = deleteMovie(req.params.id);
  res.json(updatedMovies);
};

exports.deleteComment = (req, res) => {
  const { movieId, commentId } = req.params;
  const updatedMovie = deleteComment(movieId, commentId);
  if (!updatedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.json(updatedMovie.comments);
};
