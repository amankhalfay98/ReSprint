import React, { useState, useEffect } from 'react';
import '../App.css';
//import { Link } from 'react-router-dom';
import Api from '../services/api';

import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
  makeStyles,
	Typography
} from '@material-ui/core';
import { NavLink } from 'react-bootstrap';

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
		// backgroundColor: theme.palette.primary || 'red'
	  }
});

const UserStories = (props) => {
  const classes = useStyles();
	console.log(props.location);
	//let card = null;
	const [storyy, setstoryy] = useState(undefined);
  const [user, setUser] = useState(undefined);

  // useEffect(() => {
  //   const api = new Api();
  //   async function getStories() {
  //     try {
  //       const { story } = await api.getStoryById(props.location.story);
  //       console.log(story);
  //       if (story) {
  //         setstoryy(story);
  //         try {
  //           const{company} = await api.getCompanyById(user.company);
  //           setCompany(company);
  //           const {projects } = await api.getAllProjects(user.company) ;
  //           console.log(projects);
  //           if (projects) setProjectData(projects);
  //         } catch (error) {
  //           console.log(error.message);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   getStories();
  // }, [props.location.story]);

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

  // useEffect(() => {
  //   const api = new Api();
  //   async function getUserById() {
  //     try {
  //       const {user } = await api.getUserById(storyy.assignedTo) ; 
  //       console.log(user);
  //       if (user) {
  //         setUser(user);
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   getUserById();
  // }, [storyy.assignedTo]);

	if (storyy && user) {
		return (
			<div>
				<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={storyy.id}>
					<Card className={classes.card} variant="outlined">
						<CardActionArea>
								<CardContent>
									<Typography
										className={classes.titleHead}
										gutterBottom
										variant="h6"
										component="h3"
									>
										{storyy.title}
									</Typography>
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
        
				{/* <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={storyy.id}>
				<Card  variant="outlined">
					<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
								{storyy.title}
								</Typography>
							</CardContent>
					</CardActionArea>
				</Card>
			</Grid> */}
      <div>
      <NavLink to={`/reportissue/${storyy.id}`}>Report An Issue</NavLink>
      </div>
			</div>
		);
	} else {
		return <h2>Loading...</h2>;
	}
};

export default UserStories;
