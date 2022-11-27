import React from "react";

import CreateProjectForm from "../components/CreateProjectForm";
import ProjectCard from "../components/ProjectCard";
const CreateProject = () => {
  return (
    <div>
      <h1>Create Project</h1>

      <div>
        <h1>Select Either</h1>
        <button>Create New</button>
        <button>Use Past Projects</button>
      </div>
      <div>
        <h1>Drafts</h1>
        <ProjectCard />
      </div>
      <CreateProjectForm />
    </div>
  );
};

export default CreateProject;
