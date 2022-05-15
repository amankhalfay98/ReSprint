import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import Api from '../services/api';
import { Bar } from 'react-chartjs-2';

const Projects = () => {
	const { currentUser } = useContext(AuthContext);
	const [projectData, setProjectData] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [company, setCompany] = useState(undefined);

	let titleArray = [];
	let sprintArray = [];
	const [storyData, setStoryData] = useState(undefined);
	const [sprintData, setSprintData] = useState(undefined);

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
						console.log(projects);
						if (projects) setProjectData(projects);

						const { stories } = await api.getStories();
						console.log('story is', stories);
						if (stories) {
							for (let i = 0; i < stories.length; i++) {
								for (let j = 0; j < projects.length; j++) {
									if (stories[i].projectId === projects[j].id)
										titleArray.push(stories[i].title);
									sprintArray.push(stories[i].priority);
								}
							}
							setStoryData(titleArray);
							setSprintData(sprintArray);
							console.log(sprintArray);
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
	}, [currentUser, sprintArray, titleArray]);

	return (
		<div className="class-grades-container">
			<h1>Statistics For User Stories and Priorities</h1>
			<Bar
				data={{
					labels: storyData,
					datasets: [
						{
							label: 'Total Sprints',
							data: sprintData,
						},
					],
				}}
			/>
		</div>
	);
};

export default Projects;
