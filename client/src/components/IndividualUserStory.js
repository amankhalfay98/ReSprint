import React, { useState, useEffect } from "react";
import '../App.css';
//import { Link } from 'react-router-dom';
import Api from '../services/api'

import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';

 const UserStories = (props) => {
  console.log(props.location)
  //let card = null;
  const [storyy, setstoryy] = useState(undefined);

  useEffect(() => {
    const api = new Api();
    async function getStories() {
      try {
        const {story}  = await api.getStoryById(props.location.story) ;
        if(story) setstoryy(story);
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories();
  }, [props.location.story]);
  
if(storyy){
  return (
    <div>
     
      <Card  variant="outlined">
					<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
								INDIVIDUAL USER STORY:
								</Typography>
							</CardContent>
					</CardActionArea>
				</Card>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={storyy.id}>
				<Card  variant="outlined">
					<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
								{storyy.title}
								</Typography>
							</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
      
    </div>
  );
 }else{
   return(
<h2>Loading...</h2>
   )
   
 }

};

export default UserStories;