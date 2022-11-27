import React from "react";
import { Link } from "react-router-dom";
import "../index.scss";

import logo from "../assets/humankynd-logo.png";
import dashboardIcon from "../assets/dashboard-icon.png";
import discoverIcon from "../assets/discover-icon.png";
import createProjectIcon from "../assets/createprofile-icon.png";
import msgIcon from "../assets/messages-icon.png";
import { useEffect } from "react";

const Navbar = ({ active }) => {
  // to do: make it active
  useEffect(() => {
    console.log(active);
  }, []);
  return (
    <nav className="links--col">
      <button className="btn-navbar">
        <Link className="link" to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </button>

      <button
        className={
          active === "dashboard"
            ? "btn-navbar btn-navbar--active"
            : " btn-navbar"
        }
      >
        <Link className="link" to="/dashboard">
          <img src={dashboardIcon} alt="dashboard icon" className="link-img" />
          Dashboard
        </Link>
      </button>
      <button
        className={
          active === "discover"
            ? "btn-navbar btn-navbar--active"
            : " btn-navbar"
        }
      >
        <Link className="link" to="/browse">
          <img src={discoverIcon} alt="dashboard icon" className="link-img" />
          Discover
        </Link>
      </button>
      <button
        className={
          active === "createproject"
            ? "btn-navbar btn-navbar--active"
            : " btn-navbar"
        }
      >
        <Link className="link" to="/createproject">
          <img
            src={createProjectIcon}
            alt="dashboard icon"
            className="link-img"
          />
          Create Project
        </Link>
      </button>
      <button
        className={
          active === "messages"
            ? "btn-navbar btn-navbar--active"
            : " btn-navbar"
        }
      >
        <Link className="link" to="/messages">
          <img src={msgIcon} alt="dashboard icon" className="link-img" />
          Messages
        </Link>
      </button>
    </nav>
  );
};

export default Navbar;
