import React from "react";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";

const CurrentProjects = ({ currentProjects }) => {
  useEffect(() => {
    console.log(currentProjects);
  }, []);
  return (
    <div>
      <h2>Your Projects</h2>
      <div className="card-container">
        {currentProjects?.map((project, index) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  );
};

export default CurrentProjects;
