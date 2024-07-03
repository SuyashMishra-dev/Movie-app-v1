// src/components/NavBar.js
import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <NavLink to="/" className="text-white text-xl font-bold">
          Movies App
        </NavLink>
        <div className="flex space-x-4">
          <NavLink to="/" className="text-gray-300 hover:text-white">
            Home
          </NavLink>
          <NavLink to="/favorites" className="text-gray-300 hover:text-white">
            Favorites
          </NavLink>
          <NavLink to="/admin" className="text-gray-300 hover:text-white">
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
