import React, { useState, useEffect } from "react";
import CurrentProjects from "../components/CurrentProjects";
import NavbarColumn from "../components/NavbarColumn";
import { Link } from "react-router-dom";
const GETUSER_URL = "/api/getuser";

const Dashboard = () => {
  return (
    <div>
      <NavbarColumn />
      <h1>Dashboard</h1>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
      <CurrentProjects />
    </div>
  );
};

export default Dashboard;
