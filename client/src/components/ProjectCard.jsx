import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div key={project._id}>
      <h1>{project.title}</h1>
      <p> {project.description}</p>
    </div>
  );
};

export default ProjectCard;
