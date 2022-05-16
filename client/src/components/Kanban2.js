import React, { useState, useEffect } from 'react';
import '../App.css';
import Api from '../services/api';
import { Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';

function Kanban2(props) {
	let cardfortodo = null;
	let cardforinprogress = null;
	let cardforreview = null;
	let cardforcompleted = null;
  let project = localStorage.getItem('project');
  let sprint = localStorage.getItem('IndSprint');
	const api = new Api();

	const [storyData, setStoryData] = useState(undefined);
	useEffect(() => {
		const api = new Api();
		async function getStories() {
			try {
				const { stories } = await api.getStories(project, sprint);
				console.log('All stories are', stories);
				if (stories) setStoryData(stories);
			} catch (error) {
        alert(error.message);
				console.log(error.message);
			}
		}
		getStories();
	}, [project, sprint]);

  function inprogress(story){
    try {
      api.upsertStory({
        createdBy: story.createdBy,
        assignedTo: story.assignedTo,
        comments: story.comments,
        createdAt: story.createdAt,
        description: story.description,
        modifiedAt: story.modifiedAt,
        priority: story.priority,
        sprint: story.sprint,
        status: 'In Progress',
        storyPoint: story.storyPoint,
        title: story.title,
        type: story.type,
        id: story.id,
        projectId: project,
      });
      alert('User Story Moved to IN PROGRESS');
      window.location.pathname = '/kanban';
    } catch (err) {
      alert(err.message);
    }
  }

  function completed(story){
    try {
      api.upsertStory({
        createdBy: story.createdBy,
        assignedTo: story.assignedTo,
        comments: story.comments,
        createdAt: story.createdAt,
        description: story.description,
        modifiedAt: story.modifiedAt,
        priority: story.priority,
        sprint: story.sprint,
        status: 'Completed',
        storyPoint: story.storyPoint,
        title: story.title,
        type: story.type,
        id: story.id,
        projectId: project,
      });
      alert('User Story Moved to COMPLETED');
      window.location.pathname = '/kanban';
    } catch (err) {
      alert(err.message);
    }
    
  }

  function review(story){
    try {
      api.upsertStory({
        createdBy: story.createdBy,
        assignedTo: story.assignedTo,
        comments: story.comments,
        createdAt: story.createdAt,
        description: story.description,
        modifiedAt: story.modifiedAt,
        priority: story.priority,
        sprint: story.sprint,
        status: 'Review',
        storyPoint: story.storyPoint,
        title: story.title,
        type: story.type,
        id: story.id,
        projectId: project,
      });
      alert('User Story Moved to REVIEW');
    window.location.pathname = '/kanban';
    } catch (err) {
      alert(err.message);
    }
  }

	if (storyData && Array.isArray(storyData)) {
		cardfortodo = storyData.map((story) => {
			if (story.status === 'To do') {
				return (
					<Grid item key={story.id}>
						<Card variant="outlined">
							<CardActionArea>
								<Link
									to={{
										pathname: '/individualUserStory',
										story: `${story.id}`,
									}}
								>
									{/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
									<CardContent>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link>  */}
											{story.title}
											{/* <button>Move To Right</button> */}
										</Typography>
									</CardContent>
								</Link>
							</CardActionArea>
							<button
								onClick={(e) => {
									e.preventDefault();
									console.log('story is', story);
									// const {
									//   member
									// } = e.target.elements;
								  inprogress(story)
									
									//window.location.pathname = '/projects';
								}}
							>
								Move To Right{' '}
							</button>
						</Card>
					</Grid>
				);
			} 
		});
	}

	if (storyData && Array.isArray(storyData)) {
		cardforinprogress = storyData.map((story) => {
			if (story.status === 'In Progress') {
				return (
					<Grid item key={story.id}>
						<Card variant="outlined">
							<CardActionArea>
								<Link
									to={{
										pathname: '/individualUserStory',
										story: `${story.id}`,
									}}
								>
									{/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
									<CardContent>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link>  */}
											{story.title}
											{/* <button>Move To Right</button> */}
										</Typography>
									</CardContent>
								</Link>
							</CardActionArea>
							<button
								onClick={(e) => {
									e.preventDefault();
									console.log('story is', story);
                  review(story)
									// const {
									//   member
									// } = e.target.elements;
									
									//window.location.pathname = '/projects';
								}}
							>
								Move To Right{' '}
							</button>
						</Card>
					</Grid>
				);
			} 
		});
	}

	if (storyData && Array.isArray(storyData)) {
		cardforreview = storyData.map((story) => {
			if (story.status === 'Review') {
				return (
					<Grid item key={story.id}>
						<Card variant="outlined">
							<CardActionArea>
								<Link
									to={{
										pathname: '/individualUserStory',
										story: `${story.id}`,
									}}
								>
									{/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
									<CardContent>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link>  */}
											{story.title}
											{/* <button>Move To Right</button> */}
										</Typography>
									</CardContent>
								</Link>
							</CardActionArea>
							<button
								onClick={(e) => {
									e.preventDefault();
									console.log('story is', story);
                  completed(story)
									// const {
									//   member
									// } = e.target.elements;
								
									// window.location.pathname = {pathname:'/backlog', sprint:`${project.totalSprints}`, project:`${project.id}`} ;
								}}
							>
								Move To Right{' '}
							</button>
						</Card>
					</Grid>
				);
			} 
		});
	}

	if (storyData && Array.isArray(storyData)) {
		cardforcompleted = storyData.map((story) => {
			if (story.status === 'Completed') {
				return (
					<Grid item key={story.id}>
						<Card variant="outlined">
							<CardActionArea>
								<Link
									to={{
										pathname: '/individualUserStory',
										story: `${story.id}`,
									}}
								>
									{/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
									<CardContent>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link>  */}
											{story.title}
											{/* <button>Move To Right</button> */}
										</Typography>
									</CardContent>
								</Link>
							</CardActionArea>
						</Card>
					</Grid>
				);
			}
		});
	}

	return (
		<div className="Kanban">
			<div className="drag-n-drop">
				<div className="dnd-group" name="to_do" id="to_do">
					<div className="group-title">To Do</div>
					{cardfortodo}
				</div>
				<div className="dnd-group" id="in_progress">
					<div className="group-title">In Progress</div>
					{cardforinprogress}
				</div>
				<div className="dnd-group" id="review">
					<div className="group-title">Review</div>
					{cardforreview}
				</div>
				<div className="dnd-group" id="completed">
					<div className="group-title">Completed</div>
					{cardforcompleted}
				</div>
			</div>
		</div>
	);
}

export default Kanban2;
