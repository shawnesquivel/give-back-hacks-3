import React from "react";
import ProjectCard from "./ProjectCard";

const CurrentProjects = ({ currentProjects }) => {
  return (
    <div>
      <h4>Your Projects</h4>
      <div className="card-container">
        {currentProjects?.map((project, index) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  );
};

export default CurrentProjects;
