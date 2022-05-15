import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../firebase/Auth';
import { NavLink } from "react-router-dom";
import "../App.css";
import Api from '../services/api'

const Projects = () => {
  const { currentUser } = useContext(AuthContext);
	//console.log('This is coming from the Project Component: ', currentUser.uid);
  let card = null;
  const [projectData, setProjectData] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const[company,setCompany] = useState(undefined);

  useEffect(() => {
    const api = new Api();
    async function getUserById() {
      try {
        const {user } = await api.getUserById(currentUser.uid) ; 
        //console.log(user);
        if (user) {
          setUser(user);
          try {
            const{company} = await api.getCompanyById(user.company);
            setCompany(company);
            const {projects } = await api.getAllProjects(user.company) ;
            //console.log(projects);
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

  const handelClick = (proj)=>{
    localStorage.setItem('sprint',`${proj.totalSprints}`);
   localStorage.setItem('project',`${proj.id}`);
   window.location.href = '/backlog';

  }
  
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

  

  const deleteProject = async(id,memId)=>{
    const api = new Api();
    try {
            const {status} = await api.deleteProject(id,memId) ; 
            console.log(status);
            if (status==='success') {
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
        <button onClick={(e)=>{ e.preventDefault();handelClick(project)}}>{project.projectName}</button>
      {/* <NavLink to={{pathname:'/backlog', sprint:`${project.totalSprints}`, project:`${project.id}`}}>Project Name:{project.projectName}</NavLink> */}
      <li>Company:{company.companyName}</li>
      <li>Total Sprints:{project.totalSprints}</li>
      {user && user.isScrumMaster?<button onClick={()=>deleteProject(project.id,user.id)}>Delete Project</button>:""}
      </div>
    );
  }
  
  // async function getCompany(company) {
  //   let companyData = await api.getCompanyById(company);
  //   // let memberData = null;
  //   // if (members) {
  //   //   memberData = members.map((member) => getMemberById(member));
  //   // }
  //   return Promise.all(companyData);
  // }

  if (user && projectData && Array.isArray(projectData)) {
    card = projectData.map((project) => {
      //let company = getCompany(project.company)
        return(
          buildCard(project)
          )
    });
  }

  return (
    <div>
      <ul>{card}</ul>
      {user && user.isScrumMaster?<NavLink to= '/newproject'>New Project</NavLink> :"" }
    </div>
  );
};

export default Projects;