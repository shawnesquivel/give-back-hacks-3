import React from "react";
import NavbarColumn from "../components/NavbarColumn";
import avatar from "../assets/avatar.png";
import AllProjects from "../components/AllProjects";
import { Link } from "react-router-dom";

const Discover = () => {
  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn active="dashboard" />
      </div>

      <main className="dashboard">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="links">
            <Link to="/settings" className="link">
              Settings
            </Link>
            <Link to="/profile">
              <img src={avatar} alt="avatar" className="avatar-sm" />
            </Link>
          </div>
        </header>

        <AllProjects currentProjects={currentProjects} />
      </main>
    </section>
  );
};

export default Discover;
