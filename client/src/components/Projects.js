import React, { useState, useEffect } from "react";
import "../App.css";
import Api from '../services/api'

const Projects = () => {
  
  let card = null;
  const [projectData, setProjectData] = useState(undefined);
  useEffect(() => {
    const api = new Api();
    async function getAllProjects() {
      try {
        const {projects } = await api.getAllProjects() ;
        console.log(projects);
        if (projects) setProjectData(projects);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllProjects();
  }, []);
  

  if (projectData && Array.isArray(projectData)) {
    card = projectData.map((project) => {
      return <li key={project.id}>{project.company}</li>;
    });
  }

  return (
    <div>
      <ul>{card}</ul>
      <button>New Project</button>
    </div>
  );
};

export default Projects;