const express = require("express");
const router = express.Router();
const {
  getMovieById,
  addComment,
  toggleFavorite,
  getFavorites,
  getMoviesList,
} = require("../controllers/movies");

router.get("/movies", getMoviesList);
router.get("/movies/:id", getMovieById);
router.post("/movies/:id/comments", addComment);
router.post("/movies/:id/favorite", toggleFavorite);
router.get("/favorites", getFavorites);

module.exports = router;
