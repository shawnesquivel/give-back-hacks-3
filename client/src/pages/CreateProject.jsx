import React from "react";
import NavbarColumn from "../components/NavbarColumn";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";

import CreateProjectForm from "../components/CreateProjectForm";
const CreateProject = () => {
  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn active="createproject" />
      </div>

      <main className="dashboard">
        <header className="dashboard-header">
          <h6>Create Project</h6>
          <div className="links">
            <Link to="/settings" className="link">
              Settings
            </Link>
            <Link to="/profile">
              <img src={avatar} alt="avatar" className="avatar-sm" />
            </Link>
          </div>
        </header>
        <div>
          <CreateProjectForm />
        </div>
      </main>
    </section>
  );
};

export default CreateProject;
