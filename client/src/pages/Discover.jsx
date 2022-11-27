import React from "react";
import NavbarColumn from "../components/NavbarColumn";

import { Link } from "react-router-dom";

const Discover = () => {
  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn />
      </div>

      <main className="dashboard">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="links">
            <Link to="/settings">Settings</Link>
            <Link to="/profile">
              <img src="" alt="avatar" />
            </Link>
          </div>
        </header>
      </main>
    </section>
  );
};

export default Discover;
