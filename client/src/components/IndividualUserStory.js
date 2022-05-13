import React, { useState, useEffect } from "react";
import '../App.css';
import { Link } from 'react-router-dom';
import Api from '../services/api'
//import ReportIssue from './ReportIssue'
//import { Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';

 const UserStories = (props) => {
  
  let id = props.location.story
  console.log(props.location)
  let card = null;
  const [storyy, setstoryy] = useState(undefined);

  useEffect(() => {
    const api = new Api();
    async function getStories() {
      try {
        const stories  = await api.getStoryById(props.location.story) ;
        // console.log("storyyyyy is",stories.story)
        if(stories) {let data = stories.story
        console.log("data is",data)
       setstoryy(data);
        // console.log("storyyyyy Data is: ",storyy)
    }
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories();
  }, []);

  if (storyy) {
    card = ()=>{
        console.log("inn")
      return(
      buildCard(storyy)
      )
    }
  }

  
   const buildCard=(storyy) => {
        console.log("story is", storyy)
      return (
				<Card  variant="outlined" key={storyy.id} >
					<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
                <li>{storyy.title}</li>;
				<li>{storyy.description}</li>;
                <li>{storyy.status}</li>;
                <li>{storyy.createdAt}</li>;
								</Typography>
                <Link to={`/reportissue/${storyy.id}`}>
                <button>Report Issue</button>
                </Link>
							</CardContent>
					</CardActionArea>
				</Card>
		)
    };
  

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
     {card}
      
    </div>
  );

};

export default UserStories;