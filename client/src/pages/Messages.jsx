import React from "react";
import CurrentProjects from "../components/CurrentProjects";
import NavbarColumn from "../components/NavbarColumn";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";

const Messages = () => {
  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn active="messages" />
      </div>

      <main className="dashboard">
        <header className="dashboard-header">
          <h6>Messages</h6>
          <div className="links">
            <Link to="/settings" className="link">
              Settings
            </Link>
            <Link to="/profile">
              <img src={avatar} alt="avatar" className="avatar-sm" />
            </Link>
          </div>
        </header>
        <p>Coming Soon!</p>
      </main>
    </section>
  );
};

export default Messages;
