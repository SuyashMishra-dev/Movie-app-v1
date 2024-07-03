const {
  getMovies,
  getMovieById,
  addComment,
  toggleFavorite,
} = require("../data/movies");

exports.getMoviesList = (req, res) => {
  res.json(getMovies());
};
exports.getMovieById = (req, res) => {
  const movie = getMovieById(req.params.id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.json(movie);
};
exports.addComment = (req, res) => {
  const movieId = req.params.id;
  const { id, text } = req.body;
  const updatedMovie = addComment(movieId, { id, text });
  if (!updatedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.json(updatedMovie);
};
exports.toggleFavorite = (req, res) => {
  const updatedMovie = toggleFavorite(req.params.id);
  if (!updatedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.json(updatedMovie);
};
exports.getFavorites = (req, res) => {
  const favorites = getMovies().filter((m) => m.isFavorite);
  res.json(favorites);
};
