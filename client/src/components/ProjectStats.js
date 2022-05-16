import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
// import { NavLink } from 'react-router-dom';
import '../App.css';
import Api from '../services/api';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
const Projects = () => {
	const { currentUser } = useContext(AuthContext);
	let card = null;
	const [projectData, setProjectData] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [company, setCompany] = useState(undefined);
    let titleArray = [];
	let sprintArray = [];
	const [storyData, setStoryData] = useState(undefined);
	const [sprintData, setSprintData] = useState(undefined);
	
	
	
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
						console.log(projects);
						if (projects) setProjectData(projects);
				
							const { stories } = await api.getStories();
							console.log('story is', stories);
							if (stories)
						{
							
							
							for (let i = 0; i<stories.length; i++){
								for(let j=0; j<projects.length; j++){
									if(stories[i].projectId==projects[j].id)
									titleArray.push(stories[i].title)
									sprintArray.push(stories[i].priority)
								}
							}
							setStoryData(titleArray)
							setSprintData(sprintArray)
							console.log(sprintArray)

						}
						
					} catch (error) {
						alert(error.message);
						console.log(error.message);
					}
				}
			} catch (error) {
				alert(error.message);
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

	// async function getstory(projectid) {
	// 	const stories = await api.getStories(projectid);
	// 	console.log('stories', stories);
	// }

	// const buildCard = (project) => {
	// 	return (
	// 		<div className="project_card" key={project.id}>
	// 			<p>Project Name:{project.projectName}</p>
	// 			<li>Total Sprints:{project.totalSprints}</li>
	// 		</div>
	// 	);
	// };

	// if (user && projectData && Array.isArray(projectData)) {
	// 	card = projectData.map((project) => {
	// 		getstory(project.id);
	// 		return buildCard(project);
	// 	});
	// }

	return (
		<div className='class-grades-container'>
		<h1>Statistics For User Stories and Priorities</h1>
			<Bar 
				data={{
					labels: storyData,
					datasets: [
						{
							label: "Total Sprints",
							data: sprintData
						}
					]
				}}
			/>
	</div>
	);
};

export default Projects;
