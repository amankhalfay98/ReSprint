import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Api from '../services/api';

const UserStories = (props) => {
	console.log(props.location);
	const [storyy, setstoryy] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [comments, setComments] = useState(undefined);

	useEffect(() => {
		const api = new Api();
		let storyId = localStorage.getItem('story');
		async function getStories() {
			try {
				const { story } = await api.getStoryById(storyId);
				console.log(story);
				if (story) {
					setstoryy(story);
					try {
						const { user } = await api.getUserById(story.assignedTo);
						console.log(user);
						if (user) setUser(user);
						const { comments } = await api.getAllComments(story.id);
						console.log(comments);
						if (comments) {
							setComments(comments);
						}
					} catch (error) {
						alert(error.message);
						console.log(error.message);
					}
				}
			} catch (error) {
				console.log(error.message);
			}
		}
		getStories();
	}, []);

	const optionGenerator = (com) => {
		return (
			<div key={com.id}>
				<p>{com.comment}</p>
				{com.name}
			</div>
		);
	};

	let comment =
		user &&
		comments &&
		comments.map((com) => {
			return optionGenerator(com);
		});

	if (storyy && user) {
		return (
			<div>
				<div>
					<Link
						to={{
							pathname: `/reportissue/${storyy.id}`,
							project: `${storyy.projectId}`,
						}}
					>
						Add Comment
					</Link>
					<Link to={{ pathname: `/editform` }}>Edit Story</Link>
				</div>
				<ul>
					<li>{storyy.title}</li>
					<li>Description: {storyy.description}</li>
					<li>Assigned To: {user.userName} </li>
					<li>Comments: {comment}</li>
					<li>Created Date: {storyy.createdAt}</li>
					<li>Modified Date: {storyy.modifiedAt}</li>
					<li>Status: {storyy.status} </li>
					<li>Sprint: {storyy.sprint} </li>
					<li>Type: {storyy.type} </li>
					<li>Story Point: {storyy.storyPoint}</li>
					<li>Priority: {storyy.priority}</li>
				</ul>
				<div></div>
			</div>
		);
	} else {
		return <h2>Loading...</h2>;
	}
};

export default UserStories;
