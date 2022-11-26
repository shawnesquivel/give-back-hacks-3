import React from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
const CurrentProjects = () => {
  return (
    <div>
      <h1>Current Projects</h1>
      <ProjectCard />
      <h1>Current Volunteer</h1>
      <ProjectCard />
      <h1>Current Funding</h1>
      <ProjectCard />
      <h1>Recommended</h1>
      <ProjectCard />
    </div>
  );
};

export default CurrentProjects;
