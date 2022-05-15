import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import { NavLink } from 'react-router-dom';
import '../App.css';
import Api from '../services/api';

const Projects = () => {
	const { currentUser } = useContext(AuthContext);
	let card = null;
	const [projectData, setProjectData] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [company, setCompany] = useState(undefined);

	useEffect(() => {
		const api = new Api();
		async function getUserById() {
			try {
				const { user } = await api.getUserById(currentUser.uid);
				if (user) {
					setUser(user);
					try {
						const { company } = await api.getCompanyById(user.company);
						setCompany(company);
						const { projects } = await api.getAllProjects(user.company);
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

	const handelEdit = (proj) => {
		localStorage.setItem('project', `${proj.id}`);
		window.location.href = '/editproject';
	};

	const handelClick = (proj) => {
		localStorage.setItem('sprint', `${proj.totalSprints}`);
		localStorage.setItem('project', `${proj.id}`);
		window.location.href = '/backlog';
	};

	// const handelEdit = (proj) => {
	// 	localStorage.setItem('project', `${proj.id}`);
	// 	window.location.href = '/editproject';
	// };

	const deleteProject = async (id, memId) => {
		const api = new Api();
		try {
			const { status } = await api.deleteProject(id, memId);
			console.log(status);
			if (status === 'success') {
				alert('Project Deleted successfully');
				window.location.reload();
			}
		} catch (error) {
      alert(error.message);
			console.log(error.message);
		}
	};

	const buildCard = (project) => {
		return (
			<div className="project_card" key={project.id}>
				<button
					onClick={(e) => {
						e.preventDefault();
						handelClick(project);
					}}
				>
					{project.projectName}
				</button>
				<li>Company:{company.companyName}</li>
				<li>Total Sprints:{project.totalSprints}</li>
				{user && user.isScrumMaster ? (
					<button
						onClick={(e) => {
							e.preventDefault();
							handelEdit(project);
						}}
					>
						Edit Project
					</button>
				) : (
					''
				)}
				{/* {user && user.isScrumMaster ? (
					<button onClick={(e)=>{
						e.preventDefault();
						handelEdit(project);
					}}>Edit Project</button>
				) : (
					''
				)} */}
				{user && user.isScrumMaster ? (
					<button onClick={() => deleteProject(project.id, user.id)}>
						Delete Project
					</button>
				) : (
					''
				)}
			</div>
		);
	};

	if(user){

	if (
		projectData &&
		Array.isArray(projectData) &&
		projectData.length > 0
	) {
		card = projectData.map((project) => {
			return buildCard(project);
		});
	} else if (
		projectData &&
		projectData.length === 0 &&
		Array.isArray(projectData)
	) {
		return (
			<div>
				<p>Currently there are no Projects</p>
				<p>Scrum Master Needs to add Projects</p>
			</div>
		);
	}

	return (
		<div>
			{user && user.isScrumMaster ? (
				<NavLink to="/newproject">New Project</NavLink>
			) : (
				''
			)}

			<ul>{card}</ul>
		</div>
	);
			}else{
				return(
				<h2>Loading...</h2>
				)
			}
};

export default Projects;
