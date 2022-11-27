import React from "react";
import { Link } from "react-router-dom";
import "../index.scss";

import logo from "../assets/humankynd-logo.png";

const Navbar = () => {
  // to do: make it active

  return (
    <nav className="links--col">
      <button className="btn-navbar">
        <Link className="link" to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </button>

      <button className="btn-navbar">
        <Link className="link" to="/dashboard">
          Dashboard
        </Link>
      </button>
      <button className="btn-navbar">
        <Link className="link" to="/browse">
          Discover
        </Link>
      </button>
      <button className="btn-navbar">
        <Link className="link" to="/createproject">
          Create Project
        </Link>
      </button>
      <button className="btn-navbar">
        <Link className="link" to="/messages">
          Messages
        </Link>
      </button>
    </nav>
  );
};

export default Navbar;
