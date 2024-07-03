const express = require("express");
const {
  addMovie,
  deleteMovie,
  deleteComment,
} = require("../controllers/admin");
const router = express.Router();

router.post("/admin/movies", addMovie);
router.delete("/admin/movies/:id", deleteMovie);
router.delete("/admin/movies/:movieId/comments/:commentId", deleteComment);

module.exports = router;
