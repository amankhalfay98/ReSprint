import React, { useState, useEffect } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import Api from '../services/api';

import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';

const UserStories = () => {
	let card = null;
	const [storyData, setStoryData] = useState(undefined);
	useEffect(() => {
		const api = new Api();
		async function getStories() {
			try {
				const { stories } = await api.getStories();
				console.log(stories);
				if (stories) setStoryData(stories);
			} catch (error) {
				alert(error.message);
				console.log(error.message);
			}
		}
		getStories();
	}, []);

	if (storyData && Array.isArray(storyData)) {
		card = storyData.map((story) => {
			return (
				<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={story.id}>
					<Card variant="outlined" key={story.id}>
						<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									<NavLink
										to={{
											pathname: '/individualUserStory',
											story: `${story.id}`,
										}}
									>
										{' '}
										<li>{story.title}</li>
									</NavLink>
									<li>{story.description}</li>;<li>{story.status}</li>;
									<li>{story.createdAt}</li>;
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			);
		});
	}

	return (
		<div>
			<Card variant="outlined">
				<CardActionArea>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							USER STORIES:
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<ul>{card}</ul>
		</div>
	);
};

export default UserStories;
