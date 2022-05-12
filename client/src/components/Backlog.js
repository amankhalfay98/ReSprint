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

 const Backlog = (props) => {
  console.log(props);
  let card = null;
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



  
  if (storyData && Array.isArray(storyData)) {
    card = storyData.map((story) => {
      return (<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={story.id}>
				<Card  variant="outlined">
					<CardActionArea>
          <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>
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
     
      <Card  variant="outlined">
					<CardActionArea>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
								BACKLOGS
								</Typography>
							</CardContent>
					</CardActionArea>
				</Card>
      <ul>{card}</ul>
      
      <Link to={"/storyform"}>
      <button>New User Story</button>
      </Link>
    </div>
  );

  // return (
  //   <div>
  //   <h1 >BACKLOGS:</h1>

  //   <Link to={"/storyform"}>
  //   <button  >ADD NEW STORY</button>
  //   </Link>
  //   </div>
  // );
};

export default Backlog;

// <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
// <Card className={classes.card} variant="outlined">
//   <CardActionArea>
//      <Link to={`/characters/${show.id}`}>
//       <CardMedia
//         className={classes.media}
//         component="img"
//         image={
//           show.thumbnail && show.thumbnail.path
//             ? `${show.thumbnail.path}.${show.thumbnail.extension}`
//             : noImage
//         }
//         title="show image"
//        />

//       <CardContent>
//         <Typography
//           className={classes.titleHead}
//           gutterBottom
//           variant="h6"
//           component="h2"
//         >
//           {show.name}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p">
//           {show.description
//             ? show.description.replace(regex, '').substring(0, 139) + '...'
//             : 'No Summary'}
//           <span>More Info</span>
//         </Typography>
//       </CardContent>
//     </Link>
//   </CardActionArea>
// </Card>
// </Grid>
