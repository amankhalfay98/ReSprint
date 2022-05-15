// import React, { useState, useRef, useEffect } from 'react';
// import '../App.css';
// import Api from '../services/api'

// function Kanban2(props) {
//     let project = props.location.project;
//     let sprint = props.location.sprint
//     console.log('Project: '+project+' Sprint: '+sprint)
//     const [dragging,setDragging] = useState(false)
//     const dragItem = useRef();3
//     let card= null;

//     const [storyData, setStoryData] = useState(undefined);
//   useEffect(() => {
//     const api = new Api();
//     async function getStories() {
//       try {
//         const {stories } = await api.getStories(project,sprint) ;
//         console.log(stories);
//         if (stories) setStoryData(stories);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     getStories();
//   }, [project,sprint]);

//     const handleDragStart=(e,params)=>{
//         console.log('drag start...', params)
//         dragItem.current = params;
//         setDragging(true);

//     }

//     const renderStories=(story)=>{
//         return(
//             <div draggable className={dragging?'current dndn-item':'dnd-item'} key={story.id}>
//                     <div>
//                         <p>
//                             {story.title}
//                         </p>
//                     </div>
//                 </div>
//         )

//     }

//     if (storyData && Array.isArray(storyData)) {
//         card = storyData.map((story) => {
//           // if(user.company===project.company){
    
//           // }
//           return(
//             renderStories(story)
//           )
//         });
//       }
//   return (
//     <div className='Kanban'>
//         <div className='drag-n-drop'>
//             <div className='dnd-group' name='to_do' id='to_do'>
//                 <div className='group-title'>To Do</div>
//                 {card}

//                 {/* <div draggable className={dragging?'current dndn-item':'dnd-item'}>
//                     <div>
//                         <p>
//                             Item 1
//                         </p>
//                     </div>
//                 </div>
//                 <div className='dnd-item'>
//                     <div>
//                         <p>
//                             Item 2
//                         </p>
//                     </div>
//                 </div> */}
//             </div>
//             <div className='dnd-group' id='in_progress'>
//                 <div className='group-title'>In Progress</div>
//                 <div draggable className='dnd-item'>
//                     <div>
//                         <p>
//                             Item 1
//                         </p>
//                     </div>
//                 </div>
//                 <div className='dnd-item'>
//                     <div>
//                         <p>
//                             Item 2
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className='dnd-group' id='review'>
//                 <div className='group-title'>Review</div>
//                 <div draggable className='dnd-item'>
//                     <div>
//                         <p>
//                             Item 1
//                         </p>
//                     </div>
//                 </div>
//                 <div className='dnd-item'>
//                     <div>
//                         <p>
//                             Item 2
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className='dnd-group' id='completed'>
//                 <div className='group-title'>Completed</div>
//                 <div 
//                 draggable 
//                 onDragStart={(e)=>{handleDragStart(e,{})}}
//                 key='1'
//                 className='dnd-item'>
//                     <div>
//                         <p>
//                             Item 1
//                         </p>
//                     </div>
//                 </div>
//                 <div className='dnd-item'>
//                     <div>
//                         <p>
//                             Item 2
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default Kanban2









import React, { useState,  useEffect } from 'react';
import '../App.css';
import Api from '../services/api'
import {  Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';

function Kanban2(props) {
    let project = props.location.project;
    let sprint = props.location.sprint
    console.log('Project: '+project+' Sprint: '+sprint)
    // const [dragging,setDragging] = useState(false)
    // const dragItem = useRef();
    let cardfortodo= null;
    let cardforinprogress= null;
    let cardforreview= null;
    let cardforcompleted= null;
    const api = new Api();

    const [storyData, setStoryData] = useState(undefined);
  useEffect(() => {
    async function getStories() {
      try {
        const {stories } = await api.getStories(project,sprint) ;
        console.log("All stories are",stories);
        if (stories) setStoryData(stories);
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories();
  }, [project,sprint]);

    // const handleDragStart=(e,params)=>{
    //     console.log('drag start...', params)
    //     dragItem.current = params;
    //     setDragging(true);

    // }

    // const renderStories=(story)=>{
    //     return(
    //         <div draggable className={dragging?'current dndn-item':'dnd-item'} key={story.id}>
    //                 <div>
    //                     <p>
    //                         {story.title}
    //                     </p>
    //                 </div>
    //             </div>
    //     )

    // }

    
  if (storyData && Array.isArray(storyData)) {
    cardfortodo = storyData.map((story) => {
      if(story.status=="To do"){
      return (
      
      <Grid item key={story.id}>
				<Card  variant="outlined">
					<CardActionArea>
          <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
          {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
                   {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link>  */}
							 {story.title} 
                {/* <button>Move To Right</button> */}
								</Typography>
							</CardContent>
              </Link>
					</CardActionArea>
                    <button 	onClick={(e) => {
					e.preventDefault();
          console.log("story is",story)
          // const {
          //   member
          // } = e.target.elements;
					try {
						
						api.upsertStory({
                        
						createdBy:story.createdBy,
            assignedTo: story.assignedTo,
            comments:story.comments,
            createdAt: story.createdAt,
            description: story.description,
            modifiedAt: story.modifiedAt,
            priority:story.priority,
            sprint:story.sprint,
            status:"In Progress",
            storyPoint:story.storyPoint,
            title:story.title,
            type:story.type,
            id:story.id,
            projectId:props.location.project
						});
						
					} catch (err) {
						alert(err.message);
					}
                    alert('User Story Moved to IN PROGRESS');
						//window.location.pathname = '/projects';
				}} >Move To Right </button>

				</Card>
			</Grid>)
      }
    });
  }

  if (storyData && Array.isArray(storyData)) {
    cardforinprogress = storyData.map((story) => {
      if(story.status=="In Progress"){
      return (
      
      <Grid item key={story.id}>
				<Card  variant="outlined">
					<CardActionArea>
          <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
          {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
                   {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link>  */}
							 {story.title} 
                {/* <button>Move To Right</button> */}
								</Typography>
							</CardContent>
              </Link>
					</CardActionArea>
                    <button 	onClick={(e) => {
					e.preventDefault();
          console.log("story is",story)
          // const {
          //   member
          // } = e.target.elements;
					try {
						
						api.upsertStory({
                        
						createdBy:story.createdBy,
            assignedTo: story.assignedTo,
            comments:story.comments,
            createdAt: story.createdAt,
            description: story.description,
            modifiedAt: story.modifiedAt,
            priority:story.priority,
            sprint:story.sprint,
            status:"Review",
            storyPoint:story.storyPoint,
            title:story.title,
            type:story.type,
            id:story.id,
            projectId:props.location.project
						});
						
					} catch (err) {
						alert(err.message);
					}
                    alert('User Story Moved to REVIEW');
						//window.location.pathname = '/projects';
				}} >Move To Right </button>


				</Card>
			</Grid>)
      }
    });
  }

  if (storyData && Array.isArray(storyData)) {
    cardforreview = storyData.map((story) => {
      if(story.status=="Review"){
      return (
      
      <Grid item key={story.id}>
				<Card  variant="outlined">
					<CardActionArea>
          <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
          {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
                   {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link>  */}
							 {story.title} 
                {/* <button>Move To Right</button> */}
								</Typography>
							</CardContent>
              </Link>
					</CardActionArea>
                    <button 	onClick={(e) => {
					e.preventDefault();
          console.log("story is",story)
          // const {
          //   member
          // } = e.target.elements;
					try {
						
						api.upsertStory({
                        
						createdBy:story.createdBy,
            assignedTo: story.assignedTo,
            comments:story.comments,
            createdAt: story.createdAt,
            description: story.description,
            modifiedAt: story.modifiedAt,
            priority:story.priority,
            sprint:story.sprint,
            status:"Completed",
            storyPoint:story.storyPoint,
            title:story.title,
            type:story.type,
            id:story.id,
            projectId:props.location.project
						});
						
					} catch (err) {
						alert(err.message);
					}
                    alert('User Story Moved to COMPLETED');
						// window.location.pathname = {pathname:'/backlog', sprint:`${project.totalSprints}`, project:`${project.id}`} ;
				}} >Move To Right </button>


				</Card>
			</Grid>)
      }
    });
  }

  if (storyData && Array.isArray(storyData)) {
    cardforcompleted = storyData.map((story) => {
      if(story.status=="Completed"){
      return (
      
      <Grid item key={story.id}>
				<Card  variant="outlined">
					<CardActionArea>
          <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
          {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
                   {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</Link>  */}
							 {story.title} 
                {/* <button>Move To Right</button> */}
								</Typography>
							</CardContent>
              </Link>
					</CardActionArea>
				</Card>
			</Grid>)
      }
    });
  }

  return (
    <div className='Kanban'>
        <div className='drag-n-drop'>
            <div className='dnd-group' name='to_do' id='to_do'>
                <div className='group-title'>To Do</div>
                {cardfortodo}
            </div>
            <div className='dnd-group' id='in_progress'>
                <div className='group-title'>In Progress</div>
               {cardforinprogress}
               </div>
            <div className='dnd-group' id='review'>
                <div className='group-title'>Review</div>
                {cardforreview}
               </div>
            <div className='dnd-group' id='completed'>
                <div className='group-title'>Completed</div>
                {cardforcompleted}
            </div>
        </div>
      
    </div>
  )
}

export default Kanban2
