export const BASE_URL = "http://localhost:3001";

export const THUMBNAIL_BASE_URL = "https://via.placeholder.com/150?text";

export const endPoints = {
  movies: {
    fetchMovies: "api/movies",
    fetchSingleMovieDetails: "api/movies/:movieId",
    addNewMovie: "api/admin/movies",
  },
  comments: {
    addCommentOnMovie: "api/movies/:movieId/comments",
    fetchMovieComments: "api/:movieId/comments",
  },
  favorites: {
    addToFavorites: "api/movies/:movieId/favorite",
    fetchFavoritesList: "api/favorites",
  },
};
