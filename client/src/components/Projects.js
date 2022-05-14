import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../firebase/Auth';
import { NavLink } from "react-router-dom";
import "../App.css";
import Api from '../services/api'

const Projects = () => {
  const { currentUser } = useContext(AuthContext);
	console.log('This is coming from the Project Component: ', currentUser.uid);
  let card = null;
  const [projectData, setProjectData] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const api = new Api();
    async function getUserById() {
      try {
        //const {user } = await api.getUserById('9LaXAim6PZVppWwMajyH93vG0dt2') ; //get session id
        const {user } = await api.getUserById(currentUser.uid) ; 
        console.log(user);
        if (user) {
          setUser(user);
          try {
            const {projects } = await api.getAllProjects(user.company) ;
            console.log(projects);
            if (projects) setProjectData(projects);
          } catch (error) {
            console.log(error.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserById();
  }, [currentUser]);
  
  // useEffect(() => {
  //   const api = new Api();
  //   async function getAllProjects() {
  //     try {
  //       const {projects } = await api.getAllProjects() ;
  //       console.log(projects);
  //       if (projects) setProjectData(projects);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   getAllProjects();
  // }, []);

  

  const deleteProject = async(id)=>{
    const api = new Api();
    try {
            const {projDel } = await api.deleteProject(id) ; 
            console.log(projDel);
            if (projDel) {
              alert('Project Deleted successfully')
          window.location.reload();
          }
          } catch (error) {
            console.log(error.message);
          }

  }

  

  const buildCard = (project)=>{
    return (
      <div className="project_card" key={project.id}>
      <NavLink to={{pathname:'/backlog', project:`${project.id}`}}>Project Name:{project.projectName}</NavLink>
      {/* <li><a href={`/backlog?project=${project.id}`}>Project Name:{project.projectName}</a></li> */}
      <li>Company:{project.company}</li>
      <li>Total Sprints:{project.totalSprints}</li>
      {user && user.isScrumMaster?<button onClick={()=>deleteProject(project.id)}>Delete Project</button>:""}
      </div>
    );
  }
  

  if (user && projectData && Array.isArray(projectData)) {
    card = projectData.map((project) => {
     //if(user.company===project.company){
        return(
          buildCard(project)
          )
     // }  
    });
  }

  return (
    <div>
      <ul>{card}</ul>
      {/* <NavLink to= '/newproject'>New Project</NavLink>  */}
      {user && user.isScrumMaster?<NavLink to= '/newproject'>New Project</NavLink> :"" }
    </div>
  );
};

export default Projects;