import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <button key={project._id} className="card">
      <Link to="/expandproject" state={{ data: project }}>
        <h1>{project.title}</h1>
        <p> {project.description}</p>
      </Link>
    </button>
  );
};

export default ProjectCard;
