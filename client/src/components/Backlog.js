import React, { useState, useEffect } from "react";
import '../App.css';
import Api from '../services/api'
import { NavLink, Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';

 const Backlog = (props) => {
  console.log(props);
  //let totalSprints = parseInt(props.location.project.totalSprints);
  let card = null;
  let column = null;
  const [storyData, setStoryData] = useState(undefined);
  useEffect(() => {
    const api = new Api();
    async function getStories() {
      try {
        const {stories } = await api.getStories(props.location.project) ;
        console.log(stories);
        if (stories) setStoryData(stories);
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories();
  }, [props.location.project]);

// column = () => {
//   for(let i=0;i<=totalSprints;i++){
//     return(
//       <div className='drag-n-drop'>
//               <div className='dnd-group' name={`${i}`} id={`${i}`}>
//                   <div className='group-title'>{i}</div>
//               </div>
//           </div>
//     )
//   }  
// }

// for(let i =0;i<=parseInt(props.location.sprint);i++){
//   column = {return (
//     <li></li>
//   )}
// }

  
  if (storyData && Array.isArray(storyData)) {
    card = storyData.map((story) => {
      return (
      
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={story.id}>
				<Card  variant="outlined">
					<CardActionArea>
          <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
          {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
                  {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link> */}
								{story.title}
								</Typography>
							</CardContent>
              </Link>
					</CardActionArea>
				</Card>
			</Grid>)
    });
  }

  return (
    <div>
     <h2>
       Product BACKLOG
     </h2>
     <ul>{column}</ul>
      {/* <Card  variant="outlined">
					<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
								BACKLOGS
								</Typography>
							</CardContent>
					</CardActionArea>
				</Card> */}
        {/* <div className='backlog'>
        {column}  
    </div> */}
      <ul>{card}</ul>
      
      <NavLink to={{pathname:'/storyform', project:`${props.location.project}`}}>Add New User Story</NavLink>
    </div>
  );
};

export default Backlog;


