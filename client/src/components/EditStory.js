import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import Api from '../services/api';
import { Button } from '@material-ui/core';

function EditStory(props) {
	const api = new Api();
	const { currentUser } = useContext(AuthContext);
	const [projectData, setProjectData] = useState(undefined);
	const [projectUsers, setProjectUsers] = useState(undefined);
	const [updateStory, setStory] = useState(undefined);
	console.log(props);

	let description;
	let title;
	let story_point;
	let priority;
	let sprint;
	let members;
	let projectId = localStorage.getItem('project');
	let storyVal = localStorage.getItem('story');

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
	}, [projectId]);

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
	}, [projectId]);

	useEffect(() => {
		const api = new Api();
		async function getStory() {
			try {
				const { story } = await api.getStoryById(storyVal);
				console.log(story);
				if (story) setStory(story);
			} catch (error) {
				console.log(error.message);
			}
		}
		getStory();
	}, [storyVal]);

	const optionGenerator = (member) => {
		return (
			<option key={member.id} value={member.id}>
				{member.userName}
			</option>
		);
	};

	if (projectData && projectUsers && updateStory) {
		members =
			projectUsers &&
			projectUsers.map((user) => {
				return optionGenerator(user);
			});
	}

	if (updateStory && projectData) {
		return (
			<form
				className="form"
				id="add-story"
				onSubmit={(e) => {
					console.log(description.value);
					console.log(title.value);
					console.log(priority.value);
					console.log(sprint.value);
					console.log(story_point.value);
					console.log(e.target.elements.member.value);
					e.preventDefault();
					try {
						if (parseInt(sprint.value) > parseInt(projectData.totalSprints)) {
							throw Error(
								'Sprint Value cannot be greater than total sprints of project'
							);
						}

						api.upsertStory({
							createdBy: currentUser.uid,
							assignedTo: e.target.elements.member.value,
							comments: updateStory.comments,
							createdAt: updateStory.createdAt,
							description: description.value,
							modifiedAt: new Date().toISOString(),
							priority: parseInt(priority.value),
							sprint: parseInt(sprint.value),
							status: e.target.elements.status.value,
							storyPoint: parseInt(story_point.value),
							title: title.value,
							type: e.target.elements.type.value,
							projectId: projectId,
							id: updateStory.id,
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
						<select
							name="member"
							id="member"
							defaultValue={`${updateStory.assignedTo}`}
						>
							{members}
						</select>
					</label>
				</div>
				<div className="form-group">
					<label>
						Description:
						<br />
						<input
							defaultValue={`${updateStory.description}`}
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
							defaultValue={`${updateStory.priority}`}
							ref={(node) => {
								priority = node;
							}}
						/>
					</label>
				</div>
				<br />
				<br />
				<div className="form-group">
					<label>
						Sprint (Max value can be {`${projectData.totalSprints}`})
						<br />
						<input
							type="number"
							defaultValue={`${updateStory.sprint}`}
							ref={(node) => {
								sprint = node;
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
							defaultValue={`${updateStory.storyPoint}`}
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
							defaultValue={`${updateStory.title}`}
							ref={(node) => {
								title = node;
							}}
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						Status:
						<select name="status" id="status" defaultValue={updateStory.status}>
							<option value="To do">To do</option>
							<option value="In Progress">In Progress</option>
							<option value="Review">Review</option>
							<option value="Completed">Completed</option>
						</select>
					</label>
				</div>
				<div className="form-group">
					<label>
						Type:
						<select name="type" id="type" defaultValue={updateStory.type}>
							<option value="Feature">Feature</option>
							<option value="Bug">Bug</option>
							<option value="Enhancement">Enhancement</option>
						</select>
					</label>
				</div>
				<br />
				<br />

				<Button variant="outlined" type="submit">
					Submit
				</Button>
			</form>
		);
	} else {
		return <h2>Loading...</h2>;
	}
}

export default EditStory;
