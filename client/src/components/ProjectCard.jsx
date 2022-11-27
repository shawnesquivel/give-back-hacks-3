import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
const moment = require("moment");
const ProjectCard = ({ project }) => {
  return (
    <button key={project._id} className="card">
      <Link to="/expandproject" state={{ data: project }} className="link">
        <h6 className="c-black mb-p5">{project.title}</h6>
        <div className="comment-header-left mb-3">
          <img src={avatar} alt="avatar" className="avatar-sm" />
          <h5>Shawn Esquivel</h5>
        </div>
        <p>
          {" "}
          {!project.date
            ? "Feb 23, 2023"
            : `${moment(project.date).format("MMMM Do YYYY")}`}{" "}
          @ {project.time}
        </p>
      </Link>
    </button>
  );
};

export default ProjectCard;
