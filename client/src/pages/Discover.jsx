import React, { useState, useEffect } from "react";
import NavbarColumn from "../components/NavbarColumn";
import avatar from "../assets/avatar.png";
import AllProjects from "../components/AllProjects";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Discover = () => {
  const [displayProjects, setDisplayProjects] = useState([]);

  const getAllProjects = async () => {
    console.log("Getting all projects");
    try {
      const allProjectsRes = await axios.get("/api/getallprojects", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(allProjectsRes);
      setDisplayProjects(allProjectsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    console.log(displayProjects);
  }, [displayProjects]);

  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn active="discover" />
      </div>

      <main className="dashboard">
        <header className="dashboard-header">
          <h6>Discover</h6>
          <div className="links">
            <Link to="/settings" className="link">
              Settings
            </Link>
            <Link to="/profile">
              <img src={avatar} alt="avatar" className="avatar-sm" />
            </Link>
          </div>
        </header>
        <AllProjects projects={displayProjects} />
      </main>
    </section>
  );
};

export default Discover;
