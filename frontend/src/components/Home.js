import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/movies`)
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const toggleFavorite = (movieId) => {
    axios
      .post(`${BASE_URL}/api/movies/${movieId}/favorite`)
      .then((response) => {
        const updatedMovies = movies.map((movie) =>
          movie.id === movieId ? response.data : movie
        );
        setMovies(updatedMovies);
        toast(
          response.data.isFavorite
            ? "Added to favorites"
            : "Removed from favorites"
        );
      })
      .catch((error) => console.error("Error toggling favorite:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://via.placeholder.com/300x200?text=${movie.name}`}
                alt={movie.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{movie.name}</h2>
                <p className="text-gray-600">{movie.description}</p>
              </div>
            </Link>
            <button
              className="absolute top-2 right-2"
              onClick={() => toggleFavorite(movie.id)}
            >
              {movie.isFavorite ? (
                <AiFillHeart
                  title="Click to remove from favorites."
                  className="text-red-500"
                  size={24}
                />
              ) : (
                <AiOutlineHeart
                  title="Click for add to favorites."
                  className="text-gray-500"
                  size={24}
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
