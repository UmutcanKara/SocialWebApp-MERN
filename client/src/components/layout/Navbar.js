import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // If logged in
  // todo

  // If not Logged in
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Social Website</Link>
      </h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
