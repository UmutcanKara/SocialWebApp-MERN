import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // If logged in
  // todo

  // If not Logged in
  return (
    <nav className=" row ">
      <div className="logo col ">
        <h3>Logo</h3>
        <h3>SocialWebApp</h3>
      </div>
      <div className="auth col">
        <h3 className=" col">
          <Link to="login">Login</Link>
        </h3>
        <h3 className="col">
          <Link to="register">Register</Link>
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
