import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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

  const buildCard = (project)=>{
    return (
      <div key={project.id}>
      <li><a href={`/projects/${project.id}`}>{project.projectName}</a></li>
      <li>{project.company}</li>
      <li>{project.totalSprints}</li>
      </div>
    );
  }
  

  if (projectData && Array.isArray(projectData)) {
    card = projectData.map((project) => {
      return(
      buildCard(project)
      )
    });
  }

  return (
    <div>
      <ul>{card}</ul>
      <NavLink to= '/newproject'>New Project</NavLink>  
    </div>
  );
};

export default Projects;