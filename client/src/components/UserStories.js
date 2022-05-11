// import React from 'react';
// import '../App.css';
//import axios from 'axios';

// {
//   "id": "userstory ID";
//   "createdBy": "67e3823e-73e0-4c97-b31e-63c0fed6c9ec",
//   "assignedTo": "67e3823e-73e0-4c97-b31e-63c0fed6c9ec",
//   "comments": [
//       "658e7f4b-483c-4ceb-8a49-525c25e62e80",
//       "2592e4ab-7a0f-4868-be12-987546e72c63"
//   ],
//   "createdAt": "2022-04-29T04:28:11.429Z",
//   "description": "This is an updated test description",
//   "modifiedAt": "2022-04-29T04:28:11.429Z",
//   "priority": 3,
//   "sprint": 1,
//   "status": "To do",
//   "storyPoint": 5,
//   "title": "This is a test title",
//   "type": "Feature"
// }
// const UserStories = () => {
  

//   return (
//     <div>
//       {/* <button onClick={getProducts()}>Click me</button> */}
      
//     </div>
//   );
// };

// export default UserStories;


import React, { useState, useEffect } from "react";
import '../App.css';
import Api from '../services/api'
import { Link } from 'react-router-dom';
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
        const {stories } = await api.getStories() ;
        console.log(stories);
        if (stories) setStoryData(stories);
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories();
  }, []);

  
  if (storyData && Array.isArray(storyData)) {
    card = storyData.map((story) => {
      return (<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
				<Card  variant="outlined">
					<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
                <li key={story.id}>{story.title}</li>;
								<li key={story.id}>{story.description}</li>;
                <li key={story.id}>{story.status}</li>;
                <li key={story.id}>{story.createdAt}</li>;
								</Typography>
							</CardContent>
					</CardActionArea>
				</Card>
			</Grid>)
    });
  }

  return (
    <div>
     
      <Card  variant="outlined">
					<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
								INDIVIDUAL USER STORIES:
								</Typography>
							</CardContent>
					</CardActionArea>
				</Card>
      <ul>{card}</ul>
      
    </div>
  );

};

export default UserStories;

