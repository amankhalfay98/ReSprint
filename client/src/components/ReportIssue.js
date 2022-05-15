import '../App.css';
import Api from '../services/api';
import { AuthContext } from '../firebase/Auth';
import React, { useContext, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const ReportIssue = (props) => {
	console.log(props.match.params.id);
	const api = new Api();
	const { currentUser } = useContext(AuthContext);
	const [user, setUser] = useState(undefined);
	let project = localStorage.getItem('project');
	let story = localStorage.getItem('story');
	let comment;

	useEffect(() => {
		async function getUserById() {
			const api = new Api();
			try {
				const { user } = await api.getUserById(currentUser.uid);
				console.log(user);
				if (user) {
					setUser(user);
				}
			} catch (error) {
				alert(error.message);
				console.log(error.message);
			}
		}
		getUserById();
	}, [currentUser]);



	async function AddComment(){
		try {
			if (!comment.value) {
				throw Error('Comment is Required');
			}
			let userId = user.id,
				name = user.userName,
				comments = comment.value,
				projectId = project,
				storyId = story;
			let addComment = await api.addComment(
				userId,
				name,
				comments,
				projectId,
				storyId
			);
			comment.value = '';
			if (addComment.status === 'success') {
				alert('Comment has been added');
				window.location.pathname = '/individualUserStory';
			}
		} catch (err) {
			alert(err.message);
		}
	}

	if (user) {
		return (
			<form
				className="form"
				id="report-issue"
				onSubmit={(e) => {
					console.log(comment.value);
					e.preventDefault();
				    AddComment();
				}}
			>
				<h2>Add Comment</h2>
				<div className="form-group">
					<label>
						Comment:
						<br />
						<input
							required
							ref={(node) => {
								comment = node;
							}}
							autoFocus={true}
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
	} else {
		return <h2>Loading...</h2>;
	}
};

export default ReportIssue;
