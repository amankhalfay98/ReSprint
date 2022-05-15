import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import Api from '../services/api';
import { Button } from '@material-ui/core';

function Storyform(props) {
	const api = new Api();
	const { currentUser } = useContext(AuthContext);
	const [projectData, setProjectData] = useState(undefined);
	const [projectUsers, setProjectUsers] = useState(undefined);
	console.log(props);

	let description;
	let title;
	let story_point;
	let priority;
	let members;
	let projectId = localStorage.getItem('project');

	useEffect(() => {
		const api = new Api();
		async function getAllProjects() {
			try {
				const { project } = await api.getProjectById(projectId);
				console.log(project);
				if (project) setProjectData(project);
			} catch (error) {
				console.log(error.message);
			}
		}
		getAllProjects();
	}, []);

	useEffect(() => {
		const api = new Api();
		async function getAllUsers() {
			try {
				const { users } = await api.getAllMembers('', projectId);
				console.log(users);
				if (users) setProjectUsers(users);
			} catch (error) {
				console.log(error.message);
			}
		}
		getAllUsers();
	}, []);

	const optionGenerator = (member) => {
		return (
			<option key={member.id} value={member.id}>
				{member.userName}
			</option>
		);
	};

	if (projectData && projectUsers) {
		members =
			projectUsers &&
			projectUsers.map((user) => {
				return optionGenerator(user);
			});
	}

	return (
		<form
			className="form"
			id="add-story"
			onSubmit={(e) => {
				console.log(description.value);
				console.log(title.value);
				console.log(priority.value);
				console.log(story_point.value);
				console.log(e.target.elements.member.value);
				e.preventDefault();
				try {
					api.upsertStory({
						createdBy: currentUser.uid,
						assignedTo: e.target.elements.member.value,
						comments: [],
						createdAt: new Date().toISOString(),
						description: description.value,
						modifiedAt: new Date().toISOString(),
						priority: parseInt(priority.value),
						sprint: 0,
						status: 'To do',
						storyPoint: parseInt(story_point.value),
						title: title.value,
						type: 'Feature',
						projectId: projectId,
					});
					description.value = '';
					title.value = '';
					priority.value = '';
					story_point.value = '';
				} catch (err) {
					alert(err.message);
				}
				alert('Story is created');
				window.location.pathname = '/backlog';
			}}
		>
			<h2>Add New User Story</h2>
			<div className="form-group">
				<label>
					Assigned To:
					<select name="member" id="member">
						<option value="">--Please choose an option--</option>
						{members}
					</select>
				</label>
			</div>
			<div className="form-group">
				<label>
					Description:
					<br />
					<input
						ref={(node) => {
							description = node;
						}}
					/>
				</label>
			</div>
			<br />
			<div className="form-group">
				<label>
					Priority
					<br />
					<input
						type="number"
						ref={(node) => {
							priority = node;
						}}
					/>
				</label>
			</div>
			<br />
			<div className="form-group">
				<label>
					Story Point:
					<br />
					<input
						type="number"
						ref={(node) => {
							story_point = node;
						}}
					/>
				</label>
			</div>
			<br />
			<div className="form-group">
				<label>
					Title:
					<br />
					<input
						ref={(node) => {
							title = node;
						}}
					/>
				</label>
			</div>
			<br />
			<br />

			<Button variant="outlined" type="submit">
				Submit
			</Button>
		</form>
	);
}

export default Storyform;
