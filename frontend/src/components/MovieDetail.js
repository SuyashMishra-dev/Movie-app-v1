import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/movies/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    const newComment = { id: Date.now(), text: comment }; // Generate unique id for new comment
    axios
      .post(`${BASE_URL}/api/movies/${id}/comments`, newComment)
      .then((response) => {
        setMovie(response.data);
        setComment("");
        toast("Comment added");
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  const toggleFavorite = () => {
    axios
      .post(`${BASE_URL}/api/movies/${id}/favorite`)
      .then((response) => {
        setMovie(response.data);
        toast(
          response.data.isFavorite
            ? "Added to favorites"
            : "Removed from favorites"
        );
      })
      .catch((error) => console.error("Error toggling favorite:", error));
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold mb-4">{movie.name}</h1>
        <button onClick={toggleFavorite}>
          {movie.isFavorite ? (
            <AiFillHeart
              title="Click to remove from favorites"
              className="text-red-500"
              size={24}
            />
          ) : (
            <AiOutlineHeart
              title="Click for add to favorites"
              className="text-gray-500"
              size={24}
            />
          )}
        </button>
      </div>
      <img
        src={`https://via.placeholder.com/300x200?text=${movie.name}`}
        alt={movie.name}
        className="w-full h-48 object-cover mb-4"
      />
      <p className="mb-4">{movie.description}</p>
      <p className="mb-4">Running Time: {movie.runningTime}</p>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Add a comment"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Comment
          </button>
        </form>
        {movie?.comments?.length ? (
          <h2 className="text-xl font-bold mb-2">Comments:</h2>
        ) : (
          ""
        )}
        {movie.comments.map((comment, ind) => (
          <div key={comment.id} className="border-t border-gray-300 pt-2">
            <p>
              {ind + 1}. {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
