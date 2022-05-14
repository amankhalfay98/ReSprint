import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Api from '../services/api';

import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
  makeStyles,
	Typography
} from '@material-ui/core';

const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #4879e2',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #4879e2',
		fontWeight: 'bold'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '100%',
		width: '100%'
	},
	button: {
		backgroundColor:'#ffffff',
		color: '#767676',
		fontWeight: 'bold',
		fontSize: 12
	},
	disabledButton: {
		color: '#767676 !important',
	  }
});

const UserStories = (props) => {
  const classes = useStyles();
	console.log(props.location);
	const [storyy, setstoryy] = useState(undefined);
  const [user, setUser] = useState(undefined);



	useEffect(() => {
		const api = new Api();
		async function getStories() {
			try {
				const { story } = await api.getStoryById(props.location.story);
        console.log(story);
				if (story){
          setstoryy(story);
          try {
            const {user } = await api.getUserById(story.assignedTo) ; 
            //console.log(user);
              setUser(user);
          } catch (error) {
            console.log(error.message);
          }
        } 
			} catch (error) {
				console.log(error.message);
			}
		}
		getStories();
	}, [props.location.story]);

	if (storyy && user) {
    return (
    <div>
       <div>
      <Link to={{pathname:`/reportissue/${storyy.id}`, project:`${storyy.projectId}`}}>Report an Issue</Link>
      </div>
      {/* <ul>
        <li>{storyy.title}</li>
        <li>Description: {storyy.description}</li>
        <li>Assigned To: {user.userName} </li>
        <li>Comments: {storyy.comments} </li>
        <li>Created Date: {storyy.createdAt}</li>
        <li>Modified Date: {storyy.modifiedAt}</li>
        <li>Status: {storyy.status} </li>
        <li>Sprint: {storyy.sprint} </li>
        <li>Type: {storyy.type} </li>
        <li>Story Point: {storyy.storyPoint}</li>
        <li>Priority: {storyy.priority}</li>
      </ul> */}
			<div>
      <Grid container className={classes.grid} spacing={5}>
				<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={storyy.id}>
					<Card className={classes.card} variant="outlined">
						<CardActionArea>
								<CardContent>
                  <Link to={`/reportissue/${storyy.id}`}>
									<Typography
										className={classes.titleHead}
										gutterBottom
										variant="h6"
										component="h3"
									>
										{storyy.title}
									</Typography>
                  </Link>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Description: {storyy.description}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Assigned To: {user.userName}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Comments: {storyy.comments}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Created Date: {storyy.createdAt}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Modified Date: {storyy.modifiedAt}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Status: {storyy.status}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Type: {storyy.type}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Sprint: {storyy.sprint}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Story Point: {storyy.storyPoint}     
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                  Priority: {storyy.priority}     
                  </Typography>
								</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
        </Grid>
			</div>
      </div>
		);
	} else {
		return <h2>Loading...</h2>;
	}
};

export default UserStories;
