import React, { useState, useEffect } from "react";
import CurrentProjects from "../components/CurrentProjects";
import NavbarColumn from "../components/NavbarColumn";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";

const GETUSER_URL = "/api/getuser";
const GET_PROJECT_URL = "/api/getproject";

const Dashboard = () => {
  const { auth } = useAuth(AuthContext);

  const [userData, setUserData] = useState("");
  // get user data
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = auth?.user;
    const payload = JSON.stringify({
      token: localStorage.getItem("token"),
    });
    const response = await axios.post(GETUSER_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    setUserData(response.data.user);
  };

  // get current projects
  const [currentProjects, setCurrentProjects] = useState([]);

  useEffect(() => {
    getAllCurrentProjects(userData);
  }, [userData]);

  const getAllCurrentProjects = async (user) => {
    user?.currentProjects?.forEach(async (project) => {
      await getProjectData(project);
    });
  };

  const getProjectData = async (projectID) => {
    try {
      const payload = JSON.stringify({
        projectID: projectID,
      });
      console.log("payload", payload);
      const response = await axios.post(GET_PROJECT_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Response:", response);

      pushProjectToCurrentProjects(response.data.project);
    } catch (err) {
      console.log(err);
    }
  };
  const pushProjectToCurrentProjects = (project) => {
    setCurrentProjects((currentProjects) => [...currentProjects, project]);
  };

  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn active={"dashboard"} />
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

        {userData ? <p>Welcome back, {userData.name}!</p> : ""}

        <CurrentProjects currentProjects={currentProjects} />
      </main>
    </section>
  );
};

export default Dashboard;
