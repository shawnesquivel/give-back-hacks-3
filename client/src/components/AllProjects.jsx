import React from "react";
import ProjectCard from "./ProjectCard";

const AllProjects = ({ currentProjects }) => {
  return (
    <div>
      <h4>All Projects</h4>
      <div className="card-container">
        {currentProjects?.map((project, index) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
