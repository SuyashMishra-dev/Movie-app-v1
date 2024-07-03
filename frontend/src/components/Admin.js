import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/movies`)
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleAddMovie = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/admin/movies`, {
        name,
        description,
        runningTime,
      })
      .then((response) => {
        setMovies([...movies, response.data]);
        setName("");
        setDescription("");
        setRunningTime("");
        toast("Movie added");
      })
      .catch((error) => console.error("Error adding movie:", error));
  };

  const handleDeleteMovie = (id) => {
    axios
      .delete(`${BASE_URL}/api/admin/movies/${id}`)
      .then(() => {
        setMovies(movies.filter((movie) => movie.id !== id));
        toast("Movie deleted");
      })
      .catch((error) => console.error("Error deleting movie:", error));
  };

  const handleSelectMovie = (movieId) => {
    setSelectedMovie(movies.find((movie) => movie.id === movieId));
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(
        `${BASE_URL}/api/admin/movies/${selectedMovie.id}/comments/${commentId}`
      )
      .then((updatedComments) => {
        setSelectedMovie({ ...selectedMovie, comments: updatedComments.data });
        toast("Comment deleted");
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleAddMovie} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          required
        />
        <input
          type="text"
          value={runningTime}
          onChange={(e) => setRunningTime(e.target.value)}
          placeholder="Running Time"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Movie
        </button>
      </form>
      <h2 className="text-xl font-bold mb-2">Movies List</h2>
      <ul className="divide-y divide-gray-300">
        {movies.map((movie) => (
          <>
            <li
              key={movie.id}
              className="py-2 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{movie.name}</h3>
                <p className="text-gray-600">{movie.description}</p>
                <p className="text-gray-600">
                  Running Time: {movie.runningTime}
                </p>
                <button
                  onClick={() => handleSelectMovie(movie.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
                >
                  View Comments
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteMovie(movie.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                >
                  Delete Movie
                </button>
              </div>
            </li>
            {selectedMovie && selectedMovie.id === movie.id && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Comments:</h2>
                <ul className="divide-y divide-gray-300">
                  {selectedMovie?.comments?.length ? (
                    selectedMovie.comments.map((comment, ind) => (
                      <li
                        key={comment.id}
                        className="py-2 flex justify-between items-center"
                      >
                        <p>
                          {ind + 1}. {comment.text}
                        </p>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="bg-red-500 text-white px-4 py-1 rounded"
                        >
                          Delete Comment
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm font-bold mb-2 text-[#333]">
                      No Comments Found
                    </p>
                  )}
                </ul>
              </div>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
