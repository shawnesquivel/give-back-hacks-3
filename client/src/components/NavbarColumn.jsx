import React from "react";
import { Link } from "react-router-dom";
import "../index.scss";

const Navbar = () => {
  return (
    <nav className="links--col">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/login">
        Login
      </Link>
      <Link className="link" to="/createprofile">
        Create Profile
      </Link>
      <Link className="link" to="/dashboard">
        Dashboard
      </Link>
      <Link className="link" to="/browse">
        Browse
      </Link>
      <Link className="link" to="/profile">
        Profile
      </Link>
      <Link className="link" to="/createproject">
        Create Project
      </Link>
    </nav>
  );
};

export default Navbar;
