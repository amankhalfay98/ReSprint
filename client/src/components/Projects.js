import React, { useState, useEffect } from "react";
//import { User } from "react-feather";
import { NavLink } from "react-router-dom";
import "../App.css";
import Api from '../services/api'

const Projects = () => {
  
  let card = null;
  const [projectData, setProjectData] = useState(undefined);
  //const [user, setUser] = useState(undefined);
  
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

  // useEffect(() => {
  //   const api = new Api();
  //   async function getUserById() {
  //     try {
  //       const {user } = await api.getUserById(id) ; //get session id
  //       console.log(user);
  //       if (user) setUser(user);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   getUserById();
  // }, []);

  // const deleteProject = (id)=>{
  //   const api = new Api();
  //   try {
  //           const {projDel } = await api.deleteProject(id) ; //get session id
  //           console.log(projDel);
  //           if (projDel) {
  //             alert('Project Deleted successfully')
  //         window.location.reload();
  //         }
  //         } catch (error) {
  //           console.log(error.message);
  //         }

  // }

  

  const buildCard = (project)=>{
    return (
      <div className="project_card" key={project.id}>
      <NavLink to={{pathname:'/backlog', project:`${project.id}`}}>Project Name:{project.projectName}</NavLink>
      {/* <li><a href={`/backlog?project=${project.id}`}>Project Name:{project.projectName}</a></li> */}
      <li>Company:{project.company}</li>
      <li>Total Sprints:{project.totalSprints}</li>
      {/* <button onClick={deleteProject(project.id)}>Delete Project</button> */}
      </div>
    );
  }
  

  if (projectData && Array.isArray(projectData)) {
    card = projectData.map((project) => {
      // if(User.company===project.company){

      // }
      return(
      buildCard(project)
      )
    });
  }

  return (
    <div>
      <ul>{card}</ul>
      <NavLink to= '/newproject'>New Project</NavLink> 
      {/* {user.isScrumMaster?<NavLink to= '/newproject'>New Project</NavLink> :"" } */}
    </div>
  );
};

export default Projects;