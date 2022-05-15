// import React, { useState, useEffect } from "react";
// import '../App.css';
// import Api from '../services/api'
// import { Link } from 'react-router-dom';
// import {
// 	Card,
// 	CardActionArea,
// 	CardContent,
// 	Grid,
// 	Typography,
// } from '@material-ui/core';

//  const Backlog = (props) => {
//   console.log(props);
//   let card = null;
//   const [storyData, setStoryData] = useState(undefined);
//   useEffect(() => {
//     const api = new Api();
//     async function getStories() {
//       try {
//         const {stories } = await api.getStories(props.location.project) ;
//         console.log(stories);
//         if (stories) setStoryData(stories);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     getStories();
//   }, [props.location.project]);



  
//   if (storyData && Array.isArray(storyData)) {
//     card = storyData.map((story) => {
//       return (<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={story.id}>
// 				<Card  variant="outlined">
// 					<CardActionArea>
//           <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>
// 							<CardContent>
// 								<Typography variant="body2" color="textSecondary" component="p">
//                   {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link> */}
// 								{story.title}
// 								</Typography>
// 							</CardContent>
//               </Link>
// 					</CardActionArea>
// 				</Card>
// 			</Grid>)
//     });
//   }

//   return (
//     <div>
     
//       <Card  variant="outlined">
// 					<CardActionArea>
// 							<CardContent>
// 								<Typography variant="body2" color="textSecondary" component="p">
// 								BACKLOGS
// 								</Typography>
// 							</CardContent>
// 					</CardActionArea>
// 				</Card>
//       <ul>{card}</ul>
      
//       <Link to={"/storyform"}>
//       <button>New User Story</button>
//       </Link>
//     </div>
//   );

//   // return (
//   //   <div>
//   //   <h1 >BACKLOGS:</h1>

//   //   <Link to={"/storyform"}>
//   //   <button  >ADD NEW STORY</button>
//   //   </Link>
//   //   </div>
//   // );
// };

// export default Backlog;

// // <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
// // <Card className={classes.card} variant="outlined">
// //   <CardActionArea>
// //      <Link to={`/characters/${show.id}`}>
// //       <CardMedia
// //         className={classes.media}
// //         component="img"
// //         image={
// //           show.thumbnail && show.thumbnail.path
// //             ? `${show.thumbnail.path}.${show.thumbnail.extension}`
// //             : noImage
// //         }
// //         title="show image"
// //        />

// //       <CardContent>
// //         <Typography
// //           className={classes.titleHead}
// //           gutterBottom
// //           variant="h6"
// //           component="h2"
// //         >
// //           {show.name}
// //         </Typography>
// //         <Typography variant="body2" color="textSecondary" component="p">
// //           {show.description
// //             ? show.description.replace(regex, '').substring(0, 139) + '...'
// //             : 'No Summary'}
// //           <span>More Info</span>
// //         </Typography>
// //       </CardContent>
// //     </Link>
// //   </CardActionArea>
// // </Card>
// // </Grid>






// //Adding Add to sprints buttons:

// import React, { useState, useEffect  } from "react";
// // { AuthContext } from '../firebase/Auth';
// import '../App.css';
// import Api from '../services/api'
// import { NavLink, Link } from 'react-router-dom';
// import {
// 	Card,
// 	CardActionArea,
// 	CardContent,
// 	Grid,
// 	Typography,
// } from '@material-ui/core';

//  const Backlog = (props) => {
//   const api = new Api();
//   let card = null;
//   let Totalsprints = props.location.sprint;
//   //let cards= null;
//   //const [projectData, setProjectData] = useState(undefined);

//   const [storyData, setStoryData] = useState(undefined);
//   //const [Flag, setFlag] = useState(false);


//   useEffect(() => {
//     console.log("Props.location.project", typeof(props.location.project))
//     async function getStories() {
//       try {
//         const {stories } = await api.getStories(props.location.project) ;
//         console.log(stories);
//         if (stories) setStoryData(stories);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     getStories();

    
//   }, [props.location.project]);



  
//   if (storyData && Array.isArray(storyData)) {
//     console.log("Totalsprints are", Totalsprints)
//     while(Totalsprints!=0){
//       console.log("Totalsprints", Totalsprints)
//     card = storyData.map((story) => {
//       if(story.sprint==Totalsprints){
//       return (
      
//       <Grid item key={story.id}>
// 				<Card  variant="outlined">
// 					<CardActionArea>
//           <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
//           {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
// 							<CardContent>
// 								<Typography variant="body2" color="textSecondary" component="p">
//                    <NavLink to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</NavLink> 
// 							{/* {story.title} */}

//                 {/* <button>Move To Right</button> */}
// 								</Typography>
// 							</CardContent>
//               </Link>
// 					</CardActionArea>
//           <button 	onClick={(e) => {
// 					e.preventDefault();
//           console.log("story is",story)
//           // const {
//           //   member
//           // } = e.target.elements;
// 					try {
						
// 						api.upsertStory({
// 						createdBy:story.createdBy,
//             assignedTo: story.assignedTo,
//             comments:story.comments,
//             createdAt: story.createdAt,
//             description: story.description,
//             modifiedAt: story.modifiedAt,
//             priority:story.priority,
//             sprint:1,
//             status:story.status,
//             storyPoint:story.storyPoint,
//             title:story.title,
//             type:story.type,
//             id:story.id,
//             projectId:props.location.project
// 						});
						
// 					} catch (err) {
// 						alert(err.message);
// 					}
//                     alert('Added to sprint 1');
// 						//window.location.pathname = '/projects';
// 				}} >Add To Sprint 1</button>
// 				</Card>
// 			</Grid>)
//       }
//     });
//     Totalsprints=Totalsprints-1;
//     console.log(Totalsprints)
//   }
//   }

//   // sprintt = projectData.totalSprints.map((total) => {
//   //   return (
//   //     <div className="dnd-group">
//   //     <div className="group-title">sprint `${total}`</div>
//   //       <div className="dnd-item">
//   //         <div>
//   //           <p>ITEM 1</p>
//   //         </div>
//   //       </div>
//   //       <div className="dnd-item">
//   //         <div>
//   //           <p>ITEM 2</p>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   )
//   // });

// // 

//   return (
//     <div className="drag-n-drop">
//     <div className="dnd-group">
//       <div className="group-title">Backlog</div>
//         <div>
        
//       </div>
//     </div>
//        <div className="dnd-group">
//        <div className="group-title">sprint 1</div>
//         <div className="dnd-item">
//           <div>
//             {card}
//         </div>
//      </div>

//     </div>
//     <div className="dnd-group">
//        <div className="group-title">sprint 2</div>
//         <div className="dnd-item">
//           <div>
       
//         </div>
//      </div>
//     </div>
//     <div className="dnd-group">
//        <div className="group-title">sprint 3</div>
//         <div className="dnd-item">
//           <div>
//             <p>ITEM 1</p>
//         </div>
//      </div>
//       <div className="dnd-item">
//         <div>
//           <p>ITEM 2</p>
//          </div>
//        </div>
//     </div>

//     <NavLink to={{pathname:'/storyform', project:`${props.location.project}`}}>Add New User Story</NavLink>

//     {/* <p>{sprintt}</p> */}

//     </div>
//   );
// };

// export default Backlog;













//FINAL


//Adding Add to sprints buttons:

import React, { useState, useEffect  } from "react";
// { AuthContext } from '../firebase/Auth';
import '../App.css';
import Api from '../services/api'
import { Link } from 'react-router-dom';


 const Backlog = (props) => {
  const api = new Api();
  let card = null;
  const [storyData, setStoryData] = useState(undefined);


  useEffect(() => {
    console.log("Props.location.project", typeof(props.location.project))
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
 {
    card = storyData.map((story) => {

      return (
      
        <div className="project_card" key={story.id}>
          <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
              
             <h2>USER STORY : {story.title} </h2> </Link>
             <h2>SPRINT NO: {story.sprint} </h2>
				
                <button 	onClick={(e) => {
					e.preventDefault();
          console.log("story is",story)
					try {
						
						api.upsertStory({
						createdBy:story.createdBy,
            assignedTo: story.assignedTo,
            comments:story.comments,
            createdAt: story.createdAt,
            description: story.description,
            modifiedAt: story.modifiedAt,
            priority:story.priority,
            sprint:0,
            status:story.status,
            storyPoint:story.storyPoint,
            title:story.title,
            type:story.type,
            id:story.id,
            projectId:props.location.project
						});
						
					} catch (err) {
						alert(err.message);
					}
                    alert('Added User Story To Backlog');
						//window.location.pathname = '/projects';
				}} >ADD USER STORY TO BACKLOG</button>

<button 	onClick={(e) => {
					e.preventDefault();
          console.log("story is",story)
          let nextsprint=story.sprint+1
          console.log("nextsprint",nextsprint)
					try {
						
						api.upsertStory({
						createdBy:story.createdBy,
            assignedTo: story.assignedTo,
            comments:story.comments,
            createdAt: story.createdAt,
            description: story.description,
            modifiedAt: story.modifiedAt,
            priority:story.priority,
            sprint:nextsprint,
            status:story.status,
            storyPoint:story.storyPoint,
            title:story.title,
            type:story.type,
            id:story.id,
            projectId:props.location.project
						});
						
					} catch (err) {
						alert(err.message);
					}
                    alert(`Added User Story To Sprint ${nextsprint}`);
						//window.location.pathname = '/projects';
				}} >ADD USER STORY TO NEXT SPRINT</button>
        <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>
        <button>Go to Kanban</button>
        </Link>
              </div>
			
      )
      
    });
  }
  }


  return (
    <div >
      <h1>Backlogs</h1>
  {card}
    </div>
  );
};

export default Backlog;

