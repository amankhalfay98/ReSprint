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
	let initialarray = [];
	const [storyData, setStoryData] = useState({});

	const api = new Api();
	useEffect(() => {
		async function getUserById() {
			try {
				const { user } = await api.getUserById(currentUser.uid);
				//console.log(user);
				if (user) {
					setUser(user);
					try {
						const { company } = await api.getCompanyById(user.company);
						setCompany(company);
						const { projects } = await api.getAllProjects(user.company);
						//console.log(projects);
						if (projects) setProjectData(projects);
						for (let i = 0; i < projectData.length; i++) {
							const { stories } = await api.getStories(projectData[i].id);
							console.log('story', stories);
							if (stories) setStoryData();

							console.log('storyData:', storyData);
						}
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

	// const buildCard = (project) => {
	// 	storyData.map((story) => {
	// 		console.log('story', story);
	// 		if (story.projectId == project.id)
	// 			return (
	// 				<div className="project_card" key={project.id}>
	// 					<p>Project Name:{project.projectName}</p>
	// 					<li>Total Sprints:{project.totalSprints}</li>
	// 					<p>Story title: {story.title}</p>
	// 				</div>
	// 			);
	// 	});
	// };

	async function getstory(projectid) {
		const stories = await api.getStories(projectid);
		console.log('stories', stories);
	}

	const buildCard = (project) => {
		return (
			<div className="project_card" key={project.id}>
				<p>Project Name:{project.projectName}</p>
				<li>Total Sprints:{project.totalSprints}</li>
			</div>
		);
	};

	if (user && projectData && Array.isArray(projectData)) {
		card = projectData.map((project) => {
			getstory(project.id);
			return buildCard(project);
		});
	}

	return (
		<div>
			<ul>{card}</ul>
		</div>
	);
};

export default Projects;
